import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";

import Welcome from "../screens/Welcome";
import Login from "../screens/Login";
import EscolhaPerfil from "../screens/EscolhaPerfil";
import CadastroMotorista from "../screens/CadastroMotorista";
import CadastroPassageiro from "../screens/CadastroPassageiro";
import HomeMotorista from "../screens/HomeMotorista";
import HomePassageiro from "../screens/HomePassageiro";

const Stack = createNativeStackNavigator();

export default function AppRoutes() {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);
        setUserType(snap.data().type);
      }

      setUser(user);
      setLoading(false);
    });

    return unsub;
  }, []);

  if (loading) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        {!user ? (
          <>
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="EscolhaPerfil" component={EscolhaPerfil} />
            <Stack.Screen name="CadastroMotorista" component={CadastroMotorista} />
            <Stack.Screen name="CadastroPassageiro" component={CadastroPassageiro} />
          </>
        ) : userType === "motorista" ? (
          <Stack.Screen name="HomeMotorista" component={HomeMotorista} />
        ) : (
          <Stack.Screen name="HomePassageiro" component={HomePassageiro} />
        )}

      </Stack.Navigator>
    </NavigationContainer>
  );
}