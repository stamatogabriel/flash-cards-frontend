// Utilitário para testar CORS e debug
export const testCorsConnection = async (baseUrl: string) => {
  console.log('🧪 Testando conexão CORS...');
  
  try {
    // Teste 1: Health check simples
    const healthResponse = await fetch(`${baseUrl}/health`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
    
    if (healthResponse.ok) {
      const data = await healthResponse.json();
      console.log('✅ Health check passou:', data);
    } else {
      console.error('❌ Health check falhou:', healthResponse.status);
    }
    
    // Teste 2: Preflight test
    const preflightResponse = await fetch(`${baseUrl}/api/v1/users`, {
      method: 'OPTIONS',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Access-Control-Request-Method': 'GET',
        'Access-Control-Request-Headers': 'authorization,content-type',
        'Origin': window.location.origin
      }
    });
    
    console.log('🔍 Preflight response:', {
      status: preflightResponse.status,
      headers: Object.fromEntries(preflightResponse.headers.entries())
    });
    
    return true;
  } catch (error) {
    console.error('❌ Erro no teste de CORS:', error);
    return false;
  }
};

// Função para debug de headers de resposta
export const debugCorsHeaders = (response: Response) => {
  const corsHeaders = {
    'access-control-allow-origin': response.headers.get('access-control-allow-origin'),
    'access-control-allow-credentials': response.headers.get('access-control-allow-credentials'),
    'access-control-allow-methods': response.headers.get('access-control-allow-methods'),
    'access-control-allow-headers': response.headers.get('access-control-allow-headers'),
    'access-control-max-age': response.headers.get('access-control-max-age'),
  };
  
  console.log('🔍 CORS Headers na resposta:', corsHeaders);
  return corsHeaders;
};
