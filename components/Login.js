import { useState } from "react";
import {
  Alert,
  Button,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Register({ navigation }) {
  const [getUser, setUser] = useState({
    mobile: "",
    password: "",
  });
  getData();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.labels}>Mobile No :</Text>
        <TextInput
        placeholder="Enter your mobile no"
          style={styles.input}
          inputMode={"numeric"}
          onChangeText={(text) => {
            setUser((prevUser) => ({ ...prevUser, mobile: text }));
          }}
        />
        <Text style={styles.labels}>Password:</Text>
        <TextInput
        placeholder="Enter your password"
          style={styles.input}
          inputMode={"text"}
          onChangeText={(text) => {
            setUser((prevUser) => ({ ...prevUser, password: text }));
          }}
        />
        <Pressable
          onPress={() => {
            fetch("http://10.0.2.2/note-app-backend/login.php", {
              method: "POST",
              body: JSON.stringify(getUser),
            })
              .then((response) => {
                return response.json();
              })
              .then((user) => {
                if(user.message=="success"){
                  saveData(user);
                  navigation.navigate("Notes");
                }else{
                  Alert.alert("Error","Invalid username or password")
                }
                
              })
              .catch((error) => {
                Alert.alert("Error", error);
              });
          }}
        >
          <View style={styles.btn}>
            <Text style={styles.btnText}>Login</Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          <View style={styles.btnInvert}>
            <Text style={styles.btnTextInvert}>Create New Account</Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );

  async function getData() {
    const userObject = await AsyncStorage.getItem("user");
    if(userObject!==null){
      let user = JSON.parse(userObject);

      if (user.mobile !== null && user.password !== null) {
        navigation.navigate("Notes");
      }
    }
    
  }
  async function saveData(user) {
    let userObject = JSON.stringify(user);
    await AsyncStorage.setItem("user", userObject);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  innerContainer: {
    flex: 1,

    padding: 30,
  },
  input: {
    fontSize: 18,
    borderWidth: 0,
    borderBottomWidth:1,
    borderColor:"#a3a3a3",
    height: 50,
    width: "100%",
    padding: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  labels:{
    fontSize:18,
    
      },
  btn: {
    backgroundColor: "#fa395a",
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 100,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  btnText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    paddingStart: 10,
  },
  btnInvert: {
    borderColor: "#fa395a",
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 100,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    marginTop:5,
  },
  btnTextInvert: {
    fontSize: 18,
    color: "#fa395a",
    fontWeight: "bold",
    paddingStart: 10,
  },
});
