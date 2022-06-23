import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Cart from "./pages/Cart";
import Shopping from "./pages/Shopping";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createContext, useState } from "react";
import { Provider as PaperProvider } from "react-native-paper";

const Stack = createNativeStackNavigator();
export const CartContext = createContext([]);

export default function App() {
  const cart = useState([]); //[cart,setCart]
  return (
    <PaperProvider>
      <CartContext.Provider value={cart}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Shopping" component={Shopping} />
            <Stack.Screen name="Cart" component={Cart} />
          </Stack.Navigator>
        </NavigationContainer>
      </CartContext.Provider>
    </PaperProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
