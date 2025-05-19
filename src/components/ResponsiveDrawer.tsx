/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Divider,
  List,
  ListItem,
  Typography,
  Box,
  Drawer,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  useTheme,
  alpha,
  Avatar,
  Skeleton,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import SchoolIcon from '@mui/icons-material/School';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import { motion } from 'framer-motion';
import { useGetCurrentUserQuery } from "@/features/user/userSlice";
import { useGetActiveSignatureQuery } from "@/features/signatures/signaturesSlice";
import { logout } from "@/lib/actions/auth";
import { useDispatch } from "react-redux";
import { apiSlice } from "@/features/api/apiSlice";

const drawerWidth = 280;

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function ResponsiveDrawer({ open, onClose }: Props) {
  const theme = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: user, isLoading: isLoadingUser } = useGetCurrentUserQuery();
  const { data: planInfo, isLoading: isLoadingPlan } = useGetActiveSignatureQuery();

  const handleLogout = async () => {
    await logout();
    // Limpa todos os dados do Redux
    dispatch(apiSlice.util.resetApiState());
    // Redireciona para a tela de login
    router.push('/signin');
  };

  const routes = useMemo(() => {
    return [
      {
        path: "/dashboard/flashcards",
        name: "Meus Flashcards",
        icon: <SchoolIcon />,
      },
      {
        path: "/dashboard/flashcards/create",
        name: "Criar Flashcards",
        icon: <AddCircleOutlineIcon />,
      },
      {
        path: "/dashboard/profile",
        name: "Meus dados",
        icon: <PersonOutlineIcon />,
      },
    ];
  }, []);

  const isActive = (path: string) => pathname === path;

  const renderRouteItem = (route: any) => (
    <ListItem disablePadding key={route.path} onClick={onClose}>
      <ListItemButton
        href={route.path}
        sx={{
          minHeight: 48,
          borderRadius: 1,
          mb: 0.5,
          backgroundColor: isActive(route.path) ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
          '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, 0.05),
          },
        }}
      >
        <ListItemIcon 
          sx={{ 
            minWidth: 40,
            color: isActive(route.path) ? theme.palette.primary.main : 'inherit',
          }}
        >
          {route.icon}
        </ListItemIcon>
        <ListItemText 
          primary={route.name}
          primaryTypographyProps={{
            fontWeight: isActive(route.path) ? 600 : 400,
            color: isActive(route.path) ? theme.palette.primary.main : 'inherit',
          }}
        />
      </ListItemButton>
    </ListItem>
  );

  const drawer = (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Box sx={{ 
        p: 2, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        gap: 1,
      }}>
        <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Image src="/logo.png" alt="logo" width={140} height={50} />
        </Link>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1,
          mt: 1,
          p: 1,
          borderRadius: 1,
          backgroundColor: alpha(theme.palette.primary.main, 0.05),
          width: '100%',
        }}>
          <Avatar 
            sx={{ 
              width: 40, 
              height: 40,
              bgcolor: theme.palette.primary.main,
            }}
          >
            <PersonOutlineIcon />
          </Avatar>
          <Box sx={{ flex: 1 }}>
            {isLoadingUser || isLoadingPlan ? (
              <>
                <Skeleton variant="text" width={120} height={20} />
                <Skeleton variant="text" width={80} height={16} />
              </>
            ) : (
              <>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  Olá, {user?.username}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Plano {planInfo?.name || 'Gratuito'}
                </Typography>
              </>
            )}
          </Box>
        </Box>
      </Box>

      <Divider />
      
      <Box sx={{ px: 2, py: 1 }}>
        <List sx={{ p: 0 }}>{routes.map((route) => renderRouteItem(route))}</List>
      </Box>

      <Box sx={{ flexGrow: 1 }} />

      <Divider />
      
      <Box sx={{ px: 2, py: 1 }}>
        <List sx={{ p: 0 }}>
          <ListItem disablePadding>
            <ListItemButton
              onClick={handleLogout}
              sx={{
                minHeight: 48,
                borderRadius: 1,
                color: 'error.main',
                '&:hover': {
                  backgroundColor: alpha(theme.palette.error.main, 0.05),
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: 'error.main' }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Sair" 
                primaryTypographyProps={{
                  color: 'error.main',
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </motion.div>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { 
            boxSizing: "border-box", 
            width: drawerWidth,
            borderRight: 'none',
            boxShadow: theme.shadows[8],
          },
        }}
      >
        {drawer}
      </Drawer>

      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            borderRight: 'none',
            boxShadow: theme.shadows[2],
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}
