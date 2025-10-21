import ThemedView from "@/components/themed-view";
import {StyleSheet, View} from "react-native";
import ThemedTextButton from "@/components/themed-text-button";
import {useRouter} from "expo-router";


const RegisterTopAppBar = () => {
    const router = useRouter();
    const onBack = () => {
        router.back();
    }

    return (
        <ThemedView style={styles.container}>
            <ThemedTextButton onPress={onBack} title={"Back"}/>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start',
        width: '100%',
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 16,
    }
});

export default RegisterTopAppBar;