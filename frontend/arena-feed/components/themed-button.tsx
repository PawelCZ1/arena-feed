import {TouchableOpacity, View} from "react-native";
import {useThemeColor} from "@/hooks/use-theme-color";
import {ThemedText} from "@/components/themed-text";

interface Props {
    title: string;
    onPress?: () => void;
    lightColor?: string;
    darkColor?: string;
}

const ThemedButton = ({title, onPress, lightColor, darkColor}: Props) => {
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'surface');
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={{ backgroundColor, padding: 10, borderRadius: 5, alignItems: 'center' }}>
                <ThemedText>{title}</ThemedText>
            </View>
        </TouchableOpacity>
    );
};

export default ThemedButton;