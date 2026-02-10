import * as React from 'react';
import { Send, Loader2 } from 'lucide-react';

interface ChatInputProps {
    onSendMessage: (message: string) => void;
    isLoading: boolean;
    placeholder?: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({
    onSendMessage,
    isLoading,
    placeholder = 'Type your message...'
}) => {
    const [message, setMessage] = React.useState('');
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);

    // Auto-resize textarea
    React.useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            const newHeight = Math.min(textarea.scrollHeight, 120);
            textarea.style.height = `${newHeight}px`;
            textarea.style.overflowY = textarea.scrollHeight > 120 ? 'auto' : 'hidden';
        }
    }, [message]);

    const handleSubmit = (e?: React.FormEvent | React.KeyboardEvent) => {
        e?.preventDefault();
        if (message.trim() && !isLoading) {
            onSendMessage(message);
            setMessage('');
            // Reset height after sending
            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto';
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <form className="cs-input" onSubmit={handleSubmit}>
            <textarea
                ref={textareaRef}
                className="cs-input__textarea"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                disabled={isLoading}
                rows={1}
                aria-label="Message input"
            />
            <button
                type="submit"
                className={`cs-input__button ${isLoading ? 'cs-input__button--loading' : ''}`}
                disabled={!message.trim() || isLoading}
                aria-label="Send message"
            >
                {isLoading ? (
                    <Loader2 size={20} className="cs-input__spinner" />
                ) : (
                    <Send size={20} />
                )}
            </button>
        </form>
    );
};
