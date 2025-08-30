import { Box, Grid2 as Grid, Skeleton, Typography, IconButton, Button, LinearProgress, useTheme } from "@mui/material";
import { IFlashCard } from "../types/FlashCard";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Props {
  cards: IFlashCard[];
  isFetching?: boolean;
  onBack?: () => void;
  topicName?: string;
  isLoggedArea?: boolean;
}

export function FlashCards({ cards, isFetching, onBack, topicName, isLoggedArea = false }: Props) {
  const theme = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showFlipHint, setShowFlipHint] = useState(true);

  useEffect(() => {
    // Reset flip state and hint when cards change or on initial load, if there are cards
    if (cards && cards.length > 0) {
      setIsFlipped(false);
      setShowFlipHint(true);
      // setCurrentIndex(0); // Reset index if cards array itself changes identity, handled by currentIndex init
    } else {
      setShowFlipHint(false); // No hint if no cards
    }
  }, [cards]); // Depend on cards array identity

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setIsFlipped(false);
      setShowFlipHint(false); // Hide hint after navigation
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setShowFlipHint(false); // Hide hint after navigation
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleFlip = () => {
    setIsFlipped(prev => !prev);
    setShowFlipHint(false); // Hide hint on first flip
  };

  if (isFetching) {
    return (
      <Grid container spacing={2}>
        {[1, 2, 3, 4].map((index) => (
          <Grid key={index} size={{ xs: 12, md: 6 }}>
            <Skeleton 
              variant="rounded" 
              width="100%" 
              height={400} 
              sx={{ 
                borderRadius: 2,
                bgcolor: theme.palette.grey[100]
              }} 
            />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (!cards.length) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h6" color="text.secondary">
          Nenhum flashcard encontrado
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 5, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
      {/* Cabeçalho com Navegação */}
      <Box sx={{ 
        width: '100%', 
        maxWidth: 600, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: isLoggedArea ? 'space-between' : 'center',
        mb: 2 
      }}>
        {isLoggedArea && (
          <Button
            onClick={onBack}
            startIcon={<ArrowBackIcon />}
            sx={{
              color: '#1565c0',
              '&:hover': {
                background: 'rgba(21, 101, 192, 0.08)',
              },
            }}
          >
            Voltar aos Tópicos
          </Button>
        )}
        {topicName && (
          <Typography variant="h6" sx={{ 
            fontWeight: 600,
            color: '#0d47a1',
          }}>
            {topicName}
          </Typography>
        )}
      </Box>

      {/* Card */}
      <Box sx={{ position: 'relative', width: '100%', maxWidth: 600, minHeight: 400 }}>
        <motion.div
          initial={false}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          style={{
            perspective: '1000px',
            width: '100%',
            height: 400,
          }}
        >
          <Box
            onClick={handleFlip}
            sx={{
              position: 'relative',
              width: '100%',
              height: '100%',
              cursor: 'pointer',
              transformStyle: 'preserve-3d',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              transition: 'transform 0.6s',
            }}
          >
            {/* Frente do Card */}
            <Box
              className="card-front"
              sx={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backfaceVisibility: 'hidden',
                background: '#ffffff',
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e0e0e0',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
                transform: 'rotateY(0deg)',
              }}
            >
              <HelpOutlineIcon sx={{ fontSize: 40, color: '#1565c0', mb: 1 }} />
              <Typography variant="h5" sx={{
                fontWeight: 700,
                color: '#0d47a1',
                textAlign: 'center',
              }}>
                {cards[currentIndex].question}
              </Typography>
            </Box>

            {/* Verso do Card */}
            <Box
              className="card-back"
              sx={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backfaceVisibility: 'hidden',
                background: '#ffffff',
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e0e0e0',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
                transform: 'rotateY(180deg)',
              }}
            >
              <Box sx={{ transform: 'rotateY(180deg)', textAlign: 'center' }}>
                <EmojiObjectsIcon sx={{ fontSize: 40, color: '#2e7d32', mb: 1 }} />
                <Typography variant="h6" sx={{
                  fontWeight: 600,
                  color: '#1b5e20',
                  textAlign: 'center',
                }}>
                  {cards[currentIndex].answer}
                </Typography>
              </Box>
            </Box>
          </Box>
        </motion.div>
      </Box>

      {/* Dica para Virar (Condicional) */}
      {showFlipHint && cards.length > 0 && (
        <Typography 
          variant="caption" 
          color="text.secondary" 
          sx={{ mt: 1 }}
        >
          Clique no card para ver a resposta.
        </Typography>
      )}

      {/* Controles de Navegação e Progresso */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: 2, 
        width: '100%', 
        maxWidth: 300, 
        mt: 2 
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            sx={{
              background: '#1565c0',
              color: 'white',
              '&:hover': {
                background: '#0d47a1',
              },
              '&.Mui-disabled': {
                background: '#e0e0e0',
                color: '#9e9e9e',
              },
            }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>

          <Typography 
            variant="body1" 
            sx={{ 
              fontWeight: 500,
              color: '#1565c0',
            }}
          >
            {currentIndex + 1} / {cards.length}
          </Typography>

          <IconButton
            onClick={handleNext}
            disabled={currentIndex === cards.length - 1}
            sx={{
              background: '#1565c0',
              color: 'white',
              '&:hover': {
                background: '#0d47a1',
              },
              '&.Mui-disabled': {
                background: '#e0e0e0',
                color: '#9e9e9e',
              },
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>

        <LinearProgress 
          variant="determinate" 
          value={(currentIndex + 1) / cards.length * 100} 
          sx={{ 
            width: '100%',
            height: 8,
            borderRadius: 4,
            backgroundColor: '#e0e0e0',
            '& .MuiLinearProgress-bar': {
              backgroundColor: '#1565c0',
            },
          }}
        />
      </Box>
    </Box>
  );
}
