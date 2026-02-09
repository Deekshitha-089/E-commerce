package com.ecommerce.backend.service;

import com.ecommerce.backend.dto.LoginRequest;
import com.ecommerce.backend.dto.SignupRequest;
import com.ecommerce.backend.model.User;
import com.ecommerce.backend.repository.UserRepository;
import com.ecommerce.backend.security.JwtUtil;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public UserService(UserRepository userRepository, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    // ================= SIGNUP =================
    public User register(SignupRequest request) {
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail().trim().toLowerCase());
        user.setPassword(encoder.encode(request.getPassword()));
        user.setRole("USER");

        return userRepository.save(user);
    }

    // ================= LOGIN =================
    public String login(LoginRequest request) {

        String email = request.getEmail().trim().toLowerCase();

        // 🔍 DEBUG LOGS (TEMPORARY)
        System.out.println("LOGIN EMAIL (REQUEST): " + email);
        System.out.println("LOGIN PASSWORD (RAW): " + request.getPassword());

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        System.out.println("PASSWORD IN DB (HASHED): " + user.getPassword());

        if (!encoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        // ✅ JWT token generation
        return jwtUtil.generateToken(user.getEmail());
    }
}
