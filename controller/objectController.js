import { fileUploadImage } from "../helper.js";
import Bucket from "../model/Bucket.js";
import Object from "../model/Object.js";


/*
|----------------------------------------------------------------------------------------------------------------
|   create Object
|----------------------------------------------------------------------------------------------------------------
*/
  export const createObject = async (req, res) => {
    try {
   let bucketexist = await Bucket.findById({_id:req.body.bucketId})
    if(bucketexist){
      return  res.status(404).json({ message: 'bucketId Not Found' })
    }else{
          if (req.files && req.files.Uploadfile.name) {
            const Uploadfile = req.files.Uploadfile;
            if (Uploadfile) {
              req.body.Uploadfile =
                fileUploadImage(Uploadfile, "ObjectImage");
            }
          }
          let data = {  
            name: req.body.name,
            Uploadfile: req.body.Uploadfile,
            bucketId:req.body.bucketId
          };
  
          const result = await Object.create(data);
          return  res.status(200).json({ message: 'Object added successfully', data: result })
   }
      
    } catch (err) {
      console.log(err);
      return  res.status(500).json({ message: 'Internal server error' ,data:err.message})

    }
  };

/*
|----------------------------------------------------------------------------------------------------------------
|   get Object
|----------------------------------------------------------------------------------------------------------------
*/
 export const getObject = async(req,res)=>{
    try {
      let data = await Object.findOne({_id:req.params.id}).populate('bucketId', 'name')
      if (!data){
        return  res.status(404).json({ message: 'Object Not Found' })
      }else{
        return  res.status(200).json({ message: 'Object get sucessfully', data: data })
      }
    } catch (error) {
      console.log(error);
      return  res.status(500).json({ message: 'Internal server error' ,data:error.message})
    }
  }

/*
|----------------------------------------------------------------------------------------------------------------
|   get all Object
|----------------------------------------------------------------------------------------------------------------
*/
export const getallObject = async(req,res)=>{
  try {
    let data = await Object.find().populate('bucketId', 'name').sort({uploadDate:-1})
    if (!data){
      return  res.status(404).json({ message: 'Objects Not Found' })
    }else{  
      return  res.status(200).json({ message: 'Object get sucessfully', data: data })
    }
  } catch (error) {
    console.log(error);
    return  res.status(500).json({ message: 'Internal server error' ,data:error.message})
  }
}

/*
|----------------------------------------------------------------------------------------------------------------
|   list Object by bucket id
|----------------------------------------------------------------------------------------------------------------
*/
export const listobject = async(req,res)=>{
  try {
    let data = await Object.find({bucketId:req.params.bucketId}).populate('bucketId', 'name')
    if (!data){
      return  res.status(404).json({ message: 'Bucket id is not found in object list' })
    }else{
      return  res.status(200).json({ message: 'Object get sucessfully', data: data })
    }
  } catch (error) {
    console.log(error);
    return  res.status(500).json({ message: 'Internal server error' ,data:error.message})
  }
}

/*
|----------------------------------------------------------------------------------------------------------------
|   DELETE object
|----------------------------------------------------------------------------------------------------------------
*/
export const deleteobject = async (req, res) => {
  try {
    const data = await Object.findByIdAndDelete({
      _id: req.params.id,
    });
    if (data) {
      return  res.status(200).json({ message: 'Deleted Successfully', data: data })

    } else {
      return  res.status(404).json({ message: 'object Not Found' })

    }
  } catch (error) {
      console.log(err);
      return  res.status(500).json({ message: 'Internal server error' })
  }
};

/*
|----------------------------------------------------------------------------------------------------------------
|   update object
|----------------------------------------------------------------------------------------------------------------
*/
export const updateObject = async(req,res)=>{
  try {
    let Objectexist = await Object.findById({_id:req.params.id})
    if(!Objectexist){
      return  res.status(404).json({ message: 'Object Not Found' })
    }else{
      let bucketexist = await Bucket.findById({_id:req.body.bucketId})
    if(!bucketexist){
      return  res.status(404).json({ message: 'bucketId Not Found' })
    }else{
    if (req.files && req.files.Uploadfile.name) {
      req.body.Uploadfile = await fileUploadImage(req.files.Uploadfile, "ObjectImage");
  }

  let user = await Object.findByIdAndUpdate(req.params.id, req.body);
  user.name = req.body.name || user.name;
  user.Uploadfile = req.body.Uploadfile || user.Uploadfile;
  user.bucketId = req.body.bucketId || user.bucketId;
  if (user) {
    const result = await user.save();
    return res.status(200).json({  message: "object Updated", body: result });
  }
}
}
  } catch (error) {
    console.log(error);
    // return res.status(500).json({ message: 'Internal server error' })
    return  res.status(500).json({ message: 'Internal server error', data:error.message })
  }
}