import React from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const AsyncFunctions = {
    storeData: async (value) => {
        try {
            //console.log("AsyncFunctions-StoreData");
            //console.log(value);
            await AsyncStorage.setItem('@userId', value.user_id.toString());
            await AsyncStorage.setItem('@nome', value.user_name.toString());
            await AsyncStorage.setItem('@login', value.user_login.toString());
            await AsyncStorage.setItem('@senha', value.user_pass.toString());
            return true;
        } catch (e) {
            // saving error
            console.log("Falha ao gravar o userId");
            return false;
        }
    },
    getUserId: async () => {
        try {
            const id = await AsyncStorage.getItem('@userId')
            if(id !== null) {
                return id;
            }
        } catch(e) {
            // error reading value
            console.log("Falha ao obter os dados do login");
            return '';
        }        
    },
    getUserName: async () => {
        try {    
            const nome = await AsyncStorage.getItem('@nome')
            if(nome !== null) {
                return nome;
            }
        } catch(e) {
            // error reading value
            console.log("Falha ao obter os dados do login");
            return '';
        }        
    },
    getUserLogin: async () => {
        try {  
            const log_in = await AsyncStorage.getItem('@login')
            if(log_in !== null) {
                return log_in;
            }
        } catch(e) {
            // error reading value
            console.log("Falha ao obter os dados do login");
            return '';
        }        
    },
    getUserPass: async () => {
        try { 
            const pass = await AsyncStorage.getItem('@senha')
            if(pass !== null) {
                return pass;
            }          
        } catch(e) {
            // error reading value
            console.log("Falha ao obter os dados do login");
            return '';
        }        
    }       
}

export default AsyncFunctions;