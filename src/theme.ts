'use client';
import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
  cssVariables: true,
  palette: {
    mode: 'dark',
    primary: {
      main: '#652BFA',
      light: '#8052FF', // Tom mais claro para botões e outros elementos
      dark: '#4B00B2', // Tom mais escuro para sombras e destaques
    },
    secondary: {
      main: '#222',
      light: '#333',
      dark: '#111',
    },
    background: {
      default: '#121212',
      paper: '#242424',
    },
    text: {
      primary: '#fff',
      secondary: '#ccc',
    },
  },
});

export const lightTheme = createTheme({
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
  cssVariables: true,
  palette: {
    mode: 'light',
    primary: {
      main: '#652BFA',
      light: '#E0D1FF', // Tom mais claro para fundos e elementos de destaque
      dark: '#4B00B2', // Tom mais escuro para textos e ícones
    },
    secondary: {
      main: '#222',
      light: '#666',
      dark: '#111',
    },
    background: {
      default: '#f5f5f5',
      paper: '#fff',
    },
    text: {
      primary: '#333',
      secondary: '#666',
    },
  },
});
