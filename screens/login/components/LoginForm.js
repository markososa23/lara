import React, { useEffect } from 'react';
import { View, StyleSheet, Text, TextInput,Image } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Button } from 'react-native-elements';
import useUser from '../../../hooks/useUser';

export default function LoginForm(props) {
  const { isLoginLoading, hasLoginError, login, isLogged } = useUser();
  const { control, handleSubmit, errors } = useForm();
  const onSubmit = async (data) => {
   //const { username, password } = data;
    console.log("USERNAME",data);
 
            username="eve.holt@reqres.in";
            password="cityslicka";
          /*       "email": "eve.holt@reqres.in",
                "password": "cityslicka" */
            
     
   login({ username, password });
  };

  useEffect(() => {
    if (isLogged === true) {
    //  props.nav('Home');
    }
  }, [isLogged, props.nav]);

  return (
    <View style={styles.logincontainer}>
      <Controller
        control={control}
        name="username"
        rules={{ required: 'El usuario es requerido' }}
        render={({ field }) => (
          <View style={styles.inputContainer}>
          <View style={styles.iconContainer}>
            <Image
              style={styles.icon}
              source={require('../profile.png')}
            />
          </View>
          <TextInput
            onChangeText={field.onChange}
            placeholderTextColor="black"
            style={styles.input}
            placeholder="Usuario"
            value={field.value}
          />
          </View>
        )}
      />
        {errors && errors.username && <Text style={styles.textError}>{errors.username.message}</Text>}

      <Controller
        control={control}
        name="password"
        rules={{ required: 'La contraseña es requerida' }}
        render={({ field }) => (
          <View style={styles.inputContainer}>
            <View style={styles.iconContainer}>
              <Image
                style={styles.icon}
                source={require('../lock.png')}
              />
            </View>
            <TextInput
              style={styles.input}
              placeholderTextColor="black"
              placeholder="Contraseña"
              secureTextEntry
              onChangeText={field.onChange}
              value={field.value}
            />
          </View>
        )}
      />
{errors && errors.password && <Text style={styles.textError}>{errors.password.message}</Text>}
      {errors && errors.root && <Text style={styles.textError}>{errors.root.message}</Text>}

      <View style={styles.button}>
        <Button
  buttonStyle={{
    backgroundColor: '#9bcbd1',
    width: 200,
    borderRadius: 15, 
    margin:15
  }}
  titleStyle={{
    color: '#153645',
          }}
          title="Iniciar sesión"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logincontainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    height: 40,
    width: 200,
    paddingLeft: 10,
    paddingLeft: 4,
    borderRadius: 20,
    marginVertical:10
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    width: 200,
    marginRight: 30,
    borderRadius: 20,
    marginVertical: 10,
  },
  iconContainer: {
    marginRight: 8,
  },
  icon: {
    width: 20,
    height: 20,
  },
  textError: {
    color: 'white',
  },
});