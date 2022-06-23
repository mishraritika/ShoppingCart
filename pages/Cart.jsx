import React, { useContext, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { CartContext } from "../App";
import { Modal, Portal, Provider } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import { vh } from "react-native-css-vh-vw";
import { AntDesign } from "@expo/vector-icons";
import { Button } from "react-native-paper";

function Cart() {
  const [cart, setCart] = useContext(CartContext);
  const [visible, setVisible] = React.useState(false);
  const [edit, setEdit] = useState({});

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    borderRadius: 10,
  };

  const handleSave = () => {
    let temp = [];
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id == edit.id) {
        temp.push(edit);
      } else {
        temp.push(cart[i]);
      }
    }
    setCart(temp);
    hideModal();
  };

  const handleDelete = () => {
    let temp = [];
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id != edit.id) {
        temp.push(cart[i]);
      }
    }
    setCart(temp);
    hideModal();
  };

  console.log(visible);
  return (
    <View style={{ padding: 30, height: vh(100) }}>
      <Text style={{ fontSize: "30px", fontWeight: "800" }}>Cart</Text>
      {cart.length == 0 ? (
        <Text>Cart is empty</Text>
      ) : (
        <ScrollView>
          <View>
            {cart.map((item, index) => {
              console.log(item);
              return (
                <TouchableOpacity
                  onPress={() => {
                    console.log("item");
                    setVisible((visible) => !visible);
                    setEdit(item);
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      flexDirection: "row",
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
                      padding: 15,
                      marginTop: 10,
                    }}
                  >
                    <View style={{ display: "flex" }}>
                      <Text style={{ fontWeight: "800" }}>{item.product}</Text>
                      <Text>{item.price}</Text>
                    </View>
                    <Text>Quantity: {item.count}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      )}
      <Provider>
        <Portal>
          <Modal
            dismissable={false}
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}
          >
            <Text style={{ fontWeight: "800" }}>{edit.product}</Text>
            <Text style={{ fontWeight: "400" }}>{edit.price}</Text>
            <Text style={{ marginTop: 20 }}>Quantity</Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setEdit({ ...edit, count: edit["count"] + 1 });
                }}
              >
                <AntDesign name="pluscircleo" size={30} color="black" />
              </TouchableOpacity>
              <Text style={{ fontSize: 20 }}>{edit.count}</Text>
              <TouchableOpacity
                onPress={() => {
                  setEdit({ ...edit, count: Math.max(1, edit["count"] - 1) });
                }}
              >
                <AntDesign name="minuscircleo" size={30} color="black" />
              </TouchableOpacity>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <Button
                mode="contained"
                onPress={handleSave}
                style={{
                  margin: 10,
                  backgroundColor: "green",
                  borderRadius: 10,
                }}
              >
                Save
              </Button>
              <Button
                mode="contained"
                onPress={handleDelete}
                style={{ margin: 10, backgroundColor: "red", borderRadius: 10 }}
              >
                Delete
              </Button>
            </View>
          </Modal>
        </Portal>
      </Provider>
    </View>
  );
}

export default Cart;
