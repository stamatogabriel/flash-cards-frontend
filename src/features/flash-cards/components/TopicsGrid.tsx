import { Box, Grid2 as Grid, Skeleton, Typography, Paper, Chip } from "@mui/material";
import Link from "next/link";
import SchoolIcon from '@mui/icons-material/School';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

type Topic = {
  _id: string;
  name: string;
};

type Props = {
  data: Topic[];
  isFetching: boolean;
  onTopicClick: (id: string, name: string) => void;
};

export function TopicsGrid({ data, isFetching, onTopicClick }: Props) {
  if (!isFetching && data.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', mt: 3 }}>
        <Typography variant="h6">
          Não há flashcards criados, <Link href="/dashboard/flashcards/create">que tal começar agora?</Link>
        </Typography>
      </Box>
    );
  }

  const truncateTitle = (title: string) => {
    return title.length > 25 ? `${title.substring(0, 20)}...` : title;
  };

  return (
    <Box>
      <Grid container spacing={3} mt={3}>
        {isFetching
          ? Array.from({ length: 4 }).map((_, index) => (
              <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={240}
                  sx={{ borderRadius: 2 }}
                />
              </Grid>
            ))
          : data.map((topic) => (
              <Grid key={topic._id} size={{ xs: 12, sm: 6, md: 4 }}>
                <Paper
                  onClick={() => onTopicClick(topic._id, topic.name)}
                  sx={{
                    p: 3,
                    height: 240,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 6,
                      '& .arrow-icon': {
                        transform: 'translateX(4px)',
                      },
                    },
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    textAlign: 'center',
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: 'linear-gradient(90deg, #2196f3, #1976d2)',
                    },
                  }}
                >
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: 'center',
                    flex: 1,
                    width: '100%',
                    pt: 2
                  }}>
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'center', 
                      mb: 2,
                      color: 'primary.main'
                    }}>
                      <SchoolIcon sx={{ fontSize: 40 }} />
                    </Box>
                    <Typography 
                      variant="h5" 
                      component="h2" 
                      sx={{ 
                        fontWeight: 600,
                        background: 'linear-gradient(45deg, #2196f3, #1976d2)',
                        backgroundClip: 'text',
                        textFillColor: 'transparent',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        width: '100%',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {truncateTitle(topic.name)}
                    </Typography>
                  </Box>
                  <Box sx={{ 
                    width: '100%', 
                    display: 'flex', 
                    justifyContent: 'center',
                    mt: 'auto',
                    pt: 2
                  }}>
                    <Chip 
                      label="Ver flashcards" 
                      size="small"
                      icon={<ArrowForwardIcon className="arrow-icon" sx={{ transition: 'transform 0.3s ease' }} />}
                      sx={{ 
                        bgcolor: 'primary.light',
                        color: 'white',
                        '&:hover': {
                          bgcolor: 'primary.main',
                        },
                      }}
                    />
                  </Box>
                </Paper>
              </Grid>
            ))}
      </Grid>
    </Box>
  );
}
