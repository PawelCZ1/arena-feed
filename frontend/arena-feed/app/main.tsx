import {StyleSheet} from "react-native";
import ThemedView from "@/components/themed-view";
import MainContent from "@/components/main/main-content";
import ThemedSafeAreaView from "@/components/themed-safe-area-view";
import MainTopAppBar from "@/components/main/main-top-app-bar";
import MainHeader from "@/components/main/main-header";

const Main = () => {
    return (
        <ThemedSafeAreaView>
            <ThemedView style={styles.background}>
                <MainTopAppBar/>
                <MainHeader/>
                <MainContent/>
            </ThemedView>
        </ThemedSafeAreaView>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1
    }
});

export default Main;