import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        alignItems: "center",
        justifyContent: 'center',
        width: '100%'
    },
    logo: {
        width: 200,
        height: 200,
    },
    subTitle: {
        marginTop: 20,
        fontSize: 14,
        color: "#919191",
        fontWeight: 'bold'
    },
    buttonLogin: {
        width: 150,
        height: 50,
        borderRadius: 7,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: "#535353"
    },
    textButton: {
        fontWeight: 'bold',
        fontSize: 15,
        color: "#535353",
    }
});
