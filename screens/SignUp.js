import {React, useState} from 'react';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../config/firebase';
import {StyleSheet, Text, View,  TextInput, Image, SafeAreaView, TouchableOpacity,  Alert} from "react-native";
const img = require("../assets/3d-abstract-techno-background-with-connecting-lines-dots.jpg");

const SignUp = ({navigation}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSignUp =  async () => {
        if(email !== '' && password !== ''){
            try {
                await createUserWithEmailAndPassword(auth, email, password)
                Alert.alert("SignUp success!!")
                console.log("SignUp Success")
            } catch (error) {
                Alert.alert("SignUp failure due to error")
                console.log(error)
            }
        }
    }
  return (
    <View style={styles.container}>
        <Image source={img} style={styles.backImage} />
        <View style={styles.whiteSheet}/>
        <SafeAreaView style={styles.form}>
      <Text style={styles.title}>Kali Native Chat App</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Enter your email address" 
        autoCapitalize='none'
        keyboardType='email-address'
        autoFocus={true}
        onChangeText={text=>setEmail(text)}
        textContentType='emailAddress'
      />
      <TextInput 
        style={styles.input} 
        placeholder="Enter your password" 
        secureTextEntry={true}
        autoCapitalize='none'
        textContentType='password'
        value={password}
        autoCorrect={false}
        onChangeText={(text) => setPassword(text)}
      />
      
      <TouchableOpacity style={styles.button } onPress={handleSignUp}>
        <Text style={{fontWeight:'bold', color: '#fff', fontSize: 20, alignSelf:'center'}}>
            Sign Up
        </Text>
      </TouchableOpacity>

      <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center', gap: 5 }}> 
        <Text style={{fontSize: 14, fontWeight: '800', color: 'gray'}}>
            Already have an account?
        </Text>
        {/* Add naigation functionality here */}
        <TouchableOpacity onPress={() => navigation.navigate("Login")} >
            <Text style={{fontSize: 14, fontWeight: '800', color: 'red'}}>
                Login 
            </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>

      
    </View>
  )
}

const styles = StyleSheet.create({
    backImage: {
        height: 340,
        width: '100%',
        resizeMode: 'cover',
        position: 'absolute',
        top: 0
    },
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    title: {
        paddingBottom: 24 ,
        color: 'red',
        fontSize: 34,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    form : {
        marginHorizontal: 30,
        flex:1,
        justifyContent:'center',
        alignItems: 'center'
    },
    whiteSheet: {
        width: '100%',
        height: '75%',
        position:'absolute',
        backgroundColor: '#fff',
        bottom: 0,
        borderTopLeftRadius: 60, 
        borderTopRightRadius: 60
    },
    button: {
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignContent: 'center',
        marginTop: 40,
        backgroundColor: 'red',
        textAlign: 'center',
        width: '100%'
    },
    input: {
        height: 58,
        margin: 12,
        padding: 10,
        borderRadius: 10,
        fontSize: 15,
        marginBottom: 20,
        backgroundColor: '#f2f2f2',
        width:'100%'
    }
})


export default SignUp