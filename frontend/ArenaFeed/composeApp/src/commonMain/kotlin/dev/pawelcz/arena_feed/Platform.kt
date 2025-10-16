package dev.pawelcz.arena_feed

interface Platform {
    val name: String
}

expect fun getPlatform(): Platform