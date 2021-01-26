package auth

import (
	"context"
	"log"

	"github.com/Hanasou/Microservices/users-service/src/authpb"
)

type server struct{}

// TODO: Generate some gRPC code for an AddUserRequest

// Auth generates an AuthResponse from an AuthRequest
func (*server) Auth(ctx context.Context, req *authpb.AuthRequest) (*authpb.AuthResponse, error) {
	username := req.GetUsername()

	// TODO: Verify Password

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

func (*server) Refresh(ctx context.Context, req *authpb.RefreshRequest) (*authpb.RefreshResponse, error) {
	username := req.GetUsername()
	refreshToken := req.GetRefreshToken()

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
