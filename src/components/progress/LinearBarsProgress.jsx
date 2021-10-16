import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginTop: theme.spacing(1),
  },
  bar: {
    width: '5px',
    marginRight: '2px',
    alignSelf: 'center',
  },
}));

export default function LinearBarsProgress({ value }) {
  const classes = useStyles();

  const getBars = () => {
    const color = '#4caf50';
    var bars = [];
    for (let i = 0; i < value; i += 10) {
      bars.push(
        <span
          className={classes.bar}
          style={{
            backgroundColor: color,
            height: '20px',
          }}
        />
      );
    }

    // TODO: add bars for 5s

    // bars.push(
    //   <span
    //     className={classes.bar}
    //     style={{
    //       backgroundColor: color,
    //       height: "15px",
    //     }}
    //   />
    // )

    return bars;
  };

  return <div className={classes.root}>{getBars()}</div>;
}
