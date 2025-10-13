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
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    question: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontStyle: "italic",
    },
    button: {
        backgroundColor: "gray",
        borderStyle: "dashed",
        borderWidth: 1,
        borderRadius: 5,
        shadowRadius: 5
    }
});

export default MainContent;