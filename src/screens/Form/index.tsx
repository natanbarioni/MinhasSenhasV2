import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import Toast from "react-native-toast-message";
import uuid from "react-native-uuid";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { styles } from "./styles";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { HeaderForm } from "../../components/HeaderForm";
import { useNavigation } from "@react-navigation/native";
import { CardProps } from "../../components/Card";
import {
  AdEventType,
  BannerAd,
  BannerAdSize,
  InterstitialAd,
} from "react-native-google-mobile-ads";

export function Form({ route }) {
  const navigation = useNavigation();
  const item: CardProps = route.params.item;

  const [name, setName] = useState(item?.name || "");
  const [user, setUser] = useState(item?.user || "");
  const [password, setPassword] = useState(item?.password || "");
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const interstitial = InterstitialAd.createForAdRequest(
    "ca-app-pub-1575936907590081/2327731233",
    { requestNonPersonalizedAdsOnly: true }
  );

  function togglePasswordIsVisible() {
    setPasswordIsVisible((prevState) => !prevState);
  }

  const { getItem, setItem } = useAsyncStorage("@savepass:passwords");

  async function handleNew() {
    try {
      const id = uuid.v4();

      const newData = {
        id,
        name,
        user,
        password,
      };

      const response = await getItem();
      const previousData = response ? JSON.parse(response) : [];

      const data = [...previousData, newData];

      await setItem(JSON.stringify(data));
      Toast.show({
        type: "success",
        text1: "Cadastrado com sucesso!",
      });
      navigation.navigate("Home");
      // showInterstitial();
    } catch (error) {
      console.log(error);

      Toast.show({
        type: "error",
        text1: "Não foi possível cadastrar.",
      });
    }
  }

  async function handleEdit() {
    const response = await getItem();
    const data = JSON.parse(response);
    const editItem = [...data].map((i: any) => {
      if (i.id === item.id) {
        return {
          ...i,
          name: name,
          user: user,
          password: password,
        };
      } else {
        return i;
      }
    });
    await setItem(JSON.stringify(editItem));
    Toast.show({
      type: "success",
      text1: "Editado com sucesso!",
    });
    navigation.navigate("Home");
    // showInterstitial();
  }

  const validate = () => {
    if (name.length === 0 || user.length === 0 || password.length === 0) {
      Toast.show({
        type: "error",
        text1: "Preencha todos os campos.",
      });
      return false;
    }
    if (item) {
      handleEdit();
    } else {
      handleNew();
    }
  };

  // function showInterstitial() {
  //   interstitial.addAdEventListener(AdEventType.LOADED, () => {
  //     interstitial.show()
  //   });
  //   interstitial.load();
  // }

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.content}>
          <ScrollView>
            <HeaderForm />

            <View style={styles.form}>
              <Input
                label="Nome do serviço"
                onChangeText={setName}
                defaultValue={item?.name}
              />
              <Input
                label="E-mail ou usuário"
                autoCapitalize="none"
                defaultValue={item?.user}
                onChangeText={setUser}
              />
              <Input
                autoCapitalize="none"
                label="Senha"
                secureTextEntry={!passwordIsVisible}
                defaultValue={item?.password}
                onChangeText={setPassword}
                icon={passwordIsVisible ? "visibility" : "visibility-off"}
                onPressIcon={togglePasswordIsVisible}
              />
            </View>

            <View style={styles.footer}>
              <Button title="Salvar" onPress={() => validate()} />
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>

      <BannerAd
        unitId="ca-app-pub-1575936907590081/5935724204"
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      />
    </>
  );
}
