import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { addProductToAPI } from "../api/fetchMenuData"; // Hàm để thêm sản phẩm lên MockAPI

const AddProductScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const addProduct = async () => {
    if (name === "" || price === "" || image === "") {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin!");
      return;
    }

    const newProduct = {
      name,
      price: parseFloat(price),
      image,
    };

    try {
      await addProductToAPI(newProduct);
      Alert.alert("Thành công", "Sản phẩm đã được thêm!", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      console.error("Lỗi thêm sản phẩm:", error);
      Alert.alert("Lỗi", "Không thể thêm sản phẩm.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Tên sản phẩm"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Giá tiền"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="URL hình ảnh"
        value={image}
        onChangeText={setImage}
      />
      <Button title="Thêm sản phẩm" onPress={addProduct} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 16,
  },
});

export default AddProductScreen;
