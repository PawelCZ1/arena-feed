import {View} from 'react-native';

export const VerticalSpacer = ({ size = 16 }: { size?: number }) => (
    <View style={{ height: size }} />
);