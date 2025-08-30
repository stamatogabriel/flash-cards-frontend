'use client';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
  useTheme,
  Container,
  alpha,
  Paper
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { motion } from 'framer-motion';

const faqItems = [
  {
    question: "Como funciona o serviço?",
    answer: "O serviço é bem simples, basta você descrever o tema que deseja estudar e nossa IA criará flashcards personalizados para você."
  },
  {
    question: "Quanto custa?",
    answer: "O serviço é gratuito, basta você se cadastrar e começar a estudar."
  },
  {
    question: "Posso criar meus próprios flashcards?",
    answer: "Sim, você pode criar seus próprios flashcards e estudar com eles."
  },
  {
    question: "Como posso entrar em contato?",
    answer: "Você pode entrar em contato através do email test@teste.com ou pelo telefone (11) 9999-9999."
  }
];

export function Faq() {
  const theme = useTheme();

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 8 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 6 }}>
          <HelpOutlineIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
          <Typography 
            variant="h4" 
            component="h2"
            sx={{ 
              color: theme.palette.text.primary,
              fontWeight: 600
            }}
          >
            Perguntas Frequentes
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Paper
                elevation={0}
                sx={{
                  overflow: 'hidden',
                  borderRadius: 2,
                  border: 1,
                  borderColor: 'divider',
                  backgroundColor: alpha(theme.palette.background.paper, 0.8),
                  backdropFilter: 'blur(8px)',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: theme.shadows[4],
                    borderColor: theme.palette.primary.main,
                  }
                }}
              >
                <Accordion
                  sx={{
                    backgroundColor: 'transparent',
                    '&:before': {
                      display: 'none',
                    },
                    '&.Mui-expanded': {
                      margin: 0,
                    }
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      <motion.div
                        animate={{ rotate: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ display: 'flex', alignItems: 'center' }}
                      >
                        <ExpandMoreIcon 
                          sx={{ 
                            color: theme.palette.primary.main,
                            transition: 'transform 0.3s ease-in-out',
                          }} 
                        />
                      </motion.div>
                    }
                    sx={{
                      minHeight: 72,
                      '&.Mui-expanded': {
                        minHeight: 72,
                      },
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.05),
                      },
                      '& .MuiAccordionSummary-content': {
                        margin: '12px 0',
                        '&.Mui-expanded': {
                          margin: '12px 0',
                        }
                      }
                    }}
                  >
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        color: theme.palette.text.primary,
                        fontWeight: 500,
                        fontSize: '1.1rem'
                      }}
                    >
                      {item.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{
                      backgroundColor: alpha(theme.palette.background.paper, 0.5),
                      borderTop: 1,
                      borderColor: 'divider',
                      py: 3
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Typography 
                        sx={{ 
                          color: theme.palette.text.secondary,
                          lineHeight: 1.7
                        }}
                      >
                        {item.answer}
                      </Typography>
                    </motion.div>
                  </AccordionDetails>
                </Accordion>
              </Paper>
            </motion.div>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
