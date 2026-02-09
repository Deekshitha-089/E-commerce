package com.ecommerce.backend.controller;

import java.security.Principal;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:5173") // ✅ THIS LINE
@RestController
@RequestMapping("/api/user")
public class UserController {

    // 🔒 PROTECTED ENDPOINT
    @GetMapping("/profile")
    public Map<String, String> getProfile(Principal principal) {

        return Map.of(
                "email", principal.getName(),
                "message", "This endpoint is protected by JWT"
        );
    }
}
