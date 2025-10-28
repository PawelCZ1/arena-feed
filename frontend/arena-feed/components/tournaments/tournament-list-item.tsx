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
                <ThemedText type={'subtitle'} numberOfLines={1} ellipsizeMode="tail">
                    {name}
                </ThemedText>
                {description ? (
                    <ThemedText
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={styles.description}
                    >
                        {description}
                    </ThemedText>
                ) : (
                    <ThemedText style={styles.description} numberOfLines={1} ellipsizeMode="tail">
                        No description provided
                    </ThemedText>
                )}
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
        width: 64,
        borderRadius: 8,
        marginRight: 12,
    },
    content: {
        flex: 1,
        flexWrap: 'wrap'
    },
    description: {
        marginTop: 4,
        maxWidth: '80%',
    },
});

export default TournamentListItem;