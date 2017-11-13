import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import FloatingInput from './FloatingInput'

export default class App extends Component {
render() {
    return (
        <View style={styles.form}>
            <FloatingInput
                label={'Username or Email'}
                labelColor={'#ffffff'}
                underlineColor={'#ffffff'}
                activeLineColor={'#4286f4'}
                textColor={'#ffffff'}
                errorColor={'red'}
                returnKeyType={'next'}
                onChangeText={(text) => {
                    this.inputs.username = text
                }}
            />

            <FloatingInput
                label={'Password'}
                labelColor={'#ffffff'}
                underlineColor={'#ffffff'}
                activeLineColor={'#4286f4'}
                textColor={'#ffffff'}
                errorColor={'red'}
                returnKeyType={'done'}
                secureTextEntry={true}
                onChangeText={(text) => {
                    this.inputs.password = text
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    form: {
        justifyContent: 'center',
        alignItems: 'stretch',
        width: '77%',
    }
)}
