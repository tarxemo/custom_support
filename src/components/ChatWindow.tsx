import React, { useEffect, useRef } from 'react';
import { X, Loader2 } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import type { Message } from '../types';

interface ChatWindowProps {
    messages: Message[];
    onSendMessage: (message: string) => void;
    onClose: () => void;
    isLoading: boolean;
    error: Error | null;
    placeholder?: string;
    welcomeMessage?: string;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
    messages,
    onSendMessage,
    onClose,
    isLoading,
    error,
    placeholder,
    welcomeMessage = 'Hi! How can I help you today?'
}) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="cs-window">
            {/* Header */}
            <div className="cs-window__header">
                <div className="cs-window__header-info">
                    <h3 className="text-gray-900">Customer Support</h3>
                    <div className="cs-window__status">
                        <span className="cs-window__status-dot" />
                        <span className='text-gray-900'>Online</span>
                    </div>
                </div>
                <button
                    className="cs-window__close"
                    onClick={onClose}
                    aria-label="Close chat"
                >
                    <X size={20} />
                </button>
            </div>

            {/* Messages */}
            <div className="cs-window__messages">
                {messages.length === 0 && !isLoading && (
                    <div className="cs-window__welcome">
                        <p>{welcomeMessage}</p>
                    </div>
                )}

                {messages.map((message) => (
                    <ChatMessage key={message.id} message={message} />
                ))}

                {isLoading && (
                    <div className="cs-window__typing">
                        <Loader2 size={20} className="cs-window__typing-icon" />
                        <span>Thinking...</span>
                    </div>
                )}

                {error && (
                    <div className="cs-window__error">
                        <p>{error.message}</p>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="cs-window__input-wrapper">
                <ChatInput
                    onSendMessage={onSendMessage}
                    isLoading={isLoading}
                    placeholder={placeholder}
                />
            </div>
        </div>
    );
};
