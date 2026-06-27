import { GoogleGenerativeAI } from '@google/generative-ai';
import pdfParse from 'pdfparse';
import XLSX from 'xlsx';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

// Analyze financial transactions with AI
export const analyzeTransactions = async (transactions) => {
  const prompt = `You are a professional financial advisor. Analyze these transactions and provide:
1. Spending patterns
2. Budget recommendations
3. Risk alerts
4. Financial karma impact

Transactions:
${JSON.stringify(transactions, null, 2)}

Provide response in Russian language with actionable insights.`;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('Gemini API error:', error);
    throw new Error('Failed to analyze transactions');
  }
};

// Generate personalized financial advice
export const generateFinancialAdvice = async (userProfile, recentTransactions) => {
  const prompt = `You are FIN TEX AI, a premium financial assistant for Kyrgyzstan market.

User Financial Profile:
${JSON.stringify(userProfile, null, 2)}

Recent Transactions:
${JSON.stringify(recentTransactions.slice(0, 10), null, 2)}

Provide personalized financial advice in Russian:
- 1 main recommendation
- 2-3 specific action items
- Impact on Financial Karma (КИБ Ишеним)

Keep response concise (max 200 words).`;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('Gemini API error:', error);
    throw new Error('Failed to generate advice');
  }
};

// Process PDF document (bank statements, invoices)
export const processPdfDocument = async (fileBuffer) => {
  try {
    const data = await pdfParse(fileBuffer);
    const text = data.text;

    const prompt = `Extract and analyze this bank/financial document:

Content:
${text}

Provide in JSON format:
{
  "documentType": "type",
  "transactions": [],
  "totalAmount": "amount",
  "dateRange": "range",
  "summary": "summary"
}`;

    const result = await model.generateContent(prompt);
    return JSON.parse(result.response.text());
  } catch (error) {
    console.error('PDF processing error:', error);
    throw new Error('Failed to process PDF document');
  }
};

// Process Excel document (financial reports, transaction history)
export const processExcelDocument = async (fileBuffer) => {
  try {
    const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    const prompt = `Analyze this financial spreadsheet data:

Data:
${JSON.stringify(jsonData.slice(0, 20), null, 2)}

Provide:
1. Key financial metrics
2. Trends identified
3. Anomalies or concerns
4. Recommendations for better tracking

Respond in Russian language.`;

    const result = await model.generateContent(prompt);
    return {
      data: jsonData,
      analysis: result.response.text()
    };
  } catch (error) {
    console.error('Excel processing error:', error);
    throw new Error('Failed to process Excel document');
  }
};

// Chat-like interaction for financial questions
export const chatWithAI = async (userMessage, conversationHistory = []) => {
  const systemPrompt = `You are FIN TEX AI, a premium financial assistant specialized in Kyrgyz market.
You help users with:
- Transaction analysis
- Budget planning
- Financial literacy
- Risk assessment
- Crypto/Investment advice (when applicable)

Always respond in Russian unless asked otherwise.
Be concise, professional, and provide actionable advice.`;

  try {
    const chat = model.startChat();
    
    // Add conversation history
    for (const msg of conversationHistory) {
      await chat.sendMessage(msg.role === 'user' ? msg.content : `Assistant: ${msg.content}`);
    }

    const result = await chat.sendMessage(userMessage);
    return result.response.text();
  } catch (error) {
    console.error('Chat error:', error);
    throw new Error('Failed to process chat message');
  }
};
