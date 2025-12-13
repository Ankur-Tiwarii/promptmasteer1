import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Create a mock client that won't throw errors
const mockClient = {
  from: () => ({ 
    select: () => Promise.resolve({ data: [], error: null }),
    insert: () => ({ select: () => Promise.resolve({ data: null, error: null }) }),
    update: () => ({ select: () => Promise.resolve({ data: null, error: null }) }),
    delete: () => Promise.resolve({ data: null, error: null }),
    eq: () => ({ single: () => Promise.resolve({ data: null, error: null }) }),
  }),
  auth: { 
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signUp: () => Promise.resolve({ data: null, error: null }),
    signIn: () => Promise.resolve({ data: null, error: null }),
  },
}

let supabase: any = mockClient

try {
  // Only create client if valid credentials are provided
  if (supabaseUrl && supabaseAnonKey && 
      supabaseUrl.startsWith('https://') && 
      supabaseUrl !== 'your_supabase_project_url' &&
      supabaseAnonKey !== 'your_supabase_anon_key') {
    supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
  }
} catch (error) {
  console.warn('Supabase not configured, using mock client:', error)
  supabase = mockClient
}

export { supabase }