import {StyleSheet, View} from 'react-native';
import ThemedView from "@/components/themed-view";
import {useRouter} from "expo-router";
import ThemedTextButton from "@/components/themed-text-button";

const MainTopAppBar = () => {
    const router = useRouter();
    const onLogin = () => {
        //router.push('/login');
    };
    const onRegister = () => {
        router.push('/register');
    };

    return (
        <ThemedView style={styles.container}>
            <View style={styles.buttonContainer}>
                <ThemedTextButton onPress={onLogin} title={"Login"}/>
                <ThemedTextButton onPress={onRegister} title={"Register"}/>
            </View>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-end',
        width: '100%',
        paddingHorizontal: 16,
        paddingTop: 8
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 16
    }
});

export default MainTopAppBar;