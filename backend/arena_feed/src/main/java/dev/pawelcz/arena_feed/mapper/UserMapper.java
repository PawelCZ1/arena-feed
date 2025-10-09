package dev.pawelcz.arena_feed.mapper;

import dev.pawelcz.arena_feed.dto.CreateUserDto;
import dev.pawelcz.arena_feed.dto.GetUserDto;
import dev.pawelcz.arena_feed.entity.UserEntity;
import dev.pawelcz.arena_feed.projection.GetUserProjection;

public class UserMapper  {
    public static GetUserDto toDto(UserEntity entity) {
        return new GetUserDto(
                entity.getUsername(),
                entity.getEmail(),
                entity.getFirstName(),
                entity.getLastName()
        );
    }

    public static UserEntity toEntity(CreateUserDto dto, String encodedPassword) {
        UserEntity entity = new UserEntity();
        entity.setUsername(dto.getUsername());
        entity.setPassword(encodedPassword);
        entity.setEmail(dto.getEmail());
        entity.setFirstName(dto.getFirstName());
        entity.setLastName(dto.getLastName());
        entity.setDateOfBirth(dto.getDateOfBirth());
        return entity;
    }

    public static GetUserDto toDto(GetUserProjection projection) {
        return new GetUserDto(
                projection.getUsername(),
                projection.getEmail(),
                projection.getFirstName(),
                projection.getLastName()
        );
    }
}
