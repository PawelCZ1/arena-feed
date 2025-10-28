import {ThemedText} from "@/components/themed-text";
import {StyleSheet} from "react-native";

const TournamentDetailsHeader = () => {
    return (
        <ThemedText type={"title"} style={styles.text}>
            Default Tournament Name
        </ThemedText>
    );
};

const styles = StyleSheet.create({
    text: {
        width: "100%",
        textAlign: "left",
    }
});

export default TournamentDetailsHeader;