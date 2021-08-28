import { Box, Chip, ListItem, ListItemAvatar, ListItemText, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { graphqlQuery } from "../graphql";
import { IDENTIFYFACE as IDENTIFYFACE_GQL_Q, PROFILE as PROFILE_GQL_Q } from '../graphql/query';
import { roundOff } from '../utils';
import CroppedImage from "./CroppedImage";
import LinearProgress from '@material-ui/core/LinearProgress';
import LinearBarsProgress from './LinearBarsProgress';

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
  loadingBar: {
    marginTop: theme.spacing(2),
  }
}));

export default function FaceCard({index, img, face, selected, onClick}) {
  const classes = useStyles();
  const [profile, setProfile] = useState(null);
  const [status, setStatus] = useState(false);
  const [matchResults, setMatchResults] = useState(null);

  const fetchProfile = (profileId, nextStatus) => {
    graphqlQuery(PROFILE_GQL_Q, {profileId: profileId}).then(res => {
      setProfile(res.profile);
      setStatus(nextStatus);
    }).catch(error => console.log(error))
  }

  const identifyFace = (faceId) => {
    console.debug("Identifying face", faceId)
    graphqlQuery(IDENTIFYFACE_GQL_Q, {faceId: faceId}).then(res => {
      console.debug(res.identifyFace);
      setMatchResults(res.identifyFace);
    }).catch(error => console.log(error));
  }

  useEffect(() => {
    // Initialize status value on mount
    if (!status) {
      if (face.face.profile) {
        fetchProfile(face.face.profile.id, 'saved');
      } else {
        setStatus('matching');
        identifyFace(parseInt(face.face.id));
      }
    }

  }, [status]);

  useEffect(() => {
    if (matchResults && matchResults.length > 0) {
      if (!profile || matchResults[0].id !== profile.id) {
        fetchProfile(matchResults[0].id, 'matched')
      }
    }
    if (matchResults && matchResults.length === 0) {
      // No results matched.
      setStatus('matched');
    }
  }, [matchResults]);

  useEffect(() => {
    console.log("profile updated", profile);
  }, [profile]);

  return (
    <React.Fragment>
      <ListItem 
        key={`face-${index}`} 
        button 
        onClick={() => {onClick(face, matchResults, index)}} 
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
                  {matchResults.length === 0 ? "No Match" : profile.name}
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
                  { matchResults.length > 0 && `${roundOff((matchResults[0].score) * 100, 2)}% Match`}
                  { matchResults.length === 0 && "No Match Found"}
                </Typography>
                
                { matchResults.length > 0 ? (
                  <LinearBarsProgress value={roundOff((matchResults[0].score) * 100, 2)} />
                ): (
                  <LinearBarsProgress value={0} />
                )}

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
                  Matching...
                </Typography>
              }
              secondary={
                  <LinearProgress className={classes.loadingBar}/>
              }
            />
          )}

      </ListItem>
    </React.Fragment>
  )
}
