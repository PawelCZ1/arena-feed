package dev.pawelcz.arena_feed.service;


import dev.pawelcz.arena_feed.dto.CreateUserDto;
import dev.pawelcz.arena_feed.dto.GetUserDto;

import java.util.List;
import java.util.UUID;

public interface UserService {
    List<GetUserDto> getAllUsers();
    GetUserDto getUserById (UUID id);
    GetUserDto createUser(CreateUserDto dto);
}
