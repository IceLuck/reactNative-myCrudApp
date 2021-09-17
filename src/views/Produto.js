import React, { useEffect, useState } from 'react';
import { Text, TextInput, SafeAreaView, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DatabaseConnection } from '../database/database-connection';
import AsyncFunctions from '../service/StorageAsync';
import {css} from '../../assets/css/css';

const db = DatabaseConnection.getConnection();

export default function Produto(props){

    let [userId, setUserId] = useState(props.route.params.user_id);
    let [nome, setNome] = useState(props.route.params.user_name);
    let [prodId, setProdId] = useState(typeof props.route.params.item.prod_id != 0 ? props.route.params.item.prod_id : '');
    let [produto, setProduto] = useState(typeof props.route.params.item.prod_id != 0 ? props.route.params.item.prod_name : '');
    let [quantidade, setQuantidade] = useState(typeof props.route.params.item.prod_id != 0 ? props.route.params.item.prod_quant : '');   
    let [unidade, setUnidade] = useState(typeof props.route.params.item.prod_id != 0 ? props.route.params.item.prod_un : ''); 

    useEffect(() => {
        AsyncFunctions.getUserId().then(data => setUserId(data));      
    }, []);

    let alterarProduto = () => {    
        if (!produto){
            alert('Preencha o Nome.');
            return;
        }

        db.transaction((tx) => {
            tx.executeSql(
                'UPDATE table_produtos SET prod_name= ?, prod_quant=?, prod_un=? WHERE prod_id=?',
                [produto,quantidade,unidade,prodId],
                (tx, results) => {
                    if (results.rowsAffected > 0) {
                        console.log('Produto alterado');
                        props.navigation.navigate('Home',{user_id: userId, user_name: nome});
                    } else {
                        console.log('Não foi possível alterar o produto!');
                        alert('Não foi possível alterar o produto!');
                    }
                }
            );
        });
    }

    let cadastrarProduto = () => {    
        console.log("Entrou cadastra produto");
        console.log("userId");
        console.log(userId);
        if (!produto){
            alert('Preencha o Nome.');
            return;
        }

        db.transaction(function (tx) {
            tx.executeSql(
                'INSERT INTO table_produtos (prod_name, prod_quant, prod_un, user_id) VALUES(?,?,?,?)',
                [produto,quantidade,unidade,userId],
                (tx, results) => {
                    if (results.rowsAffected > 0) {
                        console.log('Produto cadastrado');
                        props.navigation.navigate('Home',{user_id: userId, user_name: nome});
                    } else {
                        console.log('Não foi possível adicionar o produto!');
                        alert('Não foi possível adicionar o produto!');
                    }
                }
            );
        });
    };
    
    return(
            <View>
                <View>
                    <TextInput
                        style={css.text_input}
                        placeholder="Produto"
                        value={produto}
                        onChangeText={
                            (produto) => setProduto(produto)
                        }                     
                    />     
                    <TextInput
                        style={css.text_input}
                        placeholder="Quantidade"
                        value={quantidade}
                        keyboardType="numeric"
                        onChangeText={
                            (quantidade) => setQuantidade(quantidade)
                        } 
                    />  
                    <TextInput
                        style={css.text_input}
                        placeholder="Unidade"
                        value={unidade}
                        onChangeText={
                            (unidade) => setUnidade(unidade)
                        } 
                    />                    
                </View>               
                <View style={[css.container_login_botoes,{paddingTop: 20}]}>
                    {prodId>0?
                            <TouchableOpacity 
                                style={css.botao_principal}
                                onPress={alterarProduto}
                            >
                                <Text style={css.botao_principal_text}>Alterar</Text>  
                            </TouchableOpacity>
                        :
                            <TouchableOpacity 
                                style={css.botao_principal}
                                onPress={cadastrarProduto}
                            >
                                <Text style={css.botao_principal_text}>Adicionar</Text>  
                            </TouchableOpacity>
                        }                        
                        <TouchableOpacity
                            style={css.botao_outros}
                            onPress={() => props.navigation.navigate('Home',{user_id: userId, user_name: nome})}>
                            <Text style={css.botao_outros_text}>Voltar</Text>                    
                        </TouchableOpacity>           
                    </View>
            </View>
        );
};
