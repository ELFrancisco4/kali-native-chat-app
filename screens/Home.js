import React, {useEffect} from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {FontAwesome, Entypo} from '@expo/vector-icons';
import { auth } from '../config/firebase';
const imageIcon = require('../assets/archerAI.jpg');
const backgroundImg = require('../assets/35558.jpg')

const Home = () => {
    const navigation = useNavigation()
    useEffect(() => {
            navigation.setOptions({
                headerLeft: () => {
                   return <FontAwesome name='search' color='gray' size={24} style={{marginLeft: 15}}/>
                },
                headerRight: () => {
                   return <Image source={imageIcon} style={{width: 40, height: 40, marginRight: 15, borderRadius: 10}}/>
                },
                headerTitleAlign: 'center', 
            })
    }, [navigation])
  return (
    <View style={styles.container}> 
     <Image source={backgroundImg} style={styles.backgroundImage}/>
     <Text style ={{flex: 1, alignItems: 'center', justifyContent: 'center' , color: '#fff',  fontSize: 30, padding: 20, width: '100%', textAlign: 'center', fontWeight: 'bold'}}>Welcome, {(auth.currentUser.email).split('@')[0]}!</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Chat")} style={styles.chatButton}>
            <Entypo name='chat' size={24} color={'red'}/>
        </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        backgroundColor: '#fff',
    },
    chatButton: {
        backgroundColor: '#fff',
        height: 50,
        width: 50,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'orange',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: .9,
        shadowRadius: 8,
        marginRight: 20,
        marginBottom: 50
    },
    backgroundImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
    },
})
export default Home