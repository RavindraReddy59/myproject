import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Text, StyleSheet, View, TextInput, Button, ScrollView, Image, TouchableOpacity, SafeAreaView,Pressable } from 'react-native';

export default function StartPage({ navigation,route }) {
    const username=route.params.username
    const [allow, setallow] = useState("false")
    const [allow1, setallow1] = useState(false)
    const [allow2, setallow2] = useState(false)
    const [allow3, setallow3] = useState(false)
    const [PostList, setPostList] = useState([])
    const [PostList2, setPostList2] = useState([])
    const [FriendList, setFriendList] = useState([])
    const [userData, setuserData] = useState([])
    const [usernamelist,setusernamelist]= useState([])
    const [id,setid]=useState("")
    const [commentlist, setcommentlist] = useState([])
    const [postidlist,setpostidlist]= useState([])
    
    let count=0
    let count2=0
    let count3=0
    let likedlist=[]
    let allow4=false
    let postDate;
    const [count1,setcount1]=useState(1)
    const [likedPersons,setlikedPersons]=useState([])
    
    useEffect(() => {

        axios.get("http://192.168.128.218:3003/getpost").then((res) => {

            setPostList(res.data)
            

        })
        axios.get("http://192.168.128.218:3003/getcomments").then((res) => {
            setcommentlist(res.data)
            })
        axios.get("http://192.168.128.218:3003/getfrnd").then((res) => {
            setFriendList(res.data)

        })
        axios.get("http://192.168.128.218:3003/getdp").then((res) => {
            setuserData(res.data)

        })
        axios.get("http://192.168.128.218:3003/getpost2").then((res) => {
            setPostList2(res.data)
            res.data.map((e)=>{
                setusernamelist(usernamelist=>[...usernamelist,e.username])
                setpostidlist(postidlist=>[...postidlist,e.postid])
            })
           



        })
       

    },[PostList])

    function MenuBar() {
        if (allow === "false") {
            setallow("true")
        }
        if (allow === "true") {
            setallow("false")
        }
    }
 
 



    return (
        <>

            <View style={styles.header}>
                <Text style={styles.Heading2} onPress={MenuBar}>≡</Text>
                <Text style={styles.Heading1} >Amigo</Text>

                {
                    allow === "true" ?
                        <View style={styles.menubar}>
                             <Text style={styles.menuItems} onPress={() => navigation.navigate('FriendsList', { username: username })}>👨‍👦 Friends</Text>
                            <Text style={styles.menuItems} onPress={() => navigation.navigate('Posts', { username: username })}>📸 New Post</Text>
                            <Text style={styles.menuItems} onPress={() => navigation.navigate('Groups', { username: username })}>👨‍👨‍👧‍👦 Groups</Text>
                            <Text style={styles.menuItems} onPress={() => navigation.navigate('AddFriend', { username: username })}>👧 Add Friends</Text>
                            <Text style={styles.menuItems} onPress={() => navigation.navigate('Requests', { username: username })}>👧 Requests </Text>
                            <Text style={styles.menuItems} onPress={() => navigation.navigate('Search', { username: username })}>👧 Search USers</Text>

                        </View>
                        : null
                }
            </View>


            <ScrollView style={styles.content}>

                {
                    PostList.slice(0).reverse().map((e) => {
                        likedlist=[]
                        count=0
                        count3=0
                        count2=0
                        {
                            PostList2.map((e1)=>{
                                if(e1.postid===e._id ){
                                    count=e1.likedCount
                                }
                               
                            })
                        }
                        {
                            PostList2.map((e1)=>{
                                if(e1.postid===e._id){
                                if(e1.likedPerson.includes(username)){
                                   count3=1
                                
                                }
                            }
                            })
                        }
                        

                        {
                            commentlist.map((e1)=>{
                                if(e1.postid===e._id){
                                    count2=count2+1
                                }
                            })
                        }

                        
                       
                        return (
                            <View>
                                <View style={styles.user}>
                                    {
                                         userData.map((e1) => {
                                            if(e1.username===e.username){
                                               return(
                                               <Image source={{ uri: e1.userdp }} style={{ width: 50, height: 50, borderRadius: 100, alignSelf: 'center' }}></Image>
                                                
                                                )
                                               }
                                            
                                        })
                                    }
                              
                           
                                <Text style={{fontSize:18,paddingLeft:15,marginTop:10, color:'whitesmoke',}} onPress={() => navigation.navigate('Profile2', { username: e.username })}>{e.username}</Text>
                                </View>
                                <Image source={{ uri: e.userPost }} key={e._id} style={
                                    {
                                        width: "100%",
                                        height: 400,
                                        marginBottom: 0,
                                        alignSelf: 'center',
                                        borderColor: 'gray',
                                        borderWidth: 3,
                                        

                                    }
                                } />
                               
                                <View style={styles.likes}>
                                    <Text style={{
                                         fontSize: 25,
                                         marginLeft:21,
                                         marginRight:20,
                                         color:'white',
                                        //  backgroundColor: allow1 ? 'red':'',
                                    }} onPress={()=>{
                                        if (allow2 === false) {
                                            setallow2(true)
                                        }
                                        if (allow2 === true) {
                                            setallow2(false)
                                        }
                                        
                                        // proceed(e._id)
                                    //     if(PostList2.length===0 || (!usernamelist.includes(username) && !likedlist.includes(username) ) || !postidlist.includes(e._id)){
                                           
                                    //   axios.post("http://192.168.128.218:3003/updateLikes",{params:{username:e.username,postid:e._id,likedPerson:username,likedCount:count1}})

                                    //     }
                                    //     else{
                                    //     PostList2.map((e1)=>{
                                           
                                    
                                    //      if(e1.username===e.username && e1.postid===e._id && e1.likedPerson===username && e1.isliked===true){
                                    //             axios.put("http://192.168.128.218:3003/updateLikes1",{params:{id:e1._id}})
                                    //         }
                                    //         else if(e1.username===e.username && e1.postid===e._id && e1.likedPerson===username && e1.isliked===false){
                                    //             axios.put("http://192.168.128.218:3003/updateLikes2",{params:{id:e1._id}})
                                    //         }
                                        
                                    //     else  if(e1.username===username && e1.postid===e._id && e1.likedPerson===username && e1.isliked===true){
                                    //         axios.put("http://192.168.128.218:3003/updateLikes1",{params:{id:e1._id}})
                                    //     }

                                    //     else if(e1.username===username && e1.postid===e._id && e1.likedPerson===username && e1.isliked===false){
                                    //         axios.put("http://192.168.128.218:3003/updateLikes2",{params:{id:e1._id}})
                                    //     }
                                      
                                    //     })
                                    // }
                                    if (allow1 === false) {
                                        setallow1(true)
                                    }
                                   else if (allow1 === true) {
                                        setallow1(false)
                                    } 




                                    PostList2.map((e1)=>{
                                        if(e1.postid===e._id){
                                            setid(e1.postid)
                                         e1.likedPerson.map((e2)=>{
    
                                            likedlist.push(e2)
                                        })
                                    }
                                    })
                                   
                                  
                                    
                                  
                                    if(PostList2.length===0 || !postidlist.includes(e._id)){
                                        likedlist.push(username)
                                        axios.post("http://192.168.128.218:3003/updateLikes",{params:{username:e.username,postid:e._id,likedlist:likedlist}})
                                        }
                                   
                                     if(postidlist.includes(e._id) && likedlist.includes(username)){
                                     
                                        PostList2.map((e1)=>{
                                            if(e1.postid===e._id){
                                                // setlikedlist(likedlist.filter(item=>item !==username))
                
                                                axios.put("http://192.168.128.218:3003/updateLikes1",{params:{id:e1._id,username:username}})
                                            }
                                        })
                                        
                                    }
                                    else if(postidlist.includes(e._id) && !likedlist.includes(username)){
                                        likedlist.push(username)
                                       
                                        PostList2.map((e1)=>{
                                            if(e1.postid===e._id){
                                                axios.put("http://192.168.128.218:3003/updateLikes2",{params:{id:e1._id,likedCount:e.likedCount+1,likedlist:likedlist}})
                                            }
                                        })
                                        
                                    }

                                   

                                   




                              
                                    }}>{((allow2 && id===e._id)  || count3===1) ? "❤" : "♡"}</Text>
                                   
                                    <Text style={styles.text1}>{count}</Text>
                                    <Text style={styles.text1} onPress={() => navigation.navigate('LikedPersons', { username: username,id:e._id })} >{count===1 ? "ʟɪᴋᴇ" : "ʟɪᴋᴇs"}</Text>
                                    <Text style={styles.text3}>✍ {count2}</Text>
                                    <Text style={styles.text2} onPress={() => navigation.navigate('Comments', {username: username,id:e._id })}>{count2===1 ? "ᴄᴏᴍᴍᴇɴᴛ" : "ᴄᴏᴍᴍᴇɴᴛs"}</Text>
                                    
                    
                                </View>
                                <Text style={{paddingLeft:20,fontSize:12,marginTop:-15,
                            marginBottom:10,paddingBottom:10, color:'whitesmoke',}}>{e.description}</Text>
                            
                           <Text style={{paddingLeft:20,fontSize:12, borderBottomWidth:0.3,borderColor:'#999999',marginTop:-15,
                            marginBottom:10,paddingBottom:10, color:'whitesmoke',}}>{e.postedTime}</Text>
                            </View>
                        )
                    })
                }

            </ScrollView>



            <View style={styles.footer}>
                <Text style={styles.icon} onPress={() => navigation.navigate('StartPage', { username: username })}>🏠</Text>
                <Text style={styles.icon}>Ⓜ️</Text>
                <Text style={styles.icon} onPress={() => navigation.navigate('Profile', { username: username })}>🧑‍🏫</Text>
            </View>
        </>

    )
}

