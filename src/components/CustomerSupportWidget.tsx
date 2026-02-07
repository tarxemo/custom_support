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
        const styles: Record<string, string> = {};

        // Base fallbacks if nothing is provided
        styles['--cs-primary-color'] = theme?.primaryColor || '#6366f1';
        styles['--cs-secondary-color'] = theme?.secondaryColor || theme?.primaryColor || '#8b5cf6';
        styles['--cs-bg-color'] = theme?.backgroundColor || '#ffffff';
        styles['--cs-text-color'] = theme?.textColor || '#1f2937';
        styles['--cs-font-family'] = theme?.fontFamily || 'inherit';
        styles['--cs-border-radius'] = theme?.borderRadius || '12px';

        // Derived or explicit overrides
        styles['--cs-button-color'] = theme?.buttonColor || theme?.primaryColor || '#6366f1';
        styles['--cs-user-message-color'] = theme?.userMessageColor || theme?.primaryColor || '#6366f1';
        styles['--cs-assistant-message-color'] = theme?.assistantMessageColor || '#f3f4f6';

        // Focus ring derivation
        if (theme?.primaryColor) {
            styles['--cs-focus-ring'] = `${theme.primaryColor}33`;
        }

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
