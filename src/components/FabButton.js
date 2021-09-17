import React, {component} from 'react';
import { Component } from 'react';
import { View,Text,StyleSheet } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {AntDesign, Entypo} from '@expo/vector-icons';

export default class FabButton extends Component{
    render(){
        return(
            <View styles={styles.container}>
                <TouchableWithoutFeedback>
                    <View style={[styles.button,styles.menu]}>
                        <AntDesign name={this.props.icone} size={25} color="#FFF"/>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        position: 'absolute',
    },
    button:{
        //position: 'absolute',
        width: 80,
        height: 80,
        borderRadius: 80/2,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#00213B',
        shadowOpacity: 0.3,
        shadowOffset: {
            height: 10,
        },
    },
    menu:{
        backgroundColor: "#f4511e",
    }
});