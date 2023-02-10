import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Button, CheckBox } from '@rneui/themed'
const General = ({
    navigation
}) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [checked, setChecked] = useState(false);

    return (
        <View style={styles.container}>
            <Text style={styles.textPrimary}>Registro de usuario</Text>
            <Text style={styles.textSecundary}>La mano derecha del agricultor; C:N Calculator</Text>

            <TextInput style={styles.inputText} placeholder='Ingresa tu nombre' onChangeText={setName} value={name} />
            <TextInput style={styles.inputText} placeholder='Ingresa tu correo electrónico' onChangeText={setEmail} value={email} />
            <TextInput style={styles.inputText} placeholder='Ingresa tu contraseña' onChangeText={setPassword} value={password} />

            <CheckBox
                title='¿Has verificado los datos ingresados?'
                checked={checked}
                onPress={() => setChecked(!checked)}
                checkedColor="#F09E54"
                textStyle={{ fontWeight: "300", color: "gray" }}
                containerStyle={{ margin: 0, padding: 0, textAlign: "left", justifyContent: "flex-start", alignItems: "flex-start" }}
            />

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
                onPress={() => navigation.navigate('Home')}
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