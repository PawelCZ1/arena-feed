// kotlin
package dev.pawelcz.arena_feed.presentation.main

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.safeDrawing
import androidx.compose.foundation.layout.windowInsetsPadding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import cafe.adriel.voyager.core.screen.Screen
import cafe.adriel.voyager.navigator.LocalNavigator
import cafe.adriel.voyager.navigator.currentOrThrow
import dev.pawelcz.arena_feed.presentation.main.components.MainAppBar
import dev.pawelcz.arena_feed.presentation.main.components.MainContent
import dev.pawelcz.arena_feed.presentation.register.RegisterAction
import dev.pawelcz.arena_feed.presentation.register.RegisterScreen

object MainScreen : Screen {
    @Composable
    override fun Content() {
        val navigator = LocalNavigator.currentOrThrow
        Surface(
            modifier = Modifier
                .fillMaxSize(),
            color = MaterialTheme.colorScheme.background,
            tonalElevation = 0.dp
        ) {
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .windowInsetsPadding(WindowInsets.safeDrawing)
            ) {
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.Top
                ) {
                    MainAppBar(
                        onRegisterClick = {
                            navigator.push(RegisterScreen(
                                onAction = { action ->
                                    when (action) {
                                        is RegisterAction.OnBackClick -> navigator.pop()
                                        else -> Unit
                                    }
                                    //viewModel.onAction(action)
                                }
                            ))
                        }
                    )
                    MainContent()
                }
            }
        }
    }
}
