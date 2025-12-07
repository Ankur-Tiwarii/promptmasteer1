import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, style } = await req.json();

    if (!prompt) {
      return new Response(
        JSON.stringify({ error: 'Prompt is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Refining prompt with style: ${style}`);

    // Create style-specific system prompts
    const stylePrompts: Record<string, string> = {
      'cinematic': 'You are an expert at creating cinematic prompts. Transform the user\'s basic prompt into a detailed, cinematic description with lighting, camera angles, atmosphere, and professional photography terms. Make it vivid and visually rich. If this is for image generation, start with "Create an image of" or "Generate an image showing".',
      'professional': 'You are an expert at creating professional prompts. Transform the user\'s basic prompt into a clear, structured, and professional description with proper terminology, constraints, and detailed specifications. If this is for image generation, start with "Create an image of" or "Generate an image showing".',
      'dark-aesthetic': 'You are an expert at creating dark aesthetic prompts. Transform the user\'s basic prompt into a moody, atmospheric description with dark tones, shadows, noir elements, and dramatic contrast. If this is for image generation, start with "Create an image of" or "Generate an image showing".',
      'marketing': 'You are an expert at creating marketing copy prompts. Transform the user\'s basic prompt into compelling marketing language with benefit-driven descriptions, emotional triggers, and persuasive elements. If this is for image generation, start with "Create an image of" or "Generate an image showing".',
      'storytelling': 'You are an expert at creating narrative prompts. Transform the user\'s basic prompt into a story-driven description with character, setting, plot elements, and emotional depth. If this is for image generation, start with "Create an image of" or "Generate an image showing".',
      'ui-ux': 'You are an expert at creating UI/UX design prompts. Transform the user\'s basic prompt into a detailed interface description with user experience considerations, layout specifics, interaction patterns, and design system elements. If this is for image generation, start with "Create an image of" or "Generate an image showing".',
      'video-script': 'You are an expert at creating video script prompts. Transform the user\'s basic prompt into a structured video script with scene descriptions, transitions, pacing, and visual storytelling elements. If this is for image generation, start with "Create an image of" or "Generate an image showing".',
      'image-prompt': 'You are an expert at creating image generation prompts. Transform the user\'s basic prompt into a highly detailed image description with artistic style, composition, lighting, color palette, and technical specifications for AI image generation. Always start with "Create an image of" or "Generate an image showing".',
    };

    const analysisPrompt = 'After providing the refined prompt, add a new paragraph starting with "💡 What was enhanced:" and briefly list 2-4 key improvements you made (e.g., added lighting details, specified composition, enhanced atmosphere, included technical parameters). Be polite and constructive.';

    const systemPrompt = stylePrompts[style] || stylePrompts['cinematic'];

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: `${systemPrompt}\n\n${analysisPrompt}` },
          { role: 'user', content: `Transform this prompt: "${prompt}"` }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI credits exhausted. Please add more credits to continue.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ error: 'Failed to refine prompt' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const refinedPrompt = data.choices[0].message.content.replace(/\*\*/g, '');

    console.log('Prompt refined successfully');

    return new Response(
      JSON.stringify({ refinedPrompt }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in refine-prompt function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
