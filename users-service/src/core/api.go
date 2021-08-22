package core

import (
	"context"
	"log"

	"github.com/Hanasou/Microservices/users-service/src/authpb"
	"github.com/Hanasou/Microservices/users-service/src/database"
)

func CreateUser(ctx context.Context, username string, password string) (*authpb.CreateUserResponse, error) {
	passwordHash, err := HashPassword(password)
	if err != nil {
		log.Println("Error in hashing password")
		return nil, err
	}
	err = database.AddUserToMongoDb(ctx, username, passwordHash)
	if err != nil {
		log.Println("Error in adding user to db")
		return nil, err
	}

	accessToken, refreshToken, err := GenTokens(username)
	if err != nil {
		log.Println("Error in token generation")
		return nil, err
	}

	response := &authpb.CreateUserResponse{
		Tokens: &authpb.AuthResponse{
			AccessToken:  accessToken,
			RefreshToken: refreshToken,
		},
	}
	return response, nil
}

func Auth(ctx context.Context, username string, password string) (*authpb.AuthResponse, error) {
	// Verify Password
	user, err := database.GetUserFromMongoDb(ctx, username)
	if err != nil {
		log.Println("Error in getting user")
		return nil, err
	}

	if _, err = CheckPassword(password, user.PasswordHash); err != nil {
		log.Println("Passwords do not match")
		return nil, err
	}

	accessToken, refreshToken, err := GenTokens(username)
	if err != nil {
		log.Println("Error in Auth: Could not generate tokens")
		return nil, err
	}

	response := &authpb.AuthResponse{
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
	}
	return response, nil
}

func Refresh(ctx context.Context, username string, refreshToken string) (*authpb.RefreshResponse, error) {
	// TODO: Verify refresh token
	jwtKey, err := VerifyToken(refreshToken)
	if err != nil {
		log.Println("Error in verifying token")
		return nil, err
	}
	accessToken, err := RefreshToken(username, jwtKey)
	if err != nil {
		log.Println("Error in Refresh: Could not get new access token")
		return nil, err
	}

	response := &authpb.RefreshResponse{
		AccessToken: accessToken,
	}
	return response, nil

}
