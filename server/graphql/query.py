query = """
type Query {
    photo(photoId: ID!): Photo!
    photos(page: Int, profileId: ID, photosPerPage: Int): PhotoPagination!
    profile(profileId: ID!): Profile!
    profiles(page: Int, perPage: Int): ProfilePagination!
    identifyFace(faceId: ID!): [IdentifyFaceResult]!
    task(taskCollectionId: ID!): Task
    tasks: [Task]
}
"""
