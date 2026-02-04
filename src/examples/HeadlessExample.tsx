/**
 * Headless Example - Custom UI
 * 
 * Shows how to use the headless hook to build a completely custom UI
 */

import React, { useState } from 'react';
import { useCustomerSupport } from '@tarxemo/customer_support';

function CustomChatUI() {
    const [input, setInput] = useState('');

    const {
        messages,
        sendMessage,
        isLoading,
        error,
        clearHistory
    } = useCustomerSupport({
        apiKey: 'your-sitewise-api-key',
        baseUrl: 'https://your-api-url.com/api',
        onError: (err) => console.error('Chat error:', err)
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            await sendMessage(input);
            setInput('');
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
            <h2>Customer Support Chat</h2>

            <div style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '16px',
                height: '400px',
                overflowY: 'auto',
                marginBottom: '16px'
            }}>
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        style={{
                            marginBottom: '12px',
                            textAlign: msg.role === 'USER' ? 'right' : 'left'
                        }}
                    >
                        <div style={{
                            display: 'inline-block',
                            padding: '8px 12px',
                            borderRadius: '8px',
                            background: msg.role === 'USER' ? '#3b82f6' : '#e5e7eb',
                            color: msg.role === 'USER' ? 'white' : 'black',
                            maxWidth: '70%'
                        }}>
                            {msg.content}
                        </div>

                        {msg.sources && msg.sources.length > 0 && (
                            <div style={{ fontSize: '12px', marginTop: '4px' }}>
                                Sources:
                                {msg.sources.map((source, idx) => (
                                    <a
                                        key={idx}
                                        href={source.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ marginLeft: '8px' }}
                                    >
                                        {source.title}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                ))}

                {isLoading && <div>AI is thinking...</div>}
                {error && <div style={{ color: 'red' }}>{error.message}</div>}
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px' }}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    style={{
                        flex: 1,
                        padding: '8px 12px',
                        borderRadius: '8px',
                        border: '1px solid #ccc'
                    }}
                />
                <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    style={{
                        padding: '8px 16px',
                        borderRadius: '8px',
                        border: 'none',
                        background: '#3b82f6',
                        color: 'white',
                        cursor: 'pointer'
                    }}
                >
                    Send
                </button>
            </form>

            <button
                onClick={clearHistory}
                style={{ marginTop: '8px', fontSize: '12px' }}
            >
                Clear History
            </button>
        </div>
    );
}

export default CustomChatUI;
