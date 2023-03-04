import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Button, CheckBox, Image, Dialog } from '@rneui/themed'
import axios from 'axios'
import { config } from '../../../config';

const General = ({
    navigation
}) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [checked, setChecked] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [message, setMessage] = useState('');

    return (
        <View style={styles.container}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Image source={require('../../../../assets/images/register.png')} style={{ width: 250, height: 190, alignSelf: "center" }} />
            </View>

            <Text style={styles.textPrimary}>Registro de usuario</Text>
            <Text style={styles.textSecundary}>La mano derecha del agricultor; C:N Calculator</Text>

            <TextInput style={styles.inputText} placeholder='Ingresa tu nombre' onChangeText={setName} value={name} />
            <TextInput style={styles.inputText} placeholder='Ingresa tu correo electrónico' onChangeText={setEmail} value={email} />
            <TextInput style={styles.inputText} placeholder='Ingresa tu contraseña' onChangeText={setPassword} value={password} secureTextEntry={true} />

            <CheckBox
                title='¿Has verificado los datos ingresados?'
                checked={checked}
                onPress={() => setChecked(!checked)}
                checkedColor="#F09E54"
                textStyle={{ fontWeight: "300", color: "gray" }}
                containerStyle={{ margin: 0, padding: 0, textAlign: "left", justifyContent: "flex-start", alignItems: "flex-start" }}
            />

            <Dialog
                isVisible={showDialog}
                onBackdropPress={() => setShowDialog(false)}
            >
                <Dialog.Title title="Error" />
                <Text>{message}</Text>
            </Dialog>

            <Button
                title='Siguiente'
                containerStyle={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 15,
                    marginBottom: 20
                }}
                buttonStyle={{
                    backgroundColor: "#53A06E",
                    borderRadius: 3,
                    paddingHorizontal: 15,
                    paddingVertical: 10
                }}
                onPress={async () => {
                    setLoading(true)
                    if (name === '' || email === '' || password === '') {
                        setMessage('Por favor, ingresa todos los datos.');
                        setShowDialog(true);
                        setLoading(false)
                        return;
                    }
                    else if (!checked) {
                        setMessage('Por favor, verifica los datos ingresados.');
                        setShowDialog(true);
                        setLoading(false)
                        return;
                    }

                    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

                    if (emailRegex.test(email) === false) {
                        setMessage('Por favor, ingresa un correo electrónico válido.');
                        setShowDialog(true);
                        setLoading(false)
                        return;
                    }

                    const emailUnique = await axios.get(`${config.API_URL}/users/validate/${email}`)
                    if (emailUnique.data.exists) {
                        setMessage('El correo electrónico ingresado ya se encuentra registrado.');
                        setShowDialog(true);
                        setLoading(false)
                        return;
                    }
                    setLoading(false)

                    navigation.navigate('QuestionRegister', { name, email, password })
                }}
                loading={loading}
            />

            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('Login')}
            >
                <Text style={{ textAlign: "center", fontSize: 14, color: "#43484d" }}>¿Ya tienes una cuenta? <Text style={{ fontWeight: "bold" }}>Inicia sesión</Text></Text>
            </TouchableOpacity>


        </View>
    )
}

export default General

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