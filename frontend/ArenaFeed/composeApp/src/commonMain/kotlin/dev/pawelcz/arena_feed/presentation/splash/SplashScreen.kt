package dev.pawelcz.arena_feed.presentation.splash

import androidx.compose.animation.core.FastOutSlowInEasing
import androidx.compose.animation.core.animateFloat
import androidx.compose.animation.core.tween
import androidx.compose.animation.core.updateTransition
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import cafe.adriel.voyager.core.screen.Screen
import cafe.adriel.voyager.navigator.LocalNavigator
import cafe.adriel.voyager.navigator.currentOrThrow
import dev.pawelcz.arena_feed.presentation.main.MainScreen
import kotlinx.coroutines.delay



object SplashScreen : Screen {

    private enum class SplashPhase { Entering, SlideRight, Finished }

    @Composable
    override fun Content() {
        val navigator = LocalNavigator.currentOrThrow
        val travelPx = with(LocalDensity.current) { 300.dp.toPx() }

        var phase by remember { mutableStateOf(SplashPhase.Entering) }
        val transition = updateTransition(targetState = phase, label = "splash")

        val topY by transition.animateFloat(
            label = "topY",
            transitionSpec = {
                if (initialState == SplashPhase.Entering && targetState == SplashPhase.SlideRight)
                    tween(durationMillis = 2000, easing = FastOutSlowInEasing)
                else
                    tween(durationMillis = 0)
            }
        ) { state ->
            if (state == SplashPhase.Entering) -travelPx else 0f
        }

        val bottomY by transition.animateFloat(
            label = "bottomY",
            transitionSpec = {
                if (initialState == SplashPhase.Entering && targetState == SplashPhase.SlideRight)
                    tween(durationMillis = 2000, easing = FastOutSlowInEasing)
                else
                    tween(durationMillis = 0)
            }
        ) { state ->
            if (state == SplashPhase.Entering) travelPx else 0f
        }

        val centerX by transition.animateFloat(
            label = "centerX",
            transitionSpec = {
                if (initialState == SplashPhase.SlideRight && targetState == SplashPhase.Finished)
                    tween(durationMillis = 1000, easing = FastOutSlowInEasing)
                else
                    tween(durationMillis = 0)
            }
        ) { state ->
            if (state == SplashPhase.Finished) travelPx else 0f
        }

        LaunchedEffect(Unit) {
            phase = SplashPhase.SlideRight
            delay(2000)
            phase = SplashPhase.Finished
            delay(1000)
            navigator.replaceAll(MainScreen)
        }

        Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Text(
                    text = "Arena",
                    style = MaterialTheme.typography.headlineLarge,
                    fontWeight = FontWeight.Bold,
                    modifier = Modifier.graphicsLayer(
                        translationY = topY,
                        translationX = centerX
                    )
                )
                Text(
                    text = "Feed",
                    style = MaterialTheme.typography.headlineLarge,
                    fontWeight = FontWeight.Bold,
                    modifier = Modifier.graphicsLayer(
                        translationY = bottomY,
                        translationX = centerX
                    )
                )
            }
        }
    }
}