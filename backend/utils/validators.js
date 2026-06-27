export const validateEnv = () => {
  const requiredEnvs = ['GEMINI_API_KEY', 'JWT_SECRET'];
  
  for (const env of requiredEnvs) {
    if (!process.env[env]) {
      throw new Error(`Missing required environment variable: ${env}`);
    }
  }
};

export const validateUserInput = (text) => {
  if (!text || typeof text !== 'string') {
    throw new Error('Invalid input: text must be a non-empty string');
  }
  if (text.length > 5000) {
    throw new Error('Input too long: maximum 5000 characters');
  }
  return text.trim();
};

export const validateTransactionData = (data) => {
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid transaction data');
  }
  return data;
};
