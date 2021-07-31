import React, { useState, useEffect } from 'react'
import CroppedImage from "./CroppedImage";
import { Box, ListItem, ListItemAvatar, ListItemText, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import LinearProgressWithLabel from './LinearProgressWithLabel';
import { graphqlQuery } from "../graphql";
import { IDENTIFYFACE as IDENTIFYFACE_GQL_M } from '../graphql/mutation';
import { IDENTIFYFACE as IDENTIFYFACE_GQL_Q } from '../graphql/query';
import { roundOff } from '../utils';

const useStyles = makeStyles((theme) => ({
  faceCard: {
    alignItems: "flex-start",
  },
  inline: {
    display: 'inline',
  }
}));

export default function FaceCard({index, img, face}) {
  const classes = useStyles();
  const [task, setTask] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isMatched, setIsMatched] = useState(false);

  const fetchProfile = (profileId) => {

  }

  const startTask = (faceId) => {
    graphqlQuery(IDENTIFYFACE_GQL_M, {faceId: faceId}).then(res => {
      setTask(res.identifyFace);
    })
  }

  const updateTaskStatus = (faceId) => {
    const taskId = `face-identify-${faceId}`;
    graphqlQuery(IDENTIFYFACE_GQL_Q, {id: taskId}).then(res => {
      setTask(res.identifyFace);
    })
  }

  useEffect(() => {
    console.log("task updated", isMatched, face, task);

    if (face.face.profile) {
      setIsMatched(true);
      setProfile(face.face.profile);
    }

    if (!isMatched && task && !face.face.profile) {
      if (task.status === 'SUCCESS') {
        setIsMatched(true);
        fetchProfile();
      }
    }

    if (!isMatched && !task) {
      startTask(parseInt(face.face.id));
    } else if (!isMatched && task) {
      setTimeout(function() {
        updateTaskStatus(parseInt(face.face.id));
      }, 500);
    }
  }, [task]);

  return (
    <Box>
      <ListItem key={`face-${index}`} button className={classes.faceCard}>
        <ListItemAvatar>
          <CroppedImage
            img={img}
            faceLocation={face.location}
          />
        </ListItemAvatar>
        
        { isMatched ? (
          face.face.profile ? (
            <ListItemText
              style={{marginLeft: "10%"}}
              primary={
                <Typography
                  variant="h6"
                  color="textPrimary"
                >
                  {face.face.profile.name}
                </Typography>
              }
              
              secondary={
                <React.Fragment>
                <Typography
                  component="span"
                  variant="body1"
                  className={classes.inline}
                  color="textPrimary"
                >
                  {`100% Match`}
                </Typography>
                
                </React.Fragment>
              }
            />
          ) : (
            <ListItemText
              style={{marginLeft: "10%"}}
              primary={
                <Typography
                  variant="h6"
                  color="textPrimary"
                >
                  {"Matched Person"}
                </Typography>
              }
              
              secondary={
                <React.Fragment>
                <Typography
                  component="span"
                  variant="body1"
                  className={classes.inline}
                  color="textPrimary"
                >
                  {`${roundOff((1-task.result[0].score) * 100, 2)}% Match`}
                </Typography>
                
                </React.Fragment>
              }
            />
          )
          
        ) : (
          <ListItemText
            style={{marginLeft: "10%"}}
            primary={
              <Typography
                variant="body1"
                color="textPrimary"
              >
                {task ? "Matching..." : "Pending..."}
              </Typography>
            }
            secondary={
              <LinearProgressWithLabel value={task ? task.current / task.total * 100 : 0} />
            }
          />
        )}

      </ListItem>
    </Box>
  )
}
