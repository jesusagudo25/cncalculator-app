import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Dimensions, ImageBackground, TouchableOpacity } from "react-native";
import { Header, ListItem, Card, Icon, Divider, BottomSheet, Text, Image } from '@rneui/themed';


const Home = ({ navigation }) => {

  const [isVisible, setIsVisible] = useState(false);

  const list = [
    { title: 'Funcionamiento',
      onPress: () => setIsVisible(false),
    },
    { title: 'Aspectos agronómicos',
      onPress: () => setIsVisible(false),
    },
    { title: 'Contactar a un asesor',
      onPress: () => setIsVisible(false),
    },
    {
      title: 'Cerrar',
      containerStyle: { backgroundColor: '#53A06E' },
      titleStyle: { color: 'white' },
      onPress: () => setIsVisible(false),
    },
  ];

  const calculator = { uri: "https://plus.unsplash.com/premium_photo-1663045734621-98e1f1007c34?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" };
  const history = { uri: "https://plus.unsplash.com/premium_photo-1663040310399-28080634fc91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" };

  const premium = { uri: "https://revistapesquisa.fapesp.br/wp-content/uploads/2019/09/038-040_Rel.-agricultura_271-1200px-1-1.png" };

  return (
    <View>
      <Header
        backgroundColor="#53A06E"
        barStyle="default"
        centerComponent={{
          text: "¡Hola, Katherine!",
          style: { color: "#fff", fontSize: 16 }
        }}
        centerContainerStyle={{}}
        containerStyle={{ width: Dimensions.get("window").width }}
        leftComponent={
          <TouchableOpacity onPress={() => setIsVisible(true)} >
            <Icon name="info" color="white" />
          </TouchableOpacity>
        }
        leftContainerStyle={{}}
        linearGradientProps={{}}
        placement="center"
        rightComponent={
          <TouchableOpacity >
            <Icon name="logout" color="white" />
          </TouchableOpacity>
        }
        rightContainerStyle={{}}
        statusBarProps={{}}
      />

      <BottomSheet modalProps={{}} isVisible={isVisible}>
        {list.map((l, i) => (
          <ListItem
            key={i}
            containerStyle={l.containerStyle}
            onPress={l.onPress}
          >
            <ListItem.Content>
              <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>

      <Card
        containerStyle={{
          borderRadius: 6,
          marginTop: 20,
        }}
      >
        <Card.Title style={{ textAlign: 'left' }}>¿Qué quieres hacer hoy?</Card.Title>
        <Card.Divider />
        <View style={styles.vertical}>
          <TouchableOpacity
            style={styles.buttonFacebookStyle}
            activeOpacity={0.5}
            onPress={() => {
              navigation.navigate('Calculator');
            }}
          >
            <ImageBackground source={calculator} resizeMode="cover" style={styles.image} imageStyle={{ borderRadius: 6 }}>
              <Text style={styles.text}>Calculadora</Text>
            </ImageBackground>
          </TouchableOpacity>
          <Divider orientation="vertical" />
          <TouchableOpacity
            style={styles.buttonFacebookStyle}
            activeOpacity={0.5}
            onPress={() => {
              navigation.navigate('Record');
            }}
          >
            <ImageBackground source={history} resizeMode="cover" style={styles.image} imageStyle={{ borderRadius: 6 }}>
              <Text style={styles.text}>Historial</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </Card>

      <Card
        containerStyle={{
          height: 180,
          width: Dimensions.get("window").width - 20,
          borderRadius: 6,
          marginTop: 20,
        }}
      >
        <Card.Title style={{ textAlign: 'left' }}>¡Actualiza tu cuenta!</Card.Title>
        <Card.Divider />
        <TouchableOpacity
          style={styles.buttonRequest}
          activeOpacity={0.5}
          onPress={() => {
            navigation.navigate('RequestAppoinment');
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <View style={{
              flexDirection: 'column',
              width: '60%',
            }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  textAlign: 'left',
                  marginBottom: 5,
                }}
              >Plan premium</Text>
              <Text
                style={{
                  fontSize: 15,
                  textAlign: 'left',
                }}
              >Obtienes multiples beneficios para tu cuenta</Text>
            </View>

            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '40%',
              }}
            >
              <Image source={premium} style={{ width: 80, height: 80 }} />

            </View>
          </View>
        </TouchableOpacity>
      </Card>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  vertical: {
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  image: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    borderRadius: 100
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0"
  },
  button: {
    position: 'absolute',
    borderRadius: 100,
    padding: 20,
  },
  containerPercentage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonRequest: {
    height: 130,
  },
  textPercentage: {
    color: '#43484d',
    fontSize: 18,
    textAlign: 'center',
    position: 'absolute',
    padding: 20,
  },
  textRequest: {
    color: '#43484d',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});