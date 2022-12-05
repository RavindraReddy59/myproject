const express = require("express");
const nodemailer = require('nodemailer');
const app = express();
const path=require('path')
const http=require("http")
const cors=require("cors")
const mongoose = require("mongoose");




const SignupModel = require("./models1/SignupSchema");
const MsgModel=require("./models1/MsgSchema");
const PvtMsgModel=require("./models1/PvtMsgSchema");
const MapModel=require("./models1/MapSchema");
const RoomModel=require("./models1/RoomSchema");
const FriendsModel=require("./models1/FriendsSchema")
const ImageModel=require("./models1/ImageSchema")
const PostModel=require("./models2/PostSchema")
const DpModel=require("./models2/UserDpSchema")
const RequestsModel=require("./models2/RequestsSchema")
const FriendModel=require("./models2/FriendSchema")
const Message1Model=require("./models2/Message1Schema")
const Post2Model=require("./models2/Post2Schema")
const CommentsModel=require("./models2/CommentsSchema")
const AddGroupModel=require("./models2/AddGroupSchema")



const { json } = require("express/lib/response");

app.use(cors())
app.use(express.json()) 
app.use(express.urlencoded())


//=============================================================================================================================

//=================================================================================================================================
mongoose.connect("mongodb://127.0.0.1:27017/Myapp?readPreference=primary&appname=MongoDB%20Compass&ssl=false",
  { useNewUrlParser: true,useUnifiedTopology:true}
);
//==================================================================================================================================




//=================================================================================================================================















//=================================================================================================================================


app.post("/addUser",  (req, res) => {
  const {username,Email}=req.body

  SignupModel.findOne({username:username},(err,user)=>{
   if(user){
     res.send({message: "username already exists"})
   }
  else {
  SignupModel.findOne({Email:Email},(err,user)=>{
    if(user){
      res.send({message: "Email already exists"}) 
    }
    else{
      res.send({message: "proceed for otp"})
    }
   
  })
}
})
  
});

app.post('/addUser1',(req,res)=>{
  const username=req.body.username;
  const Email=req.body.data1;
  const Password=req.body.Password;
  const ConfirmPassword=req.body.ConfirmPassword;

  const user = new SignupModel({username,Email,Password,ConfirmPassword });
    user.save(err =>{
      if(err){
        res.send(err)
        
      }
      else{
        res.send({message: "Registration Successful"})
      }
    });

  
})




//------------------------------------------------------------------------------------------------------------------------

app.post("/Login" , (req,res)=>{
  
  const {Email,Password}=req.body
  SignupModel.findOne({Email:Email},(err,user)=>{
      if(user){
       if(Password===user.Password){
         res.send({message:"Login Successful",user:user})
       }
       else{
         res.send({message:"Incorrect password"})
       }
      }
      else{
        res.send({message:"Email not found"})
      }
  })
  
}) 
//--------------------------------------------------------------------------------------------------------------------

app.put('/update', async(req,res)=>{
  const NewPassword=req.body.NewPassword;
  const NewConfirmPassword=req.body.NewPassword;
  const id=req.body.id;
  
  const user= await SignupModel.findByIdAndUpdate(id)
    
    user.Password=NewPassword;
    user.ConfirmPassword=NewConfirmPassword;
    user.save(err=>{
      if(err){
        console.log(err)
      }
      else{
        res.send({message:"updated"})
      }
    })

})

app.put('/updateEmail', async(req,res)=>{
  const NewEmail=req.body.Email;
  const id=req.body.id;
  
  const user= await SignupModel.findByIdAndUpdate(id)
    
    user.Email=Email;
    user.save(err=>{
      if(err){
        console.log(err)
      }
      else{
        res.send({message:"updated"})
      }
    })

})

app.put('/update1', async(req,res)=>{
  const NewlikedCount=req.body.NewlikedCount;
  const NewPersons=req.body.NewPersons;
  const id=req.body.id;
  
  const user= await PostModel.findByIdAndUpdate(id)
    
    user.likedCount=NewlikedCount;
    user.likedPersons=NewPersons;
    user.save(err=>{
      if(err){
        console.log(err)
      }
      else{
        res.send({message:"updated"})
      }
    })

})

app.get('/getpost', async (req,res)=>{
  const user=await PostModel.find()
  res.json(user)
  //console.log(res.data)
  
})




//=============================================================================================================================

app.post('/addmsg',(req,res)=>{
  const {username,room,message,time}=req.body
  const user = new MsgModel({username,room,message,time});
    user.save(err =>{
      if(err){
        res.send(err) 
      }
      else{
        res.send({message:"Message sent Successfully"})
      }
    });

})

