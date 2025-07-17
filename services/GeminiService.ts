// GramSetu Gemini API Integration Service
// Implements the AI features as specified in the technical blueprint

interface GeminiConfig {
  apiKey: string;
  baseUrl: string;
  model: string;
}

interface CropDiagnosisRequest {
  imageBase64: string;
  location: string;
  cropType: string;
}

interface CropDiagnosisResponse {
  disease_name: string;
  confidence_score: number;
  organic_treatments: string[];
  chemical_treatments: string[];
  prevention_tips: string[];
}

interface SchemeSimplificationResponse {
  summary_en: string;
  summary_hi: string;
}

export class GeminiService {
  private config: GeminiConfig;

  constructor(config: GeminiConfig) {
    this.config = config;
  }

  /**
   * AI-Powered Crop Diagnostics using Gemini 1.5 Pro
   * Implements multimodal prompt engineering as per Section 3.1
   */
  async diagnoseCrop(request: CropDiagnosisRequest): Promise<CropDiagnosisResponse> {
    const prompt = this.buildCropDiagnosisPrompt(request.location, request.cropType);
    
    const payload = {
      contents: [
        {
          parts: [
            {
              text: prompt
            },
            {
              inline_data: {
                mime_type: "image/jpeg",
                data: request.imageBase64
              }
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.1, // Low temperature for consistent, factual responses
        topK: 1,
        topP: 0.8,
        maxOutputTokens: 1024,
        responseMimeType: "application/json"
      }
    };

    try {
      const response = await fetch(
        `${this.config.baseUrl}/v1beta/models/${this.config.model}:generateContent`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': this.config.apiKey,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      const result = JSON.parse(data.candidates[0].content.parts[0].text);
      
      return result;
    } catch (error) {
      console.error('Crop diagnosis error:', error);
      throw new Error('फसल निदान में त्रुटि हुई। कृपया दोबारा कोशिश करें।');
    }
  }

  /**
   * Government Scheme Simplification using Gemini
   * Implements text simplification as per Section 3.2
   */
  async simplifyScheme(schemeText: string): Promise<SchemeSimplificationResponse> {
    const prompt = `Act as an expert communicator who simplifies complex government documents for rural Indian citizens. The target audience has basic literacy and needs clear, actionable information.

Here is the official document for a government scheme:

${schemeText}

Your task is to process this document and return a single, valid JSON object. The JSON object must contain two keys: 'summary_en' and 'summary_hi'.

For the 'summary_en' value, provide a summary in simple English, structured with the following five headings:
1. **Who can get this?** (Eligibility)
2. **What will you get?** (Benefits)
3. **How to apply?** (Step-by-step process)
4. **What papers do you need?** (Required Documents)
5. **Important things to remember.** (Key points)

For the 'summary_hi' value, translate the simple English summary into simple, conversational Hindi. Do not use formal or difficult 'sarkari' Hindi words. Use words that are commonly understood in a village.

Ensure the final output is only the JSON object and nothing else.`;

    const payload = {
      contents: [
        {
          parts: [
            {
              text: prompt
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.2,
        topK: 1,
        topP: 0.8,
        maxOutputTokens: 2048,
        responseMimeType: "application/json"
      }
    };

    try {
      const response = await fetch(
        `${this.config.baseUrl}/v1beta/models/${this.config.model}:generateContent`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': this.config.apiKey,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      const result = JSON.parse(data.candidates[0].content.parts[0].text);
      
      return result;
    } catch (error) {
      console.error('Scheme simplification error:', error);
      throw new Error('योजना सरलीकरण में त्रुटि हुई। कृपया दोबारा कोशिश करें।');
    }
  }

  /**
   * OCR Text Interpretation using Gemini
   * Implements product information extraction as per Section 3.3
   */
  async interpretOCRText(extractedText: string): Promise<string> {
    const prompt = `The following text was extracted from a bag of fertilizer using OCR: '${extractedText}'.

You are an agricultural assistant. Based on this text, answer the following questions in simple Hindi:
1. What is the name of this product?
2. What crops is it good for?
3. How much should be used per acre for a wheat crop?
4. What are the main safety warnings?

Return the answers in a clear, point-by-point format.`;

    const payload = {
      contents: [
        {
          parts: [
            {
              text: prompt
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.3,
        topK: 1,
        topP: 0.8,
        maxOutputTokens: 1024
      }
    };

    try {
      const response = await fetch(
        `${this.config.baseUrl}/v1beta/models/${this.config.model}:generateContent`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': this.config.apiKey,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('OCR interpretation error:', error);
      throw new Error('उत्पाद जानकारी में त्रुटि हुई। कृपया दोबारा कोशिश करें।');
    }
  }

  private buildCropDiagnosisPrompt(location: string, cropType: string): string {
    return `You are an expert agronomist specializing in Indian agriculture. A farmer from ${location} has sent you a photo of their ${cropType} crop that appears to have some issues.

Please analyze this image carefully and provide a comprehensive diagnosis. Consider the specific growing conditions, common diseases, and pests typical to ${location} region.

Return your response as a valid JSON object with exactly these keys:
{
  "disease_name": "Name of the disease or pest issue in Hindi",
  "confidence_score": "Your confidence level as a number between 0-100",
  "organic_treatments": ["List of 3-4 organic/natural treatment options available in India"],
  "chemical_treatments": ["List of 2-3 chemical treatment options available in Indian markets"],
  "prevention_tips": ["List of 3-4 prevention tips for future crops"]
}

Focus on treatments and solutions that are:
- Easily available in rural Indian markets
- Cost-effective for small farmers
- Suitable for the ${location} climate
- Include both traditional and modern approaches

Ensure all text in the JSON is in simple Hindi that a village farmer can understand.`;
  }
}

// Singleton instance for app-wide use
export const geminiService = new GeminiService({
  apiKey: process.env.EXPO_PUBLIC_GEMINI_API_KEY || '',
  baseUrl: 'https://generativelanguage.googleapis.com',
  model: 'gemini-2.0-flash'
});