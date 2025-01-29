import { Box, Button } from "@mui/material";
import { IUser, IUserListResponse } from "../types/User";
import { DataGrid } from "@mui/x-data-grid";
import { usersColumns } from "../constants/columns";

type Props = {
  data: IUserListResponse | undefined;
  isFetching: boolean;
  options: {
    page: number;
    search: string;
    pageSize: number;
    rowsPerPage: number[];
  };
  handleOnPageChange: (page: number, perPage: number) => void;
  handleDelete: (user: IUser) => void;
};


export function UsersTable({ data, isFetching, handleOnPageChange, handleDelete, options }: Props) {
  return (
    <Box sx={{ display: "flex", height: 600, flexDirection: "column" }}>
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="secondary"
          href={`/users/create`}
          style={{ marginBottom: "1rem" }}
        >
          Adicionar usuário
        </Button>
      </Box>
      <DataGrid
        columns={usersColumns({ handleDelete })}
        rows={data?.data || []}
        loading={isFetching}
        pagination
        paginationMode="server"
        paginationModel={options}
        rowCount={data?.total || 0}
        pageSizeOptions={options.rowsPerPage}
        onPaginationModelChange={(params) => handleOnPageChange(params.page, params.pageSize)}
        disableColumnFilter
        disableColumnMenu
        disableColumnSorting
      />
    </Box>
  );
}
