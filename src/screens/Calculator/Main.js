import React, { useEffect, useState } from 'react'
import { View, ActivityIndicator, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import Stepper from 'react-native-stepper-ui';
import { ListItem } from '@rneui/themed';
import { config } from '../../config';
import axios from 'axios';

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
            <Text style={styles.textPrimary}>General </Text>
            <Text style={styles.textSecundary}>Ingresa los campos requeridos</Text>

            <TextInput style={styles.inputText} placeholder='Ingresa la cantidad de libras' onChangeText={props.setWieght} value={props.wieght} keyboardType='numeric' />
            <TextInput style={styles.inputText} placeholder='Ingresa el valor de C:N' onChangeText={props.setCn} value={props.cn} keyboardType='number-pad' />

            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => props.navigation.navigate('Home')}
            >
                <Text style={{ textAlign: "center", fontSize: 14, color: "#43484d", marginTop: 10 }}>¿Has revisado el centro de ayuda?</Text>
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
                }
            })
        );
        setIsLoading(false);
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
                            <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'left', marginBottom: 5 }}>Grupo C:N Menor</Text>
                            {
                                props.ingredients.map((item, index) => {
                                    if (item.carbon_nitrogen <= props.cn) {
                                        return (
                                            <ListItem bottomDivider key={index}>
                                                <ListItem.Content>
                                                    <ListItem.Title>{item.name}</ListItem.Title>
                                                    <ListItem.Subtitle
                                                        style={{ fontStyle: "italic" }}
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
                            <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'left', marginBottom: 5 }}>Grupo C:N Mayor</Text>
                            {
                                props.ingredients.map((item, index) => {
                                    if (item.carbon_nitrogen > props.cn) {
                                        return (
                                            <ListItem bottomDivider key={index}>
                                                <ListItem.Content>
                                                    <ListItem.Title>{item.name}</ListItem.Title>
                                                    <ListItem.Subtitle
                                                        style={{ fontStyle: "italic" }}
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

    const calculate = () => {
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
        )

        const C1 = averageCarbonLess / contLess;
        const C2 = averageCarbonMore / contMore;

        const N1 = averageNitrogenLess / contLess;
        const N2 = averageNitrogenMore / contMore;

        const partialWeightLess = props.wieght * ((C2) - (props.cn*N2)) / ((C2 -C1) + (props.cn*N1) - (props.cn*N2));
        const partialWeightMore = props.wieght * ((props.cn*N1) - (C1)) & ((C2 -C1) + (props.cn*N1) - (props.cn*N2));

        const minorDryLess = Math.round();Math.round(((partialWeightLess / contLess) + Number.EPSILON) * 100) / 100
        const minorDryMore = Math.round();Math.round(((partialWeightMore / contMore) + Number.EPSILON) * 100) / 100

        console.log()

    })
    }

    useEffect(() => {
        calculate();
    }, []);

    return (
        <View style={styles.container}>
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
                <View style={stylesTable.itemsContainer}>
                    <Text style={stylesTable.itemLeft}>Hortalizas</Text>
                    <Text style={stylesTable.itemRight}>29.43</Text>
                </View>
                <View style={stylesTable.itemsContainer}>
                    <Text style={stylesTable.itemLeft}>Ovinos</Text>
                    <Text style={stylesTable.itemRight}>82.76</Text>
                </View>
            </View>

        </View>
    );
};

const Main = ({
    navigation,
}) => {

    const [wieght, setWieght] = useState('')
    const [cn, setCn] = useState('')
    const [ingredientsSelected, setIngredientsSelected] = useState([])
    const [ingredients, setIngredients] = useState([]);
    const [active, setActive] = useState(0);

    const content = [
        <General navigation={navigation} wieght={wieght} setWieght={setWieght} cn={cn} setCn={setCn} />,
        <Ingredients ingredients={ingredients} setIngredients={setIngredients} ingredientsSelected={ingredientsSelected} setIngredientsSelected={setIngredientsSelected} cn={cn} />,
        <Result ingredients={ingredients} setIngredients={setIngredients} ingredientsSelected={ingredientsSelected} setIngredientsSelected={setIngredientsSelected} cn={cn} wieght={wieght}/>,
    ];

    return (
        <ScrollView style={{
            backgroundColor: "#FFF",
        }}>
            <View style={{ marginVertical: 40, marginHorizontal: 20 }}>
                {/* General data - Stepper on top */}
                <Stepper
                    active={active}
                    content={content}
                    onNext={() => setActive((p) => p + 1)}
                    onBack={() => setActive((p) => p - 1)}
                    onFinish={() => Alert.alert("Finish")}
                    stepStyle={{ backgroundColor: "#F09E54" }}
                    buttonStyle={{ backgroundColor: "#53A06E" }}
                />
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
        color: "#43484d"
    },
    textSecundary: {
        fontSize: 14,
        fontWeight: "400",
        textAlign: "center",
        lineHeight: 20,
        color: "gray",
        marginBottom: 20
    },
    inputText: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#D9D9D9",
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
    },
    itemRight: {
        padding: 10,
        fontSize: 14,
        fontWeight: '400',
        color: '#747474',
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