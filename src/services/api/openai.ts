import OpenAI from 'openai';
import { tokenManager } from '@/services/security/tokenManager';
import { rateLimiter } from '@/services/security/rateLimit';
import { InputSanitizer } from '@/services/security/sanitization';
import { env } from '@/config/env';

const OPENAI_RATE_LIMIT_KEY = 'openai-api';

class OpenAIService {
  private openai: OpenAI;

  constructor() {
    if (!env.OPENAI_API_KEY) {
      throw new Error('OpenAI API key not found in environment variables');
    }

    this.openai = new OpenAI({
      apiKey: env.OPENAI_API_KEY,
      dangerouslyAllowBrowser: env.IS_DEV // Solo para desarrollo
    });
  }

  private checkRateLimit() {
    if (rateLimiter.isRateLimited(OPENAI_RATE_LIMIT_KEY)) {
      throw new Error('Rate limit exceeded. Please try again later.');
    }
  }

  async chat(messages: { role: 'user' | 'assistant'; content: string }[]): Promise<{ role: 'assistant'; content: string }> {
    this.checkRateLimit();
    
    // Sanitizar el input
    const sanitizedMessages = messages.map(message => ({ ...message, content: InputSanitizer.sanitizeText(message.content, 1000) }));

    try {
      const completion = await this.openai.chat.completions.create({
        messages: sanitizedMessages,
        model: "gpt-3.5-turbo",
      });

      return completion.choices[0]?.message || { role: 'assistant', content: '' };
    } catch (error) {
      console.error('Error in chat service:', error);
      throw new Error('Failed to generate response');
    }
  }

  async generateImage(prompt: string): Promise<{ url: string; alt: string }> {
    this.checkRateLimit();
    
    // Sanitizar el input
    const sanitizedPrompt = InputSanitizer.sanitizeText(prompt, 1000);

    try {
      const response = await this.openai.images.generate({
        prompt: sanitizedPrompt,
        n: 1,
        size: "1024x1024",
      });

      return {
        url: response.data[0]?.url || '',
        alt: sanitizedPrompt
      };
    } catch (error) {
      console.error('Error generating image:', error);
      throw new Error('Failed to generate image');
    }
  }

  async analyzeText(text: string) {
    this.checkRateLimit();
    
    // Sanitizar el input
    const sanitizedText = InputSanitizer.sanitizeText(text, 1000);

    try {
      const completion = await this.openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "Analyze the following text and provide insights:"
          },
          {
            role: "user",
            content: sanitizedText
          }
        ],
        model: "gpt-3.5-turbo",
      });
      
      return completion.choices[0]?.message || { role: 'assistant', content: '' };
    } catch (error) {
      console.error('Error in text analysis service:', error);
      throw new Error('Failed to analyze text');
    }
  }
}

export const openAIService = new OpenAIService();
