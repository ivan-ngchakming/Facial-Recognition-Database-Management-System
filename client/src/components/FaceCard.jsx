import { Chip, ListItem, ListItemAvatar, ListItemText, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { graphqlQuery } from "../graphql";
import { IDENTIFYFACE as IDENTIFYFACE_GQL_M } from '../graphql/mutation';
import { IDENTIFYFACE as IDENTIFYFACE_GQL_Q, PROFILE as PROFILE_GQL_Q } from '../graphql/query';
import { roundOff } from '../utils';
import CroppedImage from "./CroppedImage";
import LinearBarsProgress from './LinearBarsProgress';
import LinearProgressWithLabel from './LinearProgressWithLabel';

const useStyles = makeStyles((theme) => ({
  faceCard: {
    alignItems: "flex-start",
  },
  inline: {
    display: 'inline',
  },
  tagWrapper: {
    marginTop: theme.spacing(1),
  },
  tag: {
    marginRight: theme.spacing(1),
  },
}));

export default function FaceCard({index, img, face, selected, onClick}) {
  const classes = useStyles();
  const [task, setTask] = useState(null);
  const [profile, setProfile] = useState(null);
  const [status, setStatus] = useState(false);

  const fetchProfile = (profileId, nextStatus) => {
    graphqlQuery(PROFILE_GQL_Q, {id: profileId}).then(res => {
      setProfile(res.profile);
      setStatus(nextStatus);
    }).catch(error => console.log(error))
  }

  const startTask = (faceId) => {
    graphqlQuery(IDENTIFYFACE_GQL_M, {faceId: faceId}).then(res => {
      setTask(res.identifyFace);
    }).catch(error => console.log(error))
  }

  const updateTaskStatus = (faceId) => {
    const taskId = `face-identify-${faceId}`;
    graphqlQuery(IDENTIFYFACE_GQL_Q, {id: taskId}).then(res => {
      setTask(res.identifyFace);
    }).catch(error => console.log(error))
  }

  useEffect(() => {
    console.debug(status, task);
    // Initialize status value on mount
    if (!status) {
      if (face.face.profile) {
        fetchProfile(face.face.profile.id, 'saved');
      } else {
        setStatus('startingTask')
      }
    }

    if (status === 'startingTask') {
      startTask(parseInt(face.face.id));
      setStatus('matching');
    } 
    
    if (status === 'matching' && task) {
      if (task.status === 'PROGRESS' || task.status === 'PENDING') {
        setTimeout(function() {
          updateTaskStatus(parseInt(face.face.id));
        }, 500);
      }
      else if (task.status === 'SUCCESS') {
        if (task.result && task.result.length > 0) {
          fetchProfile(task.result[0].id, 'matched');
        }
        if (!task.result) {
          // Task status is success but no result returned, refetch results.
          setTimeout(function() {
            updateTaskStatus(parseInt(face.face.id));
          }, 500);
        }
      }
    }

  }, [status, task]);

  useEffect(() => {
    console.log("profile updated", profile);
  }, [profile]);

  return (
    <React.Fragment>
      <ListItem 
        key={`face-${index}`} 
        button 
        onClick={() => {onClick(face, task, index)}} 
        className={classes.faceCard}
        selected={selected}
      >
        <ListItemAvatar>
          <CroppedImage
            img={img}
            faceLocation={face.location}
          />
        </ListItemAvatar>
        
          { status === 'matched' && (
            <ListItemText
              style={{marginLeft: "10%"}}
              primary={
                <Typography
                  variant="h6"
                  color="textPrimary"
                >
                  {profile.name}
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
                  {task ? `${roundOff((task.result[0].score) * 100, 2)}% Match` : `100% Match`}
                </Typography>

                <LinearBarsProgress value={roundOff((task.result[0].score) * 100, 2)} />

                </React.Fragment>
              }
            />
          )}
          
          { status === 'saved' && (
            <ListItemText
              style={{marginLeft: "10%"}}
              primary={
                <Typography
                  variant="h6"
                  color="textPrimary"
                >
                  {profile.name}
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
                    {"25 | United State"}
                    {/* <br />
                    {"Actress | model"} */}
                  </Typography>
                  
                  <div className={classes.tagWrapper}>
                    {['Actress', 'model'].map((tag, index)=> (
                      <Chip
                        key={index}
                        label={tag}
                        className={classes.tag}
                        color="primary"
                        size="small"
                      />
                    ))}
                  </div>
                </React.Fragment>
              }
            />
          )}

          { status === 'matching' && (
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
    </React.Fragment>
  )
}
