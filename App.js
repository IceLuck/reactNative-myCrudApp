import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home, Login, Produto, Register} from './src/views';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{
            title: 'Lista de Compras - Login',
            headerStyle: {
              backgroundColor: '#f4511e',
              alignSelf: 'center',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {fontWeight: 'bold', alignSelf: 'center'}
          }}      
        />   

        <Stack.Screen 
          name="Home" 
          component={Home}
          options={{
            title: 'Lista de Compras',
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {fontWeight: 'bold', alignSelf: 'center'}
          }}
        />
        
        <Stack.Screen 
          name="Produto" 
          component={Produto} 
          options={{
            title: 'Cadastro de Produtos',
            headerStyle: {
              backgroundColor: '#f4511e',
              alignSelf: 'center',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {fontWeight: 'bold', alignSelf: 'center'}
          }}   
        />

        <Stack.Screen 
          name="Register" 
          component={Register} 
          options={{
            title: 'Novo Usuário',
            headerStyle: {
              backgroundColor: '#f4511e',
              alignSelf: 'center',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {fontWeight: 'bold', alignSelf: 'center'}
          }}   
        /> 

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;