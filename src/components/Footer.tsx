import { Box, Container, Grid, Typography, IconButton, useTheme, alpha, Button } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export function Footer() {
  const theme = useTheme();

  const quickLinks = [
    { label: 'Início', href: '/' },
    { label: 'Preços', href: '/#precos' },
    { label: 'Como funciona', href: '/#como-funciona' }
  ];

  const contactInfo = {
    email: 'contato@flashy.com',
    phone: '(11) 99999-9999',
    whatsapp: '5511999999999'
  };

  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: alpha(theme.palette.background.paper, 0.8),
        backdropFilter: 'blur(8px)',
        borderTop: 1,
        borderColor: 'divider',
        py: { xs: 4, md: 6 },
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Logo e Descrição */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Link href="/" style={{ textDecoration: 'none' }}>
                <Image 
                  src="/logo.png" 
                  alt="Flashy Logo" 
                  width={160} 
                  height={60}
                  style={{ objectFit: 'contain' }}
                />
              </Link>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ 
                  lineHeight: 1.7,
                  maxWidth: '90%'
                }}
              >
                Aprenda de forma mais eficiente com flashcards personalizados criados por IA.
              </Typography>
            </Box>
          </Grid>

          {/* Links Rápidos */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography 
              variant="subtitle1" 
              color="text.primary" 
              fontWeight="bold" 
              gutterBottom
              sx={{ mb: 2 }}
            >
              Links Rápidos
            </Typography>
            <Box 
              sx={{ 
                display: 'grid',
                gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: '1fr' },
                gap: 1.5
              }}
            >
              {quickLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  style={{ textDecoration: 'none' }}
                >
                  <Button
                    variant="text"
                    sx={{
                      color: theme.palette.text.secondary,
                      justifyContent: 'flex-start',
                      px: 0,
                      '&:hover': {
                        color: theme.palette.primary.main,
                        backgroundColor: 'transparent',
                      }
                    }}
                  >
                    {link.label}
                  </Button>
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Contato */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography 
              variant="subtitle1" 
              color="text.primary" 
              fontWeight="bold" 
              gutterBottom
              sx={{ mb: 2 }}
            >
              Contato
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <IconButton 
                    href={`mailto:${contactInfo.email}`}
                    target="_blank"
                    sx={{ 
                      color: theme.palette.primary.main,
                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.2),
                      }
                    }}
                  >
                    <EmailIcon />
                  </IconButton>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <IconButton 
                    href={`https://wa.me/${contactInfo.whatsapp}`}
                    target="_blank"
                    sx={{ 
                      color: '#25D366',
                      backgroundColor: alpha('#25D366', 0.1),
                      '&:hover': {
                        backgroundColor: alpha('#25D366', 0.2),
                      }
                    }}
                  >
                    <WhatsAppIcon />
                  </IconButton>
                </motion.div>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <EmailIcon sx={{ fontSize: 16, color: theme.palette.primary.main }} />
                  {contactInfo.email}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <WhatsAppIcon sx={{ fontSize: 16, color: '#25D366' }} />
                  {contactInfo.phone}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box 
          sx={{ 
            mt: 4, 
            pt: 3, 
            borderTop: 1, 
            borderColor: 'divider',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: 1
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Flashy. Todos os direitos reservados.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Desenvolvido por{' '}
            <Link 
              href="mailto:gabriel@pandoratechsolutions.com.br" 
              target="_blank"
              style={{ 
                color: theme.palette.primary.main,
                textDecoration: 'none',
                fontWeight: 500
              }}
            >
              Pandora Soluções em Tecnologia
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
