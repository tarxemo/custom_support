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

### Step 1: Get Your API Key

Before using the library, you need to set up your website in the SiteWise console:

1. **Visit the Console**: Go to [https://servicesconsole.tarxemo.com](https://servicesconsole.tarxemo.com)
2. **Sign Up**: Create a new account and verify your email
3. **Create Organization**: You'll be prompted to create an organization (e.g., "My Company")
4. **Add Your Website**:
   - Navigate to "Websites" in the console
   - Click "Add Website"
   - Enter your website name and URL (e.g., "https://mycompany.com")
   - Submit the form
5. **Crawl Your Website**:
   - On your website card, click "Start Crawl"
   - Wait for the crawl to complete (status: `PENDING` → `CRAWLING` → `READY`)
6. **Generate API Key**:
   - Go to "API Keys" section
   - Click "Create API Key"
   - Select your website and set rate limits
   - **Copy the API key immediately** (shown only once!)

### Step 2: Install the Library

```bash
npm install @tarxemo/customer_support
```

or with yarn:

```bash
yarn add @tarxemo/customer_support
```

### Step 3: Add to Your React App

```tsx
import { CustomerSupportWidget } from '@tarxemo/customer_support';
import '@tarxemo/customer_support/styles';

function App() {
  return (
    <div>
      <h1>My Website</h1>
      {/* Your existing content */}
      
      <CustomerSupportWidget 
        apiKey="your-sitewise-api-key-here"
        position="bottom-right"
        theme={{
          primaryColor: '#6366f1',
          secondaryColor: '#8b5cf6',
          backgroundColor: '#ffffff',
          textColor: '#1f2937',
          borderRadius: '16px',
        }}
        welcomeMessage="Welcome! How can we help you today?"
        placeholder="Ask us anything about our products or services..."
      />
    </div>
  );
}
```

That's it! The chat widget will appear in the bottom-right corner of your page, ready to answer questions about your website content.

## 📖 API Reference

### CustomerSupportWidget Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `apiKey` | `string` | **required** | Your SiteWise API key |
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

### Using Environment Variables for API Key

```tsx
<CustomerSupportWidget 
  apiKey={import.meta.env.VITE_SITEWISE_API_KEY || 'fallback-key'}
  position="bottom-right"
  theme={{
    primaryColor: '#6366f1',
    secondaryColor: '#8b5cf6',
    backgroundColor: '#ffffff',
    textColor: '#1f2937',
    borderRadius: '16px',
  }}
  welcomeMessage="Welcome to your website! How can we help you today?"
  placeholder="Ask us anything about our products or services..."
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

Follow these steps to get your API key from the SiteWise console:

### 1. Create Your Account
1. Visit **[https://servicesconsole.tarxemo.com](https://servicesconsole.tarxemo.com)**
2. Click **"Register"** and create your account
3. Verify your email address

### 2. Set Up Your Organization
- After registration, you'll be automatically prompted to create an organization
- Enter your organization name (e.g., "My Company")
- Click **"Create Organization"**

### 3. Register Your Website
1. Navigate to the **"Websites"** section in the console
2. Click **"Add Website"**
3. Fill in the details:
   - **Name**: Your website name (e.g., "My Company Website")
   - **URL**: Your website base URL (e.g., "https://mycompany.com")
   - **Crawl Settings**: Keep defaults for now
4. Click **"Submit"**

### 4. Crawl Your Website
1. On your website card, click **"Start Crawl"**
2. Wait for the crawl to complete (status will change from `PENDING` → `CRAWLING` → `READY`)
3. You'll see statistics like pages crawled and chunks created

### 5. Generate API Key
1. Navigate to the **"API Keys"** section
2. Click **"Create API Key"**
3. Select your website from the dropdown
4. Set a rate limit (optional, default: 100 requests/minute)
5. Click **"Generate"**
6. **⚠️ IMPORTANT**: Copy the API key immediately - it's shown only once!

### 6. Test Your API Key
```bash
curl -X POST https://api.tarxemo.com/api/chat/ \
  -H "X-API-Key: YOUR_API_KEY_HERE" \
  -H "Content-Type: application/json" \
  -d '{"question": "What services do you offer?"}'
```

Once you have your API key, you can use it in the widget configuration as shown in the Quick Start section.

## 🌐 Production Deployment

For production deployment, always use environment variables for your API key:

### React (Create React App)
```tsx
// .env file
REACT_APP_SITEWISE_API_KEY=your-production-api-key

// In your component
<CustomerSupportWidget 
  apiKey={process.env.REACT_APP_SITEWISE_API_KEY}
/>
```

### Next.js
```tsx
// .env.local file
NEXT_PUBLIC_SITEWISE_API_KEY=your-production-api-key

// In your component
<CustomerSupportWidget 
  apiKey={process.env.NEXT_PUBLIC_SITEWISE_API_KEY}
/>
```

### Vite
```tsx
// .env file
VITE_SITEWISE_API_KEY=your-production-api-key

// In your component
<CustomerSupportWidget 
  apiKey={import.meta.env.VITE_SITEWISE_API_KEY}
/>
```

### Production Checklist
- [ ] Use environment variables for API keys (never hardcode)
- [ ] Test with your production API key
- [ ] Verify your website crawl is completed in the console
- [ ] Monitor API usage and rate limits
- [ ] Test on mobile devices
- [ ] Check console for any errors

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

- **NPM Package**: https://www.npmjs.com/package/@tarxemo/customer_support
- **GitHub Repository**: https://github.com/tarxemo/customer_support
- **SiteWise Console**: https://servicesconsole.tarxemo.com
- **API Documentation**: Available in the SiteWise console after login
- **User Guide**: Complete step-by-step integration guide
- **Developer Guide**: Advanced API reference and customization

---

Made with ❤️ by Tarxemo
