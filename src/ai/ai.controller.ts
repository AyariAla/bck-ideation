import { Controller, Post, Body } from '@nestjs/common';
import { OpenaiService } from '../openai/openai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly openaiService: OpenaiService) {}

  @Post('step')
  async runStep(@Body() body: { idea: string; step: string }) {
    const { idea, step } = body;
    const result = await this.openaiService.getStepResponse(idea, step);
    return { result };
  }
}
// This controller handles incoming requests to the /ai/step endpoint.
// It expects a POST request with a JSON body containing the startup idea and step.
// The runStep method calls the OpenaiService to get a response based on the provided idea and step.
// It then returns the result in a JSON format.
