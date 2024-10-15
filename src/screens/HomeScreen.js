import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  RefreshControl,
  StyleSheet,
  Alert,
} from "react-native";
import { fetchMenuData, deleteProductFromAPI } from "../api/fetchMenuData";
import ProductItem from "../components/ProductItem";
import SearchBar from "../components/SearchBar";

const HomeScreen = ({ navigation, favorites, setFavorites }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const loadProducts = async () => {
    const data = await fetchMenuData();
    setProducts(data);
    setFilteredProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadProducts();
    });
    return unsubscribe;
  }, [navigation]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  const toggleFavorite = (product) => {
    if (favorites.some((item) => item.id === product.id)) {
      setFavorites(favorites.filter((item) => item.id !== product.id));
    } else {
      setFavorites([...favorites, product]);
    }
  };
  const editProduct = (product) => {
    navigation.navigate("EditProduct", { product });
  };

  const showOptions = (product) => {
    Alert.alert(
      "Mời bạn lựa chọn",
      "",
      [
        { text: "Sửa", onPress: () => editProduct(product) },
        {
          text: "Xóa",
          onPress: () => deleteProduct(product),
          style: "destructive",
        },
        { text: "Hủy", style: "cancel" },
      ],
      { cancelable: true }
    );
  };

  const deleteProduct = async (product) => {
    const updatedProducts = products.filter((item) => item.id !== product.id);
    setProducts(updatedProducts);
    setFilteredProducts(updatedProducts);

    await deleteProductFromAPI(product.id);

    if (favorites.some((item) => item.id === product.id)) {
      setFavorites(favorites.filter((item) => item.id !== product.id));
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadProducts();
    setRefreshing(false);
  };

  const renderItem = ({ item, index }) => {
    const isLastOddItem =
      products.length % 2 !== 0 && index === products.length - 1;
    return (
      <ProductItem
        item={item}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        showOptions={showOptions}
        isLastOddItem={isLastOddItem}
      />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <SearchBar
        searchQuery={searchQuery}
        handleSearch={handleSearch}
        navigation={navigation}
      />
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.row}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
});

export default HomeScreen;
