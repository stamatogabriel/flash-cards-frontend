/* eslint-disable @typescript-eslint/no-explicit-any */
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
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Image from "next/image";
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
      {
        path: "",
        name: "Flash Cards",
        children: [
          { path: "/dashboard/flashcards", name: "Meus Flashcards" },
          { path: "/dashboard/flashcards/create", name: "Criar Flashcards" },
        ],
      },
      { path: "/dashboard/profile", name: "Meus dados" },
    ];
  }, []);

  const renderRouteItem = (route: any) => {
    if (route.children) {
      return (
        <Accordion
          key={route.path}
          disableGutters 
          elevation={0}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${route.name}-content`}
            id={`${route.name}-header`}
          >
            <Typography>{route.name}</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: 0 }}>
            <List>
              {route.children.map((child: any) => (
                <ListItem disablePadding key={child.path} onClick={onClose}>
                  <ListItemButton href={child.path}>
                    <ListItemText>{child.name}</ListItemText>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      );
    }

    return (
      <ListItem disablePadding key={route.path} onClick={onClose}>
        <ListItemButton href={route.path}>
          <ListItemText>{route.name}</ListItemText>
        </ListItemButton>
      </ListItem>
    );
  };

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Image src="/logo.png" alt="logo" width={140} height={50} />
          </Link>
        </Typography>
      </Toolbar>
      <Divider />
      <List>{routes.map((route) => renderRouteItem(route))}</List>
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
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}
