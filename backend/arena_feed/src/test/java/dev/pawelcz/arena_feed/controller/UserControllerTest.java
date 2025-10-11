package dev.pawelcz.arena_feed.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import dev.pawelcz.arena_feed.dto.CreateUserDto;
import dev.pawelcz.arena_feed.dto.GetUserDto;
import dev.pawelcz.arena_feed.security.TestSecurityConfig;
import dev.pawelcz.arena_feed.service.UserService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.LocalDateTime;
import java.util.List;

@WebMvcTest(UserController.class)
@Import(TestSecurityConfig.class)
public class UserControllerTest {
    @Autowired
    MockMvc mockMvc;
    @Autowired
    ObjectMapper objectMapper;
    @MockitoBean
    UserService userService;

    @Test
    void shouldReturnAllUsers() throws Exception {
        GetUserDto USERS_1 = new GetUserDto("user1",
                "user1@example.com", "John", "Doe");

        GetUserDto USERS_2 = new GetUserDto("user2",
                "user2@example.com", "Jane", "Smith");

        GetUserDto USERS_3 = new GetUserDto("user3",
                "user3@example.com", "Adam", "Jackson");

        List<GetUserDto> users = List.of(
                USERS_1,
                USERS_2,
                USERS_3
        );

        Mockito.when(userService.getAllUsers()).thenReturn(users);

        mockMvc.perform(
                get("/api/v1/users")
                        .contentType(MediaType.APPLICATION_JSON)
        )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(3)))
                .andExpect(jsonPath("$[1].firstName", is("Jane")));

    }

    @Test
    void shouldReturnEmptyListWhenNoUsers() throws Exception {
        Mockito.when(userService.getAllUsers()).thenReturn(List.of());

        mockMvc.perform(
                get("/api/v1/users")
                        .contentType(MediaType.APPLICATION_JSON)
        )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(0)));
    }

    @Test
    void shouldCreateNewUser() throws Exception {
        CreateUserDto dto = new CreateUserDto(
                "newuser", "asdf12345", "user@email.com", "First", "Last", LocalDateTime.of(2000, 1, 1, 0, 0)
        );
        GetUserDto newUser = new GetUserDto("newuser", "user@email.com", "First", "Last");

        Mockito.when(userService.createUser(Mockito.any(CreateUserDto.class))).thenReturn(newUser);

        mockMvc.perform(
                post("/api/v1/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto))
        )
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.username", is("newuser")));
    }

    @Test
    void shouldReturnBadRequestWhenUserWithInvalidEmailIsCreated() throws Exception {
        CreateUserDto dto = new CreateUserDto(
                "newuser", "asdf12345", "usersdewea", "First", "Last", LocalDateTime.of(2000, 1, 1, 0, 0)
        );
        GetUserDto newUser = new GetUserDto("newuser", "usersdewea", "First", "Last");

        Mockito.when(userService.createUser(Mockito.any(CreateUserDto.class))).thenReturn(newUser);
        mockMvc.perform(
                post("/api/v1/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto))
        ).andExpect(status().isBadRequest());
    }

    @Test
    void shouldReturnBadRequestWhenUserWithInvalidPasswordIsCreated() throws Exception {
        CreateUserDto dto = new CreateUserDto(
                "newuser", "as5", "user@gmail.com", "First", "Last", LocalDateTime.of(2000, 1, 1, 0, 0)
        );
        GetUserDto newUser = new GetUserDto("newuser", "user@email.com", "First", "Last");

        Mockito.when(userService.createUser(Mockito.any(CreateUserDto.class))).thenReturn(newUser);
        mockMvc.perform(
                post("/api/v1/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto))
        ).andExpect(status().isBadRequest());
    }

    @Test
    void shouldReturnBadRequestWhenUserWithBlankUsernameIsCreated() throws Exception {
        CreateUserDto dto = new CreateUserDto(
                "", "as5asdadadada", "user@gmail.com", "First", "Last", LocalDateTime.of(2000, 1, 1, 0, 0)
        );
        GetUserDto newUser = new GetUserDto("", "user@email.com", "First", "Last");

        Mockito.when(userService.createUser(Mockito.any(CreateUserDto.class))).thenReturn(newUser);
        mockMvc.perform(
                post("/api/v1/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto))
        ).andExpect(status().isBadRequest());
    }

    @Test
    void shouldReturnBadRequestWhenUserWithBlankFirstNameIsCreated() throws Exception {
        CreateUserDto dto = new CreateUserDto(
                "tesetttt", "as5asdadadada", "user@gmail.com", "", "Last", LocalDateTime.of(2000, 1, 1, 0, 0)
        );
        GetUserDto newUser = new GetUserDto("newuser", "user@email.com", "", "Last");

        Mockito.when(userService.createUser(Mockito.any(CreateUserDto.class))).thenReturn(newUser);
        mockMvc.perform(
                post("/api/v1/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto))
        ).andExpect(status().isBadRequest());
    }

    @Test
    void shouldReturnBadRequestWhenUserWithBlankLastNameIsCreated() throws Exception {
        CreateUserDto dto = new CreateUserDto(
                "weqeqewsdseqe", "as5asdadadada", "user@gmail.com", "First", "", LocalDateTime.of(2000, 1, 1, 0, 0)
        );
        GetUserDto newUser = new GetUserDto("newuser", "user@email.com", "First", "");


        Mockito.when(userService.createUser(Mockito.any(CreateUserDto.class))).thenReturn(newUser);
        mockMvc.perform(
                post("/api/v1/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto))
        ).andExpect(status().isBadRequest());
    }

    @Test
    void shouldReturnBadRequestWhenUserWithNullDateOfBirthIsCreated() throws Exception {
        CreateUserDto dto = new CreateUserDto(
                "weqeqewsdseqe", "as5asdadadada", "user@gmail.com", "First", "Last", null
        );
        GetUserDto newUser = new GetUserDto("weqeqewsdseqe", "user@email.com", "First", "Last");

        Mockito.when(userService.createUser(Mockito.any(CreateUserDto.class))).thenReturn(newUser);
        mockMvc.perform(
                post("/api/v1/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto))
        ).andExpect(status().isBadRequest());
    }
}
