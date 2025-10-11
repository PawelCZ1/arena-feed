package dev.pawelcz.arena_feed;

import dev.pawelcz.arena_feed.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ArenaFeedApplication implements CommandLineRunner {

	private final AdminService adminService;

	@Autowired
	public ArenaFeedApplication(AdminService adminService) {
		this.adminService = adminService;
	}

	public static void main(String[] args) {
		SpringApplication.run(ArenaFeedApplication.class, args);
	}

	@Override
	public void run(String... args) {
		if (!adminService.doesAdminExist()) {
			System.out.println(adminService.createAdminOnFirstRun());
		}
	}
}
