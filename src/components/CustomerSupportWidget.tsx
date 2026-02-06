import React, { useState } from 'react';
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

    // Map theme to CSS variables
    const themeStyles = React.useMemo(() => {
        if (!theme) return {};
        const styles: Record<string, string> = {};
        if (theme.primaryColor) {
            styles['--cs-primary-color'] = theme.primaryColor;
            // Also derive focus ring and button/user colors if not explicitly provided
            if (!theme.buttonColor) styles['--cs-button-color'] = theme.primaryColor;
            if (!theme.userMessageColor) styles['--cs-user-message-color'] = theme.primaryColor;

            // Try to create a subtle focus ring color if primary is available
            styles['--cs-focus-ring'] = `${theme.primaryColor}33`; // Add 20% opacity (33 in hex)
        }
        if (theme.secondaryColor) styles['--cs-secondary-color'] = theme.secondaryColor;
        if (theme.backgroundColor) styles['--cs-bg-color'] = theme.backgroundColor;
        if (theme.textColor) styles['--cs-text-color'] = theme.textColor;
        if (theme.fontFamily) styles['--cs-font-family'] = theme.fontFamily;
        if (theme.borderRadius) styles['--cs-border-radius'] = theme.borderRadius;
        if (theme.buttonColor) styles['--cs-button-color'] = theme.buttonColor;
        if (theme.userMessageColor) styles['--cs-user-message-color'] = theme.userMessageColor;
        if (theme.assistantMessageColor) styles['--cs-assistant-message-color'] = theme.assistantMessageColor;

        return styles as React.CSSProperties;
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
        <div
            className={`cs-widget cs-widget--${position} ${isOpen ? 'cs-widget--open' : ''} ${className}`}
            style={themeStyles}
        >
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
