package dev.pawelcz.arena_feed.service;

import dev.pawelcz.arena_feed.dto.CreateUserDto;
import dev.pawelcz.arena_feed.dto.GetUserDto;
import dev.pawelcz.arena_feed.entity.UserEntity;
import dev.pawelcz.arena_feed.mapper.UserMapper;
import dev.pawelcz.arena_feed.projection.GetUserProjection;
import dev.pawelcz.arena_feed.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public List<GetUserDto> getAllUsers() {
        return userRepository.getAllUsers().stream().map(UserMapper::toDto).toList();
    }

    @Override
    public GetUserDto getUserById(UUID id) {
        UserEntity entity = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        return UserMapper.toDto(entity);
    }

    @Override
    public GetUserDto createUser(CreateUserDto dto) {
        UserEntity entity = UserMapper.toEntity(dto, passwordEncoder.encode(dto.getPassword()));
        userRepository.save(entity);
        return UserMapper.toDto(entity);
    }
}
