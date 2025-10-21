import {ThemedText} from "@/components/themed-text";
import {TouchableOpacity} from "react-native";

interface Props {
    onPress?: () => void;
    title?: string;
    style?: object;
}

const ThemedTextButton = ({onPress, title, style}: Props) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <ThemedText style={style}>{title}</ThemedText>
        </TouchableOpacity>
    );
};

export default ThemedTextButton;