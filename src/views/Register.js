import React, { useState } from 'react';
import { Text, TextInput, SafeAreaView, TouchableOpacity, View, Alert } from 'react-native';
import Constants from "expo-constants";
import * as SQLite from "expo-sqlite";

import {css} from '../../assets/css/css';

const db = SQLite.openDatabase("db.db");


export default function Register( {navigation}){

    let [nome,setNome] = React.useState('');
    let [login,setLogin] = React.useState('');
    let [senha,setSenha] = React.useState('');
    let [contraSenha,setContraSenha] = React.useState('');

    let cadastraNovoUsuario = () => {    
        if (!nome){
            alert('Preencha o Nome.');
            return;
        }

        if (nome.length<10){
            alert('O nome precisa ter no mínimo 10 caracteres.');
            return;
        }        
    
        if (!login){
            alert('Preencha o Login.');
            return;
        }

        if (login.length<10){
            alert('O login precisa ter no mínimo 10 caracteres.');
            return;
        }          
        
        if (!senha){
            alert('Preencha a Senha.');
            return;
        }

        if (senha.length<5){
            alert('A senha precisa ter no mínimo 6 caracteres.');
            return;
        }         
        
        if (!contraSenha){
            alert('Preencha a Contra Senha.');
            return;
        } 
        
        if (senha!==contraSenha){
            alert('A Senha e Contra Senha precisam ser iguais.');
            return;
        } 
    
        db.transaction(function (tx) {
            console.log('Entrou db transaction');
            console.log(nome);
            console.log(login);
            console.log(senha);

            tx.executeSql(
                'INSERT INTO table_user (user_name, user_login, user_pass) VALUES(?,?,?)',
                [nome,login.trim().toLowerCase(),senha],
                (tx, results) => {
                    if (results.rowsAffected > 0) {
                        console.log('Usuário cadastrado');
                        Alert.alert(
                            'Success',
                            'Usuário cadastrado com sucesso!',
                            [
                                {
                                    text: 'Ok',
                                    onPress: () => navigation.navigate('Login'),
                                },
                            ],
                            {cancelable: false }
                        );
                    } else {
                        console.log('Cadastro falhou');
                        alert('Cadastro falhou');
                    }
                }
            );
        });
    };    

    return(
        <View style={css.container}>
            <View style={css.container_login}>
                <View>
                    <Text style={css.container_login_text}>Novo Cadastro</Text>                 
                </View>
                <View style={css.container_login_inputs}>
                    <TextInput
                        style={css.text_input}
                        placeholder="Nome"
                        onChangeText={(nome) => setNome(nome)}
                    />
                    <TextInput
                        style={css.text_input}
                        placeholder="Login"
                        onChangeText={
                            (login) => setLogin(login)
                        }                        
                    />                         
                    <TextInput
                        style={css.text_input}
                        secureTextEntry={true}
                        placeholder="Senha"
                        onChangeText={
                            (senha) => setSenha(senha)
                        }
                    /> 
                    <TextInput
                        style={css.text_input}
                        secureTextEntry={true}
                        placeholder="Repita a Senha"
                        onChangeText={
                            (contraSenha) => setContraSenha(contraSenha)
                        }
                    />                       
                </View>                
                <View style={css.container_login_botoes}>
                    <TouchableOpacity 
                        style={css.botao_principal}
                        onPress={cadastraNovoUsuario}
                    >
                        <Text style={css.botao_principal_text}>Cadastrar</Text>  
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={css.botao_outros}
                        onPress={() => navigation.navigate('Login')}>
                        <Text style={css.botao_outros_text}>Voltar</Text>                    
                    </TouchableOpacity>            
                </View>
            </View>
        </View>
    );
}