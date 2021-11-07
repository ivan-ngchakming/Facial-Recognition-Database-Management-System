mutation = """
type Mutation {
    photo(rbytes: String): Photo!
    deletePhoto(ids: [ID]): [ID]
    profile(_id: ID, name: String, faceIds: [Int], thumbnailId: Int): Profile!
    assignFaceToProfile(faceId: Int!, profileId: Int!): Face!
    batchFaceRec(dirpath: String, priority: Float): Task
}
"""
