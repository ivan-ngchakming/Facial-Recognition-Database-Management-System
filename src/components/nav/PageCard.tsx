import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Typography,
  Card,
  CardContent,
  CardActionArea,
  CardActions,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Page } from '../../types';

const useStyles = makeStyles((theme) => ({
  card: {
    minWidth: 275,
  },
  description: {
    minHeight: 60,
  },
}));

export default function PageCard({ page }: { page: Page }) {
  const classes = useStyles();
  const history = useHistory();

  const handleClick = () => {
    history.push(page.url);
  };

  return (
    <div>
      <Card className={classes.card}>
        <CardActionArea onClick={handleClick}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              {page.category}
            </Typography>
            <Typography variant="h5" component="h2">
              {page.text}
            </Typography>
            <br />
            <Typography
              className={classes.description}
              variant="body2"
              component="p"
            >
              {page.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" onClick={handleClick}>
            View Page
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
