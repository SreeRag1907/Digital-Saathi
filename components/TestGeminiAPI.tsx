import { geminiService } from '../services/GeminiService';

// Simple test component to verify Gemini API integration
export const TestGeminiAPI = () => {
  const testAPI = async () => {
    try {
      console.log('Testing Gemini API...');
      
      // Test scheme simplification
      const testSchemeText = `
        प्रधानमंत्री किसान सम्मान निधि योजना के तहत छोटे और सीमांत किसानों को 
        सालाना 6000 रुपये की सहायता दी जाती है। यह राशि तीन बराबर किस्तों में 
        सीधे बैंक खाते में ट्रांसफर की जाती है।
      `;
      
      const result = await geminiService.simplifyScheme(testSchemeText);
      console.log('API Test Result:', result);
      
      return result;
    } catch (error) {
      console.error('API Test Failed:', error);
      throw error;
    }
  };

  return testAPI;
};

export default TestGeminiAPI;
