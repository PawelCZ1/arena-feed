package dev.pawelcz.arena_feed.service;

import dev.pawelcz.arena_feed.entity.AdminEntity;
import dev.pawelcz.arena_feed.properties.AdminConfig;
import dev.pawelcz.arena_feed.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AdminServiceImpl implements AdminService {

    private final AdminRepository adminRepository;
    private final AdminConfig adminConfig;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AdminServiceImpl(
            AdminRepository adminRepository,
            AdminConfig adminConfig,
            PasswordEncoder passwordEncoder

    ) {
        this.adminRepository = adminRepository;
        this.adminConfig = adminConfig;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public boolean doesAdminExist() {
        return adminRepository.doesAdminExist();
    }

    @Override
    public String createAdminOnFirstRun() {
        AdminEntity admin = new AdminEntity();
        admin.setUsername(adminConfig.getUsername());
        admin.setPassword(passwordEncoder.encode(adminConfig.getPassword()));
        admin.setEmail(adminConfig.getEmail());
        adminRepository.save(admin);
        return "Admin user created with username: " + adminConfig.getUsername() + " and email: " + adminConfig.getEmail();
    }
}
