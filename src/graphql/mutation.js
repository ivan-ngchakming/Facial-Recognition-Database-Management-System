export const PHOTO = `
  mutation photo($rbytes: String) {
    photo(rbytes: $rbytes) {
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

export const DELETE_PHOTOS = `
  mutation deletePhotos ($ids: [ID]) {
    deletePhoto(ids: $ids)
  }
`

export const IDENTIFYFACE = `
  mutation identifyFace($faceId: Int!){
    identifyFace(faceId: $faceId) {
      id
      status
      current
      total
      result {
        id
        score
      }
    }
  }
`

export const ASSIGN_FACE_TO_PROFILE = `
  mutation assignFaceToProfile($faceId: Int!, $profileId: Int!) {
    assignFaceToProfile(faceId: $faceId, profileId: $profileId) {
      id
      profile {
        id
        name
        facesCount
        thumbnail {
          id
          location
          photo {
            id
            width
            height
          }
        }
      }
    }
  }
`

export const PROFILE = `
  mutation profile($id: ID, $name: String, $faceIds: [Int], $thumbnailId: Int) {
    profile(_id: $id, name: $name, faceIds: $faceIds, thumbnailId: $thumbnailId) {
      id
      name
      facesCount
      thumbnail {
        id
        location
        photo {
          id
          width
          height
        }
      }
      faces {
        id
      }
    }
  }
`
