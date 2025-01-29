import { Edit } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { GridDeleteIcon, GridRenderCellParams } from "@mui/x-data-grid";
import { IUser } from "../types/User";

interface ColumnsProps {
  handleDelete: (id: IUser) => void;
}

export const usersColumns = ({ handleDelete }: ColumnsProps) => [
  {
    field: "fullname",
    headerName: "Nome",
    flex: 1,
  },
  { field: "email", headerName: "E-mail", flex: 1 },
  { field: "phone", headerName: "Telefone", flex: 1 },
  {
    field: "id",
    headerName: "Actions",
    flex: 1,
    renderCell: (params: GridRenderCellParams) => (
      <Box>
        <IconButton
          color="primary"
          href={`/users/${params.value}`}
          aria-label="edit"
          data-testid="edit-button"
        >
          <Edit />
        </IconButton>
        <IconButton
          color="secondary"
          onClick={() => handleDelete(params as unknown as IUser)}
          aria-label="delete"
          data-testid="delete-button"
        >
          <GridDeleteIcon />
        </IconButton>
      </Box>
    ),
  },
];
