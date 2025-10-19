package dev.pawelcz.arena_feed.presentation.main.components

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.RectangleShape
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import org.jetbrains.compose.ui.tooling.preview.Preview

@Composable
@Preview
fun MainContent(
    onSearchClick: () -> Unit = {},
    onCreateClick: () -> Unit = {}
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(32.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.SpaceBetween
    ) {
//        Spacer(modifier = Modifier.weight(1f))
        Text(
            "Welcome to Arena Feed!",
            style = MaterialTheme.typography.headlineMedium,
            fontStyle = FontStyle.Italic,
            fontWeight = FontWeight.Bold,
            textAlign = TextAlign.Center
        )
        Spacer(modifier = Modifier.weight(1f))
        Column(
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            OutlinedButton(
                modifier = Modifier.fillMaxWidth(),
                onClick = onSearchClick,
                shape = RectangleShape,
//                colors = ButtonDefaults.outlinedButtonColors(
//                    contentColor = Color.Black
//                )
            ) {
                Text(
                    "Search upcoming tournaments",
                    textAlign = TextAlign.Center
                )
            }
            OutlinedButton(
                modifier = Modifier.fillMaxWidth(),
                onClick = onCreateClick,
                shape = RectangleShape,
//                colors = ButtonDefaults.outlinedButtonColors(
//                    contentColor = Color.Black
//                )
            ) {
                Text(
                    "Create new tournament",
                    textAlign = TextAlign.Center
                )
            }
        }
        Spacer(modifier = Modifier.weight(1f))
    }
}