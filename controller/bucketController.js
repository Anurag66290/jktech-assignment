import { fileUploadImage } from "../helper.js";
import Bucket from "../model/Bucket.js";

/*
|----------------------------------------------------------------------------------------------------------------
|   create bucket
|----------------------------------------------------------------------------------------------------------------
*/
export const createbucket = async (req, res) => {
    try {
   
        const bukectExist = await Bucket.findOne({ name: req.body.name });
        if (bukectExist) {
          return  res.status(409).json({ message: 'Bucket Already Exist' })

        } else {
          if (req.files && req.files.image.name) {
            const image = req.files.image;
            if (image) {
              req.body.image =
                fileUploadImage(image, "bucketImage") || bukectExist.image;
            }
          }
          let data = {  
            name: req.body.name,
            image: req.body.image
          };
  
          const result = await Bucket.create(data);
          return  res.status(200).json({ message: 'Bucket added successfully', data: result })
        }
      
    } catch (err) {
      console.log(err);
      return  res.status(500).json({ message: 'Internal server error' })

    }
  };
  
  
/*
|----------------------------------------------------------------------------------------------------------------
|   get bucket
|----------------------------------------------------------------------------------------------------------------
*/
  export const getbucket = async (req, res) => {
    try {
      const bucketExist = await Bucket.findById(req.params.id);
      if (bucketExist) {
        return  res.status(200).json({ message: 'Bucket get sucessfully', data: bucketExist })
      } else {
        return  res.status(404).json({ message: 'Bucket Not Found' })
      }
    } catch (err) {
        console.log(err);
        return  res.status(500).json({ message: 'Internal server error' })
    }
  };

/*
|----------------------------------------------------------------------------------------------------------------
|   lists bucket
|----------------------------------------------------------------------------------------------------------------
*/

  export const listbucket = async (req, res) => {
    try {
      const bucketExist = await Bucket.find();
      if (bucketExist) {
        return  res.status(200).json({ message: 'Bucket get sucessfully', data: bucketExist })
      } else {
        return  res.status(404).json({ message: 'Bucket Not Found' })
      }
    } catch (err) {
        console.log(err);
        return  res.status(500).json({ message: 'Internal server error' })
    }
  };


/*
|----------------------------------------------------------------------------------------------------------------
|   DELETE bucket
|----------------------------------------------------------------------------------------------------------------
*/
  export const deleteBucket = async (req, res) => {
    try {
      const data = await Bucket.findByIdAndDelete({
        _id: req.params.id,
      });
      if (data) {
        return  res.status(200).json({ message: 'Deleted Successfully', data: data })

      } else {
        return  res.status(404).json({ message: 'Bucket Not Found' })

      }
    } catch (error) {
        console.log(err);
        return  res.status(500).json({ message: 'Internal server error' })
    }
  };

  /*
|----------------------------------------------------------------------------------------------------------------
|   Update bucket
|----------------------------------------------------------------------------------------------------------------
*/

 export const updateBucket = async (req, res) => {
  try {

    let bucketexist = await Bucket.findById({_id:req.params.id})
    if(!bucketexist){
      return  res.status(404).json({ message: 'bucketId Not Found' })
    }else{
    if (req.files && req.files.image.name) {
        req.body.image = await fileUploadImage(req.files.image, "bucketImage");
    }

    let user = await Bucket.findByIdAndUpdate(req.params.id, req.body);
    user.name = req.body.name || user.name;
    user.image = req.body.image || user.image;
    if (user) {
      const result = await user.save();
      return res
        .status(200)
        .json({  message: "Bucket  Updated", body: result });
    }
  }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

  