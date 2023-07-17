import {
  View,
  Text,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { fetchWeatherForecast } from "../api/WeatherApi";
import { weatherImages } from "../constants";
import * as Progress from "react-native-progress";

export default function HomeScreen({ route, navigation }) {
  const [weather, setWeather] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const { city } = route.params;
    fetchWeatherForecast({
      cityName: city,
      days: "7",
    }).then((data) => {
      setWeather(data);
      setLoading(false);
    });
  }, [route.params]);

  const toggleSearch = () => {
    navigation.navigate("searchCity");
  };
  return (
    <View
      className="flex-1"
      style={{
        backgroundColor:
          " linear-gradient(50deg, rgba(0,111,134,1) 0%, rgba(19,234,192,0.7848389355742297) 100%)",
      }}
    >
      <StatusBar style="dark" />
      {/* -----------------BEGIN ----------------- */}
      {loading ? (
        <View className = 'flex-1 justify-center items-center'>
        <Progress.CircleSnail thickness={10} size = {120} color='white'/>
        </View>
      ) : (
        <SafeAreaView className="flex flex-1">
          {/* search section */}
          <TouchableOpacity
            className="my-14 mx-5 px-5 py-2 rounded-full w-[18%] flex items-center"
            onPress={toggleSearch}
            style={{
              backgroundColor:
                "radial-gradient(circle, rgba(196,205,207,0.5803571428571428) 12%, rgba(255,255,255,0.6475840336134453) 85%);",
            }}
          >
            <FontAwesome name="search" size={24} color="white" />
          </TouchableOpacity>
          {/* city section */}
          <View className="flex items-center">
            <Text className="text-white text-4xl font-bold">
              {weather?.location?.name} ,{" "}
              <Text className="text-2xl font-light">
                {weather?.location?.region}
              </Text>
            </Text>
          </View>
          {/* Image */}
          <View className="flex items-center pt-5">
            <Image
              source={weatherImages[weather?.current?.condition?.text]}
              style={{ width: 160, height: 160 }}
            />
          </View>
          {/* Temperature */}
          <View className="flex items-center pt-2">
            <Text className="text-white text-6xl font-bold">
              {weather?.current?.temp_c}°C
            </Text>
          </View>
          {/* Weather Condition */}
          <View className="flex items-center py-2">
            <Text className="text-white text-xl"></Text>
          </View>
          {/* wind , and other param */}
          <View className="flex items-center flex-row justify-between px-5 py-6">
            <View className="flex flex-row">
              <Feather name="wind" size={30} color="white" />
              <Text className="text-white m-1 text-xl">
                {weather?.current?.wind_kph}kph
              </Text>
            </View>
            <View className="flex flex-row">
              <Ionicons name="md-water" size={30} color="white" />

              <Text className="text-white m-1 text-xl">
                {weather?.current?.humidity}%
              </Text>
            </View>
            <View className="flex flex-row">
              <Feather name="sun" size={30} color="white" />
              <Text className="text-white m-1 text-xl">
                {weather?.forecast?.forecastday[0]?.astro?.sunrise}
              </Text>
            </View>
          </View>
          {/* Daily Forecast */}
          <View className="flex flex-row mt-2 mx-6 pb-4 border-b-2 border-white">
            <FontAwesome5 name="calendar-alt" size={24} color="white" />
            <Text className="text-white text-lg font-bold mx-4 my-0.5">
              Daily Forecast
            </Text>
          </View>
          <ScrollView horizontal className="gap-x-3 mx-2 mt-5 mb-2">
            {weather?.forecast?.forecastday?.map((item, index) => {
              let date = new Date(item.date);
              let options = { weekday: "long" };
              let dayName = date.toLocaleString("en-US", options);
              dayName = dayName.split(",")[0];
              return (
                <View
                  key={index}
                  className="flex items-center px-3 py-2 my-3 justify-center w-[15%] h-[80%]"
                  style={{
                    backgroundColor:
                      "radial-gradient(circle, rgba(196,205,207,0.5803571428571428) 12%, rgba(255,255,255,0.6475840336134453) 85%);",
                    borderRadius: 20,
                  }}
                >
                  <Image
                    source={weatherImages[item?.day?.condition?.text]}
                    className="w-16 h-16"
                  />
                  <Text className="text-white text-lg">{dayName}</Text>
                  <Text className="text-white text-lg font-bold">
                    {item?.day?.avgtemp_c}°C
                  </Text>
                </View>
              );
            })}
          </ScrollView>
        </SafeAreaView>
      )}
    </View>
  );
}
