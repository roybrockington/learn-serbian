import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import Quiz from './Quiz';
import Dictionary from './data/Words.json';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

export const Routes = () => {
    const Stack = createStackNavigator();


    function MainMenu({navigation}) {
        return (
            <View>
                <Text style={styles.heading}>Choose a topic</Text>

                <View style={styles.mainContain}>
                    <View style={styles.categoryWrap}>
                        <TouchableOpacity style={styles.category} onPress={() => {navigation.navigate('Animals');}}>
                            <Icon name='goat' style={styles.categoryIcon}/>
                        </TouchableOpacity>
                        <Text style={styles.iconText}>Animals</Text>
                    </View>

                    <View style={styles.categoryWrap}>
                        <TouchableOpacity style={styles.category} onPress={() => {navigation.navigate('Weather');}}>
                            <Icon name='ac-unit' style={styles.categoryIcon}/>
                        </TouchableOpacity>
                        <Text style={styles.iconText}>Weather</Text>
                    </View>

                    <View style={styles.categoryWrap}>
                        <TouchableOpacity style={styles.category} onPress={() => {navigation.navigate('Colours');}}>
                            <Icon name='palette' style={styles.categoryIcon}/>
                        </TouchableOpacity>
                        <Text style={styles.iconText}>Colours</Text>
                    </View>
                </View>

                <View style={styles.mainContain}>
                    <View style={styles.categoryWrap}>
                        <TouchableOpacity style={styles.category} onPress={() => {navigation.navigate('Transport');}}>
                            <Icon name='flight' style={styles.categoryIcon}/>
                        </TouchableOpacity>
                        <Text style={styles.iconText}>Transport</Text>
                    </View>
                    <View style={styles.categoryWrap}>
                        <TouchableOpacity style={styles.category} onPress={() => {navigation.navigate('Dates');}}>
                            <Icon name='event' style={styles.categoryIcon}/>
                        </TouchableOpacity>
                        <Text style={styles.iconText}>Dates</Text>
                    </View>
                    <View style={styles.categoryWrap}>
                        <TouchableOpacity style={styles.category} onPress={() => {navigation.navigate('Buildings');}}>
                            <Icon name='apartment' style={styles.categoryIcon}/>
                        </TouchableOpacity>
                        <Text style={styles.iconText}>Buildings</Text>
                    </View>
                </View>

               {/* <Button
                    title="Colours"
                    style={styles.btn}
                    onPress={() => {
                        navigation.navigate('Colours');
                    }}
                />*/}

            </View>
        );
    }

    const ColourCategory = () => {
        return (
            <View>
                <Text style={styles.heading}>Learn Colours</Text>
                <Quiz category="colours" dictionary={Dictionary}/>
            </View>
        );
    };

    const BuildingsCategory = () => {
        return (
            <View>
                <Text style={styles.heading}>Learn Buildings</Text>
                <Quiz category="buildings" dictionary={Dictionary}/>
            </View>
        );
    };
    const DatesCategory = () => {
        return (
            <View>
                <Text style={styles.heading}>Learn Dates</Text>
                <Quiz category="dates" dictionary={Dictionary}/>
            </View>
        );
    };

    const TransportCategory = () => {
        return (
            <View>
                <Text style={styles.heading}>Learn Transport</Text>
                <Quiz category="transport" dictionary={Dictionary}/>
            </View>
        );
    };

    const WeatherCategory = () => {
        return (
            <View>
                <Text style={styles.heading}>Learn Weather</Text>
                <Quiz category="weather" dictionary={Dictionary}/>
            </View>
        );
    };

    const AnimalCategory = () => {
        return (
            <View>
                <Text style={styles.heading}>Learn Animals</Text>
                <Quiz category="animals" dictionary={Dictionary}/>
            </View>
        );
    };

    const styles = StyleSheet.create({
        mainContain: {
          flexDirection: 'row',
            justifyContent: 'center',
        },
        heading: {
            textAlign: 'center',
            padding: 20,
            fontSize: 20,
            fontWeight: 'bold',
        },
        categoryIcon: {
            color: 'white',
            fontSize: 50,
            padding: 10,
        },
        category: {
            backgroundColor: 'lightblue',
            height: 80,
            width: 80,
            borderRadius: 80 / 2,
            alignItems: 'center',
            justifyContent: 'center',
        },
        iconText: {
            marginTop: 10,
        },
        categoryWrap: {
            alignItems: 'center',
            padding: 13,
        },
    });

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Main Menu">
                <Stack.Screen name="Learn Serbian" component={MainMenu}/>
                <Stack.Screen name="Animals" component={AnimalCategory}/>
                <Stack.Screen name="Colours" component={ColourCategory}/>
                <Stack.Screen name="Weather" component={WeatherCategory}/>
                <Stack.Screen name="Transport" component={TransportCategory}/>
                <Stack.Screen name="Buildings" component={BuildingsCategory}/>
                <Stack.Screen name="Dates" component={DatesCategory}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};
