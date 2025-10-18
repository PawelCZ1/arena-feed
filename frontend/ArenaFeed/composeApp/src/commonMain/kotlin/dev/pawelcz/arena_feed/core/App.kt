package dev.pawelcz.arena_feed.core

import androidx.compose.runtime.*
import cafe.adriel.voyager.navigator.CurrentScreen
import cafe.adriel.voyager.navigator.Navigator
import org.jetbrains.compose.ui.tooling.preview.Preview
import dev.pawelcz.arena_feed.core.ui.theme.AppTheme
import dev.pawelcz.arena_feed.presentation.splash.SplashScreen

@Composable
@Preview
fun App() {
    AppTheme {
//        var showSplash by remember { mutableStateOf(true) }
//        if (showSplash) {
//            SplashScreen(
//                onFinished = { showSplash = false }
//            )
//        }
        Navigator(SplashScreen) {
            CurrentScreen()
        }
    }
}