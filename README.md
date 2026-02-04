# @tarxemo/customer_support

> A professional React component library for AI-powered customer support integration with SiteWise

[![npm version](https://img.shields.io/npm/v/@tarxemo/customer_support.svg)](https://www.npmjs.com/package/@tarxemo/customer_support)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- 🚀 **Drop-in Integration** - Add AI-powered customer support in minutes
- 🎨 **Fully Customizable** - Theme colors, positioning, and behavior
- 📱 **Responsive Design** - Works seamlessly on mobile and desktop
- 💬 **Real-time Chat** - Powered by SiteWise RAG (Retrieval-Augmented Generation)
- 🔒 **Secure** - API key authentication with SiteWise backend
- 📚 **Source Attribution** - Shows relevant sources for AI responses
- ♿ **Accessible** - WCAG compliant with keyboard navigation
- 🎯 **TypeScript** - Full type safety and IntelliSense support
- 🪝 **Headless Hooks** - Build your own custom UI

## 📦 Installation

```bash
npm install @tarxemo/customer_support
```

or with yarn:

```bash
yarn add @tarxemo/customer_support
```

## 🚀 Quick Start

### Basic Usage

```tsx
import { CustomerSupportWidget } from '@tarxemo/customer_support';
import '@tarxemo/customer_support/styles';

function App() {
  return (
    <div>
      <h1>My Website</h1>
      {/* Your content */}
      
      <CustomerSupportWidget 
        apiKey="your-sitewise-api-key"
      />
    </div>
  );
}
```

That's it! The chat widget will appear in the bottom-right corner of your page.

## 📖 API Reference

### CustomerSupportWidget Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `apiKey` | `string` | **required** | Your SiteWise API key |
| `baseUrl` | `string` | `http://localhost:8000/api` | SiteWise API base URL |
| `theme` | `ThemeConfig` | - | Custom theme configuration |
| `position` | `Position` | `'bottom-right'` | Widget position |
| `welcomeMessage` | `string` | `'Hi! How can I help you today?'` | Initial welcome message |
| `placeholder` | `string` | `'Type your message...'` | Input placeholder text |
| `className` | `string` | `''` | Additional CSS class |
| `onError` | `(error: Error) => void` | - | Error callback |
| `onMessageSent` | `(message: string) => void` | - | Called when user sends message |
| `onMessageReceived` | `(response: string) => void` | - | Called when AI responds |

### Theme Configuration

```typescript
interface ThemeConfig {
  primaryColor?: string;        // Default: #6366f1
  secondaryColor?: string;       // Default: #8b5cf6
  backgroundColor?: string;      // Default: #ffffff
  textColor?: string;           // Default: #1f2937
  fontFamily?: string;          // Default: system fonts
  borderRadius?: string;        // Default: 12px
  buttonColor?: string;         // Default: #6366f1
  userMessageColor?: string;    // Default: #6366f1
  assistantMessageColor?: string; // Default: #f3f4f6
}
```

### Position Options

- `'bottom-right'` (default)
- `'bottom-left'`
- `'top-right'`
- `'top-left'`

## 🎨 Customization Examples

### Custom Theme

```tsx
<CustomerSupportWidget 
  apiKey="your-api-key"
  theme={{
    primaryColor: '#10b981',
    secondaryColor: '#059669',
    userMessageColor: '#10b981',
    borderRadius: '8px',
  }}
/>
```

### Custom Position and Welcome Message

```tsx
<CustomerSupportWidget 
  apiKey="your-api-key"
  position="bottom-left"
  welcomeMessage="Hello! Ask me anything about our products!"
  placeholder="Ask a question..."
/>
```

### With Event Handlers

```tsx
<CustomerSupportWidget 
  apiKey="your-api-key"
  onMessageSent={(msg) => console.log('User sent:', msg)}
  onMessageReceived={(response) => console.log('AI replied:', response)}
  onError={(error) => console.error('Error:', error)}
/>
```

## 🪝 Headless Hook Usage

For full control over the UI, use the `useCustomerSupport` hook:

```tsx
import { useCustomerSupport } from '@tarxemo/customer_support';

function CustomChat() {
  const {
    messages,
    sendMessage,
    isLoading,
    error,
    clearError,
    sessionId,
    loadHistory,
    clearHistory
  } = useCustomerSupport({
    apiKey: 'your-api-key',
    baseUrl: 'https://your-api.com/api'
  });

  return (
    <div>
      {messages.map(msg => (
        <div key={msg.id}>
          <strong>{msg.role}:</strong> {msg.content}
        </div>
      ))}
      <button onClick={() => sendMessage('Hello!')}>
        Send
      </button>
    </div>
  );
}
```

## 🔧 Advanced Usage

### Custom Components

You can use individual components for more control:

```tsx
import { ChatWindow, useCustomerSupport } from '@tarxemo/customer_support';

function MyCustomWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, sendMessage, isLoading, error } = useCustomerSupport({
    apiKey: 'your-api-key'
  });

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>Toggle Chat</button>
      {isOpen && (
        <ChatWindow
          messages={messages}
          onSendMessage={sendMessage}
          onClose={() => setIsOpen(false)}
          isLoading={isLoading}
          error={error}
        />
      )}
    </div>
  );
}
```

### Using with Next.js

```tsx
// app/layout.tsx or pages/_app.tsx
'use client'; // For Next.js 13+ App Router

import { CustomerSupportWidget } from '@tarxemo/customer_support';
import '@tarxemo/customer_support/styles';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <CustomerSupportWidget apiKey={process.env.NEXT_PUBLIC_SITEWISE_API_KEY} />
      </body>
    </html>
  );
}
```

## 🔐 Getting an API Key

1. Sign up for SiteWise at your SiteWise instance
2. Register your website
3. Trigger a crawl of your website content
4. Generate an API key for your website
5. Use the API key in the widget configuration

## 🌐 Production Deployment

For production, set the `baseUrl` to your SiteWise API:

```tsx
<CustomerSupportWidget 
  apiKey={process.env.REACT_APP_SITEWISE_API_KEY}
  baseUrl="https://api.yourdomain.com/api"
/>
```

## 📱 Mobile Support

The widget is fully responsive and automatically adjusts to mobile screens:
- On mobile: Chat takes up the full screen
- On desktop: Chat window appears as a floating widget

## ♿ Accessibility

- Full keyboard navigation support
- ARIA labels and roles
- Screen reader compatible
- Focus management
- High contrast support

## 🧪 TypeScript Support

The library is written in TypeScript and includes full type definitions:

```typescript
import type { 
  Message, 
  Source, 
  ThemeConfig,
  CustomerSupportConfig 
} from '@tarxemo/customer_support';
```

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run tests
npm run test

# Type check
npm run type-check
```

## 📄 License

MIT © Tarxemo

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues and questions:
- GitHub Issues: [github.com/tarxemo/customer_support/issues](https://github.com/tarxemo/customer_support/issues)
- Documentation: [Full Documentation](https://github.com/tarxemo/customer_support#readme)

## 🔗 Links

- [NPM Package](https://www.npmjs.com/package/@tarxemo/customer_support)
- [GitHub Repository](https://github.com/tarxemo/customer_support)
- [SiteWise Platform](https://github.com/yourusername/sitewise)

---

Made with ❤️ by Tarxemo
# custom_support
# custom_support
