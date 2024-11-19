import React from 'react';
import { View, StyleSheet, ImageBackground} from 'react-native';
import {Text,Image } from 'react-native-elements';
import LoginForm from './components/LoginForm'

export default function LoginScren ({navigation}) {

    return (
      <ImageBackground  style={styles.image}>
        <View style={styles.overlay}>
          <View style={styles.logo}>
            <Image
              source={require('../../assets/logo.png')}
              style={{ width: 200, height: 200 }}
            />
          </View>
          <View><Text style={styles.title}>Inicia sesión</Text></View>
          <LoginForm nav={navigation}/>
          
        </View>
      </ImageBackground>
    );
  
}

const styles = StyleSheet.create({
  logo: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#153645',
    fontWeight: 'bold',
    fontSize: 32,
    textAlign: 'center',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    height: '100%',
    width: '100%',
    position: 'absolute',
    backgroundColor: '#eef5f7',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
  },
});