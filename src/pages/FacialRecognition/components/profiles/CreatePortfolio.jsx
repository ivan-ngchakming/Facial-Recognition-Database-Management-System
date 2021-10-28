import React from 'react';
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { graphqlQuery } from '../../../../graphql';
import { PROFILE as PROFILE_GQL_M } from '../../../../graphql/mutation';

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    margin: theme.spacing(2),
  },
  btnWrapper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    justifyContent: 'center',
  },
  btn: {
    minWidth: '120px',
    margin: theme.spacing(0, 1),
  },
}));

export default function CreatePortfolio({ callback, faceId }) {
  const classes = useStyles();

  return (
    <div>
      <Typography variant="h6" align="center">
        Create New Portfolio
      </Typography>

      <Formik
        initialValues={{
          name: '',
        }}
        validationSchema={Yup.object().shape({})}
        onSubmit={({ name }, { setStatus, resetForm }) => {
          console.debug('Submitted form', name);
          graphqlQuery(PROFILE_GQL_M, {
            name: name,
            faceIds: [faceId],
            thumbnailId: faceId,
          })
            .then((res) => {
              resetForm();
              callback(res.profile);
            })
            .catch((err) => {
              console.error(err);
              resetForm();
            });
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid
              container
              spacing={2}
              className={classes.formWrapper}
              alignContent="center"
            >
              <Grid item xs={10}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  id="formName"
                  label="Name"
                  onChange={handleChange}
                  value={values.name}
                  autoFocus
                />
              </Grid>
            </Grid>
            <div className={classes.btnWrapper}>
              <Button
                variant="contained"
                color="primary"
                className={classes.btn}
                onClick={handleSubmit}
                // disabled={isSubmitting}
              >
                New Profile
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
