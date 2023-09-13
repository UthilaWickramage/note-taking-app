import { useState } from "react";
import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Register({ navigation }) {
  const [getUser, setUser] = useState({
    mobile: "",
    first_name: "",
    last_name: "",
    user_type: "",
    password: "",
  });

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Student", value: "Student" },
    { label: "Employee", value: "Employee" },
  ]);
getData()
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.labels}>Mobile No :</Text>
        <TextInput
        placeholder="Enter mobile no"
          style={styles.input}
          inputMode={"numeric"}
          onChangeText={(text) => {
            setUser((prevUser) => ({ ...prevUser, mobile: text }));
          }}
        />
        <Text style={styles.labels}>First Name:</Text>
        <TextInput
        placeholder="Enter first name"
          style={styles.input}
          inputMode={"text"}
          onChangeText={(text) => {
            setUser((prevUser) => ({ ...prevUser, first_name: text }));
          }}
        />
        <Text style={styles.labels}>Last Name:</Text>
        <TextInput
        placeholder="Enter last name"
          style={styles.input}
          inputMode={"text"}
          onChangeText={(text) => {
            setUser((prevUser) => ({ ...prevUser, last_name: text }));
          }}
        />
        <Text style={styles.labels}>User Type:</Text>
        <DropDownPicker
          style={{ marginBottom: 10, marginTop: 10,borderBottomWidth:1,borderWidth:0, borderRadius:0,borderColor:"#a3a3a3"}}
          textStyle={{
            fontSize: 16,
            fontWeight:"bold"
          }}
          placeholder="Select User Type"
          placeholderStyle={{
            color: "#fa395a",
            fontWeight: "bold"
          }}
          disableBorderRadius={true}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          onChangeValue={(value) => {
            setUser((prevUser) => ({ ...prevUser, user_type: value }));
          }}
        />
        <Text style={styles.labels}>Password:</Text>
        <TextInput
        placeholder="Enter password"
          style={styles.input}
          inputMode={"text"}
          onChangeText={(text) => {
            setUser((prevUser) => ({ ...prevUser, password: text }));
          }}
        />
        <Pressable
          onPress={() => {
            fetch("http://10.0.2.2/note-app-backend/register.php", {
              method: "POST",
              body: JSON.stringify(getUser),
            })
              .then((response) => {
                return response.json();
              })
              .then((message) => {
                if (message.text == "success") {
                  navigation.navigate("Login");
                }else{
                  Alert.alert("Warning!",message.text)
                }
              })
              .catch((error) => {
                Alert.alert("Error", error);
              });
          }}
        >
          <View style={styles.btn}>
            <Text style={styles.btnText}>Register</Text>
          </View>
        </Pressable>

        <Pressable
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <View style={styles.btnInvert}>
            <Text style={styles.btnTextInvert}>Go to Login</Text>
          </View>
        </Pressable>
      
      </View>
    </SafeAreaView>
  );
  async function getData() {
    const userObject = await AsyncStorage.getItem("user");
if(userObject!==null){
  let user = JSON.parse(userObject)
  if (user.mobile !== null&& user.password!==null) {
    navigation.navigate("Notes")

}
}

    
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
