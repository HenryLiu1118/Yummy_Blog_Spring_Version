package com.example.yummy.demo.Service;

import com.example.yummy.demo.Exceptions.exception.DatabaseDuplicateException;
import com.example.yummy.demo.Exceptions.exception.DatabaseNotFoundException;
import com.example.yummy.demo.Repository.ProfileRepo;
import com.example.yummy.demo.Repository.UserRepo;
import com.example.yummy.demo.Request.ProfileRequest;
import com.example.yummy.demo.models.Dtos.ProfileDto;
import com.example.yummy.demo.models.Dtos.UserDto;
import com.example.yummy.demo.models.Profile;
import com.example.yummy.demo.models.User;
import com.example.yummy.demo.models.Wraper.Follow;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class ProfileService {

    @Autowired
    private ProfileRepo profileRepo;

    @Autowired
    private UserRepo userRepo;

    public ProfileDto getMyProfile(User user) {
        Profile profile = profileRepo.findByUser(user);
        if (profile == null) {
            throw new DatabaseNotFoundException("There's no prefile for this user");
        }
        return convertProfileToDto(profile);
    }

    public ProfileDto getProfileByUserId(String userId) {
        User user = userRepo.findBy_id(userId);
        Profile profile = profileRepo.findByUser(user);
        if (profile == null) {
            throw new DatabaseNotFoundException("There's no prefile for this user");
        }
        return convertProfileToDto(profile);
    }

    public List<ProfileDto> getAllProfiles() {
        List<Profile> profiles = profileRepo.findAll();
        return convertProfileToDtos(profiles);
    }

    public List<ProfileDto> getMyFollows(User user) {
        List<Follow> follows = profileRepo.findByUser(user).getFollows();
        List<Profile> profiles = new ArrayList<>();
        for (Follow follow : follows) {
            Profile profile = profileRepo.findByUser(follow.getUser());
            profiles.add(profile);
        }
        return convertProfileToDtos(profiles);
    }

    public void deleteProfile(User user) {
        Profile profile = profileRepo.findByUser(user);
        //delete post
        if (profile != null) profileRepo.delete(profile);
        userRepo.delete(user);
    }

    public ProfileDto SaveProfile(ProfileRequest profileRequest, User user) {
        String location = profileRequest.getLocation();
        String bio = profileRequest.getBio();
        List<String> favourites = new ArrayList<>();
        for (String s : profileRequest.getFavorites().split(",")) {
            favourites.add(s.trim());
        }

        Profile profile = profileRepo.findByUser(user);
        if (profile != null) {
            profile.setFavorites(favourites);
            profile.setBio(bio);
            profile.setLocation(location);
            profile.setDate(new Date());
        } else {
            profile = Profile.builder()
                    .user(user)
                    .bio(bio)
                    .location(location)
                    .favorites(favourites)
                    .follows(new ArrayList<>())
                    .date(new Date())
                    .build();
        }

        profileRepo.save(profile);

        return convertProfileToDto(profile);
    }

    public ProfileDto AddFollow(String id, User user) {
        Profile profile = profileRepo.findByUser(user);
        if (AlreadyFollow(profile, id)) {
            throw new DatabaseDuplicateException("Already followed");
        }

        User followUser = userRepo.findBy_id(id);

        profile.getFollows().add(new Follow(followUser, id));
        profileRepo.save(profile);

        return convertProfileToDto(profile);
    }

    public ProfileDto UnFollow(String id, User user) {
        Profile profile = profileRepo.findByUser(user);
        List<Follow> follows = profile.getFollows();
        for (int i = 0; i < follows.size(); i++) {
            if (follows.get(i).getUserId().equals(id)) {
                follows.remove(i);
                profile.setFollows(follows);
                profileRepo.save(profile);

                return convertProfileToDto(profile);
            }
        }

        throw new DatabaseNotFoundException("User has not been followed yet");
    }

    private boolean AlreadyFollow(Profile profile, String id) {
        for (Follow follow : profile.getFollows()) {
            if (follow.getUserId().equals(id)) {
                return true;
            }
        }
        return false;
    }

    private List<ProfileDto> convertProfileToDtos(List<Profile> profiles) {
        List<ProfileDto> profileDtos = new ArrayList<>();
        for (Profile profile : profiles) {
            profileDtos.add(convertProfileToDto(profile));
        }
        return profileDtos;
    }

    private ProfileDto convertProfileToDto(Profile profile) {
        ProfileDto profileDto = ProfileDto.builder()
                .bio(profile.getBio())
                ._id(profile.get_id())
                .date(profile.getDate())
                .favorites(profile.getFavorites())
                .follows(new ArrayList<>(profile.getFollows()))
                .location(profile.getLocation())
                .user(convertUserToDto(profile.getUser()))
                .build();
        return profileDto;
    }

    private UserDto convertUserToDto(User user) {
        UserDto userDto = UserDto.builder()
                .name(user.getName())
                .email(user.getEmail())
                .date(user.getDate())
                ._id(user.get_id())
                .build();
        return userDto;
    }
}
