import React, { useEffect, useState } from 'react';
import { Text, TextInput, SafeAreaView, TouchableOpacity, View } from 'react-native';
import { DatabaseConnection } from '../database/database-connection';
import {css} from '../../assets/css/css';
import AsyncFunctions from '../service/StorageAsync';

const db = DatabaseConnection.getConnection();

export default function Login( {navigation}){

    let [userId, setUserId] = useState(0);
    let [nome, setNome] = useState('');
    let [login, setLogin] = useState('');
    let [senha, setSenha] = useState('');   

    useEffect(() => {
        AsyncFunctions.getUserId().then(data => setUserId(data));      
        AsyncFunctions.getUserName().then(data => setNome(data));      
        AsyncFunctions.getUserLogin().then(data => setLogin(data));
        AsyncFunctions.getUserPass().then(data => setSenha(data));               
    }, []);    

    useEffect(() => {
        db.transaction(function (txn) {
          txn.executeSql(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
            [],
            function (tx, res) {
              /*console.log('item:', res.rows.length);*/
              if (res.rows.length > 0) {
                txn.executeSql('DROP TABLE IF EXISTS table_user', []);
                txn.executeSql(
                  'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(100), user_login VARCHAR(100), user_pass VARCHAR(100))',
                  []
                );
              }
            }
          );
        });
      }, []);  

      useEffect(() => {
        db.transaction(function (txn) {
          txn.executeSql(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='table_produtos'",
            [],
            function (tx, res) {
              if (res.rows.length > 0) {
                txn.executeSql('DROP TABLE IF EXISTS table_produtos', []);
                txn.executeSql(
                  'CREATE TABLE IF NOT EXISTS table_produtos(prod_id INTEGER PRIMARY KEY AUTOINCREMENT, prod_name VARCHAR(100), prod_quant VARCHAR(10), prod_un VARCHAR(10), user_id INTEGER)',
                  []
                );
              }
            }
          );
        });
      }, []);       

      useEffect(() => {
        db.transaction((tx) => {
          tx.executeSql(
            'SELECT * FROM table_user',
            [],
            (tx, results) => {
              var temp = [];
              for (let i = 0; i < results.rows.length; ++i)
                temp.push(results.rows.item(i));
                /*console.log(temp);*/
            }
          );
        });
      }, []);      
      
      let searchUser = () => {

        db.transaction(function (tx) {
            tx.executeSql(
                'SELECT * FROM table_user WHERE user_login=? AND user_pass=?',
                [login.trim().toLowerCase(),senha.trim()],
                (tx, results) => {
                    if (results.rows.length > 0) {
                        let dadosUsuario = '';
                        console.log('Usuário encontrado!');
                        for (let i = 0; i < results.rows.length; ++i){
                          dadosUsuario = results.rows.item(i);
                          console.log(dadosUsuario);
                          AsyncFunctions.storeData(dadosUsuario);
                        }
                        navigation.navigate('Home',dadosUsuario);
                    } else {                        
                        console.log('Login ou senha inválidos!');
                        alert('Login ou senha inválidos!');
                    }
                }
            );
        });
      };      

    return(
        <View style={css.container}>
            <View style={css.container_login}>
                <View>
                    <Text style={css.container_login_text}>Login</Text>                 
                </View>
                <View style={css.container_login_inputs}>
                    <TextInput
                        style={css.text_input}
                        placeholder="Login"
                        value={(login)}
                        onChangeText={
                            (login) => setLogin(login)
                        }
                    />     
                    <TextInput
                        style={css.text_input}
                        secureTextEntry={true}
                        placeholder="Senha"
                        value={(senha)}
                        onChangeText={
                            (senha) => setSenha(senha)
                        }                        
                    />   
                </View>                
                <View style={css.container_login_botoes}>
                    <TouchableOpacity 
                        style={css.botao_principal}
                        onPress={searchUser}
                    >
                        <Text style={css.botao_principal_text}>Login</Text>  
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={css.botao_outros}
                        onPress={() => navigation.navigate('Register')}>
                        <Text style={css.botao_outros_text}>Novo Usuário</Text>                    
                    </TouchableOpacity>            
                </View>
            </View>
        </View>
    );
}