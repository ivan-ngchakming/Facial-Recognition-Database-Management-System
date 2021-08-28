type_defs = """
type Query {
    photo(photoId: ID!): Photo!
    profile(profileId: ID!): Profile!
    identifyFace(faceId: ID!): [IdentifyFaceResult]!
    photos: [Photo]
}

type Mutation {
    photo(rbytes: String): Photo!
    profile(_id: ID, name: String, faceIds: [Int], thumbnailId: Int): Profile!
    assignFaceToProfile(faceId: Int!, profileId: Int!): Face!
}

type Profile {
    id: ID!
    name: String
    facesCount: Int
    thumbnail: Face
    faces: [Face]
}

type Photo {
    id: ID!
    width: Int!
    height: Int!
    array: String!
    faces: [Face]
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
