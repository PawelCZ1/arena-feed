import { ThemedText } from "@/components/themed-text";
import ThemedView from "@/components/themed-view";
import { useEffect, useRef } from "react";
import { useRouter } from "expo-router";
import { StyleSheet, Animated } from "react-native";

// Splash screen
export default function Index() {
    const router = useRouter();
    const topTranslateY = useRef(new Animated.Value(-300)).current;
    const bottomTranslateY = useRef(new Animated.Value(300)).current;
    const centerTranslateX = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.replace("/main");
        }, 3000);
        return () => clearTimeout(timeout);
    });

    useEffect(() => {
        Animated.sequence([
            Animated.parallel([
                Animated.timing(topTranslateY, {
                    toValue: 0,
                    duration: 2000,
                    useNativeDriver: true,
                }),
                Animated.timing(bottomTranslateY, {
                    toValue: 0,
                    duration: 2000,
                    useNativeDriver: true,
                })
            ]),
            Animated.timing(centerTranslateX, {
                toValue: 300,
                duration: 1000,
                useNativeDriver: true
            })
        ]).start();

    }, [topTranslateY, bottomTranslateY, centerTranslateX]);

    return (
        <ThemedView style={styles.container}>
            <Animated.View style={{ transform: [{ translateY: topTranslateY }, { translateX: centerTranslateX }] }}>
                <ThemedText type={"title"}>Arena</ThemedText>
            </Animated.View>
            <Animated.View style={{ transform: [{ translateY: bottomTranslateY }, { translateX: centerTranslateX }] }}>
                <ThemedText type={"title"}>Feed</ThemedText>
            </Animated.View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
});