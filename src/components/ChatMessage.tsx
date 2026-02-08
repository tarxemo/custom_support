import React from 'react';
import type { Message as MessageType } from '../types';
import { ExternalLink, Trash2 } from 'lucide-react';

interface ChatMessageProps {
    message: MessageType;
    onDelete?: (id: string) => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, onDelete }) => {
    const isUser = message.role.toUpperCase() === 'USER';
    const timestamp = message.timestamp instanceof Date ? message.timestamp : new Date(message.timestamp);

    return (
        <div className={`cs-message ${isUser ? 'cs-message--user' : 'cs-message--assistant'}`}>
            <div className="cs-message__content">
                <p className="cs-message__text">{message.content}</p>

                {message.sources && message.sources.length > 0 && (
                    <div className="cs-message__sources">
                        <p className="cs-message__sources-title">Sources:</p>
                        <ul className="cs-message__sources-list">
                            {message.sources.map((source, index) => (
                                <li key={index} className="cs-message__source-item">
                                    <a
                                        href={source.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="cs-message__source-link"
                                    >
                                        <ExternalLink size={12} />
                                        <span>{source.title}</span>
                                    </a>
                                    <span className="cs-message__source-similarity">
                                        {Math.round(source.similarity * 100)}% match
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {onDelete && (
                    <button
                        className="cs-message__delete"
                        onClick={() => {
                            if (window.confirm('Delete this message?')) {
                                onDelete(message.id);
                            }
                        }}
                        aria-label="Delete message"
                    >
                        <Trash2 size={14} />
                    </button>
                )}
            </div>

            <time className="cs-message__time" dateTime={timestamp.toISOString()}>
                {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </time>
        </div>
    );
};
