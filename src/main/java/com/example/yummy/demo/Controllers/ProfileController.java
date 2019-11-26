package com.example.yummy.demo.Controllers;

import com.example.yummy.demo.Request.ProfileRequest;
import com.example.yummy.demo.Responses.TextResponse;
import com.example.yummy.demo.Service.MapValidationErrorService;
import com.example.yummy.demo.Service.ProfileService;
import com.example.yummy.demo.models.Dtos.ProfileDto;
import com.example.yummy.demo.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Controller
@RequestMapping("api/profile")
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @GetMapping("/me")
    public ResponseEntity<?> getMyProfile(Authentication authentication) {
        ProfileDto profileDto = profileService.getMyProfile((User)authentication.getPrincipal());
        return ResponseEntity.ok(profileDto);
    }

    @GetMapping("/user/{user_id}")
    public ResponseEntity<?> getProfileByUserId(@PathVariable String user_id) {
        ProfileDto profileDto = profileService.getProfileByUserId(user_id);
        return ResponseEntity.ok(profileDto);
    }

    @GetMapping("/All")
    public ResponseEntity<?> getAllProfiles() {
        List<ProfileDto> profileDtos= profileService.getAllProfiles();
        return ResponseEntity.ok(profileDtos);
    }

    @GetMapping("/follows")
    public ResponseEntity<?> getMyFollows(Authentication authentication) {
        List<ProfileDto> profileDtos= profileService.getMyFollows((User)authentication.getPrincipal());
        return ResponseEntity.ok(profileDtos);
    }

    @DeleteMapping()
    public ResponseEntity<?> deleteProfile(Authentication authentication) {
        profileService.deleteProfile((User)authentication.getPrincipal());
        return ResponseEntity.ok(new TextResponse("Account Deleted!"));
    }

    @PostMapping()
    public ResponseEntity<?> SaveProfile(@Valid @RequestBody ProfileRequest profileRequest, BindingResult result, Authentication authentication) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return errorMap;

        ProfileDto profileDto = profileService.SaveProfile(profileRequest, (User)authentication.getPrincipal());
        return ResponseEntity.ok(profileDto);
    }

    @PutMapping("/follow/{id}")
    public ResponseEntity<?> AddFollow(@PathVariable String id, Authentication authentication) {
        ProfileDto profileDto = profileService.AddFollow(id, (User)authentication.getPrincipal());
        return ResponseEntity.ok(profileDto);
    }

    @PutMapping("/unfollow/{id}")
    public ResponseEntity<?> UnFollow(@PathVariable String id, Authentication authentication) {
        ProfileDto profileDto = profileService.UnFollow(id, (User)authentication.getPrincipal());
        return ResponseEntity.ok(profileDto);
    }
}
