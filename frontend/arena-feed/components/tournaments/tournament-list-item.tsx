// `components/tournaments/tournament-list-item.tsx`
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Image } from 'expo-image';
import defaultImage from '@/assets/images/react-logo.png';
import { ThemedText } from '@/components/themed-text';

interface Props {
    name: string;
    description?: string;
    date?: Date | string;
    lightColor?: string;
    darkColor?: string;
}

const TournamentListItem = ({ name, description, date, lightColor, darkColor }: Props) => {
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'surface');

    const dateObj: Date | null =
        date == null ? null : typeof date === 'string' ? new Date(date) : date;

    const formattedDate =
        dateObj && !isNaN(dateObj.getTime()) ? dateObj.toLocaleDateString('pl-PL') : '';

    return (
        <View style={[{ backgroundColor }, styles.container]}>
            <Image style={styles.image} source={defaultImage} contentFit="cover" />
            <View style={styles.content}>
                <ThemedText type={'subtitle'}>{name}</ThemedText>
                {description ? <ThemedText>{description}</ThemedText> : <ThemedText>No description provided</ThemedText>}
                <ThemedText type={'footer'}>{formattedDate}</ThemedText>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        flexDirection: 'row',
        padding: 16,
        alignItems: 'center',
    },
    image: {
        height: 64,
        width: 64, // liczba, nie "auto"
        borderRadius: 8,
        marginRight: 12,
    },
    content: {
        flex: 1,
        flexShrink: 1,
        flexWrap: 'wrap',
    },
});

export default TournamentListItem;