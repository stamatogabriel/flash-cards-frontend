/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Image from "next/image";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import { Avatar, Tooltip, useTheme, alpha, Divider } from "@mui/material";
import { useAppSelector } from "@/hooks/useStore";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/actions/auth";
import { useDispatch } from "react-redux";
import { clearUser } from "@/features/user/userSlice";

const pages = [
  { name: "Como funciona", href: "/#como-funciona" },
  { name: "Preços", href: "/#precos" }
];
const settings = [
  { path: "/dashboard/flashcards", name: "Flash Cards" },
  { path: "/dashboard/profile", name: "Meus dados" },
];

interface Props {
  toggle: () => void;
  theme: string;
}

export function Header({ toggle, theme }: Props) {
  const { user } = useAppSelector((state) => state.user);
  const router = useRouter();
  const dispatch = useDispatch();
  const muiTheme = useTheme();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (path: string) => {
    setAnchorElUser(null);
    router.push(path);
  };

  const handleLogout = async () => {
    await logout();
    dispatch(clearUser());
    setAnchorElUser(null);
    router.push("/");
  };

  const isAuthenticated = Boolean(user?._id);

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        py: 2,
        backgroundColor: alpha(muiTheme.palette.background.paper, 0.8),
        backdropFilter: 'blur(8px)',
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Image src="/logo.png" alt="logo" width={160} height={60} />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{
                '&:hover': {
                  backgroundColor: alpha(muiTheme.palette.primary.main, 0.1),
                },
              }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ 
                display: { xs: "block", md: "none" },
                '& .MuiPaper-root': {
                  mt: 1.5,
                  minWidth: 180,
                  borderRadius: 1,
                }
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Typography 
                    component="a" 
                    href={page.href}
                    sx={{ 
                      textAlign: "center",
                      textDecoration: 'none',
                      color: 'inherit',
                      width: '100%'
                    }}
                  >
                    {page.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <Image src="/logo.png" alt="logo" width={160} height={60} />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                href={page.href}
                sx={{ 
                  my: 2, 
                  color: muiTheme.palette.text.primary,
                  display: "block",
                  '&:hover': {
                    backgroundColor: alpha(muiTheme.palette.primary.main, 0.1),
                  }
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          <Tooltip title={theme === "dark" ? "Mudar para modo claro" : "Mudar para modo escuro"}>
            <IconButton 
              onClick={toggle} 
              color="inherit"
              sx={{
                mr: 1,
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

          {!isAuthenticated && (
            <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" }, gap: 1 }}>
              <Button
                href="/signin"
                variant="outlined"
                sx={{ 
                  display: { xs: "none", md: "block" },
                  borderColor: muiTheme.palette.primary.main,
                  color: muiTheme.palette.primary.main,
                  '&:hover': {
                    borderColor: muiTheme.palette.primary.dark,
                    backgroundColor: alpha(muiTheme.palette.primary.main, 0.1),
                  }
                }}
              >
                Entrar
              </Button>
              <Button
                href="/register"
                variant="contained"
                sx={{ 
                  display: { xs: "none", md: "block" },
                  backgroundColor: muiTheme.palette.primary.main,
                  '&:hover': {
                    backgroundColor: muiTheme.palette.primary.dark,
                  }
                }}
              >
                Cadastre-se
              </Button>
            </Box>
          )}
          {isAuthenticated && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Menu do usuário">
                <IconButton 
                  onClick={handleOpenUserMenu} 
                  sx={{ 
                    p: 0,
                    '&:hover': {
                      backgroundColor: alpha(muiTheme.palette.primary.main, 0.1),
                    },
                  }}
                >
                  <Avatar
                    alt={user?.username}
                    sx={{ 
                      width: 32, 
                      height: 32, 
                      bgcolor: muiTheme.palette.primary.main,
                      '& .MuiSvgIcon-root': {
                        fontSize: 20,
                      }
                    }}
                  >
                    <PersonOutlineIcon />
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ 
                  mt: "45px",
                  '& .MuiPaper-root': {
                    mt: 1.5,
                    minWidth: 180,
                    borderRadius: 1,
                  }
                }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={() => setAnchorElUser(null)}
              >
                <Box sx={{ px: 2, py: 1 }}>
                  <Typography variant="subtitle2" sx={{ color: muiTheme.palette.text.secondary }}>
                    {user?.username}
                  </Typography>
                </Box>
                <Divider />
                {settings.map((setting) => (
                  <MenuItem 
                    key={setting.name} 
                    onClick={() => handleCloseUserMenu(setting.path)}
                    sx={{
                      py: 1,
                      '&:hover': {
                        backgroundColor: alpha(muiTheme.palette.primary.main, 0.1),
                      }
                    }}
                  >
                    <Typography sx={{ textAlign: "center" }}>
                      {setting.name}
                    </Typography>
                  </MenuItem>
                ))}
                <Divider />
                <MenuItem 
                  onClick={handleLogout}
                  sx={{
                    py: 1,
                    color: muiTheme.palette.error.main,
                    '&:hover': {
                      backgroundColor: alpha(muiTheme.palette.error.main, 0.1),
                    }
                  }}
                >
                  <LogoutIcon sx={{ mr: 1, fontSize: 20 }} />
                  <Typography>Sair</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
