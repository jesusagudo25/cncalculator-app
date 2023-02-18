import { StyleSheet, Text, View, FlatList, Button } from 'react-native'
import React from 'react'
import { Card, Image} from '@rneui/themed';

const premium = { uri: "https://revistapesquisa.fapesp.br/wp-content/uploads/2019/09/038-040_Rel.-agricultura_271-1200px-1-1.png" };

const Premium = () => {
  return (
    <View style={styles.container}>
      <Card>
        <Card.Title>Opciones Premium</Card.Title>
        <Card.Divider />
        <View style={{ alignItems: 'center', marginBottom: 10 }}>
        <Image source={premium} style={{ width: 80, height: 80, alignSelf: 'center',
       }} />
        </View>
        <Text style={{ marginBottom: 10, lineHeight: 20 }}>
          El plan premium te permite mucho más que el plan gratuito, con el plan premium podrás acceder a más información y a más funcionalidades.
        </Text>
        <FlatList
          data={[
            { key: 'Grupo en Whatsapp.' },
            { key: 'Soporte 24/7.' },
            { key: 'Aplicacion web.' },
            { key: 'Multiples correos' },
            { key: 'Gestion de ingredientes' },
          ]}
          renderItem={({ item }) => <Text style={styles.item}>{'\u2B24' + '  '}<Text style={styles.key}>{item.key}</Text></Text>}
          style={{ marginBottom: 10 }}
        />

        <Button
          color="#F09E54"
          title="Adquirir plan premium"
        />
      </Card>
    </View>
  )
}

export default Premium

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    fontSize: 13,
    height: 25,
  }
});