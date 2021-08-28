import React from 'react'
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  btnWrapper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    justifyContent: 'center',
  },
  btn: {
    minWidth: '120px',
    margin: theme.spacing(0, 1)
  }
}));

export default function CreatePortfolio() {
  const classes = useStyles();
  return (
    <div>
      "Create New Portfolio"
      <div className={classes.btnWrapper}>
        <Button 
          variant="contained" 
          color="primary"
          className={classes.btn}
        >
          New Profile
        </Button>
      </div>
    </div>
  )
}
