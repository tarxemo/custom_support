/**
 * Basic Example - Simple Integration
 * 
 * This is the most basic way to integrate the customer support widget
 */

import { CustomerSupportWidget } from '@tarxemo/customer_support';
import '@tarxemo/customer_support/styles';

function App() {
    return (
        <div className="app">
            <header>
                <h1>My Awesome Website</h1>
            </header>

            <main>
                <p>Welcome to our website!</p>
                {/* Your content here */}
            </main>

            {/* Add the widget - that's it! */}
            <CustomerSupportWidget
                apiKey="your-sitewise-api-key"
                baseUrl="https://your-api-url.com/api"
            />
        </div>
    );
}

export default App;
