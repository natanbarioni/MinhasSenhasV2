import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";

import { styles } from "./styles";
import { Colors } from "../../styles";
import { Toast } from "react-native-toast-message/lib/src/Toast";

export type CardProps = {
  id: string;
  name: string;
  user: string;
  password: string;
};
type Props = {
  data: CardProps;
  onPressDelete: () => void;
  onPressEdit: () => void;
};

export function Card({ data, onPressDelete, onPressEdit }: Props) {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);

  function togglePasswordIsVisible() {
    setPasswordIsVisible((prevState) => !prevState);
  }

  const handleCopy = (text) => {
    const textToCopy = text;
    Clipboard.setStringAsync(textToCopy);

    Toast.show({
      text1: "Senha copiada!",
      type: "success",
      autoHide: true,
      visibilityTime: 2400,
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={togglePasswordIsVisible}>
        <MaterialIcons
          name={passwordIsVisible ? "visibility" : "visibility-off"}
          size={22}
          color="#888D97"
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleCopy(data.password)}
        style={styles.content}
        disabled={!passwordIsVisible}
      >
        <Text style={styles.title} numberOfLines={2}>{data.name}</Text>

        {passwordIsVisible ? (
          <>
            <Text style={styles.password} numberOfLines={2}>{data.password}</Text>

            <Text style={styles.textCopyPassword}>
              Clique para copiar a senha
            </Text>
          </>
        ) : (
          <Text style={styles.email} numberOfLines={2}>{data.user}</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={onPressEdit}>
        <MaterialIcons name="edit" size={22} color={Colors.EDIT} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onPressDelete}>
        <MaterialIcons name="delete" size={22} color={Colors.DELETE} />
      </TouchableOpacity>
    </View>
  );
}
