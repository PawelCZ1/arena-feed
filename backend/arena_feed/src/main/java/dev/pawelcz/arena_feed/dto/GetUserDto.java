package dev.pawelcz.arena_feed.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class GetUserDto {
    private String username;
    private String email;
    private String firstName;
    private String lastName;
}
