import React from "react";

import { TextInput, TouchableOpacity, View } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import { styles } from "./styles";
import { Colors } from "../../styles";

interface SearchProps {
  value: string;
  onChangeText: (text: string) => void;
  onPressSearch: () => void;
}

export function Search({ onChangeText, value, onPressSearch }: SearchProps) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Pesquisar"
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
      />

      <TouchableOpacity style={styles.containerIcon} onPress={onPressSearch}>
        <MaterialIcons name="search" size={22} color={Colors.TEXT} />
      </TouchableOpacity>
    </View>
  );
}
