import {StyleSheet} from "react-native";
import ThemedView from "@/components/themed-view";
import MainContent from "@/components/main/main-content";
import ThemedSafeAreaView from "@/components/themed-safe-area-view";
import TopAppBar from "@/components/top-app-bar";
import MainHeader from "@/components/main/main-header";

const Main = () => {
    return (
        <ThemedSafeAreaView>
            <ThemedView style={styles.background}>
                <TopAppBar/>
                <MainHeader/>
                <MainContent/>
            </ThemedView>
        </ThemedSafeAreaView>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1
    },
    text: {
        fontWeight: 'bold',
        textAlign: 'center'
    }
});

export default Main;