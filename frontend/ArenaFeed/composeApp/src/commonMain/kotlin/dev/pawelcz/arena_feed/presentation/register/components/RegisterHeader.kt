package dev.pawelcz.arena_feed.presentation.register.components

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.text.style.TextAlign

@Composable
fun RegisterHeader() {
    Text(
        "Register",
        style = MaterialTheme.typography.headlineMedium,
        textAlign = TextAlign.Start
    )
}