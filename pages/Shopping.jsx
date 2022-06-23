import React, { useContext, useEffect, useState } from "react";
import { Button, Text, View, StyleSheet, Alert } from "react-native";

import { vw } from "react-native-css-vh-vw";
import { faker } from "@faker-js/faker";
import { SafeAreaView, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import SearchInput, { createFilter } from "react-native-search-filter";
import { CartContext } from "../App";
import { TextInput } from "react-native";
import { Snackbar } from "react-native-paper";

const KEYS_TO_FILTERS = ["product"];
const FETCH_NUMBER = 1000;

function Shopping({ navigation }) {
  const [cart, setCart] = useContext(CartContext);
  const [search, setSearch] = useState("");
  const goToCart = () => {
    navigation.navigate("Cart");
  };
  const [searchList, setSearchList] = useState([]);

  const showAlert = (alertMessage) => {
    Alert.alert(
      "Message",
      alertMessage,
      [
        {
          text: "OK",
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  const fetchFakeData = () => {
    let product = [];
    Array.from({ length: FETCH_NUMBER }).forEach((item, index) => {
      product.push({
        id: index,
        count: 0,
        product: faker.commerce.productName(),
        price: faker.commerce.price(),
      });
    });
    return product;
  };
  const [itemList, setItemList] = useState(fetchFakeData());

  const handleItemClick = async (event, item) => {
    event.preventDefault();
    let flag = false;
    let tempCart = [];
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id === item.id) {
        flag = true;
      } else {
        tempCart.push(cart[i]);
      }
    }
    if (!flag) {
      item.count = 1;
      showAlert(`${item.product} added to the cart`);
    } else {
      item.count = item.count + 1;
      showAlert(`Increased the quantity of ${item.product}`);
    }
    tempCart.push(item);
    setCart(tempCart);
  };

  useEffect(() => {
    if (search == "") {
      setSearchList(itemList);
    } else {
      setSearchList(itemList.filter(createFilter(search, KEYS_TO_FILTERS)));
    }
  }, [search]);

  const list = () => {
    return searchList.map((element, index) => {
      return (
        <View key={`Item_${index}`} style={styles.item}>
          <View>
            <Text style={{ alignSelf: "flex-start" }}>{element.product}</Text>
            <Text>{element.price}</Text>
          </View>
          <TouchableOpacity
            onPress={(event) => {
              handleItemClick(event, element);
            }}
          >
            <Ionicons name="add" size={24} color="black" />
          </TouchableOpacity>
        </View>
      );
    });
  };

  return (
    <SafeAreaView>
      <View style={{ backgroundColor: "white" }}>
        <View style={styles.GoToCart}>
          <Text style={{ fontSize: 20, fontWeight: "800", marginLeft: 10 }}>
            Item List
          </Text>
          <View style={styles.button}>
            <Button
              style={styles.button}
              // style={{ justifyContent: "flex-end" }}
              title={`Go to Cart (${cart.length})`}
              onPress={goToCart}
            ></Button>
          </View>
        </View>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={(e) => setSearch(e)}
            value={search}
            placeholder="Search Products"
          />
        </View>
        <ScrollView>
          <View>{list()}</View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default Shopping;

const styles = StyleSheet.create({
  GoToCart: {
    display: "flex",
    flexDirection: "row",
    width: vw(100),
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    width: vw(40),
    alignSelf: "flex-end",
  },
  item: {
    margin: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    alignItems: "center",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
