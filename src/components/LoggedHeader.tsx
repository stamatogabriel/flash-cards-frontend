import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { 
  Box, 
  IconButton, 
  Toolbar, 
  Typography, 
  Menu, 
  MenuItem, 
  Avatar,
  Tooltip,
  useTheme,
  alpha,
} from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { apiSlice } from "@/features/api/apiSlice";
import { logout } from "@/lib/actions/auth";

type HeaderProps = {
  toggle: () => void;
  theme: string;
  handleDrawerToggle?: () => void;
};

export function LoggedHeader({ toggle, theme, handleDrawerToggle }: HeaderProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const muiTheme = useTheme();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    handleClose();
    router.push('/dashboard/profile');
  };

  const handleLogout = async () => {
    await logout();
    // Limpa todos os dados do Redux
    dispatch(apiSlice.util.resetApiState());
    // Redireciona para a tela de login
    router.push('/signin');
  };

  return (
    <Box sx={{ 
      borderBottom: 1, 
      borderColor: 'divider',
      backgroundColor: alpha(muiTheme.palette.background.paper, 0.8),
      backdropFilter: 'blur(8px)',
    }}>
      <Toolbar sx={{ minHeight: 64 }}>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleDrawerToggle}
          sx={{ 
            mr: 2, 
            display: { sm: "none" },
            '&:hover': {
              backgroundColor: alpha(muiTheme.palette.primary.main, 0.1),
            },
          }}
        >
          <MenuIcon />
        </IconButton>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Tooltip title={theme === "dark" ? "Mudar para modo claro" : "Mudar para modo escuro"}>
            <IconButton 
              onClick={toggle} 
              color="inherit"
              sx={{
                '&:hover': {
                  backgroundColor: alpha(muiTheme.palette.primary.main, 0.1),
                },
                '& .MuiSvgIcon-root': {
                  fontSize: 28,
                  transition: 'transform 0.3s ease',
                  color: theme === "dark" ? muiTheme.palette.primary.light : muiTheme.palette.primary.dark,
                },
                '&:hover .MuiSvgIcon-root': {
                  transform: 'rotate(30deg)',
                  color: muiTheme.palette.primary.main,
                }
              }}
            >
              {theme === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>

          <Tooltip title="Menu do usuário">
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
              sx={{
                '&:hover': {
                  backgroundColor: alpha(muiTheme.palette.primary.main, 0.1),
                },
              }}
            >
              <Avatar sx={{ width: 32, height: 32, bgcolor: muiTheme.palette.primary.main }}>
                <AccountCircleIcon />
              </Avatar>
            </IconButton>
          </Tooltip>
        </Box>

        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{
            elevation: 3,
            sx: {
              mt: 1.5,
              minWidth: 180,
              borderRadius: 1,
            }
          }}
        >
          <MenuItem onClick={handleProfile}>
            <Typography variant="body2">Meu Perfil</Typography>
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <Typography variant="body2" color="error">Sair</Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
    </Box>
  );
}