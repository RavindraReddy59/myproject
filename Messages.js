import axios from "axios";
import React, { useState,useEffect,useRef } from "react";
import {View,Button,Text,StyleSheet,ScrollView,TextInput,TouchableOpacity,Image} from 'react-native';
// import StartPage from "./StartPage";
// import Profile from "./Profile";


export default function Messages({navigation,route}){
    const username=route.params.username;
    const frndname=route.params.frndname;
const [allow2,setallow2]=useState("false")
const [allow3,setallow3]=useState("false")
const [allow4,setallow4]=useState("false")
const [Msg,setMsg]=useState("")
const [MsgData, setMsgData] = useState([])
const [messagelist, setmessagelist] = useState([])
const [time,settime]=useState([])
const [id,setid]=useState("")
const [Dlist,setDlist]=useState([])
const [userData, setuserData] = useState([])
const scrollViewRef=useRef();

useEffect(()=>{

    axios.get("http://192.168.128.218:3003/getdp").then((res) => {
        setuserData(res.data)

    })

    axios.get("http://192.168.128.218:3003/getMsgs").then((res) => {
        setMsgData(res.data)

    })
 //  console.log(MsgData.length)
    if(MsgData.length!==0){
        MsgData.map((e)=>{
            if((e.username===username && e.frndname===frndname) || (e.username===frndname && e.frndname===username)){
            setmessagelist(e.messagelist)
            settime(e.time)
            }
        })
    }
},[MsgData])



    

    function SendMsg(){

        
        if(MsgData.length!==0){
                
            MsgData.map((e)=>{
              
        if((e.username===username && e.frndname===frndname) || (e.username===frndname && e.frndname===username)){
           
        setid(e._id)
        setmessagelist(e.messagelist)
        settime(e.time)
        setallow4("true")
        }
        })
        if(allow4==="true" && Msg.length>0){
        messagelist.push(Msg)
        time.push((new Date(Date.now()).getHours()+":"+new Date(Date.now()).getMinutes()).toString())
        axios.put("http://192.168.128.218:3003/Msgfrnd2",{messagelist:messagelist,time:time,id:id})
        .then((res)=>{
        // console.log("response is",res)
        if(res.data.message==="updated"){
        setMsg("")
        }
        })
        }
        }
        if(MsgData.length===0){
          messagelist.push(Msg)
          time.push((new Date(Date.now()).getHours()+":"+new Date(Date.now()).getMinutes()).toString())
          axios.post("http://192.168.128.218:3003/Msgfrnd1",{username,frndname,messagelist,time}).then((res)=>{
            if(res.data.message==="Message addedd Successfully"){
                setMsg("")
                }
       
        })
        
        }
       



    }

    
    return(
        <>
      <View style={styles.header}>
      <Text style={styles.Heading2} >⬅️  </Text>
      {
            userData.map((e1) => {
            if(e1.username===frndname){
                return(
                <Image source={{ uri: e1.userdp }} style={{ width: 50, height: 50, borderRadius: 100, alignSelf: 'center' }}></Image>
                
                )
                }
            
        })
    }
                              
      <Text style={styles.Heading1} >{frndname}</Text>
      </View>


         <ScrollView style={styles.content1} >
            {   
                messagelist.map((e)=>{
                    return(
                        <Text style={{fontSize:20}}>{e}</Text>
                        
                    )
                   
                })
            }
         </ScrollView>

         

            <View style={styles.footer}>
        <TextInput placeholder="Message..." defaultValue={Msg} style={styles.icon1} onChangeText={(e)=>setMsg(e)}></TextInput>
        <TouchableOpacity onPress={SendMsg}><Text style={styles.icon2}>📩</Text></TouchableOpacity>
        </View>
        </>
    )
}


{/* <ScrollView style={{marginTp:40}} ref={scrollViewRef} 
                           onContentSizeChange={()=>scrollViewRef.current.scrollToEnd({animated:true})}></ScrollView> */}
const styles=StyleSheet.create({
    icon1:{
        fontSize:20,
        marginLeft:5,
        marginBottom:3,
        backgroundColor:'whitesmoke',
        color:'black',
        borderWidth:3,
        borderColor:'black',
        borderRadius:15,
        paddingLeft:15,
        width:'85%',
    },
    icon2:{
        fontSize:30,
        marginBottom:3,
    },
    content1:{
        flex:1,
        marginTop:45,
        marginLeft:20,
    },
    content:{
        top:60,
        flexDirection:'row',
       justifyContent:'space-between',
       borderWidth:2,
       borderTopColor:'white',
       borderRightColor:'white',
       borderLeftColor:'white',
       borderBottomColor:'black',

    },
    footer:
    {
        fontSize:70,
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'whitesmoke',
        position:'relative',
        bottom:0,
       
        

    },
    header: {
        flexDirection: 'row',
        position: 'relative',
        backgroundColor: 'black',
        width: '100%',
        top: 50
    },
    Heading1: {
        fontSize: 30,
        marginLeft: 20,
        color:"whitesmoke",
    },
    Heading2: {
        fontSize: 30,
        marginLeft: 10,
        color:"whitesmoke",
    },
   
    
})


