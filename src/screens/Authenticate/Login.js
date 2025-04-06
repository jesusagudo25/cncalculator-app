import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, AppState } from 'react-native'
import { Button, Image, Dialog, Divider } from '@rneui/themed'
import axios from 'axios'
import { config } from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Connection from '../../components/Connection';

const Login = ({
    navigation
}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [showDialog, setShowDialog] = useState(false);
    const [message, setMessage] = useState('');

    const [isConnected, setIsConnected] = useState(true);
    const [connectionType, setConnectionType] = useState('none');

    const handleLogin = async () => {
        if (isConnected) {
            try {
                setLoading(true)
                if (email === '' || password === '') {
                    setLoading(false)
                    setMessage('Por favor, ingresa todos los datos.');
                    setShowDialog(true)
                    return
                }

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
                setLoading(false)
            } catch (error) {
                console.log(error);
                setMessage('Por favor, verifica tus credenciales.');
                setShowDialog(true)
                setLoading(false)
            }
        }
        else {
            setMessage('Por favor, verifica tu conexión a internet.');
            setShowDialog(true)
        }
    }

    useEffect(() => {

        const checkToken = async () => {
            if (isConnected) {
                const token = await AsyncStorage.getItem('token');
                if (token) {
                    navigation.navigate('Home');
                }
            }
        }

        checkToken();
    }, [])

    return (
        <ScrollView style={{ backgroundColor: "#fff" }}>
            <View style={styles.container}>
                <View style={{ justifyContent: "center", alignItems: "center", marginBottom: 20 }}>
                    <Image source={require('../../../assets/images/Rafa1.png')} style={{ width: 100, height: 100, alignSelf: "center", marginBottom: 20 }} />
                </View>

                <Text style={styles.textPrimary}>Inicio de sesión</Text>
                <Text style={styles.textSecundary}>La mano derecha del agricultor; C:N Calculator</Text>

                <TextInput style={styles.inputText} placeholder='Ingresa tu correo electrónico' onChangeText={setEmail} placeholderTextColor={'#371B34'} value={email} />
                <TextInput style={styles.inputText} placeholder='Ingresa tu contraseña' onChangeText={setPassword} placeholderTextColor={'#371B34'} value={password} secureTextEntry={true} />

                <Dialog
                    isVisible={showDialog}
                    onBackdropPress={() => setShowDialog(false)}
                >
                    <Dialog.Title title="Error" />
                    <Text>{message}</Text>
                </Dialog>

                <Connection setIsConnected={setIsConnected} setConnectionType={setConnectionType} />

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
                    loading={loading}
                />

                <Divider style={{ backgroundColor: "#F09E54", marginBottom: 10 }} />

                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('General')}
                >
                    <Text style={{ textAlign: "center", fontSize: 14, color: "#552b51", marginBottom: 10 }}>¿No tienes una cuenta? <Text style={{ fontWeight: "bold" }}>Regístrate</Text></Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.8}
                >
                    <Text style={{ textAlign: "center", fontSize: 14, color: "#552b51" }}>¿Olvidaste tu contraseña?</Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 30,
        marginTop: 25,
    },
    textPrimary: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: "#371B34"
    },
    textSecundary: {
        fontSize: 14,
        fontWeight: "400",
        textAlign: "center",
        lineHeight: 20,
        color: "#552b51",
        marginBottom: 20
    },
    inputText: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#F09E54",
        color: "#371B34",
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
    },
});
