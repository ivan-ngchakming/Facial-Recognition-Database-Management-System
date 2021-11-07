import { useState } from 'react';
import {
  TextField,
  Container,
  Typography,
  Box,
  Button,
  Grid,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { graphqlQuery } from '../../graphql';
import { BATCH_FACE_REC } from '../../graphql';

export default function Create() {
  const history = useHistory();
  const [values, setValues] = useState({
    dir: null,
  });

  const handleValueChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const createTask = (dir) => {
    graphqlQuery(BATCH_FACE_REC, {
      dirpath: dir,
      priority: 5,
    });
  };

  const submit = () => {
    createTask(values.dir);
    history.push('/tasks');
  };

  return (
    <>
      <Container maxWidth="md">
        <Typography variant="h4">Create New Batch Recognition Task</Typography>
        <Box mt={4}>
          <Grid spacing={2}>
            <Grid item xs={12}>
              <Typography>
                Enter Directory to perform batch recognition on
              </Typography>

              <TextField
                id="img-dir-path"
                label="Directory Path"
                style={{
                  marginTop: '15px',
                }}
                onChange={handleValueChange('dir')}
              />
            </Grid>
            <Grid item style={{ marginTop: '50px' }} xs={12}>
              <Button variant="contained" onClick={submit}>
                Create
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
