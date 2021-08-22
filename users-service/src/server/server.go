package server

import (
	"context"
	"log"
	"net"

	"github.com/Hanasou/Microservices/users-service/src/authpb"
	"github.com/Hanasou/Microservices/users-service/src/core"
	"google.golang.org/grpc"
)

type server struct{}

// Decouple the core logic from the APIs

// CreateUser sends a request to make a user into the database and returns tokens for authentication
func (*server) CreateUser(ctx context.Context, req *authpb.CreateUserRequest) (*authpb.CreateUserResponse, error) {
	username := req.GetUsername()
	password := req.GetPassword()

	return core.CreateUser(ctx, username, password)
}

// Auth generates an AuthResponse from an AuthRequest
func (*server) Auth(ctx context.Context, req *authpb.AuthRequest) (*authpb.AuthResponse, error) {
	username := req.GetUsername()
	password := req.GetPassword()

	return core.Auth(ctx, username, password)
}

func (*server) Refresh(ctx context.Context, req *authpb.RefreshRequest) (*authpb.RefreshResponse, error) {
	username := req.GetUsername()
	refreshToken := req.GetRefreshToken()

	return core.Refresh(ctx, username, refreshToken)
}

// BootstrapServer sets up our gRPC server
func BootstrapServer() (*net.Listener, *grpc.Server, error) {
	lis, err := net.Listen("tcp", "0.0.0.0:50051")
	if err != nil {
		log.Fatalln("Failed to listen", err)
	}
	log.Println("Connection established")

	// New server
	s := grpc.NewServer()
	// Register the service
	// This is defined in the autogenerated code
	// Right now we're just using an empty server struct, we'll add stuff to it later
	authpb.RegisterAuthServiceServer(s, &server{})

	// Start the server in a seperate goroutine
	go func() {
		log.Println("Server established. Accepting requests.")
		if err := s.Serve(lis); err != nil {
			log.Fatalln("Failed to serve", err)
		}
	}()

	return &lis, s, nil
}
