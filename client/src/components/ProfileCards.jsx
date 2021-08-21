import { Button, List } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import ProfileCard from './ProfileCard';
import { makeStyles } from '@material-ui/core/styles';
import { graphqlQuery } from '../graphql';
import { ASSIGN_FACE_TO_PROFILE as ASSIGN_FACE_TO_PROFILE_GQL_M } from '../graphql/mutation'; 

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

export default function ProfileCards({face, task}) {
  const classes = useStyles();
  const [profile, setProfile] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleClick = (index) => {
    console.debug(`Clicked profile card ${index}`);
    setSelectedIndex(index)
  }

  const handleSaveFaceToProfile = () => {
    graphqlQuery(ASSIGN_FACE_TO_PROFILE_GQL_M, {
      faceId: parseInt(face.face.id),
      profileId: parseInt(task.result[selectedIndex].id),
    }).then(res => {
      setProfile(res.assignFaceToProfile.profile);
    }).catch(error => {
      console.error(error);
    })
  }

  useEffect(() => {
    if (face && !profile) {
      setProfile(face.face.profile);
    }
  }, [face.face.profile])

  console.debug("Profile", profile);
  
  return (
    <div>
      {task && !profile && `${task.result.length} profile${task.result.length > 1? 's':''} matched`}
      {profile && (
        "Face belongs to Profile " + profile.id
      )}
      {task && !profile && (
        <React.Fragment>
          <List>
            {task.result.map((result, index) => (
              <ProfileCard 
                profileId={result.id}
                score={result.score}
                index={index}
                selected={index === selectedIndex}
                onClick={handleClick}
              />
            ))}
          </List>
          <div className={classes.btnWrapper}>
            <Button 
              variant="contained" 
              color="primary"
              disabled={selectedIndex === -1}
              onClick={handleSaveFaceToProfile}
              className={classes.btn}
            >
              Save
            </Button>
            <Button 
              variant="contained" 
              color="primary"
              className={classes.btn}
            >
              New Profile
            </Button>
          </div>
          
        </React.Fragment>
      )}
      
    </div>
  )
}
