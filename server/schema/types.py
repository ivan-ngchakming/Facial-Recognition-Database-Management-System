type_defs = """
type Query {
    photo(photoId: ID!): Photo!
    photos(page: Int, profileId: ID): PhotoPagination!
    profile(profileId: ID!): Profile!
    profiles(page: Int, perPage: Int): ProfilePagination!
    identifyFace(faceId: ID!): [IdentifyFaceResult]!
}

type Mutation {
    photo(rbytes: String): Photo!
    deletePhoto(ids: [ID]): [ID]
    profile(_id: ID, name: String, faceIds: [Int], thumbnailId: Int): Profile!
    assignFaceToProfile(faceId: Int!, profileId: Int!): Face!
}

type Profile {
    id: Int!
    name: String
    facesCount: Int
    thumbnail: Face
    faces: [Face]
}

type ProfilePagination {
    pages: Int
    count: Int
    profiles: [Profile]
}

type Photo {
    id: Int!
    width: Int!
    height: Int!
    array: String!
    faces: [Face]
}

type PhotoPagination {
    pages: Int
    count: Int
    photos: [Photo]
}

type Face {
    id: ID!
    location: [Int]
    landmarks: Landmark
    encoding: [Float]
    photo: Photo
    profile: Profile
}

type Landmark {
    chin: [[Int]]
    left_eyebrow: [[Int]]
    right_eyebrow: [[Int]]
    nose_bridge: [[Int]]
    nose_tip: [[Int]]
    left_eye: [[Int]]
    right_eye: [[Int]]
    top_lip: [[Int]]
    bottom_lip: [[Int]]
}

type IdentifyFaceResult {
    id: Int
    score: Float
}
"""
