import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { Feather } from "@expo/vector-icons";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);

  return(
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "android" ? "padding" : "height"}
    >
      <Text style={styles.titleText}>Login</Text>

      <View style={styles.inputContainer}>
        <Feather name="mail" size={20} color="#666" style={styles.icon}/>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#999"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <Feather name="lock" size={20} color="#666" style={styles.icon}/>
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#999"
          secureTextEntry={!mostrarSenha}
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
          <Feather
            name={mostrarSenha ? "eye" : "eye-off"}
            size={20}
            color="#666"
            style={styles.iconRight}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.btn} activeOpacity={0.7}>
        <Text style={styles.textbutton}>Entrar</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff"
  },
  titleText:{
    fontWeight: "bold",
    fontSize: 40,
    marginBottom: 25
  },
  inputContainer:{
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 50,
    width: "100%",
    maxWidth: 320,
    marginVertical: 5
  },
  input:{
    flex: 1,
    paddingHorizontal: 10
  },
  icon:{
    marginRight: 5
  },
  iconRight:{
    marginLeft: 5
  },
  btn:{
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFD500",
    height: 50,
    width: 200,
    borderRadius: 10,
    marginTop: 25
  },
  textbutton:{
    fontSize: 20,
    fontWeight: "bold"
  }
});
