import React from 'react';
import { CircularProgress, Box, Container, Paper } from '@material-ui/core';
import Gallery from '../components/images/Gallery';
import useImages from '../hooks/useImages';

const ROWS_PER_PAGE = 20;

const Images = () => {
  const [images, refetch, imgCount] = useImages(0, ROWS_PER_PAGE);

  if (images.length === 0)
    return (
      <Box
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '70%',
        }}
      >
        <CircularProgress />
      </Box>
    );

  return (
    <>
      <Container style={{ maxWidth: '90vw' }}>
        <Paper style={{ width: '100%', marginBottom: '16px' }}>
          <Gallery
            images={images}
            count={imgCount}
            onChange={refetch}
            defaultRowsPerPage={ROWS_PER_PAGE}
          />
        </Paper>
      </Container>
    </>
  );
};

export default Images;
