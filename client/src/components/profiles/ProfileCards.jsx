import { Button, List } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import ProfileCard from './ProfileCard';
import { makeStyles } from '@material-ui/core/styles';
import { graphqlQuery } from '../../graphql';
import { ASSIGN_FACE_TO_PROFILE as ASSIGN_FACE_TO_PROFILE_GQL_M } from '../../graphql/mutation';
import CreatePortfolio from './CreatePortfolio';
import DetailedProfileCard from './DetailedProfileCard';

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

export default function ProfileCards({face, matchResults}) {
  const classes = useStyles();
  const [profile, setProfile] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [openCreatePannel, setOpenCreatePannel] = useState(matchResults && matchResults.length === 0 && !profile);

  const handleClick = (index) => {
    console.debug(`Clicked profile card ${index}`);
    setSelectedIndex(index)
  }

  const handleSaveFaceToProfile = () => {
    graphqlQuery(ASSIGN_FACE_TO_PROFILE_GQL_M, {
      faceId: parseInt(face.face.id),
      profileId: parseInt(matchResults[selectedIndex].id),
    }).then(res => {
      setProfile(res.assignFaceToProfile.profile);
    }).catch(error => {
      console.error(error);
    })
  }

  const handleCreatedProfile = (profile) => {
    setProfile(profile);
    setOpenCreatePannel(false);
  }

  useEffect(() => {
    if (face && !profile) {
      setProfile(face.face.profile);
    }
  }, [face.face.profile])

  console.debug("Profile", profile);

  return (
    <div>
      {matchResults && matchResults.length > 0 && !profile && `${matchResults.length} profile${matchResults.length > 1? 's':''} matched`}
      {profile && (
        <DetailedProfileCard profile={profile} />
      )}
      {matchResults && matchResults.length > 0 && !profile && (
        <React.Fragment>
          <List>
            {matchResults.map((result, index) => (
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
              onClick={() => {setOpenCreatePannel(true)}}
            >
              New Profile
            </Button>
          </div>

        </React.Fragment>
      )}

      {openCreatePannel && (
        <CreatePortfolio callback={handleCreatedProfile} faceId={parseInt(face.face.id)}/>
      )}

    </div>
  )
}
