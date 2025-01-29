"use client";

import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useDeleteUserMutation, useGetListUsersQuery } from "./userSlice";
import { Typography } from "@mui/material";
import { IUser } from "./types/User";
import { UsersTable } from "./components/UsersTable";

export default function UsersList() {
  const { enqueueSnackbar } = useSnackbar();
  const [options, setOptions] = useState({
    page: 0,
    search: "",
    pageSize: 10,
    rowsPerPage: [10, 20, 30],
  });

  console.log(options);

  const { isFetching, data, error } = useGetListUsersQuery({
    ...options,
    limit: options.pageSize,
    page: options.page + 1,
  });
  const [deleteUser, status] = useDeleteUserMutation();

  function handleOnPageChange(page: number, perPage: number) {
    setOptions({ ...options, page, pageSize: perPage });
  }

  function handleDelete(user: IUser) {
    deleteUser(user);
  }

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar("User deleted successfully", { variant: "success" });
    }
    if (status.error) {
      enqueueSnackbar("User not deleted", { variant: "error" });
    }
  }, [enqueueSnackbar, status.error, status.isSuccess]);

  if (error) {
    return <Typography>Erro ao carregar usuários</Typography>;
  }

  return (
    <UsersTable
      data={data}
      options={options}
      isFetching={isFetching}
      handleOnPageChange={handleOnPageChange}
      handleDelete={handleDelete}
    />
  );
}
