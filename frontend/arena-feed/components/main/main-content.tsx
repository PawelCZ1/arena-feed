import {StyleSheet, View} from "react-native";
import ThemedButton from "@/components/themed-button";
import {useRouter} from "expo-router";

const MainContent = () => {
    const router = useRouter();

    const navigateToTournaments = () => {
        router.push("/tournaments");
    }

    return (
        <View style={styles.container}>
            <ThemedButton style={styles.button} title={"Search upcoming tournaments"} onPress={navigateToTournaments}/>
            <ThemedButton style={styles.button} title={"Create new tournament"}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "stretch",
        gap: 8,
        paddingHorizontal: 16,
        width: "100%"
    },
    button: {
        width: "75%",
        alignSelf: "center"
    }
});

export default MainContent;