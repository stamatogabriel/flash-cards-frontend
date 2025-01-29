import {
  Divider,
  List,
  ListItem,
  Toolbar,
  Typography,
  Box,
  Drawer,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import Link from "next/link";
import { useMemo } from "react";

const drawerWidth = 240;

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function ResponsiveDrawer({ open, onClose }: Props) {
  const routes = useMemo(() => {
    return [
      { path: "/users", name: "Usuários" },
      { path: "/courses", name: "Cursos" },
      {path: "/lessons", name: "Aulas"},
      {path: "/lesson-contents", name: "Conteúdos de Aula"},
    ];
  }, []);

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
            Inspiratio
          </Link>
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {routes.map((route) => (
          <ListItem disablePadding key={route.path} onClick={onClose}>
            <ListItemButton href={route.path}>
              <ListItemText>{route.name}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
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
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
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
            backgroundColor: "background.default",
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}