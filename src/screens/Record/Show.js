import { View, Text, StyleSheet, ActivityIndicator, ScrollView, AppState } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { config } from '../../config';
import { Image } from '@rneui/themed'

import Connection from '../../components/Connection';
import StatusApp from '../../components/StatusApp';

const loading = () => {
  //Se utiliza para mostrar loading mientras se hace la peticion.
  return (
    <View>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

const Show = ({ route, navigation }) => {

  const [id, setId] = useState(route.params.id);
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState([]);

  const [appStatus, setAppStatus] = useState(AppState.currentState);
  const [isConnected, setIsConnected] = useState(true);
  const [connectionType, setConnectionType] = useState('none');

  useEffect(() => {
    if (route.params?.id) {
      console.log(route.params.id);
      setId(route.params.id);
    }
  }, [route.params?.id]);

  const getInformation = async () => {
    try {
      const response = await axios.get(`${config.API_URL}/records/${id}`);
      console.log(response.data);
      setResult(response.data.record);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInformation();
  }, []);

  return (
    <ScrollView style={{
      backgroundColor: "#FFF",
    }}>
      <View>
        {
          isLoading ? loading() :
            <View style={styles.container}>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Image source={require('../../../assets/images/environment.png')} style={{ width: 150, height: 150, alignSelf: "center" }} />
              </View>
              <View>
                <Text style={styles.textPrimary}>Resultados</Text>
                <Text style={styles.textSecundary}>Se presentan los resultados del calculo realizado</Text>
              </View>
              <View>
                {/* Table header */}
                <View style={stylesTable.headerContainer}>
                  <Text style={stylesTable.headerLeft}>Ingredientes</Text>
                  <Text style={stylesTable.headerRight}>Cantidad</Text>

                </View>
                {
                  result.ingredients.map((item, index) => {
                    return (
                      <View style={stylesTable.itemsContainer} key={index}>
                        <Text style={stylesTable.itemLeft}>{item.name}</Text>
                        <Text style={stylesTable.itemRight}>{item.pivot.amount} {result.unit}</Text>
                      </View>
                    )
                  })
                }
              </View>

            </View>
        }
        <StatusApp appStatus={appStatus} setAppStatus={setAppStatus} navigation={navigation} />
        <Connection setIsConnected={setIsConnected} setConnectionType={setConnectionType} navigation={navigation} />
      </View>
    </ScrollView>
  )
}

export default Show

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 30,
    marginTop: 25
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
  },
});

const stylesTable = StyleSheet.create({

  header: {
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textPrimary: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
  },
  textSecundary: {
    textAlign: 'center',
    fontSize: 18,
    color: '#43484d',
  },
  itemsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderBottomColor: '#ababab',
    borderBottomWidth: 1,
    height: 60,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderBottomColor: '#ababab',
    borderBottomWidth: 1,
    height: 50,
    backgroundColor: '#f2f2f2',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  itemLeft: {
    padding: 10,
    fontSize: 14,
    fontWeight: '500',
    color: '#371B34',
  },
  itemRight: {
    padding: 10,
    fontSize: 14,
    fontWeight: '400',
    color: '#573926',
  },
  headerLeft: {
    padding: 10,
    fontSize: 12,
    fontWeight: '400',
    color: '#747474',
    textTransform: 'uppercase',
  },
  headerRight: {
    padding: 10,
    fontSize: 12,
    fontWeight: '400',
    color: '#747474',
    textTransform: 'uppercase',
  },
  buttonContainer: {
    marginVertical: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#00bcd4',
    padding: 10,
    borderRadius: 5,
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  }
});