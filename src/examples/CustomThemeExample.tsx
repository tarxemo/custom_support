/**
 * Custom Theme Example
 * 
 * Shows how to customize the appearance with theming
 */

import { CustomerSupportWidget } from '@tarxemo/customer_support';
import '@tarxemo/customer_support/styles';

function App() {
    // Define your custom theme
    const customTheme = {
        primaryColor: '#10b981',      // Green
        secondaryColor: '#059669',     // Darker green
        userMessageColor: '#10b981',
        assistantMessageColor: '#f0fdf4',
        buttonColor: '#10b981',
        borderRadius: '16px',
        fontFamily: 'Inter, sans-serif'
    };

    return (
        <div className="app">
            <h1>Company Website</h1>

            <CustomerSupportWidget
                apiKey="your-sitewise-api-key"
                baseUrl="https://your-api-url.com/api"
                theme={customTheme}
                position="bottom-left"
                welcomeMessage="👋 Hello! How can we help you today?"
                placeholder="Ask us anything..."
            />
        </div>
    );
}

export default App;
