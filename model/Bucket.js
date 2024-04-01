import mongoose from "mongoose";


const BucketSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  image:{
type:String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
 
});

const Bucket = mongoose.model("Bucket", BucketSchema);

export default Bucket;