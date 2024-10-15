import React from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import FavoriteItem from "../components/FavoriteItem";

const ListScreen = ({ favorites, setFavorites }) => {
  const removeFavorite = (product) => {
    setFavorites(favorites.filter((item) => item.id !== product.id));
  };

  const renderItem = ({ item, index }) => {
    const isLastOddItem =
      favorites.length % 2 !== 0 && index === favorites.length - 1;

    return (
      <FavoriteItem
        item={item}
        removeFavorite={removeFavorite}
        isLastOddItem={isLastOddItem}
      />
    );
  };

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>Danh sách trống</Text>
    </View>
  );

  return (
    <FlatList
      data={favorites}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      numColumns={2}
      columnWrapperStyle={styles.row}
      ListEmptyComponent={renderEmptyComponent}
    />
  );
};

const styles = StyleSheet.create({
  row: {
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  emptyText: {
    fontSize: 18,
    color: "#666",
  },
});

export default ListScreen;
