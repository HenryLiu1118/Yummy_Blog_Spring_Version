package com.example.yummy.demo.security;

public class SecurityConstants {
    public static final String[] AUTH_URLS = {"/api/auth/login", "/api/auth/register","/api/yelp/**"};
    public static final String SECRET ="HenrySecretToken";
    public static final String TOKEN_PREFIX= "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final long EXPIRATION_TIME = 3600000;
}
