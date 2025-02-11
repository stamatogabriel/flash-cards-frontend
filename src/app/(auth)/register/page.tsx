import { UserCreate } from "@/features/user/CreateUser";
import { Box } from "@mui/material";

export default function RegisterPage() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "calc(100vh - 210px)",
      }}
    >
      <UserCreate />
    </Box>
  );
}
