import {StyleSheet, TouchableOpacity, View} from 'react-native';
import ThemedView from "@/components/themed-view";
import {ThemedText} from "@/components/themed-text";

interface Props {
    onLogin?: () => void;
    onRegister?: () => void;
}

const TopAppBar = ({onLogin, onRegister}: Props) => {
    return (
        <ThemedView style={styles.container}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={onLogin}>
                    <ThemedText>Log In</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity onPress={onRegister}>
                    <ThemedText>Register</ThemedText>
                </TouchableOpacity>
            </View>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        height: 48,
        width: '100%',
        paddingHorizontal: 16
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 16
    }
});

export default TopAppBar;