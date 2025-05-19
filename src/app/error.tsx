'use client';

import { Box, Button, Container, Typography, useTheme, alpha } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const theme = useTheme();

  return (
    <Container 
      maxWidth="lg" 
      sx={{ 
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8,
        gap: 4,
        mt: 'calc(100px + 2rem)'
      }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Image 
          src="/logo.png" 
          alt="Flashy Logo" 
          width={200} 
          height={75}
          style={{ objectFit: 'contain' }}
        />
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Box 
          sx={{ 
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            mb: 2
          }}
        >
          <ErrorOutlineIcon 
            sx={{ 
              fontSize: { xs: '4rem', md: '5rem' },
              color: theme.palette.error.main
            }} 
          />
          <Typography 
            variant="h1" 
            component="h1" 
            sx={{ 
              fontSize: { xs: '4rem', md: '5rem' },
              fontWeight: 700,
              color: theme.palette.error.main,
              textAlign: 'center'
            }}
          >
            Erro
          </Typography>
        </Box>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Typography 
          variant="h4" 
          component="h2" 
          sx={{ 
            fontWeight: 600,
            textAlign: 'center',
            mb: 2,
            color: theme.palette.text.primary
          }}
        >
          Algo deu errado
        </Typography>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <Typography 
          variant="body1" 
          sx={{ 
            textAlign: 'center',
            mb: 4,
            color: theme.palette.text.secondary,
            maxWidth: '600px'
          }}
        >
          Desculpe, ocorreu um erro inesperado. Nossa equipe já foi notificada e está trabalhando para resolver o problema.
        </Typography>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Button
            onClick={reset}
            variant="contained"
            size="large"
            sx={{
              px: 4,
              py: 1.5,
              backgroundColor: theme.palette.error.main,
              '&:hover': {
                backgroundColor: theme.palette.error.dark,
              }
            }}
          >
            Tentar novamente
          </Button>
          <Button
            component={Link}
            href="/"
            variant="outlined"
            size="large"
            sx={{
              px: 4,
              py: 1.5,
              borderColor: theme.palette.error.main,
              color: theme.palette.error.main,
              '&:hover': {
                borderColor: theme.palette.error.dark,
                backgroundColor: alpha(theme.palette.error.main, 0.1),
              }
            }}
          >
            Voltar para o início
          </Button>
        </Box>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <Typography 
          variant="body2" 
          sx={{ 
            textAlign: 'center',
            mt: 4,
            color: theme.palette.text.secondary
          }}
        >
          Precisa de ajuda? Entre em contato conosco pelo{' '}
          <Link 
            href="mailto:contato@flashy.com"
            style={{ 
              color: theme.palette.error.main,
              textDecoration: 'none',
              fontWeight: 500
            }}
          >
            contato@flashy.com
          </Link>
        </Typography>
      </motion.div>
    </Container>
  );
} 