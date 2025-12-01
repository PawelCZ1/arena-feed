import React, {useState} from 'react';
import {StyleSheet, View, TextInputContentSizeChangeEvent} from 'react-native';
import {ThemedText} from '@/components/themed-text';
import ThemedTextInput from '@/components/themed-text-input';

interface Props {
    descriptionValue: string;
    onChangeText: (value: string) => void;
}

const MIN_HEIGHT = 120;

const CreateTournamentDescriptionRow = ({descriptionValue, onChangeText}: Props) => {
    const [inputHeight, setInputHeight] = useState(MIN_HEIGHT);

    const handleContentSizeChange = (e: TextInputContentSizeChangeEvent) => {
        setInputHeight(Math.max(MIN_HEIGHT, e.nativeEvent.contentSize.height));
    };

    return (
        <View>
            <ThemedText style={styles.text}>Tournament description</ThemedText>
            <ThemedTextInput
                style={[styles.input, {height: inputHeight}]}
                value={descriptionValue}
                onChangeText={onChangeText}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                placeholder="Type tournament description"
                onContentSizeChange={handleContentSizeChange}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        fontWeight: 'bold'
    },
    input: {
        width: 300,
        paddingVertical: 8
    }
});

export default CreateTournamentDescriptionRow;
