import {StyleSheet} from "react-native";
import ThemedView from "@/components/themed-view";
import MainContent from "@/components/main/main-content";
import ThemedSafeAreaView from "@/components/themed-safe-area-view";

const Main = () => {
    return (
        <ThemedSafeAreaView>
            <ThemedView style={styles.background}>
                <MainContent/>
            </ThemedView>
        </ThemedSafeAreaView>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontWeight: 'bold',
        textAlign: 'center'
    }
});

export default Main;