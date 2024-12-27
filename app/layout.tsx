import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import type { ReactNode } from "react";
import { StoreProvider } from "./StoreProvider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Roboto } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import { Container, CssBaseline } from "@mui/material";
import { Header } from "./components/Navbar";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={roboto.variable}>
          <CssBaseline />
          <AppRouterCacheProvider options={{ key: "css" }}>
            <ThemeProvider theme={theme}>
              <Header />
              <Container maxWidth="lg">
                <main>{children}</main>
              </Container>
              <footer>
                <span>teste</span>
              </footer>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </body>
      </html>
    </StoreProvider>
  );
}
