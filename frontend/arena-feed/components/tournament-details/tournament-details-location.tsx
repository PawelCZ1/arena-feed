import {useThemeColor} from "@/hooks/use-theme-color";
import {StyleSheet, View} from "react-native";
import {ThemedText} from "@/components/themed-text";

interface Props {
    lightColor?: string;
    darkColor?: string;
    location?: string;
}

const TournamentDetailsLocation = ({lightColor, darkColor, location}: Props) => {
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'surface');
    return (
        <View style={[{backgroundColor}, styles.container]}>
            <ThemedText style={styles.title}>
                Location
            </ThemedText>
            <ThemedText>
                {location || "Location not specified."}
            </ThemedText>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
    },
    container: {
        borderRadius: 8,
        padding: 8,
        gap: 4,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default TournamentDetailsLocation;