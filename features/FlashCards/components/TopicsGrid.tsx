import { Box, Grid2 as Grid, Skeleton, Typography } from "@mui/material";

type Props = {
  data: string[];
  isFetching: boolean;
};

export function TopicsGrid({ data, isFetching }: Props) {
  return (
    <Box>
      <Grid container spacing={2} mt={3}>
        {isFetching
          ? Array.from({ length: 4 }).map(() => (
              <Grid key={Math.random()}>
                <Skeleton
                  variant="rectangular"
                  width={210}
                  height={118}
                  sx={{ borderRadius: 1 }}
                />
              </Grid>
            ))
          : data.map((topic) => (
              <Grid key={topic}>
                <Box
                  sx={{
                    p: 2,
                    bgcolor: "background.paper",
                    borderRadius: 1,
                    boxShadow: 1,
                  }}
                >
                  <Typography variant="h5">{topic}</Typography>
                </Box>
              </Grid>
            ))}
      </Grid>
    </Box>
  );
}
