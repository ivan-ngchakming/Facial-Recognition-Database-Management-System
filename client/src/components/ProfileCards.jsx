import { Button, List } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import ProfileCard from './ProfileCard';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  btnWrapper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    justifyContent: 'center',
  },
}));

export default function ProfileCards({face, task}) {
  const classes = useStyles();
  const [hasProfile, setHasProfile] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleClick = (index) => {
    console.debug(`Clicked profile card ${index}`);
    setSelectedIndex(index)
  }

  useEffect(() => {
    if (face) {
      setHasProfile(face.face.profile !== null);
    }
  }, [face.face.profile])
  
  return (
    <div>
      {hasProfile ? (
        "Face belongs to Profile " + face.face.profile
      ) : (
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
            >
              Save
            </Button>
          </div>
          
        </React.Fragment>
      )}
      
    </div>
  )
}
