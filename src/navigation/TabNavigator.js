import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeScreen from "../screens/HomeScreen";
import ListScreen from "../screens/ListScreen";
import ProfileScreen from "../screens/ProfileScreen";
import Icon from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const [favorites, setFavorites] = useState([]);

  const saveFavoritesToStorage = async (favorites) => {
    try {
      await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
    } catch (error) {
      console.error("Error saving favorites to AsyncStorage: ", error);
    }
  };

  const loadFavoritesFromStorage = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem("favorites");
      if (storedFavorites !== null) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error("Error loading favorites from AsyncStorage: ", error);
    }
  };

  useEffect(() => {
    if (favorites.length > 0) {
      saveFavoritesToStorage(favorites);
    }
  }, [favorites]);

  useEffect(() => {
    loadFavoritesFromStorage();
  }, []);

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home-outline" color={color} size={size} />
          ),
          tabBarLabel: "Home",
          headerTitleAlign: "center",
          title: "Đồ uống",
        }}
      >
        {(props) => (
          <HomeScreen
            {...props}
            favorites={favorites}
            setFavorites={setFavorites}
          />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="Favorite"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="list-outline" color={color} size={size} />
          ),
          headerTitleAlign: "center",
          tabBarLabel: "Favorite",
          title: "Đồ uống yêu thích",
        }}
      >
        {(props) => (
          <ListScreen
            {...props}
            favorites={favorites}
            setFavorites={setFavorites}
          />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="person-outline" color={color} size={size} />
          ),
          headerTitleAlign: "center",
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
