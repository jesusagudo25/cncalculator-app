import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Constants from "expo-constants"
import General from './src/screens/Calculator/Main';
import Navigate from './src/Navigate';

export default function App() {
  return (
    <View style={{ marginTop: Constants.statusBarHeight, flexGrow: 1}}>
      <Navigate />
      <StatusBar style="auto" />
    </View>
  );
}