app.get('/getmsg', async (req,res)=>{
  const msg=await MsgModel.find()
  res.json(msg)
  
})
//---------------------------------------------------------------------------------
app.post('/addroom',(req,res)=>{
  const {room}=req.body
  const user = new RoomModel({room});
  user.save(err =>{
    if(err){
      res.send(err) 
    }
    else{
      res.send({message:"Room added Successfully"})
    }
  });
})

app.get('/getroom', async (req,res)=>{
  const room=await RoomModel.find()
  res.json(room)
  
})
//-----------------------------------------------------------------------------------------------
 
app.post('/addfrnd',async(req,res)=>{
  const {username,FriendName}=req.body
  const user = new FriendsModel({username,FriendName});
  user.save(err =>{
    if(err){
      res.send(err) 
    }
    else{
      res.send({message:"Friend added Successfully"})
    }
  });

})
app.get('/getUser', async (req,res)=>{
  const user=await SignupModel.find()
  res.json(user)
  
})
app.get('/getfrnd', async (req,res)=>{
  const user=await FriendsModel.find()
  res.json(user)
  //console.log(res)
  
})
//-----------------------------------------------------------------------------------------------
app.post('/addpvtmsg',(req,res)=>{
  const {username,FriendmsgName,message,time}=req.body
  const user = new PvtMsgModel({username,FriendmsgName,message,time});
    user.save(err =>{
      if(err){
        res.send(err) 
      }
      else{
        res.send({message:"Message sent Successfully"})
      }
    });

})

app.get('/getpvtmsg', async (req,res)=>{
  const msg=await PvtMsgModel.find()
  res.json(msg)
  
})
//================================================== ==========================================================================
app.post('/addpost',(req,res)=>{
  const { username,userPic,userPost,description }=req.body
  const user = new PostModel({ username,userPic,userPost,description });
  user.save(err =>{
    if(err){
      res.send(err) 
    }
    else{
      res.send({message:"Posst addedd Successfully"})
    }  
  });

}) 


app.post('/addUserInfo',(req,res)=>{
  // const { username,userdp,Gender,DOB }=req.body
  const username=req.body.params.username
  const userdp=req.body.params.userdp
  const Gender=req.body.params.Gender
  const DOB=req.body.params.DOB
  const user = new DpModel({ username,userdp,Gender,DOB });
  user.save(err =>{
    if(err){
      res.send(err) 
    }
    else{
      res.send({message:"User Info addedd Successfully"})
    } 
  });

})

app.get('/getrequests', async (req,res)=>{
  const msg=await RequestsModel.find()
  res.json(msg)
  
})
app.get('/getfriends', async (req,res)=>{
  const msg=await FriendModel.find()
  res.json(msg)
  
})

app.get('/getdp', async (req,res)=>{
  const msg=await DpModel.find()
  res.json(msg)
  
})

app.post('/updateFrnd1',(req,res)=>{
  const username=req.body.params.rname
  const Requestlist=req.body.params.Requestlist
  const user = new RequestsModel({ username,Requestlist });
  user.save(err =>{
    if(err){
      res.send(err)  
    }
    else{
      res.send({message:"Request addedd Successfully"})
    }
  }); 
 
})
 
app.put('/updateFrnd2', async(req,res)=>{
  const Requestlist=req.body.Requestlist; 
  const id=req.body.id; 
  
  const user= await RequestsModel.findByIdAndUpdate(id)
    user.Requestlist=Requestlist;
    user.save(err=>{
      if(err){   
        console.log(err) 
      }
      else{
        res.send({message:"updated"})
      }
    })

})
 
app.post('/updateFrnd3',(req,res)=>{
  const username=req.body.params.username
  const friendlist=req.body.params.friendlist
  const user = new FriendModel({ username,friendlist });
  user.save(err =>{ 
    if(err){
      res.send(err)  
    }
    else{
      res.send({message:"Request addedd Successfully"})
    }
  }); 

}) 


app.put('/updateFrnd4', async(req,res)=>{      
  const friendlist=req.body.friendlist; 
  const id=req.body.id;
  
  const user= await FriendModel.findByIdAndUpdate(id)
      
    user.friendlist=friendlist;
     
    user.save(err=>{
      if(err){
        console.log(err)
      }
      else{
        res.send({message:"updated"})
      }
    })

})


app.post('/updateLikes', async(req,res)=>{      
  
  const username=req.body.params.username;
  const postid=req.body.params.postid;
  const likedPerson=req.body.params.likedlist;
  const likedCount=1;
 
  const user = new Post2Model({ username,postid,likedCount,likedPerson});
  user.save(err =>{ 
    if(err){
      res.send(err)  
    }
    else{
      res.send({message:"Like addedd Successfully"})
    }
  }); 

}) 
app.put('/updateLikes1', async(req,res)=>{
 
  const id=req.body.params.id; 
  const username=req.body.params.username
  const user= await Post2Model.findByIdAndUpdate(id)

  user.likedCount=user.likedCount-1; 
  user.likedPerson= user.likedPerson.filter(item=>item !==username)
    user.save(err=>{
      if(err){   
        console.log(err) 
      }
      else{
        res.send({message:"updated"})
      }
    })
  
})
    
