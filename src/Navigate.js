import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './screens/Home';
import Calculator from './screens/Calculator/Main';
import Record from './screens/Record/Main';
import Agronomic from './screens/Support/Agronomic';
import Operation from './screens/Support/Operation';
import Premium from './screens/Support/Premium';

import Email from './screens/Authenticate/Recovery/Email';
import QuestionRecovery from './screens/Authenticate/Recovery/Question';
import Change from './screens/Authenticate/Recovery/Change';

import General from './screens/Authenticate/Register/General';
import QuestionRegister from './screens/Authenticate/Register/Question';
import Login from './screens/Authenticate/Login';
import Show from './screens/Record/Show';

const Stack = createNativeStackNavigator();

const Navigate = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login" screenOptions={{
                headerStyle: {
                    backgroundColor: '#53A06E',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                }
            }}
            >
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                <Stack.Group>
                    <Stack.Screen name="Calculator" component={Calculator} options={{ headerShown: false }} />
                    <Stack.Screen name="Record" component={Record} options={{ title: 'Historial' }} />
                    <Stack.Screen name="Show" component={Show} options={{ title: 'Detalles' }} />
                </Stack.Group>

                <Stack.Group>
                    <Stack.Screen name="Agronomic" component={Agronomic} options={{ title: 'Agronomia' }}/>
                    <Stack.Screen name="Operation" component={Operation} options={{ title: 'Operacion' }}/>
                    <Stack.Screen name="Premium" component={Premium} options={{ title: 'Plan Premium' }} />
                </Stack.Group>

                <Stack.Group>
                    <Stack.Screen name="Email" component={Email} options={{ headerShown: false }} />
                    <Stack.Screen name="QuestionRecovery" component={QuestionRecovery} options={{ headerShown: false }} />
                    <Stack.Screen name="Change" component={Change} options={{ headerShown: false }} />
                </Stack.Group>

                <Stack.Group>
                    <Stack.Screen name="General" component={General} options={{ headerShown: false }} />
                    <Stack.Screen name="QuestionRegister" component={QuestionRegister} options={{ headerShown: false }} />
                </Stack.Group>

                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigate