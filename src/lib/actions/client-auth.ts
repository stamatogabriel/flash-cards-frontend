import { useSession } from "next-auth/react";

// Hook para obter o token no lado cliente
export const useAccessToken = () => {
  const { data: session } = useSession();
  return session?.access_token || null;
};

// Função para obter token do cliente (sem server actions)
export const getClientAccessToken = () => {
  if (typeof window === 'undefined') return null;
  
  // Tenta obter o token do sessionStorage como fallback
  try {
    const sessionData = sessionStorage.getItem('next-auth.session-token');
    if (sessionData) {
      return JSON.parse(sessionData)?.access_token || null;
    }
  } catch (error) {
    console.warn('Erro ao obter token do sessionStorage:', error);
  }
  
  return null;
};
