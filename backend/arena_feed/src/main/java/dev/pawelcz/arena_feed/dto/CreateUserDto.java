package dev.pawelcz.arena_feed.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CreateUserDto {
    private String username;
    private String password;
    private String email;
    private String firstName;
    private String lastName;
    private LocalDateTime dateOfBirth;
}
