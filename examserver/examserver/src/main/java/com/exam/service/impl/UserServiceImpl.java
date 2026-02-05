package com.exam.service.impl;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exam.entity.User;
import com.exam.entity.UserRole;
import com.exam.helper.UserFoundException;
import com.exam.repo.RoleRepository;
import com.exam.repo.UserRepository;
import com.exam.service.UserService;

@Service
public class UserServiceImpl implements UserService {
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private RoleRepository roleRepository;

	@Override
	// creating User
	public User createuser(User user, Set<UserRole> userRoles) throws Exception {
		User local = this.userRepository.findByUsername(user.getUsername());

		if (local != null) {
			System.out.println("User Is Already there !");
			throw new UserFoundException();
		} 
		else {
			for (UserRole ur : userRoles) {
				roleRepository.save(ur.getRole());
			}
			user.getUserRoles().addAll(userRoles);
			local = this.userRepository.save(user);

		}
		return local;
	}
	@Override
	public User getUser(String username) {
		// getting user by username
		return this.userRepository.findByUsername(username);
	}
	@Override
	public void deleteUser(Long userId) {
		this.userRepository.deleteById(userId);

	}

}
