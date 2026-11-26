<<<<<<< HEAD
/// <reference types="vite/client" />
=======
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
>>>>>>> 6154d29 (feat: add Vite environment type definitions for API and Supabase configuration)
