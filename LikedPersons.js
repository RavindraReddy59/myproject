import React, { useState,useEffect } from "react";
import {View,Button,Text,StyleSheet,ScrollView,Image,FlatList} from 'react-native'
import axios from 'axios';


export default function LikedPersons({navigation,route}){
    const username=route.params.username
    const id=route.params.id
    const [userdp,setuserdp]=useState([])
    const [PostList2, setPostList2] = useState([])

   useEffect(()=>{
    axios.get("http://192.168.128.218:3003/getpost2").then((res) => {
            setPostList2(res.data)
          
        })
        axios.get("http://192.168.128.218:3003/getdp").then((res) => {
            setuserdp(res.data)
        })

   },[])
   
    return(
        <>
        <ScrollView >

                       {
                            PostList2.map((e1)=>{
                                if(e1.postid===id){
                                   return(<View>
                                    <View >
                        
                                    {
                                        e1.likedPerson.map((e2)=>{
                                            return(<View style={styles.content}>
                                                {
                                                     userdp.map((e)=>{
                                                        if(e.username===e2){
                                                            return(
                                                            <Image source={{ uri:e.userdp }} style={styles.imageStyle}  onPress={() => navigation.navigate('Profile2', { username: e1.likedPerson })}/>
                                                            )
                                                        }
                                                      })
                                                }
                                                
                                                <Text style={styles.text}  onPress={() => navigation.navigate('Profile2', { username: e2 })}>{e2}</Text>
                                                </View>
                                            )
                                        })
                                    }
                                    
                                    </View>
                                    </View>
                                   )
                                }
                            })
                        }
            
           
        </ScrollView>
         
 
        </>
    )
}
const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        paddingTop:10,
         marginLeft:15,
   

    },
   
   
    content: {
       
        flexDirection: 'row',
        borderWidth: 2,
        borderTopColor: 'white',
        borderRightColor: 'white',
        borderLeftColor: 'white',
        borderBottomColor: '#cccccc',
        //  flex: 1,
        //   justifyContent:'space-between'
         
    
    },
   
    imageStyle:{
        width: 50,
        height: 50,
         borderRadius: 100, 
        //  alignSelf: 'center',
         borderWidth:3,
         marginBottom:10,
         marginLeft: 10,
    }
   


})
