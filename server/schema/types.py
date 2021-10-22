type_defs = """
type Query {
    image(imageId: ID!): Image!
    images(page: Int, profileId: ID): ImagePagination!
    profile(profileId: ID!): Profile!
    profiles(page: Int, perPage: Int): ProfilePagination!
    identifyFace(faceId: ID!): [IdentifyFaceResult]!
}

type Mutation {
    image(rbytes: String): Image!
    deleteImage(ids: [ID]): [ID]
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

type Image {
    id: Int!
    width: Int!
    height: Int!
    array: String!
    faces: [Face]
}

type ImagePagination {
    pages: Int
    count: Int
    images: [Image]
}

type Face {
    id: ID!
    location: [Int]
    landmarks: Landmark
    encoding: [Float]
    image: Image
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
