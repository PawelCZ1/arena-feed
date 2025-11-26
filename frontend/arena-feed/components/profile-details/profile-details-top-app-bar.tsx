import React from 'react';
import ThemedView from "@/components/themed-view";
import {StyleSheet} from "react-native";
import {useRouter} from "expo-router";
import ThemedTextButton from "@/components/themed-text-button";

const ProfileDetailsTopAppBar = () => {
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

export default ProfileDetailsTopAppBar;