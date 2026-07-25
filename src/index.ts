import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { CustomerSupportWidget } from './components/CustomerSupportWidget';
import { CustomerSupportConfig } from './types';

// Main component
export { CustomerSupportWidget } from './components/CustomerSupportWidget';

// Sub-components (for custom implementations)
export { ChatWindow } from './components/ChatWindow';
export { ChatMessage } from './components/ChatMessage';
export { ChatInput } from './components/ChatInput';

// Hooks
export { useCustomerSupport } from './hooks/useCustomerSupport';
export { useLocalStorage } from './hooks/useLocalStorage';
export { useWidgetConfig } from './hooks/useWidgetConfig';

// Types
export type {
    Message,
    Source,
    ChatResponse,
    ConversationHistoryResponse,
    ErrorResponse,
    ThemeConfig,
    Position,
    WidgetMode,
    WidgetConfigResponse,
    CustomerSupportConfig,
    UseCustomerSupportOptions,
    UseCustomerSupportReturn
} from './types';

// API Client (for advanced usage)
export { CustomerSupportAPIClient } from './api/client';

// Global initialization function for CDN/non-React usage
export const init = (config: CustomerSupportConfig, containerId: string = 'customer-support-root') => {
    let container = document.getElementById(containerId);

    if (!container) {
        container = document.createElement('div');
        container.id = containerId;
        document.body.appendChild(container);
    }

    const root = ReactDOM.createRoot(container);
    root.render(React.createElement(CustomerSupportWidget, config));

    return {
        unmount: () => root.unmount(),
        container
    };
};

// Styles
import './styles/index.css';
