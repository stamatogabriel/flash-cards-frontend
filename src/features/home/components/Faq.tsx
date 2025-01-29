import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export function Faq() {
  return (
    <Box mt={5} mb={5}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h5" gutterBottom>
            Como funciona o serviço?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            O serviço é bem simples, basta você descrever o tema que deseja
            estudar e nossa IA criará flashcards personalizados para você.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h5" gutterBottom>
            Quanto custa?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            O serviço é gratuito, basta você se cadastrar e começar a estudar.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h5" gutterBottom>
            Posso criar meus próprios flashcards?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Sim, você pode criar seus próprios flashcards e estudar com eles.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h5" gutterBottom>
            Como posso entrar em contato?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Você pode entrar em contato através do email test@teste.com ou pelo
            telefone (11) 9999-9999.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
