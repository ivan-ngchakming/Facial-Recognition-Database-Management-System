export const PHOTO = `
  query myQuery ($photoId: ID!){
    photo (photoId: $photoId){
      id
      width
      height
      faces {
        id
        location
        profile {
          id
          name
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
  }
`

export const PHOTOS = `
  query photos($page: Int, $profileId: ID) {
    photos(page: $page, profileId: $profileId) {
      pages
      count
      photos {
        id
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

export const PROFILES = `
  query profiles($page: Int, $perPage: Int) {
    profiles(page: $page, perPage: $perPage) {
      pages
      count
      profiles {
        id
        name
        facesCount
        thumbnail {
          id
          photo {
            id
          }
        }
      }
    }
  }
`