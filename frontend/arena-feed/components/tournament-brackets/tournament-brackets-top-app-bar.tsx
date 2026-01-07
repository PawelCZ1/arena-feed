import React from 'react';
import {useRouter} from "expo-router";
import ThemedView from "@/components/themed-view";
import ThemedTextButton from "@/components/themed-text-button";
import {StyleSheet, View} from "react-native";
import {ThemedText} from "@/components/themed-text";

interface Props {
    title?: string;
}

const TournamentBracketsTopAppBar = ({title}: Props) => {
    const router = useRouter();
    const onBack = () => {
        router.back();
    }

    return (
        <ThemedView style={styles.container}>
            <ThemedTextButton onPress={onBack} title={"Back"}/>
            <ThemedText style={styles.title}>
                {title ?? "Tournament Brackets"}
            </ThemedText>
            <View style={styles.placeholder} />
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 16,
    },
    title: {
        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    placeholder: {
        width: 50,
    }
});

export default TournamentBracketsTopAppBar;
