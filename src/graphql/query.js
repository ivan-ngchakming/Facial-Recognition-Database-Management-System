export const IMAGE = `
  query myQuery ($imageId: ID!){
    image (imageId: $imageId){
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
            image {
              id
              width
              height
            }
          }
        }
      }
    }
  }
`;

export const IMAGES = `
  query images($page: Int, $profileId: ID) {
    images(page: $page, profileId: $profileId) {
      pages
      count
      images {
        id
      }
    }
  }
`;

export const IDENTIFYFACE = `
  query identifyFace($faceId: ID!){
    identifyFace(faceId: $faceId) {
      id
      score
    }
  }
`;

export const PROFILE = `
  query profile($profileId: ID!) {
    profile (profileId: $profileId) {
      id
      name
      facesCount
      thumbnail {
        location
        image {
          id
          width
          height
        }
      }
    }
  }
`;

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
          image {
            id
          }
        }
      }
    }
  }
`;
