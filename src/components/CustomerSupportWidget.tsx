import * as React from 'react';
import { MessageCircle } from 'lucide-react';
import { useCustomerSupport } from '../hooks/useCustomerSupport';
import { useWidgetConfig } from '../hooks/useWidgetConfig';
import { ChatWindow } from './ChatWindow';
import type { CustomerSupportConfig } from '../types';

// @ts-ignore - Vite specific raw import
import styles from '../styles/index.css?inline';

export const CustomerSupportWidget: React.FC<CustomerSupportConfig> = ({
    apiKey,
    baseUrl,
    theme,
    position,
    welcomeMessage,
    placeholder,
    className = '',
    onError,
    onMessageSent,
    onMessageReceived
}) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const {
        messages,
        sendMessage,
        isLoading,
        error,
        clearError,
        deleteMessage,
        clearHistory
    } = useCustomerSupport({
        apiKey,
        baseUrl,
        onError
    });

    // Console-driven customization (colors, position, mode) fetched once
    // on mount. Non-blocking and best-effort: explicit props below always
    // win per-field over remote values, and while loading (or if this
    // fetch fails) everything just falls back to local props/defaults -
    // identical to today's behavior.
    const { config: remoteConfig } = useWidgetConfig(apiKey, baseUrl);

    const effectiveTheme = React.useMemo(
        () => ({ ...remoteConfig?.theme, ...theme }),
        [remoteConfig, theme]
    );
    const effectivePosition = position || remoteConfig?.position || 'bottom-right';
    const effectiveWelcomeMessage = welcomeMessage ?? remoteConfig?.welcomeMessage;
    const effectivePlaceholder = placeholder ?? remoteConfig?.placeholder;

    // Helper to determine if a color is light or dark and return appropriate text color
    const getContrastColor = (color: string) => {
        if (!color) return '#ffffff';

        let r, g, b;

        // Handle hex
        if (color.startsWith('#')) {
            const hex = color.slice(1);
            r = parseInt(hex.substring(0, 2), 16);
            g = parseInt(hex.substring(2, 4), 16);
            b = parseInt(hex.substring(4, 6), 16);
        }
        // Handle rgb/rgba
        else if (color.startsWith('rgb')) {
            const values = color.match(/\d+/g);
            if (values && values.length >= 3) {
                r = parseInt(values[0]);
                g = parseInt(values[1]);
                b = parseInt(values[2]);
            } else {
                return '#ffffff';
            }
        } else {
            return '#ffffff';
        }

        // Calculate luminance (standard WCAG formula)
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        return luminance > 0.6 ? '#1a1a1a' : '#ffffff';
    };

    // Helper to convert color to rgba for transparencies
    const colorToRgba = (color: string, alpha: number) => {
        if (!color) return `rgba(0, 0, 0, ${alpha})`;

        let r = 0, g = 0, b = 0;

        if (color.startsWith('#')) {
            const hex = color.slice(1);
            if (hex.length === 3) {
                r = parseInt(hex[0] + hex[0], 16);
                g = parseInt(hex[1] + hex[1], 16);
                b = parseInt(hex[2] + hex[2], 16);
            } else {
                r = parseInt(hex.substring(0, 2), 16);
                g = parseInt(hex.substring(2, 4), 16);
                b = parseInt(hex.substring(4, 6), 16);
            }
        } else if (color.startsWith('rgb')) {
            const values = color.match(/\d+/g);
            if (values && values.length >= 3) {
                r = parseInt(values[0]);
                g = parseInt(values[1]);
                b = parseInt(values[2]);
            }
        }

        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    // Map theme to CSS variables
    const themeStyles = React.useMemo(() => {
        const styles: Record<string, string> = {};

        const primary = effectiveTheme?.primaryColor || '#6366f1';
        const bg = effectiveTheme?.backgroundColor || '#ffffff';
        // If no text color provided, calculate based on background
        const text = effectiveTheme?.textColor || (getContrastColor(bg) === '#ffffff' ? '#ffffff' : '#1f2937');

        // Extended theme colors with smart defaults
        const success = effectiveTheme?.successColor || '#4ade80'; // Green
        const error = effectiveTheme?.errorColor || '#ef4444'; // Red
        const border = effectiveTheme?.borderColor || colorToRgba(text, 0.1);
        const shadow = effectiveTheme?.shadowColor || 'rgba(0, 0, 0, 0.1)';

        // Base
        styles['--cs-primary-color'] = primary;
        styles['--cs-secondary-color'] = effectiveTheme?.secondaryColor || primary;
        styles['--cs-bg-color'] = bg;
        styles['--cs-text-color'] = text;
        styles['--cs-font-family'] = effectiveTheme?.fontFamily || 'inherit';
        styles['--cs-border-radius'] = effectiveTheme?.borderRadius || '12px';

        // Functional Colors
        styles['--cs-success-color'] = success;
        styles['--cs-error-color'] = error;
        styles['--cs-error-bg-color'] = colorToRgba(error, 0.1);
        styles['--cs-border-color'] = border;
        styles['--cs-shadow-color'] = shadow;

        // Scrollbars
        styles['--cs-scrollbar-thumb'] = colorToRgba(text, 0.2);
        styles['--cs-scrollbar-track'] = 'transparent';

        // Derived text colors for contrast
        styles['--cs-header-text-color'] = getContrastColor(primary);
        styles['--cs-bg-text-color'] = text;

        // Derived or explicit overrides
        styles['--cs-button-color'] = effectiveTheme?.buttonColor || primary;
        styles['--cs-user-message-color'] = effectiveTheme?.userMessageColor || primary;
        styles['--cs-user-text-color'] = getContrastColor(effectiveTheme?.userMessageColor || primary);

        // Assistant message color
        const isDarkBg = getContrastColor(bg) === '#ffffff';
        styles['--cs-assistant-message-color'] = effectiveTheme?.assistantMessageColor ||
            (isDarkBg ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)');
        styles['--cs-assistant-text-color'] = text;

        // Focus ring
        styles['--cs-focus-ring'] = colorToRgba(primary, 0.2);

        return styles as React.CSSProperties;
    }, [effectiveTheme]);

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

    // Only suppress the popup once the console config has resolved and
    // explicitly confirmed CUSTOM mode - while loading, or on fetch failure,
    // render normally so a network hiccup never hides the widget.
    if (remoteConfig?.mode === 'CUSTOM') {
        return null;
    }

    return (
        <div
            className={`cs-widget cs-widget--${effectivePosition} ${isOpen ? 'cs-widget--open' : ''} ${className}`}
            style={themeStyles}
        >
            {/* Inject styles automatically */}
            <style dangerouslySetInnerHTML={{ __html: styles }} />

            {/* Chat Window */}
            {isOpen && (
                <ChatWindow
                    messages={messages}
                    onSendMessage={handleSendMessage}
                    onClose={() => setIsOpen(false)}
                    isLoading={isLoading}
                    error={error}
                    placeholder={effectivePlaceholder}
                    welcomeMessage={effectiveWelcomeMessage}
                    onDeleteMessage={deleteMessage}
                    onClearHistory={clearHistory}
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
                    <span className="cs-widget__badge">
                        {messages.filter(m => m.role.toUpperCase() === 'ASSISTANT').length}
                    </span>
                )}
            </button>
        </div>
    );
};
