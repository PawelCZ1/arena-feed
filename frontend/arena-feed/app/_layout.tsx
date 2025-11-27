import { Stack } from "expo-router";
import {ThemeProvider, DarkTheme, DefaultTheme} from "@react-navigation/native";
import {useColorScheme} from "react-native";
import {AuthProvider} from "@/api/auth/auth-provider";

export default function RootLayout() {
    const colorScheme = useColorScheme();
    return <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AuthProvider>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen
                  name="index"
                  options={{
                      animation: 'none',
                      gestureEnabled: false
                  }}
              />
              <Stack.Screen
                  name="main"
                  options={{
                      animation: 'fade'
                  }}
              />
              <Stack.Screen
                  name="register"
                  options={{
                      animation: 'fade'
                  }}
              />
              <Stack.Screen
                  name="login"
                  options={{
                      animation: 'fade'
                  }}
              />
              <Stack.Screen
                  name="tournaments" options={{
                  animation: 'fade'
              }}
              />
              <Stack.Screen
                  name="tournament-details/[id]"
                  options={{
                      animation: 'fade'
                  }}
              />
                <Stack.Screen
                    name="profile-details"
                    options={{
                        animation: 'fade'
                    }}
                />
                <Stack.Screen
                    name="create-tournament"
                    options={{
                        animation: 'fade'
                    }}
                />
            </Stack>
        </AuthProvider>
  </ThemeProvider>;
}
