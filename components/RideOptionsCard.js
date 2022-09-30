import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React, { useState } from 'react';
import tw from 'tailwind-react-native-classnames';
import { Icon } from "@rneui/themed";
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectTravelTimeInformation } from '../slices/navSlice';


const data = [
  {
    id: "Uber-X-123",
    title: "Uber X",
    multiplier: 1,
    image: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_537/v1568070387/assets/b5/0a5191-836e-42bf-ad5d-6cb3100ec425/original/UberX.png",
  },
  {
    id: "Uber-X-456",
    title: "Uber TAXI",
    multiplier: 1.3,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfqeuK_sdBNIlhFAzFOM7QFwS5FSlmNkJBc10Y1V58QtowRsz4eMnZyMeD0VW4GG3S028&usqp=CAU",
  },
  {
    id: "Uber-X-258",
    title: "Uber XL",
    multiplier: 1.6,
    image: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_537/v1568134115/assets/6d/354919-18b0-45d0-a151-501ab4c4b114/original/XL.png",
  },
  {
    id: "Uber-X-789",
    title: "Uber BERLINE",
    multiplier: 2,
    image: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_537/v1569012915/assets/4f/599c47-7f5c-4544-a5d2-926babc8e113/original/Lux.png",
  },
  {
    id: "Uber-X-147",
    title: "Uber LUXE",
    multiplier: 2.4,
    image: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_537/v1569352630/assets/4b/28f11e-c97b-495a-bac1-171ae9b29362/original/BlackSUV.png",
  },
];

const SURGE_CHARGE_RATE = 1.5;


const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = React.useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);

  return (
    <SafeAreaView style={tw`bg-white flex-grow pb-11`}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate('NavigateCard')}
          style={[tw`absolute top-3 left-5 z-30 p-3 rounded-full`]}
        >
          <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity>
        <Text style={tw`text-center py-1 text-xl`}  >Choisis ton transport : {travelTimeInformation?.distance.text}</Text>
      </View>
      <FlatList
        style={tw` mx-10 `}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { id, title, image, multiplier }, item }) => (

          <TouchableOpacity
            onPress={() => setSelected(item)}
            style={tw`flex-row justify-between items-center px-1 ${id === selected?.id && "bg-gray-200"}`}>

            <Image
              style={{
                width: 75,
                height: 75,
                resizeMode: "contain",
              }}
              source={{ uri: image }}
            />
            <View
              style={
                tw`-ml-6`
              }>
              <Text style={tw`text-xl font-semibold`}>{title}</Text>
              <Text>Durée {travelTimeInformation?.duration.text}</Text>
            </View>
            <Text
              style={tw`text-xl font-semibold`}>
              {
                (travelTimeInformation?.duration.value * SURGE_CHARGE_RATE * multiplier) / 100
              } €
            </Text>
          </TouchableOpacity>
        )}
      />

      <View style={tw`mt-auto border-t border-red-200`}>
        <TouchableOpacity
          disabled={!selected}
          style={tw`bg-black py-3 m-3 ${!selected && "bg-gray-300"}`}>
          <Text
            style={tw`flex-initial text-center text-white text-xl`}>
            Choose {selected?.title}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideOptionsCard

const styles = StyleSheet.create({})