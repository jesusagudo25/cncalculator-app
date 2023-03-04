import { View, Text, Button, StyleSheet } from "react-native";
import { Video } from 'expo-av';
import React from 'react';
import { Card } from '@rneui/themed';

const Operation = () => {
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
          C:N Calculator permite mezclar los ingredientes que selecciones para elaborar compost y otros abonos orgánicos. La aplicacion estimará las cantidades de cada ingrediente  para obtener una mezcla.
        </Text>
        <Button
          color="#F09E54"
          title="Leer más"
        />
      </Card>

    </View>
  )
}

export default Operation

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