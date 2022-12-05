import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, TextInput, Button, ScrollView, Image, FlatList } from 'react-native';
import axios from 'axios';

export default function Requests({ navigation, route }) {
    const username = route.params.username;

    const [UserList, setUserList] = useState([])
    const [allow1, setallow1] = useState("false")
    const [allow2, setallow2] = useState("false")
    const [allow3, setallow3] = useState("false")
    const [allow4, setallow4] = useState("false")
    const [count, setcount] = useState(0)
    const [requestdata, setrequestdata] = useState([])
    const [Requestlist, setRequestlist] = useState([])
    const [signal, setsignal] = useState("false")
    const [id, setid] = useState("")
    const [Btitle, setBtitle] = useState("Accept")
    const [Dlist, setDlist] = useState([])
    const [Dlist1, setDlist1] = useState([])
    const [FriendData, setFriendData] = useState([])
    const [friendlist, setfriendlist] = useState("")
    const [friends, setfriends] = useState("")
    const [userdp, setuserdp] = useState([])


    useEffect(() => {

        axios.get("http://192.168.128.218:3003/getfriends").then((res) => {
            setFriendData(res.data)

        })
        axios.get("http://192.168.128.218:3003/getrequests").then((res) => {
            setDlist(res.data)

        })

        axios.get("http://192.168.128.218:3003/getdp").then((res) => {
            setuserdp(res.data)
        })

        axios.get("http://192.168.128.218:3003/getfriends").then((res) => {
            setDlist1(res.data)
            res.data.map((e) => {
                if (e.username === username) {
                    setfriends(FriendList => [...FriendList, e.friendlist])
                }
                else if (e.friendlist === username) {
                    setfriends(FriendList => [...FriendList, e.username])
                }
            })
        })


    }, [FriendData])


    function Proceed(e1, id, list) {

        setfriendlist([...friendlist, e1])
        setallow4("true")
        console.log("3")
        axios.put("http://192.168.128.218:3003/updateFrnd4", { friendlist: friendlist, id: id })
            .then((res) => {

                if (res.data.message === "updated") {
                    alert("updated successfully")

                }
            })
    }



    return (
        <>
            <ScrollView>



                {
                    Dlist.map((e1) => {
                        if (e1.username === username && !friends.includes(e1.Requestlist)) {
                            return (<View >
                                <View style={styles.content}>
                                    {
                                        userdp.map((e) => {
                                            if (e.username === e1.Requestlist) {
                                                return (
                                                    <Image source={{ uri: e.userdp }} style={styles.imageStyle} onPress={() => navigation.navigate('Profile2', { username: e1.Requestlist })} />
                                                )
                                            }
                                        })
                                    }
                                    <Text style={styles.text}  onPress={() => navigation.navigate('Profile2', { username: e1.Requestlist })}>{e1.Requestlist}</Text>
                                    <Text style={styles.text1} onPress={() => {
                                        setid(e1._id)
                                        axios.post("http://192.168.128.218:3003/updateFrnd3", { params: { username: username, friendlist: e1.Requestlist } }).then((res) => {

                                            if (res.data.message === "Request addedd Successfully") {
                                                alert("Friend Added")
                                            }
                                        })
                                    }}>Accept</Text>
                                </View>
                            </View>)
                        }
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
    text: {
        fontSize: 20,
        // paddingLeft: 15,
        // marginBottom: 10,
        paddingTop: 10,
        marginLeft: 15,



    },
    text1: {
        fontSize: 20,
        marginRight: 10,
        borderWidth: 3,
        borderColor: 'lightgreen',
        padding: 5,
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: 'lightgreen',
        borderRadius: 20,
        fontWeight: 'bold'
    },
    button1: {

        fontSize: 25,
        marginTop: 5,
        borderWidth: 3,
        borderRadius: 10,
        backgroundColor: 'lightgreen',
        marginRight: 5,

    },
    button2: {

        fontSize: 25,
        marginTop: 5,
        borderWidth: 3,
        borderRadius: 10,
        backgroundColor: 'red',
    },
    icon: {
        fontSize: 50,
    },
    content: {

        flexDirection: 'row',
        // flex:1,
        justifyContent: 'space-between',
        borderWidth: 2,
        borderTopColor: 'white',
        borderRightColor: 'white',
        borderLeftColor: 'white',
        borderBottomColor: '#cccccc',

    },
    footer:
    {
        fontSize: 70,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'whitesmoke',
        position: 'relative',
        bottom: 0,
        width: '100%',


    },
    header: {
        flexDirection: 'row',
        //justifyContent:'space-between',
        position: 'relative',
        top: 0,
        backgroundColor: 'grey',
        width: '100%',
        borderBottomStartRadius: 10,
        borderBottomEndRadius: 10,


    },
    Heading1: {
        fontSize: 40,
        marginLeft: 30,
        fontStyle: 'italic',
        fontWeight: 'bold',
    },
    Heading2: {
        fontSize: 40,
        marginLeft: 10,
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











