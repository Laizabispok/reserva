import { Schema, model } from  'mongoose'

const HouseSchema = new Schema({
    thumbnail: String,
    description: String,
    price: Number,
    location: String,
    status: Boolean,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    ToJSON: {
        virtuals: true 
        //"virtuals": Unknown word.
    }
})

HouseSchema.virtual('thumbnail_url').get(function() {
    return`http://localhost:4500/files/${this.thumbnail}`
})

export default model('House', HouseSchema)