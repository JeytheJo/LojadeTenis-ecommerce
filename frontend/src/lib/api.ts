import axios from 'axios';
import { supabase } from './supabase';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(async (config) => {
  const { data } = await supabase.auth.getSession();
  if (data.session) {
    config.headers.Authorization = `Bearer ${data.session.access_token}`;
  }

  // sessão anônima para o histórico do Redis
  let sessionId = localStorage.getItem('kicks_session_id');
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem('kicks_session_id', sessionId);
  }
  config.headers['X-Session-Id'] = sessionId;

  return config;
});