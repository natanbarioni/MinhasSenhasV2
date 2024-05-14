import { useCallback, useState } from "react";

// import { AdMobBanner } from "expo-ads-admob";

import { FlatList, Text, View, Alert } from "react-native";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";

import { Card, CardProps } from "../../components/Card";
import { HeaderHome } from "../../components/HeaderHome";
import { useFocusEffect } from "@react-navigation/native";

import { styles } from "./styles";
import { Button } from "../../components/Button";

export function Home({ navigation }) {
  const [data, setData] = useState<CardProps[]>([]);

  const { getItem, setItem, removeItem } = useAsyncStorage(
    "@savepass:passwords"
  );

  async function handleFetchData() {
    const response = await getItem();
    const data = response ? JSON.parse(response) : [];
    setData(data);
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
          setData(data);
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
          setData([]);
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

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
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

      {/* <AdMobBanner
        bannerSize="fullBanner"
        adUnitID="ca-app-pub-1575936907590081/5935724204" // Test ID, Replace with your-admob-unit-id
        servePersonalizedAds={false}
        onDidFailToReceiveAdWithError={(error) => console.log(error)} // true or false
      /> */}
    </View>
  );
}
