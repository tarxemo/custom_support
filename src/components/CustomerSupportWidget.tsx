import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { useCustomerSupport } from '../hooks/useCustomerSupport';
import { ChatWindow } from './ChatWindow';
import type { CustomerSupportConfig } from '../types';

export const CustomerSupportWidget: React.FC<CustomerSupportConfig> = ({
    apiKey,
    baseUrl,
    theme,
    position = 'bottom-right',
    welcomeMessage,
    placeholder,
    className = '',
    onError,
    onMessageSent,
    onMessageReceived
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const {
        messages,
        sendMessage,
        isLoading,
        error,
        clearError
    } = useCustomerSupport({
        apiKey,
        baseUrl,
        onError
    });

    // Apply theme CSS variables
    useEffect(() => {
        if (theme) {
            const root = document.documentElement;
            if (theme.primaryColor) root.style.setProperty('--cs-primary-color', theme.primaryColor);
            if (theme.secondaryColor) root.style.setProperty('--cs-secondary-color', theme.secondaryColor);
            if (theme.backgroundColor) root.style.setProperty('--cs-bg-color', theme.backgroundColor);
            if (theme.textColor) root.style.setProperty('--cs-text-color', theme.textColor);
            if (theme.fontFamily) root.style.setProperty('--cs-font-family', theme.fontFamily);
            if (theme.borderRadius) root.style.setProperty('--cs-border-radius', theme.borderRadius);
            if (theme.buttonColor) root.style.setProperty('--cs-button-color', theme.buttonColor);
            if (theme.userMessageColor) root.style.setProperty('--cs-user-message-color', theme.userMessageColor);
            if (theme.assistantMessageColor) root.style.setProperty('--cs-assistant-message-color', theme.assistantMessageColor);
        }
    }, [theme]);

    const handleSendMessage = async (message: string) => {
        onMessageSent?.(message);
        await sendMessage(message);
        if (!error) {
            const lastMessage = messages[messages.length - 1];
            if (lastMessage?.role === 'ASSISTANT') {
                onMessageReceived?.(lastMessage.content);
            }
        }
    };

    const handleToggle = () => {
        setIsOpen(!isOpen);
        if (error) {
            clearError();
        }
    };

    return (
        <div className={`cs-widget cs-widget--${position} ${isOpen ? 'cs-widget--open' : ''} ${className}`}>
            {/* Chat Window */}
            {isOpen && (
                <ChatWindow
                    messages={messages}
                    onSendMessage={handleSendMessage}
                    onClose={() => setIsOpen(false)}
                    isLoading={isLoading}
                    error={error}
                    placeholder={placeholder}
                    welcomeMessage={welcomeMessage}
                />
            )}

            {/* Toggle Button */}
            <button
                className={`cs-widget__toggle ${isOpen ? 'cs-widget__toggle--open' : ''}`}
                onClick={handleToggle}
                aria-label={isOpen ? 'Close chat' : 'Open chat'}
                aria-expanded={isOpen}
            >
                <MessageCircle size={24} />
                {!isOpen && messages.length > 0 && (
                    <span className="cs-widget__badge">{messages.filter(m => m.role === 'ASSISTANT').length}</span>
                )}
            </button>
        </div>
    );
};
