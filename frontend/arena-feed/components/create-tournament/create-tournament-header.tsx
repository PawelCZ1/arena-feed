import {ThemedText} from "@/components/themed-text";
import {StyleSheet} from "react-native";


const CreateTournamentHeader = () => {
    return (
        <ThemedText style={styles.header} type={"title"}>Create Tournament</ThemedText>
    );
};

const styles = StyleSheet.create({
    header: {
        paddingTop: 32,
        paddingStart: 16,
        width: "100%",
        fontWeight: 'bold',
        textAlign: 'left',
        fontStyle: "italic",
    }
});

export default CreateTournamentHeader;