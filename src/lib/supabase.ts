import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://miyhogcslmxibcacvhvz.supabase.co'
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseAnonKey) {
  throw new Error('Missing Supabase Anon Key')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey) 