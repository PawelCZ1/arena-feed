import {StyleSheet} from "react-native";
import {ThemedText} from "@/components/themed-text";

const MainHeader = () => {
    return (
        <ThemedText style={styles.header} type={"title"}>What is your goal?</ThemedText>
    );
};

const styles = StyleSheet.create({
    header: {
        paddingTop: 48,
        paddingStart: 16,
        width: "100%",
        fontWeight: 'bold',
        textAlign: 'left',
        fontStyle: "italic",
    }
});

export default MainHeader;