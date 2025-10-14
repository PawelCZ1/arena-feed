import {Button, StyleSheet, View} from "react-native";
import {ThemedText} from "@/components/themed-text";
import ThemedButton from "@/components/themed-button";
import {VerticalSpacer} from "@/components/vertical-spacer";

const MainContent = () => {
    return (
        <View style={styles.container}>
            <ThemedText style={styles.question}>What is your goal?</ThemedText>
            <VerticalSpacer size={32} />
            <ThemedButton title={"Search upcoming tournaments"}/>
            <VerticalSpacer size={8} />
            <ThemedButton title={"Create new tournament"}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    question: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontStyle: "italic",
    }
});

export default MainContent;