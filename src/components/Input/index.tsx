import {
  Text,
  TextInput,
  TextInputProps,
  View,
  TouchableOpacity,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import { styles } from "./styles";
import { Colors } from "../../styles";

type Props = TextInputProps & {
  label: string;
  icon?: string;
  onPressIcon?: () => void;
};

export function Input({ label, icon, onPressIcon, ...rest }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      {!icon && !onPressIcon ? (
        <TextInput style={styles.input} {...rest} />
      ) : (
        <View style={styles.containerInput}>
          <TextInput style={[styles.input, { flex: 1 }]} {...rest} />
          {icon && onPressIcon && (
            <TouchableOpacity style={styles.button} onPress={onPressIcon}>
              <MaterialIcons name={icon} size={22} color={Colors.TEXT} />
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}
