import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";

// Base query com interceptador de erros aprimorado
export const baseQueryWithInterceptor = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  prepareHeaders: async (headers) => {
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');
    
    // Log para debug
    if (process.env.NODE_ENV === 'development') {
      console.log('🌐 API Headers:', Object.fromEntries(headers.entries()));
      console.log('🌐 API Base URL:', process.env.NEXT_PUBLIC_API_URL);
    }
    
    return headers;
  },
  credentials: 'include',
});

export const baseQueryWithAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQueryWithInterceptor(args, api, extraOptions);
  
  // Log para debug de erros
  if (result.error) {
    console.error('❌ API Error:', {
      status: result.error.status,
      data: result.error.data,
      url: typeof args === 'string' ? args : args.url,
      method: typeof args === 'string' ? 'GET' : args.method || 'GET'
    });
    
    // Se for erro de CORS, mostra informações específicas
    if (result.error.status === 'FETCH_ERROR') {
      console.error('🚫 CORS Error detected. Check:', {
        backendUrl: process.env.NEXT_PUBLIC_API_URL,
        frontendUrl: typeof window !== 'undefined' ? window.location.origin : 'SSR',
        error: result.error
      });
    }
  } else if (process.env.NODE_ENV === 'development') {
    console.log('✅ API Success:', typeof args === 'string' ? args : args.url);
  }
  
  return result;
};
