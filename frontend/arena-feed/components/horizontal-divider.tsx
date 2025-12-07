import { View, ViewStyle } from 'react-native';
import {useThemeColor} from "@/hooks/use-theme-color";

interface Props {
    thickness: number;
    lightColor?: string;
    darkColor?: string;
    style?: ViewStyle;
}

export const HorizontalDivider = ({ thickness, lightColor, darkColor, style }: Props) => {
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
    return (
        <View
            style={[{
                alignSelf: 'stretch',
                height: thickness,
                backgroundColor: color,
            }, style]}
        />
    );
};
