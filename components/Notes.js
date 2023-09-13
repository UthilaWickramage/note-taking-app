import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Notes({ navigation }) {
  const [notes, setNotes] = useState([]);
  const [getMobile,setMobile] = useState("")
getData()
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.btnContainer}>
        <Pressable onPress={() => navigation.navigate("Create a Note")}>
          <View style={styles.btn}>
            <Image
              style={styles.btnIcons}
              source={require("../assets/add.png")}
            />
          </View>
        </Pressable>
        <Pressable
          onPress={() => {
            const data={
              mobile:getMobile
            }
            // navigation.navigate("Create a Note");
            fetch("http://10.0.2.2/note-app-backend/all_notes.php", {
              method: "POST",
              
              body:JSON.stringify(data)
            })
              .then((response) => {
                return response.json();
              })
              .then((note) => {
                setNotes(note);
              })
              .catch((error) => {
                Alert.alert("Error", error);
              });
          }}
        >
          <View style={styles.btn}>
            <Image
              style={styles.btnIcons}
              source={require("../assets/refresh.png")}
            />
          </View>
        </Pressable>
        <Pressable onPress={()=>{clearData()}}>
          <View style={styles.btn}>
            <Image
              style={styles.btnIcons}
              source={require("../assets/menu.png")}
            />
          </View>
        </Pressable>
      </View>

      <FlatList data={notes} renderItem={NoteUI} />
    </SafeAreaView>
  );
  async function getData() {
    const userObject = await AsyncStorage.getItem("user");
    if(userObject!==null){
      let user = JSON.parse(userObject);
  setMobile(user.mobile);
      
    }
    
  }
  async function clearData(){
    await AsyncStorage.removeItem("user");
   navigation.navigate("Login")
  }
}


function NoteUI({ item }) {
  return (
    <View style={styles.noteBox}>
      <View style={styles.timeRow}>
        <Text>{item.date_time}</Text>
        
      </View>
      <View style={styles.detailsRow}>
        <View style={styles.iconBox}>{getImageUri(item.note_text)}</View>

        <View style={styles.noteDetails}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.desc}>{item.desc}</Text>
        </View>
      </View>
    </View>
  );
}

function getImageUri(category) {
  switch (category) {
    case "Work":
      return (
        <Image
          style={styles.icon}
          source={require("../assets/images/working.png")}
        />
      );
    case "Study":
      return (
        <Image
          style={styles.icon}
          source={require("../assets/images/studying.png")}
        />
      );
    case "Personal":
      return (
        <Image
          style={styles.icon}
          source={require("../assets/images/personal.png")}
        />
      );
    case "Travel":
      return (
        <Image
          style={styles.icon}
          source={require("../assets/images/travel.png")}
        />
      );
    case "Hobby":
      return (
        <Image
          style={styles.icon}
          source={require("../assets/images/hobby.png")}
        />
      );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginBottom: 30,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom:5,
  },
  noteBox: {
    // height: 100,
    width: "100%",
    backgroundColor: "#ffd6dd",
    marginBottom: 10,
    marginTop: 10,
    padding: 10,
    borderLeftWidth: 5,
    borderLeftColor: "#f95772",
    borderRadius: 8,
  },
 
  timeRow: {
    flex: 1,
    flexDirection:"row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  iconBox: {
    width: 60,
    height: 60,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#f95772",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  btn: {
    borderRadius: 100,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },

  btnIcons: {
    height: 30,
    width: 30,
  },
  icon: {
    width: 40,
    height: 40,
    objectFit: "contain",
  },
  detailsRow: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  noteDetails: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    marginLeft: 10,
  },
 
  title: {
    fontSize: 18,
    fontWeight: "700",
  },
  desc: {
    fontSize: 16,
  },
});
