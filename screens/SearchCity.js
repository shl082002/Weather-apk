import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { React, useCallback, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { fetchLocations } from "../api/WeatherApi";
import { fetchWeatherForecast } from "../api/WeatherApi";
import { debounce } from "lodash";

export default function SearchCity({ navigation }) {
  const [location, setLocation] = useState([]);


  // const handleLocation = (loc) =>{
  //   setLocation([]);
  //   fetchWeatherForecast({
  //     cityName : loc.name,
  //     days : '7'
  //   }).then(data=>{
  //    setWeather(data);
  //    navigateBack();
  //   })
  // }

  const handleSearch = (value) => {
    fetchLocations({ cityName: value }).then((data) => {
      setLocation(data);
    });
  };

  //forecast params

  // console.log(weather.location);

  const navigateBack = async (loc) => {
    await navigation.navigate("Home", {
      city : loc.name
    });
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 1000));

  return (
    <SafeAreaView>
      <View
        className="my-4 mx-4 rounded-full p-2 px-4 flex flex-row items-center justify-between"
        style={{
          backgroundColor:
            "radial-gradient(circle, rgba(196,205,207,0.5803571428571428) 12%, rgba(255,255,255,0.6475840336134453) 85%);",
        }}
      >
        <TextInput
          placeholder="Search City"
          placeholderTextColor={"black"}
          style={{ fontSize: 18, fontWeight: "bold" }}
          className="w-[90%]"
          onChangeText={handleTextDebounce}
        />
        <TouchableOpacity className="">
          <FontAwesome name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View>
        {location.length > 0 && (
          <View className="mx-5">
            {location.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  className="rounded-xl p-2 my-0.5 flex flex-row items-center"
                  style={{
                    backgroundColor:
                      "radial-gradient(circle, rgba(196,205,207,0.5803571428571428) 12%, rgba(255,255,255,0.6475840336134453) 85%);",
                  }}
                  onPress={() => navigateBack(item)}
                >
                  <Ionicons name="location-sharp" size={22} color="black" />
                  <Text className="text-lg font-bold mx-2">
                    {item?.name},{item?.region}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
