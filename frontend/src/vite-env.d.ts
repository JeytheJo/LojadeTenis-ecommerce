<<<<<<< HEAD
/// <reference types="vite/client" />
=======
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: 'http://localhost:3000/api'
  readonly VITE_SUPABASE_URL: 'https://spexhbkmtwefjofvvgvq.supabase.co'
  readonly VITE_SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwZXhoYmttdHdlZmpvZnZ2Z3ZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQzNTQ3MjksImV4cCI6MjEwOTkzMDcyOX0.AyN3jWHfrsj0KrG6nBhE2k7OHjBfI3Es8jAcvcx-0BA'
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
>>>>>>> 6154d29 (feat: add Vite environment type definitions for API and Supabase configuration)
