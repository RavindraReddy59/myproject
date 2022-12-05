import React, { useState, useEffect } from "react";
import { View, Button, Text, TextInput,StyleSheet } from 'react-native';
import axios from "axios";


export default function Settings({navigation,route}) {
    const username=route.params.username
    const [allow1, setallow1] = useState("false")
    const [allow2, setallow2] = useState("false")
    const [allow3, setallow3] = useState(false)
    const [id,setid]=useState("")
    const [otp, setotp] = useState("")
    const [email,setemail]=useState("")
    const [Newusername,setNewusername]= useState("")
    const [Email,setEmail]=useState("")
    const [NewPassword,setNewPassword]=useState("")
    const [NewConfirmPassword,setNewConfirmPassword]=useState("")
 
    const [user1, setUser1] = useState({
        to: Email,
        subject: "Email Verification",
        description: Math.floor((Math.random()) * 1000000).toString(),
      });
    

    useEffect(() => {
        axios.get("http://192.168.128.218:3003/getUser").then((res) => {
           res.data.map((e)=>{
            if(e.username===username){
                setid(e._id)
                setemail(e.Email)
            }
           })
        })
    
    },[])

    function UpdatePass(){


        if(NewPassword.length>=8){
          if(NewPassword===NewConfirmPassword){
            axios.put("http://192.168.128.218:3003/update",{NewPassword:NewPassword,NewConfirmPassword:NewConfirmPassword,id:id})
            .then((res)=>{
                console.log("response is",res)
                if(res.data.message==="updated"){
                  alert("Password updated successfully")
    
                }
            })
           
  
          }
          else{
            alert("Password and confirm password didn't match")
          }
        }
        else{
          alert("Password is too weak please provide a strong password")
        }
      }

      function UpdateEmail(){
     
        axios.post("http://192.168.128.218:3003/addUser", { username, Email }) .then(res => {
          alert(res.data.message)
            if(res.data.message==="proceed for otp"){
              setallow3(true)
            }
           else if(res.data.message==="Email already exists"){
             alert("Email already exists")
            }
            
        })

      }

      function Verify(){
        if (otp === user1.description) {
          axios.put("http://192.168.128.218:3003/updateEmail",{id:id,Email:Email}).then((res)=>{
            console.log(res.data)
            setresponse(res.data.message)
          })
        }
        else{
          alert("Entered otp is incorrect")
        }
       
      }


    return (
        <View >
            <Text onPress={() => {
                if(allow1=="false"){
                    setallow1("true")
                }
                if(allow1=="true"){
                    setallow1("false")
                }

            }}>Change Email</Text>
            {
                allow1 === "true" ?  <View>
                <TextInput placeholder="New Email..."  onChangeText={(e)=>setEmail(e)} style={styles.comment}></TextInput>
                <Button onPress={UpdateEmail} title="submit"></Button> 
                {
                  allow3 ? <View>
                    <TextInput  placeholder="OTP..."  onChangeText={(text) => { setotp(text) }} style={{
                    fontSize: 20,
                    borderWidth:2,
                    marginBottom:10,
                }}/>
                 <Button onPress={Verify} title="Verify OTP"></Button>
                  </View> :null
                }
                </View>
                 : null
            }

            <Text onPress={() => {
                 if(allow2=="false"){
                    setallow2("true")
                }
                if(allow2=="true"){ 
                    setallow2("false")
                }
            }}>Change Password</Text>
            {
                allow2 === "true" ? 
                <View>
                <TextInput placeholder="new password..."  onChangeText={(e)=>setNewPassword(e)} style={styles.comment}></TextInput>
                <TextInput placeholder="new password..."  onChangeText={(e)=>setNewConfirmPassword(e)} style={styles.comment}></TextInput>
                <Button onPress={UpdatePass} title="submit"></Button> 
               </View>
                 : null
            }
        </View>
    )
}


const styles=StyleSheet.create({
   
    
    comment:{
     fontSize: 20,
     paddingLeft: 10,
     borderWidth: 3,
     marginBottom: 5,
     marginLeft:10,
     marginRight:5,
     width:'80%',
     borderRadius:15,
    },
 
     
     
 })