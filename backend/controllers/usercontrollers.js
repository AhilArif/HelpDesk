import usermodel from "../models/User.js"
 

const create=async(req,res)=>{
  try {
      const {name,email,department,designation,password}=req.body
   const Newuser=  new usermodel({
    name,email,department,designation,password
   })
   await Newuser.save()

   res.status(200).json({success:true,message:"User Created Successfully.", Newuser})
  } catch (error) {
    console.log(error)
  return  res.status(500).json({success:false,message:"Interl server eror"})
  }
}

///////Read api
const get=async(req,res)=>{

   try {
     const users= await usermodel.find()
    if (!users) {
      return  res.status(404).json({success:false})
    }

    res.status(200).json({users})
} catch (error) {
    console.log(error)
    
    res.status(500).json({success:false})
   }

}

////////update user api
const Updated=async(req,res)=>{
 try {
     const userId=req.params.id
 
 const updateuser=await usermodel.findByIdAndUpdate(userId,req.body,{new:true})
   if (!updateuser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
     res.status(200).json({ success: true, message: 'User updated successfully', updateuser });
 } catch (error) {
     console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
 }
}

// delet user ap
const Delete=async(req,res)=>{
try {
       const userId=req.params.id
   const deletuser= await usermodel.findByIdAndDelete(userId)
   if (!deletuser) {
   return res.status(404).json({ success: false, message: 'user Not found' });
   }
   res.status(200).json({ success: true, message: 'user Deleted successfully' });
} catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal server error' });
}
}

// fetch total number of users
 const getTotalUsers = async (req, res) => {
  try {
      const getTotalUsers = await usermodel.countDocuments(); // Counts all complaints
      res.status(200).json({ getTotalUsers });
  } catch (error) {
      console.error("Error fetching all users.", error);
      res.status(500).json({ error: "An error occurred while fetching total users." });
  }
}

// const Profile = async (req, res) => {
//   try {
//     const userId = req.params.id

//     // Validate userId
//     if (!userId) {
//       return res.status(400).json({ success: false, message: "User ID is required" });
//     }

//     // Fetch user from database
//     const user = await user.findById(userId).select("-password"); // Use 'const' to declare variable

//     // If user is not found
//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     // Send user details
//     res.status(200).json({ success: true, user });
//   } catch (error) {
//     console.error("Error fetching user profile:", error);
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//     console.log("User ID:", userId);
//     console.log("User fetched from DB:", user);

//   }
// };


export {create,get,Updated,Delete, getTotalUsers}
  //Profile}



