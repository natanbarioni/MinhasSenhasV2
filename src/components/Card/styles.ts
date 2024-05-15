import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#E3E3E3",
    borderWidth: 1,
    paddingLeft: 22,
    marginBottom: 8,
    borderRadius: 4,
  },
  content: {
    flex: 1,
    padding: 22,
  },
  title: {
    fontSize: 15,
    lineHeight: 18,
    color: "#3D434D",
    fontWeight: "bold",
  },
  email: {
    color: "#888D97",
    fontSize: 13,
  },
  password: {
    color: "#537FE7",
    fontSize: 15,
    fontWeight: "bold",
  },
  textCopyPassword: {
    color: "#888D97",
    fontSize: 13,
    marginTop: 5,
    textDecorationLine: "underline",
  },
  button: {
    width: 56,
    alignItems: "center",
    justifyContent: "center",
  },
});
