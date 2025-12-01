import React from 'react';
import {StyleSheet, View} from "react-native";
import {ThemedText} from "@/components/themed-text";
import ThemedButton from "@/components/themed-button";
import RNDateTimePicker from "@react-native-community/datetimepicker";

interface Props {
    date: Date;
    showPicker: boolean;
    onDatePickerButtonPress: () => void;
    onAndroidChange: (event: any, selectedDate?: Date) => void;
}

const AndroidDatePicker = ({date, showPicker, onDatePickerButtonPress, onAndroidChange}: Props) => {
    return (
        <>
            <View style={styles.datePickerButton}>
                <ThemedText style={{ textAlign: "center" }}>
                    {date.toLocaleDateString("pl-PL")}
                </ThemedText>
                <ThemedButton
                    title={showPicker ? "Hide picker" : "Show picker"}
                    onPress={onDatePickerButtonPress}
                />
            </View>

            {showPicker && (
                <RNDateTimePicker
                    value={date}
                    mode="date"
                    display="calendar"
                    onChange={onAndroidChange}
                />
            )}
        </>
    );
};

const styles = StyleSheet.create({
    datePickerButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
    },
});

export default AndroidDatePicker;