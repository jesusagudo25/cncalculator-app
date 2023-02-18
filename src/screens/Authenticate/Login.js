import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { Button, Image } from '@rneui/themed'
import axios from 'axios'
import { config } from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({
    navigation
}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${config.API_URL}/login`, {
                email,
                password
            })
            console.log(response.data);
            await AsyncStorage.setItem('token', response.data.token)
            await AsyncStorage.setItem('id', JSON.stringify(response.data.user))
            navigation.navigate('Home');
            setEmail('')
            setPassword('')
        } catch (error) {
            console.log(error);
            alert('Usuario o contraseña incorrectos')
        }
    }


    return (
        <View style={styles.container}>
            <View style={{ justifyContent: "center", alignItems: "center", marginBottom: 20 }}>
                <Image source={require('../../../assets/images/Rafa1.png')} style={{ width: 100, height: 100, alignSelf: "center", marginBottom: 20 }} />
            </View>

            <Text style={styles.textPrimary}>Inicio de sesión</Text>
            <Text style={styles.textSecundary}>La mano derecha del agricultor; C:N Calculator</Text>

            <TextInput style={styles.inputText} placeholder='Ingresa tu correo electrónico' onChangeText={setEmail} value={email} />
            <TextInput style={styles.inputText} placeholder='Ingresa tu contraseña' onChangeText={setPassword} value={password} />

            <Button
                title='Iniciar sesión'
                containerStyle={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 10,
                    marginBottom: 20
                }}
                buttonStyle={{
                    backgroundColor: "#53A06E",
                    borderRadius: 3,
                    paddingHorizontal: 15,
                    paddingVertical: 10
                }}
                onPress={() => handleLogin()}
            />

            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('General')}
            >
                <Text style={{ textAlign: "center", fontSize: 14, color: "#43484d", marginBottom: 10 }}>¿No tienes una cuenta? <Text style={{ fontWeight: "bold" }}>Regístrate</Text></Text>
            </TouchableOpacity>

            <TouchableOpacity
                activeOpacity={0.8}
            >
                <Text style={{ textAlign: "center", fontSize: 14, color: "#43484d" }}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>

        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 30,
        backgroundColor: "white"
    },
    textPrimary: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: "#43484d"
    },
    textSecundary: {
        fontSize: 14,
        fontWeight: "400",
        textAlign: "center",
        color: "gray",
        marginBottom: 20
    },
    inputText: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#D9D9D9",
        padding: 8,
        marginBottom: 15
    },
    button: {
        backgroundColor: "#000",
        padding: 10,
        margin: 10
    },
    buttonText: {
        color: "#fff"
    },
    input: {
        borderWidth: 1,
        borderColor: "#000",
        padding: 10,
        margin: 10
    },
    inputDisabled: {
        borderWidth: 1,
        borderColor: "#000",
        padding: 10,
        margin: 10,
        backgroundColor: "#eee"
    },
    checkboxContainer: {
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        margin: 8
    },
    paragraph: {
        margin: 10,
        fontSize: 15
    },
    textFooter: {
        justifyContent: "center",
        alignItems: "center",
        textAlign: "auto"
    }
});