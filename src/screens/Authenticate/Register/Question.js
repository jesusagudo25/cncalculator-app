import { View, Text, TextInput, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Button, Image, Dialog } from '@rneui/themed'
import axios from 'axios'
import { config } from '../../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Connection from '../../../components/Connection';

const loadingIndicator = () => {
  //Se utiliza para mostrar loading mientras se hace la peticion.
  return (
    <View>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

const Question = ({
  navigation,
  route
}) => {

  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false)
  const [questionsRandom, setQuestionsRandom] = useState([])
  const [showDialog, setShowDialog] = useState(false);

  const [isConnected, setIsConnected] = useState(true);
  const [connectionType, setConnectionType] = useState('none');

  useEffect(() => {
    getQuestions()
  }, []);

  const getQuestions = async () => {

    try {
      const response = await axios.get(`${config.API_URL}/questions`)
      const questionsRandom = response.data.sort(() => Math.random() - 0.5).slice(0, 2)
      setQuestionsRandom(questionsRandom)
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  const handleRegister = async () => {
    try {
      setLoading(true)
      const { name, email, password } = route.params

      console.log(questionsRandom);

      if (questionsRandom[0].answer === '' || questionsRandom[1].answer === '' || questionsRandom[0]?.answer === undefined || questionsRandom[1]?.answer === undefined) {
        setShowDialog(true)
        setLoading(false)
        return
      }

      const response = await axios.post(`${config.API_URL}/register`, {
        name,
        email,
        password,
        questionsRandom: questionsRandom.map(question => {
          return {
            question_id: question.id,
            answer: question.answer
          }
        })
      })

      await AsyncStorage.setItem('token', response.data.token)
      await AsyncStorage.setItem('id', JSON.stringify(response.data.user))
      setLoading(false)

      navigation.navigate('Home');

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image source={require('../../../../assets/images/questions.png')} style={{ width: 250, height: 160, alignSelf: "center" }} />
        </View>
        <Text style={styles.textPrimary}>Preguntas de seguridad</Text>
        <Text style={styles.textSecundary}>Las preguntas de seguridad son una forma de recuperar tu cuenta en caso de que olvides tu contraseña.</Text>

        {
          isLoading ? loadingIndicator() : (
            <View>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  textAlign: "left",
                  marginBottom: 14,
                  color: "#371B34"
                }}
              >
                {questionsRandom[0] && questionsRandom[0].title}
              </Text>
              <TextInput style={styles.inputText} placeholder='Ingresa tu respuesta'
                onChangeText={text => setQuestionsRandom(questionsRandom.map((question, index) => {
                  if (index === 0) {
                    return { ...question, answer: text }
                  }
                  return question
                }))}
                placeholderTextColor={'#371B34'}
              />

              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  textAlign: "left",
                  marginBottom: 14,
                  color: "#371B34"
                }}
              >
                {questionsRandom[1] && questionsRandom[1].title}
              </Text>
              <TextInput style={styles.inputText} placeholder='Ingresa tu respuesta'
                onChangeText={
                  text => setQuestionsRandom(questionsRandom.map((question, index) => {
                    if (index === 1) {
                      return { ...question, answer: text }
                    }
                    return question
                  }))
                }
                placeholderTextColor={'#371B34'}
              />

              <Dialog
                isVisible={showDialog}
                onBackdropPress={() => setShowDialog(false)}
              >
                <Dialog.Title title="Error" />
                <Text>Por favor, ingresa las respuestas a las preguntas de seguridad.</Text>
              </Dialog>

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
                onPress={handleRegister}
                loading={loading}
              />
            </View>
          )
        }

        <Connection setIsConnected={setIsConnected} setConnectionType={setConnectionType} navigation={navigation} />
      </View>
    </ScrollView>
  )
}

export default Question

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 30,
    marginTop: 25,
    backgroundColor: "#fff"
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
