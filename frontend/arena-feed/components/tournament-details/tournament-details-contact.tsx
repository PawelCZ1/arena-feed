import {useThemeColor} from "@/hooks/use-theme-color";
import {StyleSheet, View} from "react-native";
import {ThemedText} from "@/components/themed-text";

interface Props {
    lightColor?: string;
    darkColor?: string;
    email?: string;
    phoneNumber?: string;
}

const TournamentDetailsContact = ({lightColor, darkColor, email, phoneNumber}: Props) => {
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'surface');
    if (!email && !phoneNumber) {
        return (
            <View style={[{backgroundColor}, styles.container]}>
                <ThemedText style={styles.title}>
                    No Contact Information
                </ThemedText>
            </View>
        );
    }
    return (
        <View style={[{backgroundColor}, styles.container]}>
            <ThemedText style={styles.title}>
                Contact Information
            </ThemedText>
            {email ? <ThemedText>{email}</ThemedText> : null}
            {phoneNumber ? <ThemedText>{phoneNumber}</ThemedText> : null}
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

export default TournamentDetailsContact;