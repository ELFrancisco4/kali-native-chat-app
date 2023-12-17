import React, {useEffect, useLayoutEffect, useCallback, useState} from 'react'
import { View,TouchableOpacity } from 'react-native'
import {GiftedChat} from 'react-native-gifted-chat'
import {addDoc, collection, orderBy, query, onSnapshot} from 'firebase/firestore'
import {signOut} from 'firebase/auth'
import { auth, database } from '../config/firebase' 
import { useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'
const Chat = () => {
  const [messages, setMessages] =useState([])
  const navigation = useNavigation()

  const onSignOut =  async() => {
    try {
      await signOut(auth)
    } catch (error) {
      console.log(error)
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {return <TouchableOpacity style={{marginRight: 10}} onPress={() => onSignOut()}> 
        <AntDesign name='logout' size={24} color={'gray'}  style={{marginRight: 10}} />
      </TouchableOpacity>}
    })
  })

  useLayoutEffect(() => {
    const collectionRef = collection(database, 'chats')
    const q = query(collectionRef, ref => ref.orderBy('createdAt', 'asc'))

    const unsubscribe = onSnapshot(q, snapshot => {
      setMessages(
        snapshot.docs.map(doc => ({
          _id: doc.id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user
        }))
      )
    })
    return () => unsubscribe()
  }, []) 

  const onSend = useCallback((messages = []) => {
    setMessages(prevMessages => GiftedChat.append(prevMessages, messages))
    const {_id, createdAt, text, user} = messages[0]
    addDoc(collection(database, 'chats'), {
      _id,
      createdAt,
      text,
      user
    });
  }, [])
  
return (
  <View style={{ flex: 1, backgroundColor: '#f55757', }}>
   <GiftedChat inverted={false}  messages={messages} onSend={messages =>  onSend(messages)} user={
    {
      _id: auth.currentUser?.email,
      avatar: 'https://picsum.photos/id/237/200/300',
    }
   }
   />
  </View>
  )
}

export default Chat