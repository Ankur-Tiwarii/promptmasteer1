-- Create prompt_history table
CREATE TABLE IF NOT EXISTS public.prompt_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  user_prompt TEXT NOT NULL,
  refined_prompt TEXT NOT NULL,
  enhancements TEXT[] DEFAULT ARRAY[]::TEXT[],
  style TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.prompt_history ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own prompt history" 
ON public.prompt_history 
FOR SELECT 
USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can create their own prompt history" 
ON public.prompt_history 
FOR INSERT 
WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can delete their own prompt history" 
ON public.prompt_history 
FOR DELETE 
USING (auth.uid() = user_id OR user_id IS NULL);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_prompt_history_user_id ON public.prompt_history(user_id);
CREATE INDEX IF NOT EXISTS idx_prompt_history_timestamp ON public.prompt_history(timestamp DESC);

