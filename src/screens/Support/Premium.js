import { StyleSheet, Text, View, FlatList, Button, ScrollView, AppState } from 'react-native'
import React, { useState } from 'react'
import { Card, Image } from '@rneui/themed';

import Connection from "../../components/Connection";
import StatusApp from "../../components/StatusApp";

const Premium = ({ navigation }) => {

  const [appStatus, setAppStatus] = useState(AppState.currentState);
  const [isConnected, setIsConnected] = useState(true);
  const [connectionType, setConnectionType] = useState('none');

  return (
    <ScrollView>
      <View style={styles.container}>
        <Card>
          <Card.Title style={{ color: '#371B34' }}>Opciones Premium</Card.Title>
          <Card.Divider style={{ backgroundColor: '#F09E54' }} />
          <View style={{ alignItems: 'center', marginBottom: 10 }}>
            <Image source={require('../../../assets/images/buy.png')} style={{
              width: 200, height: 150, alignSelf: 'center',
            }} />
          </View>
          <Text style={{ marginBottom: 10, lineHeight: 20, color: '#371B34' }}>
            El plan premium te permite mucho más que el plan gratuito, con el plan premium podrás acceder a más información y a más funcionalidades.
          </Text>
          <ScrollView horizontal={true}>
            <FlatList
              data={[
                { key: 'Grupo de expertos.' },
                { key: 'Soporte 24/7.' },
                { key: 'Aplicación web.' },
                { key: 'Multiples correos' },
                { key: 'Gestión de ingredientes.' },
              ]}
              renderItem={({ item }) => <Text style={styles.item}>{'\u2B24' + '  '}<Text style={styles.key}>{item.key}</Text></Text>}
              style={{ marginBottom: 10 }}
            />
          </ScrollView>
          <Button
            color="#F09E54"
            title="Adquirir plan premium"
          />
        </Card>
        <StatusApp appStatus={appStatus} setAppStatus={setAppStatus} navigation={navigation} />
        <Connection setIsConnected={setIsConnected} setConnectionType={setConnectionType} navigation={navigation} />
      </View>
    </ScrollView>
  )
}

export default Premium

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    marginBottom: 15,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    fontSize: 13,
    height: 25,
    color: '#371B34',
  }
});