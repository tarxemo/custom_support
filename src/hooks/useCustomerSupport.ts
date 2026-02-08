import { useState, useCallback, useEffect, useRef } from 'react';
import { CustomerSupportAPIClient } from '../api/client';
import { useLocalStorage, generateSessionId } from './useLocalStorage';
import type { Message, UseCustomerSupportOptions, UseCustomerSupportReturn } from '../types';

const SESSION_STORAGE_KEY = 'customer_support_session_id';
const MESSAGES_STORAGE_KEY = 'customer_support_messages';

/**
 * Core headless hook for customer support functionality
 * Can be used to build custom chat interfaces
 */
export function useCustomerSupport(options: UseCustomerSupportOptions): UseCustomerSupportReturn {
    const { apiKey, baseUrl, onError } = options;

    const [messages, setMessages] = useLocalStorage<Message[]>(MESSAGES_STORAGE_KEY, []);
    const [sessionId, setSessionId] = useLocalStorage<string>(
        SESSION_STORAGE_KEY,
        generateSessionId()
    );
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const apiClientRef = useRef<CustomerSupportAPIClient | null>(null);

    // Initialize API client
    useEffect(() => {
        apiClientRef.current = new CustomerSupportAPIClient(apiKey, baseUrl);
    }, [apiKey, baseUrl]);

    /**
     * Clear error state
     */
    const clearError = useCallback(() => {
        setError(null);
    }, []);

    /**
     * Send a message and get AI response
     */
    const sendMessage = useCallback(
        async (question: string) => {
            if (!apiClientRef.current) {
                const err = new Error('API client not initialized');
                setError(err);
                onError?.(err);
                return;
            }

            if (!question.trim()) {
                return;
            }

            // Add user message immediately
            const userMessage: Message = {
                id: `user_${Date.now()}`,
                role: 'USER',
                content: question,
                timestamp: new Date()
            };

            setMessages((prev: Message[]) => [...prev, userMessage]);
            setIsLoading(true);
            setError(null);

            try {
                const response = await apiClientRef.current.sendMessage(question, sessionId);

                // Add assistant message
                const assistantMessage: Message = {
                    id: `assistant_${Date.now()}`,
                    role: 'ASSISTANT',
                    content: response.answer,
                    timestamp: new Date(),
                    sources: response.sources
                };

                setMessages((prev: Message[]) => [...prev, assistantMessage]);

                // Update session ID if changed
                if (response.session_id !== sessionId) {
                    setSessionId(response.session_id);
                }
            } catch (err) {
                const error = err instanceof Error ? err : new Error('Failed to send message');
                setError(error);
                onError?.(error);

                // Add error message to UI
                const errorMessage: Message = {
                    id: `error_${Date.now()}`,
                    role: 'ASSISTANT',
                    content: `Sorry, I encountered an error: ${error.message}`,
                    timestamp: new Date()
                };
                setMessages((prev: Message[]) => [...prev, errorMessage]);
            } finally {
                setIsLoading(false);
            }
        },
        [sessionId, onError, setMessages, setSessionId]
    );

    /**
     * Load conversation history from backend
     */
    const loadHistory = useCallback(async () => {
        if (!apiClientRef.current || !sessionId) {
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const history = await apiClientRef.current.getConversationHistory(sessionId);

            const loadedMessages: Message[] = history.messages.map((msg, index) => ({
                id: `${msg.role.toLowerCase()}_${index}_${Date.now()}`,
                role: msg.role.toUpperCase() as 'USER' | 'ASSISTANT',
                content: msg.content,
                timestamp: new Date(msg.created_at)
            }));

            setMessages(loadedMessages);
        } catch (err) {
            const error = err instanceof Error ? err : new Error('Failed to load history');
            setError(error);
            onError?.(error);
        } finally {
            setIsLoading(false);
        }
    }, [sessionId, onError, setMessages]);

    /**
     * Clear conversation history
     */
    const clearHistory = useCallback(() => {
        setMessages([]);
        setSessionId(generateSessionId());
    }, [setMessages, setSessionId]);

    /**
     * Delete a specific message
     */
    const deleteMessage = useCallback((id: string) => {
        setMessages((prev) => prev.filter((msg) => msg.id !== id));
    }, [setMessages]);

    return {
        messages,
        sendMessage,
        isLoading,
        error,
        clearError,
        sessionId,
        loadHistory,
        clearHistory,
        deleteMessage
    };
}
