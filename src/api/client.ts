import axios, { AxiosInstance, AxiosError } from 'axios';
import type { ChatResponse, ConversationHistoryResponse, ErrorResponse } from '../types';

const DEFAULT_BASE_URL = 'http://localhost:8000/api';

export class CustomerSupportAPIClient {
    private client: AxiosInstance;

    constructor(apiKey: string, baseUrl: string = DEFAULT_BASE_URL) {
        this.client = axios.create({
            baseURL: baseUrl,
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': apiKey
            },
            timeout: 30000 // 30 seconds
        });

        // Response interceptor for error handling
        this.client.interceptors.response.use(
            (response) => response,
            (error: AxiosError<ErrorResponse>) => {
                if (error.response?.data) {
                    const errorData = error.response.data;
                    const message = errorData.response?.message || 'An unknown error occurred';
                    throw new Error(message);
                } else if (error.request) {
                    throw new Error('No response from server. Please check your connection.');
                } else {
                    throw new Error(error.message || 'Request failed');
                }
            }
        );
    }

    /**
     * Send a message to the customer support API
     */
    async sendMessage(question: string, sessionId?: string): Promise<ChatResponse['data']> {
        try {
            const response = await this.client.post<ChatResponse>('/chat/', {
                question,
                session_id: sessionId
            });

            if (response.data.response.status !== 'success') {
                throw new Error(response.data.response.message);
            }

            return response.data.data;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Failed to send message');
        }
    }

    /**
     * Get conversation history for a session
     */
    async getConversationHistory(sessionId: string): Promise<ConversationHistoryResponse['data']> {
        try {
            const response = await this.client.get<ConversationHistoryResponse>(
                `/chat/history/${sessionId}/`
            );

            if (response.data.response.status !== 'success') {
                throw new Error(response.data.response.message);
            }

            return response.data.data;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Failed to load conversation history');
        }
    }

    /**
     * Update API key
     */
    updateApiKey(apiKey: string): void {
        this.client.defaults.headers.common['X-API-Key'] = apiKey;
    }

    /**
     * Update base URL
     */
    updateBaseUrl(baseUrl: string): void {
        this.client.defaults.baseURL = baseUrl;
    }
}
