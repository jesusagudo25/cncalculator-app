import React, { useEffect, useState } from 'react'
import { View, ActivityIndicator, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, AppState } from 'react-native'
import Stepper from 'react-native-stepper-ui-jm';
import { ListItem, Image, Dialog } from '@rneui/themed';
import { config } from '../../config';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const General = (props) => {
    return (
        <View style={styles.container}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Image source={require('../../../assets/images/calculator.png')} style={{ width: 160, height: 160, alignSelf: "center" }} />
            </View>
            <Text style={styles.textPrimary}>General </Text>
            <Text style={styles.textSecundary}>Ingresa los campos requeridos</Text>

            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={{ fontSize: 16, fontWeight: '500', textAlign: 'left', color: '#371B34' }}>Unidad de medida: </Text>
                <Picker
                    selectedValue={props.unit}
                    style={{ height: 50, width: 150, color: "#552b51" }}
                    onValueChange={(itemValue, itemIndex) => {
                        props.setUnit(itemValue)
                        props.setWeight('')
                    }}
                >
                    <Picker.Item label="Libras" value="lb" />
                    <Picker.Item label="Kilogramos" value="kg" />
                    <Picker.Item label="Toneladas" value="t" />
                    <Picker.Item label="Quintales" value="q" />
                </Picker>
            </View>

            <TextInput style={styles.inputText} placeholder='Ingresa el peso' placeholderTextColor={'#371B34'} onChangeText={props.setWeight} value={props.weight} keyboardType='numeric' />

            <TextInput style={styles.inputText} placeholder='Ingresa el valor de C:N' placeholderTextColor={'#371B34'} onChangeText={props.setCn} value={props.cn} keyboardType='number-pad' />

            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => props.navigation.navigate('Operation')}
            >
                <Text style={{ textAlign: "center", fontSize: 14, color: "#552b51", marginTop: 10 }}>¿Has revisado el centro de ayuda?</Text>
            </TouchableOpacity>

        </View>
    )
}

const Ingredients = (props) => {

    const [isLoading, setIsLoading] = useState(true);

    const getIngredients = async () => {
        const response = await axios.get(`${config.API_URL}/ingredients`);
        props.setIngredients(response.data);
        props.setIngredientsSelected(
            response.data.map((item) => {
                return {
                    checked: false,
                    id: item.id,
                    cn: item.carbon_nitrogen
                }
            })
        );
        setIsLoading(false);
        console.log(response.data);
    }

    useEffect(() => {
        getIngredients();
    }, []);

    const handleCheck = (id) => {
        const index = props.ingredients.findIndex((ingredient) => ingredient.id === id);
        const newIngredientsSelected = [...props.ingredientsSelected];
        newIngredientsSelected[index].checked = !newIngredientsSelected[index].checked;
        props.setIngredientsSelected(newIngredientsSelected);
        console.log(newIngredientsSelected);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.textPrimary}>Ingredientes </Text>
            <Text style={styles.textSecundary}>Se debe seleccionar al menos uno de cada grupo</Text>
            {
                isLoading ? loading() : (
                    <>
                        {/* cn <= 20 */}
                        <View style={{ marginTop: 20 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'left', marginBottom: 5, color: '#573926' }}>Grupo C:N Menor</Text>
                            {
                                props.ingredients.map((item, index) => {
                                    if (item.carbon_nitrogen <= props.cn) {
                                        return (
                                            <ListItem bottomDivider key={index}>
                                                <ListItem.Content>
                                                    <ListItem.Title style={{
                                                        color: '#552b51'
                                                    }}>{item.name}</ListItem.Title>
                                                    <ListItem.Subtitle
                                                        style={{ fontStyle: "italic", color: '#371B34' }}
                                                    >c:n {item.carbon_nitrogen}</ListItem.Subtitle>
                                                </ListItem.Content>
                                                <ListItem.CheckBox
                                                    checked={props.ingredientsSelected[
                                                        props.ingredients.findIndex(
                                                            (ingredient) => ingredient.id === item.id
                                                        )
                                                    ].checked}
                                                    Component={TouchableOpacity}
                                                    checkedColor="#53A06E"
                                                    onPress={() => handleCheck(item.id)}
                                                />
                                            </ListItem>
                                        )
                                    }
                                })
                            }
                        </View>

                        {/* cn > 20 */}
                        <View style={{ marginTop: 20 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'left', marginBottom: 5, color: '#573926' }}>Grupo C:N Mayor</Text>
                            {
                                props.ingredients.map((item, index) => {
                                    if (item.carbon_nitrogen > props.cn) {
                                        return (
                                            <ListItem bottomDivider key={index}>
                                                <ListItem.Content>
                                                    <ListItem.Title style={{
                                                        color: '#552b51'
                                                    }} >{item.name}</ListItem.Title>
                                                    <ListItem.Subtitle
                                                        style={{ fontStyle: "italic", color: '#371B34' }}
                                                    >c:n {item.carbon_nitrogen}</ListItem.Subtitle>
                                                </ListItem.Content>
                                                <ListItem.CheckBox
                                                    checked={props.ingredientsSelected[
                                                        props.ingredients.findIndex(
                                                            (ingredient) => ingredient.id === item.id
                                                        )
                                                    ].checked}
                                                    Component={TouchableOpacity}
                                                    checkedColor="#53A06E"
                                                    onPress={() => handleCheck(item.id)}
                                                />
                                            </ListItem>
                                        )
                                    }
                                })
                            }

                        </View>
                    </>
                )
            }
        </View>
    );
};

