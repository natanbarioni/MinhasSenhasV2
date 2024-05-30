import { useCallback, useEffect, useState } from "react";

// import { AdMobBanner } from "expo-ads-admob";

import { FlatList, Text, View, Alert, Keyboard, Platform } from "react-native";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";

import { Card, CardProps } from "../../components/Card";
import { HeaderHome } from "../../components/HeaderHome";
import { useFocusEffect } from "@react-navigation/native";

import { styles } from "./styles";
import { Button } from "../../components/Button";
import { Search } from "../../components/Search";
import { ButtonOptions } from "../../components/ButtonOptions";
import Purchases, { LOG_LEVEL, PurchasesOffering } from "react-native-purchases";

export function Home({ navigation }) {
  const [data, setData] = useState<CardProps[]>([]);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const APIKeys = {
    google: "goog_xXnDNbaXhhjFpYpTnsjXdxFzpKZ",
  };
  const [currentOffering, setCurrentOffering] =
      useState<PurchasesOffering | null>(null);
  
    useEffect(() => {
      const setup = async () => {
        if (Platform.OS == "android") {
          await Purchases.configure({ apiKey: APIKeys.google });
        }
  
        const offerings = await Purchases.getOfferings();
        setCurrentOffering(offerings.current);
      };
  
      Purchases.setLogLevel(LOG_LEVEL.VERBOSE);
  
      setup().catch(console.log);
    }, []);
console.log(currentOffering)


  const { getItem, setItem, removeItem } = useAsyncStorage(
    "@savepass:passwords"
  );

  const handlerSearch = (text) => {
    setSearchText(text);

    if (text) {
      const newData = data.filter((item) => {
        const { id, ...rest } = item;
        return Object.values(rest).some((val) =>
          String(val).toLowerCase().includes(text.toLowerCase())
        );
      });
      setFilteredData(newData);
    } else {
      setFilteredData(data);
    }
  };

  async function handleFetchData() {
    const response = await getItem();
    const data = response ? JSON.parse(response) : [];
    setData(data);
    setFilteredData(data);
  }

  async function handleEdit(id: string) {
    const response = await getItem();
    const previousData = response ? JSON.parse(response) : [];
    const data = previousData.filter((item: CardProps) => {
      item.id === id && navigation.navigate("Form", { item });
    });
  }

  async function handleRemove(id: string) {
    Alert.alert("Deseja remover esse item da sua lista?", "", [
      {
        text: "Sim",
        onPress: async () => {
          const response = await getItem();
          const previousData = response ? JSON.parse(response) : [];

          const data = previousData.filter((item: CardProps) => item.id !== id);
          setItem(JSON.stringify(data));
          setFilteredData(data);
        },
        style: "cancel",
      },
      {
        text: "Não",
        onPress: () => {
          return;
        },
      },
    ]);
  }

  async function handleRemoveAll() {
    Alert.alert("Deseja limpar toda sua lista?", "", [
      {
        text: "Sim",
        onPress: async () => {
          await removeItem();
          setFilteredData([]);
        },
        style: "cancel",
      },
      {
        text: "Não",
        onPress: () => {
          return;
        },
      },
    ]);
  }

  useFocusEffect(
    useCallback(() => {
      handleFetchData();
    }, [])
  );

  return (
    <View style={styles.container}>
      <HeaderHome />

      <View style={styles.listHeader}>
        <Text style={styles.title}>Suas senhas</Text>

        <Text style={styles.listCount}>{`${data.length} ao total`}</Text>
      </View>

      <View style={styles.containerSearch}>
        {data.length > 1 && (
          <Search
            value={searchText}
            onChangeText={(value) => handlerSearch(value)}
            onPressSearch={() => {
              handlerSearch(searchText);
              Keyboard.dismiss();
            }}
          />
        )}
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        overScrollMode="never"
        ListEmptyComponent={
          <View style={styles.boxListEmpty}>
            <MaterialIcons name="list" size={35} color="#888D99" />
            <Text style={styles.listEmpty}>
              Nenhuma senha foi cadastrada ainda.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <Card
            data={item}
            onPressDelete={() => handleRemove(item.id)}
            onPressEdit={() => handleEdit(item.id)}
          />
        )}
      />

      {data.length >= 1 && (
        <View style={styles.footer}>
          <Button onPress={() => handleRemoveAll()} title="Limpar lista" />
        </View>
      )}

      <ButtonOptions />

      {/* <AdMobBanner
        bannerSize="fullBanner"
        adUnitID="ca-app-pub-1575936907590081/5935724204" // Test ID, Replace with your-admob-unit-id
        servePersonalizedAds={false}
        onDidFailToReceiveAdWithError={(error) => console.log(error)} // true or false
      /> */}
    </View>
  );
}
