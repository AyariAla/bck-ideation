import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class OpenaiService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async getStepResponse(idea: string, step: string): Promise<string> {
    const messages: OpenAI.ChatCompletionMessageParam[] = [
      { role: 'system', content: 'You are a startup ideation assistant.' },
      { role: 'user', content: `Startup Idea: ${idea}` },
      { role: 'user', content: `Step: ${step}` },
    ];

    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini', // try different models later ?
        messages,
      });
      return completion.choices[0]?.message?.content ?? 'No response';
    } catch (error) {
      console.error('OpenAI API error:', error);
      return 'There was an error processing your request.';
    }
  }
}

// This service uses OpenAI's API to get a response based on the startup idea and step provided.
// The getStepResponse method constructs a message array with the system and user prompts,
// sends it to the OpenAI API, and returns the response content.
// Make sure to handle errors and edge cases in a real-world application.
// You might also want to consider rate limiting and caching responses for better performance.
