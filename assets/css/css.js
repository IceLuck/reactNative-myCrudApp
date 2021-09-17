import React from "react";
import { StyleSheet } from "react-native";

const css = StyleSheet.create({
    container:{
      flex: 1,
      justifyContent: "center", 
      backgroundColor: '#ffffff',
      padding: 30,
    },
    container_login:{
      borderWidth: 1,
      borderColor: "#DDDDDD",
      borderRadius: 6,
      backgroundColor: "#eaeaea",
      paddingVertical: 50,
      paddingHorizontal: 30,
    },    
    container_login_text:{
      fontSize: 40,
      fontWeight: "bold",
      paddingHorizontal: 50,
      textAlign: "center",
    }, 
    container_login_inputs:{
      paddingVertical: 40,
      paddingHorizontal: 0,
    }, 
    container_login_botoes:{
      flexDirection: 'row', 
      justifyContent: "center",
      paddingHorizontal: 10
    },        
    botao_principal:{
      backgroundColor: "#f4511e",
      padding: 10,
      marginRight: 20,
      borderRadius: 4,       
      width: 125,
      alignItems: "center",
    },    
    botao_principal_text:{
      fontSize: 16,
      color: "#ffffff",      
    },
    botao_outros:{
      backgroundColor: "#DDDDDD",
      padding: 10,
      borderRadius: 4,
      width: 125,
      alignItems: "center",
    },    
    botao_outros_text:{
      fontSize: 16,
    },
    botao_fullHorizontal: {
      backgroundColor: "#f4511e",
      padding: 20,
      borderRadius: 4,       
      alignItems: "center",
      margin: 5,
    },
    botao_fullHorizontal_text:{
      fontSize: 16,
    },
    text_input: {
      height: 50,
      margin: 5,
      borderWidth: 1,
      padding: 10,
      backgroundColor: "#ffffff",
      borderRadius: 4,
      fontSize: 16,
    },
    flatList_container:{
      flex: 1,
      backgroundColor: '#ffffff', 
    },    
    flatList: {
      paddingHorizontal: 5,
      marginTop: 5,
    },  
    flatList_content: {
      paddingHorizontal: 10,
      paddingVertical: 10,
      borderWidth: 0,
      borderRadius: 4,
    }, 
    deleteButton: {
      position: 'absolute',
      right: 10,
      width: 35,
      height: 35,
      borderRadius: 18,
      padding: 12,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ff0000',
    },
    removeIcon: {
      width: '100%',
      fontSize: 20,
      color: "#ffffff",
    },
    fabButton: {
      alignItems: 'flex-end',
      padding: 10,
    },            
  });
  export {css};