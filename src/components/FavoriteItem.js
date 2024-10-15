import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const FavoriteItem = ({ item, removeFavorite, isLastOddItem }) => {
  return (
    <View
      style={[
        styles.itemContainer,
        isLastOddItem
          ? { alignSelf: "flex-start", width: "48%" }
          : { width: "48%" },
      ]}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>{item.price} VND</Text>

      <TouchableOpacity
        onPress={() => removeFavorite(item)}
        style={styles.removeIcon}
      >
        <Icon name="close" size={30} color="yellow" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    alignItems: "center",
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 10,
    borderRadius: 10,
    borderColor: "#D3D3D3",
    borderWidth: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginVertical: 5,
    color: "#333",
  },
  price: {
    fontSize: 14,
    color: "#FF4500",
    textAlign: "center",
    fontWeight: "bold",
  },
  removeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#FFF",
    borderRadius: 15,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
});

export default FavoriteItem;
