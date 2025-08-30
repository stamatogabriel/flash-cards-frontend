import { useEffect } from 'react';
import { testCorsConnection } from '@/lib/cors-debug';

export const useCorsTest = () => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_API_URL) {
      // Aguarda 2 segundos após o carregamento para testar
      const timer = setTimeout(() => {
        testCorsConnection(process.env.NEXT_PUBLIC_API_URL!);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, []);
};
