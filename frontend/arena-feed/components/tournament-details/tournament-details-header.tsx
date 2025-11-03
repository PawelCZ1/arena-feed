import {ThemedText} from "@/components/themed-text";
import {StyleSheet} from "react-native";

interface Props {
    text?: string;
}
const TournamentDetailsHeader = ({text}: Props) => {
    return (
        <ThemedText type={"title"} style={styles.header}>
            {text || "Tournament Details"}
        </ThemedText>
    );
};

const styles = StyleSheet.create({
    header: {
        paddingTop: 24,
        paddingBottom: 16,
        paddingStart: 16,
        width: "100%",
        fontWeight: 'bold',
        textAlign: 'left',
        fontStyle: "italic",
    }
});

export default TournamentDetailsHeader;