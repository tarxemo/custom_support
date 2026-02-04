# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-02-04

### Added
- Initial release of @tarxemo/customer_support
- CustomerSupportWidget component with floating chat button
- ChatWindow, ChatMessage, and ChatInput sub-components
- useCustomerSupport headless hook for custom implementations
- Full TypeScript support with type definitions
- SiteWise API integration with axios client
- Session management with localStorage persistence
- Source attribution display for AI responses
- Customizable theming via CSS variables
- Position configuration (bottom-right, bottom-left, top-right, top-left)
- Mobile-responsive design
- Accessibility features (ARIA labels, keyboard navigation)
- Premium UI with animations and gradients
- Error handling and loading states
- Conversation history support
- Event callbacks (onMessageSent, onMessageReceived, onError)

### Features
- Drop-in integration with single component
- AI-powered responses via SiteWise RAG pipeline
- Real-time chat interface
- Message persistence across page reloads
- Auto-scroll to latest messages
- Typing indicators
- Source links with similarity scores
- Custom welcome messages and placeholders

### Documentation
- Comprehensive README with examples
- API reference documentation
- TypeScript type definitions
- Usage examples for React, Next.js, and headless implementations
