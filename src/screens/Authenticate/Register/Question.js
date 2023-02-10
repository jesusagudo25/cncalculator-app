import { View, Text, TextInput, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Button } from '@rneui/themed'
const Question = () => {

  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  return (
    <View style={styles.container}>
      <Text style={styles.textPrimary}>Preguntas de seguridad</Text>
      <Text style={styles.textSecundary}>Las preguntas de seguridad son una forma de recuperar tu cuenta en caso de que olvides tu contraseña.</Text>

      <Text
        style={{
          fontSize: 15,
          fontWeight: "bold",
          textAlign: "left",
          marginBottom: 14,
          color: "#43484d"
        }}
      >¿Cuál es tu color favorito?</Text>
      <TextInput style={styles.inputText} placeholder='Ingresa tu respuesta' />

      <Text
        style={{
          fontSize: 15,
          fontWeight: "bold",
          textAlign: "left",
          marginBottom: 14,
          color: "#43484d"
        }}
      >¿Cuál es tu comida favorita?</Text>
      <TextInput style={styles.inputText} placeholder='Ingresa tu respuesta' />


      <Button
        title='Registrarse'
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
      />


    </View>
  )
}

export default Question

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