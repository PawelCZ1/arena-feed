import {ThemedText} from "@/components/themed-text";
import ThemedTextInput from "@/components/themed-text-input";
import {StyleSheet, View} from "react-native";

interface Props {
    inputName: string;
    inputValue: string;
    placeholder?: string;
    onChangeText: (value: string) => void;
}

const FormRow = ({inputName, inputValue, placeholder, onChangeText}: Props) => {
    return (
        <View>
            <ThemedText style={styles.text}>{inputName}</ThemedText>
            <ThemedTextInput
                style={styles.input}
                value={inputValue}
                onChangeText={onChangeText}
                placeholder={placeholder}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        fontWeight: 'bold',
    },
    input: {
        width: 300,
    }
});

export default FormRow;