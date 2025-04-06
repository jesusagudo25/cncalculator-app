import { View, Text, Button, StyleSheet, ScrollView, Dimensions, AppState } from "react-native";
import { Video } from 'expo-av';
import React, { useState } from 'react'
import { Card } from '@rneui/themed';

import Connection from "../../components/Connection";
import StatusApp from "../../components/StatusApp";

const Agronomic = ({ navigation }) => {

  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  const [appStatus, setAppStatus] = useState(AppState.currentState);
  const [isConnected, setIsConnected] = useState(true);
  const [connectionType, setConnectionType] = useState('none');

  return (
    <ScrollView>
      <View style={styles.container}>
        <Card>
          <Card.Title style={{
            color: '#371B34'
          }}>VIDEO</Card.Title>
          <Card.Divider style={{
            backgroundColor: '#F09E54',
          }} />
          <Video
            ref={video}
            style={styles.video}
            source={{
              uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
            }}
            useNativeControls
            resizeMode="contain"
            isLooping
            onPlaybackStatusUpdate={status => setStatus(() => status)}
          />
          <Text style={{ marginBottom: 10, lineHeight: 20, color: '#371B34' }}>
            La agronomia es la ciencia que estudia los procesos biologicos y fisicos que ocurren en los suelos y en las plantas.
          </Text>
          <Button
            color="#F09E54"
            title="Leer más"
          />
        </Card>

        <StatusApp appStatus={appStatus} setAppStatus={setAppStatus} navigation={navigation} />
        <Connection setIsConnected={setIsConnected} setConnectionType={setConnectionType} navigation={navigation} />
      </View>
    </ScrollView>
  )
}

export default Agronomic

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  video: {
    alignSelf: 'center',
    width: Dimensions.get('window').width - 60,
    height: 220,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});