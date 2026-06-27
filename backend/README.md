# FIN TEX AI Backend

Premium FinTech AI Assistant backend powered by Google Gemini API.

## 🚀 Features

- ✅ **Google Gemini Integration** - Advanced AI financial analysis
- ✅ **PDF Processing** - Extract data from bank statements
- ✅ **Excel Processing** - Analyze financial spreadsheets
- ✅ **JWT Authentication** - Secure token-based access
- ✅ **Rate Limiting** - DDoS protection
- ✅ **CORS Protection** - Cross-origin security
- ✅ **File Upload Security** - Memory storage, type validation
- ✅ **Transaction Analysis** - AI-powered spending insights
- ✅ **Chat Interface** - Conversational AI assistant

## 📋 Prerequisites

- Node.js 16+
- npm or yarn
- Google Gemini API Key ([Get it here](https://aistudio.google.com/app/apikey))

## 🔧 Installation

```bash
cd backend
npm install
```

## ⚙️ Configuration

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Fill in your environment variables:
```env
GEMINI_API_KEY=your_api_key_here
JWT_SECRET=your_secret_key_here
PORT=3000
```

## 🏃 Running

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/token` - Get JWT token

### AI Services
- `POST /api/ai/analyze-transactions` - Analyze spending patterns
- `POST /api/ai/advice` - Get personalized financial advice
- `POST /api/ai/chat` - Chat with AI assistant

### Document Processing
- `POST /api/documents/process-statement` - Process bank statements (PDF/XLS)

## 🔒 Security Features

- **JWT Authentication** - Token-based access control
- **Rate Limiting** - 100 requests per 15 minutes per IP
- **CORS Protection** - Whitelist allowed origins
- **Helmet** - HTTP headers security
- **File Validation** - Only PDF and Excel files accepted
- **Memory Storage** - Files not persisted to disk
- **Input Validation** - All user inputs validated
- **Environment Variables** - Secrets never in code

## 📚 Future Bank API Integration

The backend is prepared for direct bank API integration:
- `/api/banks/connect` - Connect to bank account
- `/api/banks/sync-transactions` - Sync real transactions
- `/api/banks/get-accounts` - List connected accounts

## 🤝 Contributing

Feel free to submit issues and enhancement requests!
