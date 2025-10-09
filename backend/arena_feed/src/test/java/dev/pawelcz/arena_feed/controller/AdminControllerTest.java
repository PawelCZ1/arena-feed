package dev.pawelcz.arena_feed.controller;

import dev.pawelcz.arena_feed.security.TestSecurityConfig;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;

@WebMvcTest(AdminController.class)
@Import(TestSecurityConfig.class)
public class AdminControllerTest {
}
