import { SignInComponent } from "@/features/auth/SignIn";
import { Box } from "@mui/material";

export default function Login() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "calc(100vh - 210px)",
      }}
    >
      <SignInComponent />
    </Box>
  );
}
