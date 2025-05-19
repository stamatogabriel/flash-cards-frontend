'use client';

import { Box, Button, Container, Typography, useTheme, alpha } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
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
        <Typography 
          variant="h1" 
          component="h1" 
          sx={{ 
            fontSize: { xs: '6rem', md: '8rem' },
            fontWeight: 700,
            color: theme.palette.primary.main,
            textAlign: 'center',
            mb: 2
          }}
        >
          404
        </Typography>
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
          Página não encontrada
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
          Ops! Parece que você se perdeu. A página que você está procurando não existe ou foi movida.
        </Typography>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Button
            component={Link}
            href="/"
            variant="contained"
            size="large"
            sx={{
              px: 4,
              py: 1.5,
              backgroundColor: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              }
            }}
          >
            Voltar para o início
          </Button>
          <Button
            component={Link}
            href="/#como-funciona"
            variant="outlined"
            size="large"
            sx={{
              px: 4,
              py: 1.5,
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
              '&:hover': {
                borderColor: theme.palette.primary.dark,
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
              }
            }}
          >
            Como funciona
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
              color: theme.palette.primary.main,
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