app.put('/updateLikes2', async(req,res)=>{      
  
  const id=req.body.params.id;
   const likedPerson=req.body.params.likedlist
  
  const user= await Post2Model.findByIdAndUpdate(id)
      
     user.likedCount=user.likedCount+1; 
     user.likedPerson=likedPerson
     
    user.save(err=>{
      if(err){
        console.log(err)
      }
      else{
        res.send({message:"updated"})
      }
    })

}) 

app.post('/addcomment', async(req,res)=>{      
  
  const commentername=req.body.commentername;
  const postid=req.body.postid;
  const comment=req.body.comment;
 
  const user = new CommentsModel({ commentername,postid,comment});
  user.save(err =>{ 
    if(err){
      res.send(err)  
    }
    else{
      res.send({message:"comment addedd Successfully"})
    }
  }); 

}) 

app.get('/getcomments', async (req,res)=>{ 
  const user=await CommentsModel.find()
  res.json(user)
 
  
})

app.delete('/delReq',(req,res)=>{
  const id=req.body.id;
   RequestsModel.findByIdAndRemove(id)
   res.send({message:"deleted"})
})



app.get('/getpost2', async (req,res)=>{
  const user=await Post2Model.find()
  res.json(user)
  //console.log(res.data)
  
})


app.get('/getMsgs', async (req,res)=>{
  const msg=await Message1Model.find()
  res.json(msg)
  
})

app.post('/Msgfrnd1',(req,res)=>{
  const { username,frndname,messagelist,time}=req.body
  const user = new Message1Model({ username,frndname,messagelist,time });
  user.save(err =>{
    if(err){
      res.send(err)  
    }
    else{
      res.send({message:"Message addedd Successfully"})
    }
  }); 

})

app.put('/Msgfrnd2', async(req,res)=>{
  const messagelist=req.body.messagelist; 
  const time=req.body.time;
  const id=req.body.id;
  
  const user= await Message1Model.findByIdAndUpdate(id)
      
    user.messagelist=messagelist;
    user.time=time;
     
    user.save(err=>{
      if(err){
        console.log(err)
      }
      else{
        res.send({message:"updated"})
      }
    })

})


app.post('/addGroup',(req,res)=>{
  const Admin=req.body.Admin;
  const GroupName=req.body.GroupName;
  const user = new AddGroupModel({Admin,GroupName});
    user.save(err =>{
      if(err){
        res.send(err) 
      }
      else{
        res.send({message:"Group Added Successfully"})
      }
    });

})

app.get('/getGroups', async (req,res)=>{
  const group=await AddGroupModel.find()
  res.json(group)
  
})

app.put('/addParticipants', async(req,res)=>{      
  
  const id=req.body.params.id;
   const Participants=req.body.params.Participants;
  
  const user= await AddGroupModel.findByIdAndUpdate(id)
      
     user.Participants=Participants; 
    
     
    user.save(err=>{
      if(err){
        console.log(err)
      }
      else{
        res.send({message:"updated"})
      }
    })

}) 




//============================================================================================================================
 
app.post('/users',(req,res)=>{
 
  var transporter = nodemailer.createTransport({
    // host: "smtp.gmail.com",
    port:465,
      service: 'gmail',
      auth: {
        user: 'rentit.official1@gmail.com',
        pass: 'byyipxyvfidodkxs'
      }
  });


  
  var mailOptions = {
      from: 'rentit.official1gmail.com',// sender address
      to: req.body.to, // list of receivers
      subject: req.body.subject, // Subject line
     
      text:req.body.description,
      
      
  };
   
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
});

//================================================================================================================================
app.post('/addcord',(req,res)=>{
  const {house,latitude,longitude}=req.body
  const user1 = new MapModel({house,latitude,longitude});
  user1.save(err =>{
    if(err){
      res.send(err)   
    }    
    else{ 
      res.send({message:"Coordinates added Successfully"})
    } 
  }); 
})
 
app.get('/getcord',async (req,res)=>{
  const cord=await MapModel.find({})
  res.send(cord)
  console.log(cord)
})
//=======================================================================================================




//=======================================================================================================
// const server=app.listen(3003, () => {
//   console.log("You are connected!");
// });
// process.on('unhandledRejection',err=>{
//   console.log("closing server..")
//   server.close(()=>{
//     process.exit(1)
//   })
// })
app.listen(3003, () => {
  console.log("You are connected!");
});
