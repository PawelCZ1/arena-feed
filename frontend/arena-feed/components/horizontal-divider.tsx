import { View } from 'react-native';
import {useThemeColor} from "@/hooks/use-theme-color";

interface Props {
    thickness: number;
    lightColor?: string;
    darkColor?: string;
}

export const HorizontalDivider = ({ thickness, lightColor, darkColor }: Props) => {
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
    return (
        <View
            style={{
                width: '100%',
                height: thickness,
                backgroundColor: color
            }}
        />
    );
};