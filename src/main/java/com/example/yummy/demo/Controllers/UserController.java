package com.example.yummy.demo.Controllers;

import com.example.yummy.demo.Request.LoginRequest;
import com.example.yummy.demo.Request.RegisterRequest;
import com.example.yummy.demo.Responses.LoginResponse;
import com.example.yummy.demo.Responses.TextResponse;
import com.example.yummy.demo.Service.MapValidationErrorService;
import com.example.yummy.demo.Service.UserService;
import com.example.yummy.demo.models.Dtos.UserDto;
import com.example.yummy.demo.models.User;
import com.example.yummy.demo.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.validation.Valid;

import java.security.Principal;

import static com.example.yummy.demo.security.SecurityConstants.TOKEN_PREFIX;

@Controller
@RequestMapping("/api/auth")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest, BindingResult result) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return errorMap;

        Authentication authentication =authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = TOKEN_PREFIX + tokenProvider.generateToken(authentication);

        return ResponseEntity.ok(new LoginResponse(jwt));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest registerRequest, BindingResult result) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return errorMap;

        userService.registerUser(registerRequest);
        return ResponseEntity.ok(new TextResponse("User Created!"));
    }

    @GetMapping()
    public ResponseEntity<?> getCurrentUser(Authentication authentication) {
        User user = (User)authentication.getPrincipal();
        UserDto userDto = UserDto.builder()
                ._id(user.get_id())
                .date(user.getDate())
                .email(user.getEmail())
                .name(user.getName())
                .build();
        return ResponseEntity.ok(userDto);
    }
}

