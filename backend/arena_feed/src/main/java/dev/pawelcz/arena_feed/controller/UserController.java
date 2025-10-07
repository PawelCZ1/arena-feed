package dev.pawelcz.arena_feed.controller;

import dev.pawelcz.arena_feed.dto.CreateUserDto;
import dev.pawelcz.arena_feed.projection.GetAllUsersProjection;
import dev.pawelcz.arena_feed.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    private final UserService userService;

    @Autowired
    UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<CreateUserDto> createUser(@Valid @RequestBody CreateUserDto dto) {
        return new ResponseEntity<>(userService.createUser(dto), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<GetAllUsersProjection>> getAllUsers() {
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }
}
