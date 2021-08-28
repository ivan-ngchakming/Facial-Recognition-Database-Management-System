export const PHOTO = `
  query myQuery ($photoId: ID!){
    photo (photoId: $photoId){
      id
      width
      height
      faces {
        id
        location
        landmarks {
          chin
          left_eyebrow
          right_eyebrow
          nose_bridge
          nose_tip
          left_eye
          right_eye
          top_lip
          bottom_lip
        }
        encoding
        profile {
          id
          name
        }
      }
    }
  }
`

export const IDENTIFYFACE = `
  query identifyFace($faceId: ID!){
    identifyFace(faceId: $faceId) {
      id
      score
    }
  }
`

export const PROFILE = `
  query profile($profileId: ID!) {
    profile (profileId: $profileId) {
      id
      name
      facesCount
      thumbnail {
        location
        photo {
          id
          width
          height
        }
      }
    }
  }
`
