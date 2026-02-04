/**
 * @tarxemo/customer_support
 * Professional React component library for AI-powered customer support
 */

// Main component
export { CustomerSupportWidget } from './components/CustomerSupportWidget';

// Sub-components (for custom implementations)
export { ChatWindow } from './components/ChatWindow';
export { ChatMessage } from './components/ChatMessage';
export { ChatInput } from './components/ChatInput';

// Hooks
export { useCustomerSupport } from './hooks/useCustomerSupport';
export { useLocalStorage } from './hooks/useLocalStorage';

// Types
export type {
    Message,
    Source,
    ChatResponse,
    ConversationHistoryResponse,
    ErrorResponse,
    ThemeConfig,
    Position,
    CustomerSupportConfig,
    UseCustomerSupportOptions,
    UseCustomerSupportReturn
} from './types';

// API Client (for advanced usage)
export { CustomerSupportAPIClient } from './api/client';

// Styles
import './styles/index.css';
