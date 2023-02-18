import { View, Text, Button, StyleSheet } from "react-native";
import { Video, AVPlaybackStatus } from 'expo-av';
import React, { Component } from 'react';
import { Header, ListItem, Avatar, Card, Icon, Divider } from '@rneui/themed';
const Agronomic = () => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  return (
    <View style={styles.container}>
      <Card>
        <Card.Title>VIDEO</Card.Title>
        <Card.Divider />
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
        <Text style={{ marginBottom: 10, lineHeight: 20 }}>
          La agronomia es la ciencia que estudia los procesos biologicos y fisicos que ocurren en los suelos y en las plantas.
        </Text>
        <Button
          color="#F09E54"
          title="Leer más"
        />
      </Card>

    </View>
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
    width: 335,
    height: 220,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});