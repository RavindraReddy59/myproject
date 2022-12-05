import axios from "axios";
import React, { useState,useEffect } from "react";
import {View,Button,Text,StyleSheet,ScrollView,TextInput,Image} from 'react-native'



export default function Comments({navigation,route}){
    const postid=route.params.id
    const commentername=route.params.username
    const [allow1,setallow1]=useState("")
    const [allow2,setallow2]=useState("")
    const [commentlist, setcommentlist] = useState([])
    const [comment,setcomment]=useState("")
    const [userdp,setuserdp]=useState([])

    useEffect(()=>{
   
        axios.get("http://192.168.128.218:3003/getcomments").then((res) => {
            setcommentlist(res.data)
            })
            axios.get("http://192.168.128.218:3003/getdp").then((res) => {
                setuserdp(res.data)
            })
        
    },[commentlist])
   
 function AddComment(){
     if(comment!==" ")
      axios.post("http://192.168.128.218:3003/addcomment",{commentername,postid,comment}).then((res)=>{setcomment("")})
 }

    

    return(
        <>

            <ScrollView >
              {
                commentlist.map((e)=>{
                    if(e.postid===postid){
                        return(<View style={styles.content}>
                             {
                                        userdp.map((e1) => {
                                            if (e1.username === e.commentername) {
                                                return (
                                                    <Image source={{ uri: e1.userdp }} style={styles.imageStyle}  onPress={() => navigation.navigate('Profile2', { username: e.commentername })} />
                                                )
                                            }
                                        })
                                    }

                             <Text style={styles.text}  onPress={() => navigation.navigate('Profile2', { username: e.commentername })}>{e.commentername} :</Text>
                            <Text style={styles.text1}>{e.comment}</Text>
                           
                            </View>)
                     }
                    
                })
              }
            </ScrollView>
        <View style={styles.footer}>
        <TextInput placeholder="Add a Comment..." defaultValue={comment} onChangeText={(text) => setcomment(text)}  style={styles.comment} ></TextInput>
        <Text style={{fontSize: 30,marginBottom:8}} onPress={AddComment}>📩</Text>
        </View>
        </>
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
   text: {
    fontSize:15,
    paddingTop:10,
     marginLeft:15,
     fontWeight:'bold',


},
text1: {
    fontSize: 15,
    paddingTop:10,
     marginLeft:15,
   


},
content:{
flexDirection:'row',

},

    footer:
    {
        
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'whitesmoke',
        position: 'relative',
        marginBottom: 0,
        width: '100%',

        

    },
    imageStyle:{
        width: 50,
        height: 50,
         borderRadius: 100, 
        //   alignSelf: 'center',
         borderWidth:3,
         marginBottom:10,
         marginLeft: 10,
    }
    

    
    
})