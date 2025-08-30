import { getAccessToken } from "@/lib/actions/auth";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: ['auth', 'users', 'flash-cards', 'topics', 'plans', 'signatures'],
  endpoints: () => ({}),
  baseQuery: fetchBaseQuery({
    baseUrl,
    credentials: 'include',
    mode: 'cors',
    prepareHeaders: async (headers, { endpoint }) => {
      // Headers básicos sempre presentes
      headers.set('Content-Type', 'application/json');
      headers.set('Accept', 'application/json');
      
      try {
        const token = await getAccessToken();

        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
      } catch (error) {
        console.warn('Erro ao obter token:', error);
      }

      // Log para debug em desenvolvimento
      if (process.env.NODE_ENV === 'development') {
        console.log(`🌐 API Request: ${endpoint}`, {
          headers: Object.fromEntries(headers.entries()),
          baseUrl
        });
      }

      return headers;
    },
    // Retry logic para requisições GET que falharam por CORS
    fetchFn: async (input, init) => {
      try {
        const response = await fetch(input, init);
        
        // Se for erro de CORS e for uma requisição GET, tenta novamente sem credentials
        if (!response.ok && init?.method === 'GET' && response.type === 'opaque') {
          console.warn('🔄 Tentando GET sem credentials devido a CORS...');
          return fetch(input, {
            ...init,
            credentials: 'omit'
          });
        }
        
        return response;
      } catch (error) {
        if (error instanceof TypeError && error.message.includes('CORS')) {
          console.error('❌ Erro de CORS detectado:', error);
        }
        throw error;
      }
    }
  }),
});