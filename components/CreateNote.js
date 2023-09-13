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
import DropDownPicker from "react-native-dropdown-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CreateNote({ navigation }) {
    const [mobile,setMobile]= useState("")
  
  const [getNote, setNote] = useState({
    title: "",
    category: "",
    description: "",
    mobile:""
  });

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Study", value: "Study" },
    { label: "Work", value: "Work" },
    { label: "Personal", value: "Personal" },
    { label: "Travel", value: "Travel" },
    { label: "Hobby", value: "Hobby" },

  ]);
getData()
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.labels}>Title:</Text>
        <TextInput
        placeholder="Enter note title"
          style={styles.input}
          inputMode={"text"}
          onChangeText={(text) => {
            setNote((prevNote) => ({ ...prevNote, title: text }));
          }}
        />
           <Text style={styles.labels}>Category:</Text>
        <DropDownPicker
          style={{ marginBottom: 10, marginTop: 10,borderBottomWidth:1,borderWidth:0, borderRadius:0, borderColor:"#a3a3a3"}}
          textStyle={{
            fontSize: 16,
            fontWeight:"bold"
          }}
          placeholder="Select Note Category"
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
            setNote((prevNote) => ({ ...prevNote, category: value }));
          }}
        />
      
       
        <Text style={styles.labels}>Description:</Text>
        <TextInput
        placeholder="Enter note description"
          style={styles.textinputarea}
          inputMode={"text"}
          multiline={true}
    numberOfLines={4}
          onChangeText={(text) => {
            setNote((prevNote) => ({ ...prevNote, description: text, mobile:mobile }));
          }}
        />
        
     <Pressable onPress={() => {
            //setNote((prevNote) => ({ ...prevNote, user: mobile }));
            fetch("http://10.0.2.2/note-app-backend/create_note.php", {
               method: "POST",
               body: JSON.stringify(getNote),
             })
               .then((response) => {
                return response.json();
              })
              .then((message) => {
                Alert.alert("Message",message.text)
                // if (message.text == "success") {
                //   navigation.navigate("Notes")
                // }
             })
             .catch((error) => {
               Alert.alert("Error", error);
             });
         }}>
      <View style={styles.btn}>
        <Text style={styles.btnText}>Add Note</Text>
      </View>
     </Pressable>
      
        {/* <Button
          title="Go TO Login"
          onPress={() => {
            navigation.navigate("Login");
          }}
        /> */}
      </View>
    </SafeAreaView>
  );
  async function getData() {
    const userObject = await AsyncStorage.getItem("user");
    let user = JSON.parse(userObject)

    if (user.mobile !== null&& user.password!==null) {
      setMobile(user.mobile)
    } else {
      navigation.navigate("Login")
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
  labels:{
fontSize:20,

  },
  btn: {
    backgroundColor: "#fa395a",
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 100,
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
borderRadius:10,
  },
  btnText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    paddingStart: 10,
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
  textinputarea:{
    fontSize: 16,
    borderWidth: 1,
    borderColor:"#a3a3a3",
    height: 100,
    width: "100%",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 10,
  }
});
