/**
 * Core types for the customer support library
 */

export interface Message {
    id: string;
    role: 'USER' | 'ASSISTANT';
    content: string;
    timestamp: Date;
    sources?: Source[];
}

export interface Source {
    url: string;
    title: string;
    similarity: number;
    excerpt: string;
}

export interface ChatResponse {
    response: {
        status: string;
        message: string;
        code: number;
    };
    data: {
        answer: string;
        sources: Source[];
        session_id: string;
    };
}

export interface ConversationHistoryResponse {
    response: {
        status: string;
        message: string;
        code: number;
    };
    data: {
        session_id: string;
        messages: {
            role: 'USER' | 'ASSISTANT';
            content: string;
            created_at: string;
        }[];
    };
}

export interface ErrorResponse {
    response: {
        status: 'error';
        message: string;
        code: number;
    };
    data: null;
    errors?: Record<string, string[]>;
}

export interface ThemeConfig {
    primaryColor?: string;
    secondaryColor?: string;
    backgroundColor?: string;
    textColor?: string;
    fontFamily?: string;
    borderRadius?: string;
    buttonColor?: string;
    userMessageColor?: string;
    assistantMessageColor?: string;
}

export type Position = 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';

export interface CustomerSupportConfig {
    apiKey: string;
    baseUrl?: string;
    theme?: ThemeConfig;
    position?: Position;
    welcomeMessage?: string;
    placeholder?: string;
    className?: string;
    onError?: (error: Error) => void;
    onMessageSent?: (message: string) => void;
    onMessageReceived?: (response: string) => void;
}

export interface UseCustomerSupportOptions {
    apiKey: string;
    baseUrl?: string;
    onError?: (error: Error) => void;
}

export interface UseCustomerSupportReturn {
    messages: Message[];
    sendMessage: (question: string) => Promise<void>;
    isLoading: boolean;
    error: Error | null;
    clearError: () => void;
    sessionId: string;
    loadHistory: () => Promise<void>;
    clearHistory: () => void;
}
