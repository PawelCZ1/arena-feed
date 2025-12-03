import {Alert, StyleSheet, View} from "react-native";
import ThemedButton from "@/components/themed-button";
import {useRouter} from "expo-router";
import {useAuth} from "@/api/auth/auth-provider";

const MainContent = () => {
    const router = useRouter();
    const { session } = useAuth();

    const navigateToTournaments = () => {
        router.push("/tournaments");
    };

    const navigateToCreateTournament = () => {
        if (!session) {
            Alert.alert(
                "Authentication required",
                "You must be logged in to create a tournament.",
                [
                    { text: "Login", onPress: () => router.push("/login") },
                    { text: "Register", onPress: () => router.push("/register") },
                    { text: "Cancel", style: "cancel" }
                ]
            );
        } else {
            router.push("/create-tournament");
        }
    };

    return (
        <View style={styles.container}>
            <ThemedButton style={styles.button} title={"Search upcoming tournaments"} onPress={navigateToTournaments}/>
            <ThemedButton style={styles.button} title={"Create new tournament"} onPress={navigateToCreateTournament}/>
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