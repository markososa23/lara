import React, { useEffect, useState } from "react";
import { View, Text, Alert, StyleSheet, Image, TouchableOpacity, Modal,ActivityIndicator } from "react-native";
import { Camera } from "expo-camera";
import * as FileSystem from 'expo-file-system';
import { Audio } from 'expo-av';

export default function HomeScreen() {
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [billete, setBillete] = useState();
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [sound, setSound] = useState();
  const [loading, setLoading] = useState(true);
  //const CLARIFAI_API_KEY = 'TU_API_KEY_DE_CLARIFAI';

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status === 'granted') {
        setIsCameraReady(true);
      } else {
        Alert.alert("Permisos de cámara no otorgados");
      }
    })();
  }, []);


  const analyzeImage = async (base64data) => {
    try {
      const API_KEY = '20852d874bbd46aba72f4a82b41d7dbf';
      const MODEL_VERSION_ID = '81605b81f4154227a01e3b5c2b724a3b';
      const API_URL = `https://api.clarifai.com/v2/users/2gsgakmce82/apps/larareconoce/models/virasoro/versions/${MODEL_VERSION_ID}/outputs`;
     
      const requestBody = {
        inputs: [
          {
            data: {
              image: {
                base64: base64data,
              }
            },
          },
        ],
      };
  
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          Authorization: `Key ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
  
      // Verificar si la solicitud fue exitosa (código de estado 200)
      if (response.ok) {
        const responseData = await response.json();
        // Manejar la respuesta de la API aquí (responseData)
        console.log(responseData.outputs[0].data);
        //
        setBillete(responseData.outputs[0].data.concepts[0].name);
        let billete= responseData.outputs[0].data.concepts[0].name;
        setLoading(false);
        if (billete=="100") {
          playSound(require('./100.mp3'));
        } else if (billete=="500") {
          playSound(require('./500.mp3'));
        } else if (billete=="200") {
          playSound(require('./200.mp3'));
        } else if (billete=="1000") {
          playSound(require('./1000.mp3'));
        }
      } else {
        setLoading(false);
        // Manejar errores de la solicitud
        throw new Error('Error al hacer la solicitud a Clarifai');
      }
    } catch (error) {
      // Manejar cualquier error que ocurra durante la solicitud
      console.error('Error al hacer la solicitud a Clarifai:', error);
    }
  };
  

  const openCamera = async () => {
    setLoading(true);
 //   analyzeImage();
     if (isCameraReady && cameraRef) {
      try {
        const { uri } = await cameraRef.takePictureAsync();

        // Leer el archivo de imagen como base64
        const base64data = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        setPhoto(uri);
        setModalVisible(true);
        await analyzeImage(base64data);
  
        //playSound(require('./100.mp3'))
          //sendToClarifai(base64data);
      } catch (error) {
        setLoading(false);
        console.error('Error al capturar la foto:', error);
      }
    } else {
      Alert.alert('La cámara no está lista. Asegúrate de otorgar los permisos y espera a que la cámara se inicie.');
    } 
  };


  const closeModal = () => {
    setModalVisible(false);
    setLoading(false);
  };

   
    const playSound = async (soundFile) => {
      console.log('Loading Sound');
      const { sound } = await Audio.Sound.createAsync(soundFile);
      setSound(sound);
  
      console.log('Playing Sound');
      await sound.playAsync();
    };



  /*   useEffect(() => {
      console.log("Entreee");
      const reproducir = async () => {
      if (billete=="100") {
        playSound(require('./100.mp3'));
      } else if (billete=="500") {
        playSound(require('./500.mp3'));
      } else if (billete=="200") {
        playSound(require('./200.mp3'));
      } else if (billete=="1000") {
        playSound(require('./1000.mp3'));
      }
    }
    reproducir();
    }, [billete]); */


  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.back}
        ref={(ref) => setCameraRef(ref)}
        onCameraReady={() => setIsCameraReady(true)}
      />
      <TouchableOpacity style={styles.captureButton} onPress={openCamera}>
        <Text style={styles.captureText}>Capturar Foto</Text>
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
         {/*  <Image source={{ uri: photo }} style={styles.modalPhoto} /> */}
         
         {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        // Aquí colocarías el contenido que se mostrará después de la carga
        <View>
          <Image source={{ uri: photo }} style={styles.modalPhoto} />
                   <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Text style={styles.closeText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
       )}


        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  captureButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 50,
    padding: 15,
  },
  captureText: {
    fontSize: 18,
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalPhoto: {
    width: 300,
    height: 300,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
  },
  closeText: {
    fontSize: 18,
    color: '#333',
  },
});