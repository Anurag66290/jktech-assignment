import mongoose from "mongoose";

const ObjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  Uploadfile: {
    type: String,
    required: true
  },
  uploadDate: {
    type: Date,
    default: Date.now
  },

  bucketId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bucket',
    required: true
  }
});


const Object = mongoose.model("Object", ObjectSchema);

export default Object;