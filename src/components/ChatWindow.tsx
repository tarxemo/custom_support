import React, { useEffect, useRef } from 'react';
import { X, Loader2, Trash2 } from 'lucide-react';
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
    onDeleteMessage?: (id: string) => void;
    onClearHistory?: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
    messages,
    onSendMessage,
    onClose,
    isLoading,
    error,
    placeholder,
    welcomeMessage = 'Hi! How can I help you today?',
    onDeleteMessage,
    onClearHistory
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
                    <h3 className="cs-window__title text-gray-900">Customer Support</h3>
                    <div className="cs-window__status">
                        <span className="cs-window__status-dot" />
                        <span className='text-gray-900'>Online</span>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    {messages.length > 0 && onClearHistory && (
                        <button
                            className="cs-window__close text-red-500"
                            onClick={() => {
                                if (window.confirm('Are you sure you want to clear the entire chat history?')) {
                                    onClearHistory();
                                }
                            }}
                            aria-label="Clear chat history"
                            title="Clear chat history"
                        >
                            <Trash2 size={18} className='text-red-500' />
                        </button>
                    )}
                    <button
                        className="cs-window__close text-gray-900"
                        onClick={onClose}
                        aria-label="Close chat"
                    >
                        <X size={20} className='text-gray-900' />
                    </button>
                </div>
            </div>

            {/* Messages */}
            <div className="cs-window__messages">
                {messages.length === 0 && !isLoading && (
                    <div className="cs-window__welcome">
                        <p>{welcomeMessage}</p>
                    </div>
                )}

                {messages.map((message) => (
                    <ChatMessage
                        key={message.id}
                        message={message}
                        onDelete={onDeleteMessage}
                    />
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