const Result = (props) => {

    const [isLoading, setIsLoading] = useState(true);
    const [result, setResult] = useState([]);

    const calculate = async () => {
        setIsLoading(true);

        let averageCarbonLess = 0;
        let averageCarbonMore = 0;
        let averageNitrogenLess = 0;
        let averageNitrogenMore = 0;

        let contLess = 0;
        let contMore = 0;

        props.ingredients.map((item, index) => {
            props.ingredientsSelected.map((itemSelected, indexSelected) => {
                if (item.id === itemSelected.id && itemSelected.checked) {
                    if (item.carbon_nitrogen <= props.cn) {
                        averageCarbonLess += item.carbon;
                        averageNitrogenLess += item.nitrogen;
                        contLess++;
                    } else {
                        averageCarbonMore += item.carbon;
                        averageNitrogenMore += item.nitrogen;
                        contMore++;
                    }
                }
            }
            );
        })

        const C1 = averageCarbonLess / contLess;
        const C2 = averageCarbonMore / contMore;

        const N1 = averageNitrogenLess / contLess;
        const N2 = averageNitrogenMore / contMore;

        const partialWeightLess = props.weight * ((C2) - (props.cn * N2)) / ((C2 - C1) + (props.cn * N1) - (props.cn * N2));
        const partialWeightMore = props.weight * ((props.cn * N1) - (C1)) / ((C2 - C1) + (props.cn * N1) - (props.cn * N2));

        const minorDryLess = Math.round(((partialWeightLess / contLess) + Number.EPSILON) * 100) / 100
        const minorDryMore = Math.round(((partialWeightMore / contMore) + Number.EPSILON) * 100) / 100

        props.ingredients.map((item, index) => {
            props.ingredientsSelected.map((itemSelected, indexSelected) => {
                if (item.id === itemSelected.id && itemSelected.checked) {
                    if (item.carbon_nitrogen <= props.cn) {
                        result.push({
                            ingredient_id: item.id,
                            name: item.name,
                            amount: minorDryLess,
                        })
                    } else {
                        result.push({
                            ingredient_id: item.id,
                            name: item.name,
                            amount: minorDryMore,
                        })
                    }
                }
            }
            );
        }
        );

        const id = JSON.parse(await AsyncStorage.getItem('id'));
        const response = await axios.post(`${config.API_URL}/records`, {
            result: result.map((item, index) => {
                return {
                    ingredient_id: item.ingredient_id,
                    amount: item.amount,
                }
            }),
            user_id: id,
            weight: props.weight,
            cn: props.cn,
            unit: props.unit,
        });

        if (response.status === 200) {
            setIsLoading(false);
        }

    };

    useEffect(() => {
        calculate();
    }, []);

    return (
        <View style={styles.container}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Image source={require('../../../assets/images/environment.png')} style={{ width: 150, height: 150, alignSelf: "center" }} />
            </View>
            <View>
                <Text style={styles.textPrimary}>Resultado</Text>
                <Text style={styles.textSecundary}>Tomando en cuenta los parametros ingresados, se proporcionan los siguientes resultados</Text>
            </View>
            <View>
                {/* Table header */}
                <View style={stylesTable.headerContainer}>
                    <Text style={stylesTable.headerLeft}>Ingredientes</Text>
                    <Text style={stylesTable.headerRight}>Cantidad</Text>

                </View>
                {
                    isLoading ? loading() : (
                        result.map((item, index) => {
                            return (
                                <View style={stylesTable.itemsContainer} key={index}>
                                    <Text style={stylesTable.itemLeft}>{item.name}</Text>
                                    <Text style={stylesTable.itemRight}>{item.amount} {props.unit}</Text>
                                </View>
                            )
                        })
                    )
                }
            </View>

        </View>
    );
}

const Main = ({
    navigation,
}) => {

    const [weight, setWeight] = useState('')
    const [unit, setUnit] = useState('lb')
    const [cn, setCn] = useState('')
    const [ingredientsSelected, setIngredientsSelected] = useState([])
    const [ingredients, setIngredients] = useState([]);
    const [active, setActive] = useState(0);

    const [appStatus, setAppStatus] = useState(AppState.currentState);
    const [isConnected, setIsConnected] = useState(true);
    const [connectionType, setConnectionType] = useState('none');

    const content = [
        <General navigation={navigation} weight={weight} setWeight={setWeight} cn={cn} setCn={setCn} unit={unit} setUnit={setUnit} />,
        <Ingredients ingredients={ingredients} setIngredients={setIngredients} ingredientsSelected={ingredientsSelected} setIngredientsSelected={setIngredientsSelected} cn={cn} />,
        <Result ingredients={ingredients} setIngredients={setIngredients} ingredientsSelected={ingredientsSelected} setIngredientsSelected={setIngredientsSelected} cn={cn} weight={weight} unit={unit} />,
    ];

    return (
        <ScrollView style={{
            backgroundColor: "#FFF",
        }}>
            <View style={{ marginVertical: 40, marginHorizontal: 20 }}>
                {/* General data - Stepper on top */}
                <Stepper
                    data={
                        {
                            weight: weight,
                            unit: unit,
                            cn: cn,
                            ingredientsSelected: ingredientsSelected,
                        }
                    }
                    dialogComponent={Dialog}
                    active={active}
                    content={content}
                    onNext={() => setActive((p) => p + 1)}
                    onBack={() => setActive((p) => p - 1)}
                    onFinish={() => navigation.navigate("Home")}
                    stepStyle={{ backgroundColor: "#F09E54" }}
                    buttonStyle={{ backgroundColor: "#53A06E" }}
                />
                <StatusApp appStatus={appStatus} setAppStatus={setAppStatus} navigation={navigation} />
                <Connection setIsConnected={setIsConnected} setConnectionType={setConnectionType} navigation={navigation} />
            </View>
        </ScrollView>
    )
}

export default Main

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
        borderColor: "#F09E54",
        color: "#371B34",
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