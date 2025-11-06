import React from 'react';
import ThemedView from "@/components/themed-view";
import {StyleSheet, View} from "react-native";
import {useRouter} from "expo-router";
import ThemedTextButton from "@/components/themed-text-button";

const TournamentsTopAppBar = () => {
    const router = useRouter();
    const onBack = () => {
        router.back();
    }
    const onLogin = () => {
        router.push('/login');
    };
    const onRegister = () => {
        router.push('/register');
    };

    return (
        <ThemedView style={styles.container}>
            <ThemedTextButton onPress={onBack} title={"Back"}/>
            <View style={styles.buttonContainer}>
                <ThemedTextButton onPress={onLogin} title={"Login"}/>
                <ThemedTextButton onPress={onRegister} title={"Register"}/>
            </View>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 16
    }
});

export default TournamentsTopAppBar;