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