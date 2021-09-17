import React, { useEffect, useState } from 'react';
import { Share, FlatList, Text, SafeAreaView, TouchableOpacity, View, Dimensions, TouchableWithoutFeedback, Alert } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { DatabaseConnection } from '../database/database-connection';
import FabButton from '../components/FabButton';
import AsyncFunctions from '../service/StorageAsync';
import {css} from '../../assets/css/css';
import {AntDesign, Entypo} from '@expo/vector-icons';

const db = DatabaseConnection.getConnection();

export default function Home(props){

    //console.log("Home");

    const [userId, setUserId] = useState(props.route.params.user_id);
    let [nome, setNome] = useState(props.route.params.user_name);
    let [dataFlatList, setDataFlatList] = useState([]);
    let {width} = Dimensions.get('window');
    let [refresh, setRefresh] = useState(false);
    const isFocused = useIsFocused();

    useEffect(() => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM table_produtos WHERE user_id=?',
          [userId],
          (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i){
                temp.push(results.rows.item(i));
            }
            setDataFlatList(temp);
          }
        );
      });
    }, [isFocused,refresh]);

    function deleteItemById(item){
      db.transaction((tx) => {
        tx.executeSql(
          'DELETE FROM table_produtos WHERE prod_Id=?',
          [item.prod_id],
          (tx, results) => {
            if (results.rowsAffected > 0) {
                console.log('Produto excluído!');
                Alert.alert(
                  'Sucesso',
                  'Produto deletado com sucesso',
                  [
                    {
                      text: 'Ok',
                      onPress: () => props.navigation.navigate('Home',{user_id: userId, user_name: nome}),
                    },
                  ],
                  {
                    cancelable: false
                  }
                );
                refresh==true?setRefresh(false):setRefresh(true);
            } else {
                console.log('Não foi possível excluir o produto!');
                alert('Não foi possível excluir o produto!');
            }
        }
        );
      });      
    }  

    let listViewItemSeparator = () => {
        return(
          <View
            style={{ height: 5, width: '100%', backgroundColor: '#ffffff'}}
          />
        );
    };
  
    let ListItemView = ({item}) => {

      let textColor = '#ff0000';
      if (item.prod_id % 2 == 0) {
        textColor = '#ffa500';
      }     

        return(
            <View style={{flex: 1, flexDirection: 'column', justifyContent: "center"}}>
              <TouchableWithoutFeedback onPress={() => props.navigation.navigate('Produto',{user_id: userId, user_name: nome, item})}>
                  <View key={item.prod_id} >
                      <Text style={{fontSize: 18, color: textColor}}>{item.prod_name} - {item.prod_quant}{item.prod_un}</Text>     
                  </View>
              </TouchableWithoutFeedback>   
              <TouchableOpacity
                  style={css.deleteButton}
                  onPress={() => {deleteItemById(item);}}>
                    <View>
                      <Text style={css.removeIcon}>{'\u00D7'}</Text>
                    </View>
              </TouchableOpacity>
            </View>            
        );
    };

    const onShare = async () => {
      let listaDeCompras = 'Lista de Compras\n';
      try {
        //console.log(dataFlatList.prod_id);

        dataFlatList.map(item => {
          listaDeCompras = listaDeCompras + "\n" + ' - ' + item.prod_name + ' - ' + item.prod_quant + item.prod_un + "\n";          
        });

        const result = await Share.share({
          message: listaDeCompras,
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error) {
        alert(error.message);
      }
    };

    return (
        <SafeAreaView style={css.flatList_container}>
          <View style={css.flatList_container}>
              <FlatList
                  style={css.flatList}
                  contentContainerStyle={css.flatList_content}
                  ItemSeparatorComponent={listViewItemSeparator}
                  data={dataFlatList}
                  keyExtractor={item => item.prod_id.toString()}
                  renderItem={dataFlatList => {
                    return (
                      <View
                        elevation={5}
                        style={{
                          shadowColor: '#000000',
                          shadowOffset: {
                            width: 0,
                            height: 2,
                          },
                          shadowRadius: 3,
                          shadowOpacity: 0.5,
                          height: 70,
                          width: width - 30,
                          backgroundColor: '#ffffff',
                          borderRadius: 6,
                          paddingHorizontal: 10,
                        }}>
                        <ListItemView item={dataFlatList.item}/>
                      </View>
                    );
                  }}
              />
          </View>
          <View>
              <TouchableOpacity
                  style={css.fabButton}
                  onPress={onShare}
              >
                <FabButton icone="sharealt"/>               
              </TouchableOpacity>   
          </View>            
          <View>
              <TouchableOpacity
                style={css.fabButton}              
                onPress={() => props.navigation.navigate('Produto',{user_id: userId, user_name: nome, item: {prod_id: 0}})}
              >
                <FabButton icone="plus" />               
              </TouchableOpacity>                  
          </View>          
        </SafeAreaView>
      );
};

