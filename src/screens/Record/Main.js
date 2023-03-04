import { View, Text, ActivityIndicator, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ListItem } from '@rneui/base'
import TouchableScale from 'react-native-touchable-scale'
import { Avatar, Icon, Image } from '@rneui/themed'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { config } from '../../config';

const loading = () => {
  //Se utiliza para mostrar loading mientras se hace la peticion.
  return (
    <View>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

const Main = ({ navigation }) => {

  const [isLoading, setIsLoading] = useState(true);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const getHistory = async () => {
      try {
        const id = JSON.parse(await AsyncStorage.getItem('id'));
        const response = await axios.get(`${config.API_URL}/users/${id}/records`);
        setHistory(response.data.records);
        setIsLoading(false);
        console.log(response.data.records);
      } catch (error) {
        console.log(error);
      }
    };
    getHistory();
  }, []);

  return (
    <ScrollView style={{
      backgroundColor: "#FFF",
    }}>
      <View>
        {
          isLoading ? loading() :
            <>
              {
                !Array.isArray(history) ?
                (
                  Object.keys(history).map((key, index) => {
                    return (
                      <View key={index} style={{
                        marginTop: 15,
                      }}>
                        <Text style={{ color: '#371B34', fontSize: 20, fontWeight: '400', marginHorizontal: 10, marginVertical: 5 }}>
                          <Icon name="event" color="#371B34" size={20} /> &nbsp;
                          {key}
                        </Text>
                        {
                          history[key].map((item, index) => {
                            return (
                              <ListItem
                                Component={TouchableScale}
                                friction={90}
                                tension={100}
                                activeScale={0.95}
                                onPress={() => navigation.navigate('Show', { id: item.id })}
                                containerStyle={{
                                  backgroundColor: '#F09E54',
                                  borderRadius: 10,
                                  marginHorizontal: 10,
                                  marginVertical: 5,
                                }}
                                key={index}
                              >
                                <Avatar
                                  rounded
                                  source={{
                                    uri: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100) + 1
                                      }.jpg`
                                  }}
                                />
                                <ListItem.Content>
                                  <ListItem.Title style={{ color: 'white', fontWeight: 'bold' }}>
                                    {/* Por corregir unidad */}
                                    Preparacion: {item.weight} {item.unit} - {item.cn} cn
                                  </ListItem.Title>
                                  <ListItem.Subtitle style={{ color: 'white' }}>
                                    {
                                      item.ingredients.map((ingredient, index) => {
                                        return (
                                          <Text key={index}>
                                            {ingredient.name} {
                                              item.ingredients.length - 1 === index ? '' : '-'
                                            } &nbsp;
                                          </Text>
                                        )
                                      }
                                      )
                                    }
                                  </ListItem.Subtitle>
                                </ListItem.Content>
                                <ListItem.Chevron color="white" />
                              </ListItem>
                            )
                          })
                        }
                      </View>
                    )
                  })
                )
                :
                (
                  <View style={{
                    marginTop: 15,
                    alignItems: 'center',
                  }}>
                    <Image
                      source={require('../../../assets/images/empty.png')}
                      style={{
                        width: 300,
                        height: 300,
                      }}
                    />
                    <Text style={{
                      color: '#371B34',
                      fontSize: 20,
                      fontWeight: '400',
                      marginHorizontal: 10,
                      marginVertical: 5,
                    }}>
                      No hay registros
                    </Text>
                  </View>
                )
              }
            </>
        }
      </View>
    </ScrollView>
  )
}

export default Main