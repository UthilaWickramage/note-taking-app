import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView, StatusBar, StyleSheet,Text } from "react-native";
import Login from "./components/Login";
import Register from "./components/Register";
import Notes from "./components/Notes";
import CreateNote from "./components/CreateNote";

const Stack = createNativeStackNavigator()
export default function App(){
  return (
<NavigationContainer>
  <StatusBar hidden={true}/>
  
    
    <Stack.Navigator>
    <Stack.Screen name='Login' component={Login}
    options={{

      headerStyle: {
        backgroundColor: '#fa395a',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}/>
    <Stack.Screen name='Register' component={Register}
    options={{

      headerStyle: {
        backgroundColor: '#fa395a',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}/>
    <Stack.Screen name='Notes' component={Notes}
    options={{
      title: 'Notes',
      headerStyle: {
        backgroundColor: '#fa395a',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}/>
    <Stack.Screen name='Create a Note' component={CreateNote}
    options={{
      title: 'New Note',
      headerStyle: {
        backgroundColor: '#fa395a',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}/>
  </Stack.Navigator>
</NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container:{
   flex:1,
   justifyContent:"center",
   alignItems:"center",
  }
})