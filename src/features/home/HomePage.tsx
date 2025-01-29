import { AdBanner } from "@/components/AdBanner";
import { ExamplesComponent } from "./components/Examples";
import { Faq } from "./components/Faq";
import { HeroBanner } from "./components/HeroBanner";
import { HowItWorks } from "./components/HowItWorks";
import { Pricing } from "./components/Pricing";
import { Box } from "@mui/material";

export function HomeComponent() {


  return (
    <>
      <HeroBanner />
      <Box sx={{ mt: "calc(100vh + 3rem)" }} />
      <HowItWorks />
      <AdBanner />
      <ExamplesComponent />
      <Pricing />
      <AdBanner />
      <Faq />
    </>
  );
}
