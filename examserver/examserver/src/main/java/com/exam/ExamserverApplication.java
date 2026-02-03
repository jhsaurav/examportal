package com.exam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.*;
import com.exam.entity.Role;
import com.exam.entity.User;
import com.exam.entity.UserRole;
import com.exam.helper.UserFoundException;
import com.exam.service.UserService;

@SpringBootApplication
public class ExamserverApplication implements CommandLineRunner {

	@Autowired
	private UserService userService;

	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	public static void main(String[] args) {
		SpringApplication.run(ExamserverApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		System.out.println("Coding Started");
		try {
			User user = new User();
			user.setFirstName("Saurav");
			user.setLastName("Jha");
			user.setUsername("Sauravjha");
			user.setPassword(this.bCryptPasswordEncoder.encode("jhasaurav"));
			// user.setEmail("");
			user.setPhone("7208736786");
			user.setProfile("default.png");

			Role role1 = new Role();
			role1.setRoleId(44L);
			role1.setRoleName("Admin");

			Set<UserRole> userRoleSet = new HashSet<>();
			UserRole userRole = new UserRole();
			userRole.setRole(role1);

			userRole.setUser(user);

			userRoleSet.add(userRole);

			User user1 = this.userService.createuser(user, userRoleSet);
			System.out.println(user1.getUsername());

		} catch (UserFoundException e) {
			e.printStackTrace();
		}
	}
}
