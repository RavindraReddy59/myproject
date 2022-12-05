import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, TextInput, Button, ScrollView, Image } from 'react-native';
import axios from 'axios';

export default function FriendsList({ navigation, route }) {
    const username = route.params.username;

    const [FriendList, setFriendList] = useState([])
    const [Dlist, setDlist] = useState([])
    const [Dlist1, setDlist1] = useState([])
    const [userdp, setuserdp] = useState([])


    useEffect(() => {
        axios.get("http://192.168.128.218:3003/getfriends").then((res) => {
            setDlist(res.data)

        })

        axios.get("http://192.168.128.218:3003/getdp").then((res) => {
            setuserdp(res.data)
        })


    }, [])



    return (
        <>
            <ScrollView>
                {

                    (Dlist).map((e, id) => {
                        if (e.username === username) {
                            return (<View key={id}>
                                <View style={styles.content}>
                                    {
                                        userdp.map((e1) => {
                                            if (e1.username === e.friendlist) {
                                                return (
                                                    <Image source={{ uri: e1.userdp }} style={styles.imageStyle} />
                                                )
                                            }
                                        })
                                    }
                                    <Text style={styles.text} onPress={() => navigation.navigate('Profile2', { username: e.friendlist })}>{e.friendlist}</Text>
                                    <View style={styles.text1}>
                                        <Text style={styles.button1} onPress={() => navigation.navigate('Messages', { username: username, frndname: e.friendlist })}>Message</Text>

                                        <Text style={styles.button2}>Remove</Text>
                                    </View>
                                </View>
                            </View>)
                        }

                        if (e.friendlist === username) {
                            return (<View key={id}>
                                <View style={styles.content}>
                                    {
                                        userdp.map((e1) => {
                                            if (e1.username === e.username) {
                                                return (
                                                    <Image source={{ uri: e1.userdp }} style={styles.imageStyle}  onPress={() => navigation.navigate('Profile2', { username: e.username })} />
                                                )
                                            }
                                        })
                                    }
                                    <Text style={styles.text}  onPress={() => navigation.navigate('Profile2', { username: e.username})}>{e.username}</Text>
                                    <View style={styles.text1}>
                                        <Text style={styles.button1} onPress={() => navigation.navigate('Messages', { username: username, frndname: e.username })}>Message</Text>

                                        <Text style={styles.button2}>Remove</Text>
                                    </View>
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
       
        paddingTop: 10,
        marginLeft: 15,

    },
    text1: {
        flexDirection: 'row',
    },
    button1: {

        fontSize: 20,
        marginTop: 5,
        borderWidth: 3,
        borderRadius: 10,
        backgroundColor: 'lightgreen',
        borderColor: 'lightgreen',
        marginRight: 5,
        padding: 5,
        marginBottom: 5,

    },
    button2: {

        fontSize: 20,
        marginTop: 5,
        borderWidth: 3,
        borderRadius: 10,
        backgroundColor: 'red',
        borderColor: 'red',
        marginRight: 5,
        padding: 5,
        marginBottom: 5,

    },
    icon: {
        fontSize: 50,
    },
    content: {

        flex: 1,
        flexDirection: 'row',
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
    Heading3: {
        fontSize: 30,
        // marginTop:50,

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
    imageStyle: {
        width: 50,
        height: 50,
        borderRadius: 100,
        //  alignSelf: 'center',
        borderWidth: 3,
        marginBottom: 10,
        marginLeft: 10,
    },




})