const styles = StyleSheet.create({
    text3:{
        fontSize: 20,
        marginLeft:21,
        marginRight:20,
        color:'white',
    },
   
    text2: {
        fontSize: 20,
        marginRight:10,
        marginTop:5,
        color:'whitesmoke',
    },
    text1: {
        fontSize: 20,
        marginLeft:-35,
        marginRight:20,
        marginTop:5,
        color:'whitesmoke',
    },
    icon: {
        fontSize: 30,
    },
    content: {
        top: 50,
        marginBottom: 50,
        flex: 1,
        backgroundColor:'black',
        
        
       
    },
    footer:
    {
      
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'black',
        position: 'relative',
        bottom: 0,
        width: '100%',
       
        },
    header: {
        flexDirection: 'row',
        position: 'relative',
        backgroundColor: 'black',
        width: '100%',
        top: 50
    },
    Heading1: {
        fontSize: 40,
        marginLeft: 30,
        fontStyle: 'italic',
        fontWeight: 'bold',
        color:"whitesmoke",
    },
    Heading2: {
        fontSize: 40,
        marginLeft: 10,
        color:"whitesmoke",
    },
    likes: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // backgroundColor: '#2e2e2e',
        width: '100%',
        marginBottom: 20,
        
        // borderRadius: 15,
    },
    menubar: {
        marginTop: 60,
         left: '-40%',
        width: '110%',
    },
    menuItems: {
        fontSize: 20,
        padding: 20,
        color:'whitesmoke',
        backgroundColor: 'black',
    },
    user: {
       
        flexDirection: 'row',
        // backgroundColor: '#2e2e2e',
        width: '100%',
        paddingLeft: 15,
       marginTop:5,
       shadowOffset: {width: -2, height: 4},  
        shadowColor: 'red',  
        shadowOpacity: 0.5,  
        shadowRadius: 3,  
        // borderRadius: 15,
    },

})