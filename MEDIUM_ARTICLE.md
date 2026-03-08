# Add AI-Powered Customer Support to Your Website in 5 Minutes with SiteWise

> Transform your website with intelligent chat support that actually understands your content

![AI Chat Support](https://cdn-images-1.medium.com/max/800/1*abc123def456.jpg)

*Image: Modern AI chat interface powered by SiteWise*

## 🎯 The Problem: Static Customer Support Doesn't Cut It Anymore

Your website visitors have questions. Lots of them. They want to know about your services, pricing, features, and policies. But traditional customer support has limitations:

- **24/7 availability** is expensive and hard to maintain
- **Response times** frustrate impatient visitors
- **Knowledge gaps** lead to inconsistent answers
- **Scaling support** grows linearly with your customer base

What if you could provide instant, accurate answers 24/7 that actually understand your website content?

## 🚀 The Solution: SiteWise Customer Support Library

SiteWise is a revolutionary AI-powered customer support platform that combines:

- **Web crawling** of your entire website
- **AI understanding** of your content
- **Intelligent responses** with source attribution
- **Drop-in integration** with any React website

The best part? You can add it to your website in under 5 minutes.

## 🏗️ How SiteWise Works: The Magic Behind the Scenes

Before we dive into implementation, let's understand what makes SiteWise so powerful:

### 1. **Content Ingestion**
SiteWise crawls your entire website, processing every page, blog post, and documentation. It doesn't just scrape text—it understands context, structure, and relationships between content.

### 2. **Vector Embeddings**
Your content is converted into mathematical representations (embeddings) that capture semantic meaning. This allows the AI to understand concepts, not just keywords.

### 3. **Retrieval-Augmented Generation (RAG)**
When a user asks a question, SiteWise:
- Converts the question to an embedding
- Finds the most relevant content chunks
- Provides this context to a large language model
- Generates a response grounded in your actual content

### 4. **Source Attribution**
Every AI response includes links to the exact pages where the information came from, building trust and allowing users to dive deeper.

## 📋 Prerequisites: What You'll Need

Before we start, make sure you have:

- ✅ **React 18+ or 19+** project
- ✅ **Node.js 18+** installed
- ✅ **Access to SiteWise Console** at https://servicesconsole.tarxemo.com
- ✅ **Your website URL** ready to be crawled

## 🎪 Step-by-Step Implementation Guide

### Step 1: Set Up Your SiteWise Account

First, let's get your API key from the SiteWise console.

1. **Visit the Console**: Go to [https://servicesconsole.tarxemo.com](https://servicesconsole.tarxemo.com)

2. **Create Your Account**:
   - Click "Register" and fill in your details
   - Verify your email address
   - Create your organization (e.g., "My Company")

3. **Register Your Website**:
   - Navigate to "Websites" in the console
   - Click "Add Website"
   - Enter your website details:
     ```
     Name: My Company Website
     URL: https://mycompany.com
     ```
   - Submit the form

4. **Crawl Your Website**:
   - On your website card, click "Start Crawl"
   - Wait for the crawl to complete (status: `PENDING` → `CRAWLING` → `READY`)
   - You'll see statistics like pages crawled and chunks created

5. **Generate Your API Key**:
   - Go to "API Keys" section
   - Click "Create API Key"
   - Select your website
   - Set rate limits (optional)
   - **⚠️ IMPORTANT**: Copy the API key immediately—it's shown only once!

### Step 2: Install the Library

Now let's add the library to your React project:

```bash
npm install @tarxemo/customer_support
```

Or with yarn:

```bash
yarn add @tarxemo/customer_support
```

### Step 3: Add the Widget to Your Website

This is where the magic happens! Add the following to your main App component:

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

export default App;
```

And that's it! 🎉 Your website now has AI-powered customer support!

### Step 4: Test It Out

1. Start your development server
2. Open your website in the browser
3. Look for the chat bubble in the bottom-right corner
4. Click it and ask a question about your website content

You should receive an intelligent response with sources linking back to your actual website pages.

## 🎨 Advanced Customization

Want to make the widget match your brand? SiteWise offers extensive customization options:

### Theme Customization

```tsx
<CustomerSupportWidget 
  apiKey="your-api-key"
  theme={{
    primaryColor: '#10b981',        // Your brand color
    secondaryColor: '#059669',      // Accent color
    backgroundColor: '#ffffff',      // Widget background
    textColor: '#1f2937',           // Text color
    fontFamily: 'Inter, sans-serif',  // Your font
    borderRadius: '8px',            // Rounded corners
    userMessageColor: '#10b981',    // User message bubbles
    assistantMessageColor: '#f3f4f6', // AI message bubbles
  }}
/>
```

### Position Options

```tsx
// Choose from four positions
position="bottom-right"  // Default
position="bottom-left"
position="top-right"
position="top-left"
```

### Custom Welcome Message

```tsx
<CustomerSupportWidget 
  apiKey="your-api-key"
  welcomeMessage="Hello! I'm your AI assistant. Ask me anything about our services!"
  placeholder="What would you like to know?"
/>
```

## 🔧 Production Best Practices

### Environment Variables

Never hardcode your API key! Use environment variables:

```tsx
// .env file
VITE_SITEWISE_API_KEY=your-production-api-key

// In your component
<CustomerSupportWidget 
  apiKey={import.meta.env.VITE_SITEWISE_API_KEY || 'fallback-key'}
/>
```

### Framework-Specific Examples

**Next.js:**
```tsx
// .env.local
NEXT_PUBLIC_SITEWISE_API_KEY=your-api-key

// app/layout.tsx
'use client';
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

**Create React App:**
```tsx
// .env
REACT_APP_SITEWISE_API_KEY=your-api-key

// App.js
<CustomerSupportWidget apiKey={process.env.REACT_APP_SITEWISE_API_KEY} />
```

## 🎯 Real-World Use Cases

### E-commerce Websites
```tsx
<CustomerSupportWidget 
  welcomeMessage="Need help with orders, returns, or product info? I'm here to help!"
  placeholder="Ask about shipping, sizing, availability..."
/>
```

### SaaS Platforms
```tsx
<CustomerSupportWidget 
  welcomeMessage="Questions about features, pricing, or integration? Let me assist you!"
  placeholder="How can I help with your software needs?"
/>
```

### Educational Platforms
```tsx
<CustomerSupportWidget 
  welcomeMessage="Welcome to our learning platform! How can I support your education journey?"
  placeholder="Ask about courses, certificates, or learning resources..."
/>
```

## 📊 The Results: What You Can Expect

After implementing SiteWise, you'll typically see:

- **90%+ reduction** in response time
- **24/7 availability** without additional staff
- **85%+ accuracy** in answering questions about your content
- **Increased user engagement** and satisfaction
- **Reduced support ticket volume** for common questions

## 🚀 Advanced Features

### Custom Chat Interface

For complete control, use the headless hook:

```tsx
import { useCustomerSupport } from '@tarxemo/customer_support';

function CustomChat() {
  const {
    messages,
    sendMessage,
    isLoading,
    error,
    sessionId
  } = useCustomerSupport({
    apiKey: 'your-api-key'
  });

  return (
    <div className="custom-chat">
      {messages.map(msg => (
        <div key={msg.id} className={msg.role}>
          <strong>{msg.role}:</strong> {msg.content}
          {msg.sources && (
            <div className="sources">
              {msg.sources.map((source, i) => (
                <a key={i} href={source.url}>{source.title}</a>
              ))}
            </div>
          )}
        </div>
      ))}
      {isLoading && <div>AI is thinking...</div>}
      <input 
        type="text" 
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            sendMessage(e.currentTarget.value);
            e.currentTarget.value = '';
          }
        }}
        placeholder="Ask a question..."
      />
    </div>
  );
}
```

### Event Tracking

Monitor user engagement:

```tsx
<CustomerSupportWidget 
  apiKey="your-api-key"
  onMessageSent={(message) => {
    analytics.track('Chat Message Sent', {
      messageLength: message.length,
      timestamp: new Date().toISOString()
    });
  }}
  onMessageReceived={(response, sources) => {
    analytics.track('Chat Response Received', {
      responseLength: response.length,
      sourceCount: sources?.length || 0
    });
  }}
  onError={(error) => {
    analytics.track('Chat Error', {
      errorMessage: error.message
    });
  }}
/>
```

## 🔍 Troubleshooting Common Issues

### Widget Not Appearing
- Check browser console for errors
- Verify API key is correct and active
- Ensure styles are imported: `import '@tarxemo/customer_support/styles'`

### API Key Not Working
- Verify the key is copied correctly (no extra spaces)
- Check the key is active in the SiteWise console
- Ensure website crawl is completed (status: READY)

### No Responses
- Check network tab for failed requests
- Verify rate limits haven't been exceeded
- Check if backend service is operational

## 🎈 The Future of Customer Support

SiteWise represents a fundamental shift in how we think about customer support:

- **From reactive to proactive**: Answer questions before users ask them
- **From human-dependent to AI-augmented**: Scale support without linear cost increases
- **From generic to personalized**: Responses grounded in your specific content
- **From 9-to-5 to 24/7**: Always-on support without burnout

## 🎉 You Did It!

You've successfully implemented AI-powered customer support on your website! Your visitors can now:

- Get instant answers about your products and services
- Explore your content through natural conversation
- Receive accurate information with source attribution
- Enjoy a modern, engaging chat experience

The best part? This is just the beginning. As you update your website content, SiteWise automatically learns and improves its responses.

## 📚 Next Steps

1. **Monitor Analytics**: Track user questions and engagement
2. **Update Content Regularly**: Keep your knowledge base fresh
3. **Gather Feedback**: Ask users about their chat experience
4. **Scale Up**: Consider multiple widgets for different sections
5. **Stay Updated**: Watch for new features and improvements

## 🔗 Resources

- **SiteWise Console**: https://servicesconsole.tarxemo.com
- **NPM Package**: https://www.npmjs.com/package/@tarxemo/customer_support
- **GitHub Repository**: https://github.com/tarxemo/customer_support
- **Documentation**: Complete API reference and guides

---

*Ready to transform your website with AI-powered support? Get started today at [https://servicesconsole.tarxemo.com](https://servicesconsole.tarxemo.com) and join the future of customer engagement!*

---

**About the Author**: This article was written to help developers implement modern AI customer support solutions. SiteWise is developed by Tarxemo, a team passionate about making AI accessible and useful for businesses of all sizes.

*Have questions or success stories to share? Drop them in the comments below!*
