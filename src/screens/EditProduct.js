import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { updateProductInAPI } from "../api/fetchMenuData";

const EditProduct = ({ route, navigation }) => {
  const { product } = route.params;

  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price.toString());
  const [image, setImage] = useState(product.image);

  const updateProduct = async () => {
    const updatedProduct = {
      ...product,
      name,
      price: parseFloat(price),
      image,
    };

    try {
      await updateProductInAPI(product.id, updatedProduct);

      Alert.alert("Thành công", "Sản phẩm đã được cập nhật!", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      console.error("Lỗi cập nhật sản phẩm:", error);
      Alert.alert("Lỗi", "Không thể cập nhật sản phẩm.");
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
      <Button title="Cập nhật sản phẩm" onPress={updateProduct} />
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

export default EditProduct;
