package dev.pawelcz.arena_feed.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import dev.pawelcz.arena_feed.dto.CreateUserDto;
import dev.pawelcz.arena_feed.projection.GetAllUsersProjection;
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
        GetAllUsersProjection GET_ALL_USERS_PROJECTION_1 = new GetAllUsersProjection() {
            @Override
            public String getUsername() {
                return "user1";
            }

            @Override
            public String getEmail() {
                return "user1@example.com";
            }

            @Override
            public String getFirstName() {
                return "John";
            }

            @Override
            public String getLastName() {
                return "Doe";
            }
        };

        GetAllUsersProjection GET_ALL_USERS_PROJECTION_2 = new GetAllUsersProjection() {
            @Override
            public String getUsername() {
                return "user2";
            }

            @Override
            public String getEmail() {
                return "user2@example.com";
            }

            @Override
            public String getFirstName() {
                return "Jane";
            }

            @Override
            public String getLastName() {
                return "Smith";
            }
        };

        GetAllUsersProjection GET_ALL_USERS_PROJECTION_3 = new GetAllUsersProjection() {
            @Override
            public String getUsername() {
                return "user3";
            }

            @Override
            public String getEmail() {
                return "user3@example.com";
            }

            @Override
            public String getFirstName() {
                return "Adam";
            }

            @Override
            public String getLastName() {
                return "Jackson";
            }
        };

        List<GetAllUsersProjection> users = List.of(
                GET_ALL_USERS_PROJECTION_1,
                GET_ALL_USERS_PROJECTION_2,
                GET_ALL_USERS_PROJECTION_3
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
        Mockito.when(userService.createUser(Mockito.any(CreateUserDto.class))).thenReturn(dto);

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

        Mockito.when(userService.createUser(Mockito.any(CreateUserDto.class))).thenReturn(dto);
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

        Mockito.when(userService.createUser(Mockito.any(CreateUserDto.class))).thenReturn(dto);
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

        Mockito.when(userService.createUser(Mockito.any(CreateUserDto.class))).thenReturn(dto);
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

        Mockito.when(userService.createUser(Mockito.any(CreateUserDto.class))).thenReturn(dto);
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

        Mockito.when(userService.createUser(Mockito.any(CreateUserDto.class))).thenReturn(dto);
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

        Mockito.when(userService.createUser(Mockito.any(CreateUserDto.class))).thenReturn(dto);
        mockMvc.perform(
                post("/api/v1/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto))
        ).andExpect(status().isBadRequest());
    }
}
