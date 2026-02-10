# Using Customer Support Widget via CDN

You can easily integrate the Customer Support Widget into any HTML-based project (Django, PHP, static HTML, etc.) without using React directly in your project.

## 1. Include the Required Scripts and Styles

Add the following to your HTML `<head>` or before the closing `</body>` tag:

```html
<!-- 1. Styles -->
<link rel="stylesheet" href="https://unpkg.com/@tarxemo/customer_support/dist/customer_support.css">

<!-- 2. React Dependencies -->
<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>

<!-- 3. Customer Support Widget Bundle -->
<script src="https://unpkg.com/@tarxemo/customer_support/dist/index.umd.js"></script>
```

## 2. Initialize the Widget

Call the `init` function to mount the widget. You can do this at the bottom of your page:

```html
<script>
    document.addEventListener('DOMContentLoaded', function() {
        CustomerSupport.init({
            apiKey: 'YOUR_API_KEY_HERE',
            baseUrl: 'https://api.yoursitewise.com', // Optional: your SiteWise instance URL
            theme: {
                primaryColor: '#2563eb',
                secondaryColor: '#1e40af',
                position: 'bottom-right'
            },
            welcomeMessage: 'Hello! How can we help you today?'
        });
    });
</script>
```

## Django Integration Example

In your Django `base.html`, you can add it like this:

```html
{% load static %}
<!DOCTYPE html>
<html>
<head>
    <!-- ... other head elements ... -->
    <link rel="stylesheet" href="https://unpkg.com/@tarxemo/customer_support/dist/customer_support.css">
</head>
<body>
    <!-- ... your content ... -->

    <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/@tarxemo/customer_support/dist/index.umd.js"></script>
    
    <script>
        CustomerSupport.init({
            apiKey: "{{ SITEWISE_API_KEY }}", // Pass from view or setting
            theme: {
                primaryColor: '#3b82f6'
            }
        });
    </script>
</body>
</html>
```

## Configuration Options

The `init` function accepts the `CustomerSupportConfig` object:

| Option | Type | Description |
| :--- | :--- | :--- |
| `apiKey` | `string` | **Required**. Your SiteWise API key. |
| `baseUrl` | `string` | The API endpoint for the support backend. |
| `theme` | `object` | Customize colors and position (`primaryColor`, `secondaryColor`, `position`). |
| `welcomeMessage` | `string` | Initial message shown when the chat is opened. |
| `containerId` | `string` | Optional. The ID of an existing div to mount the widget into. If not provided, it creates a new one. |
