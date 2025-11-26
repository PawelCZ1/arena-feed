import React from 'react';
import {StyleSheet, View} from "react-native";
import {useThemeColor} from "@/hooks/use-theme-color";
import {ThemedText} from "@/components/themed-text";
import {HorizontalDivider} from "@/components/horizontal-divider";

interface Props {
    name: string;
    value: string;
}

const ProfileDetailsSectionRow = ({name, value}: Props) => {
    return (
        <View>
            <View style={styles.row}>
                <ThemedText style={styles.text}>
                    {name}
                </ThemedText>
                <ThemedText style={styles.text}>
                    {value}
                </ThemedText>
            </View>
            <HorizontalDivider thickness={1}/>
        </View>

    );
};

const styles = StyleSheet.create({
    row: {
        padding: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    text: {
        fontStyle: 'italic',
    }
});

export default ProfileDetailsSectionRow;