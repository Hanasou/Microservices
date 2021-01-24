# Generate gRPC Auth Go Code
protoc -I users-service/ --go_out=./users-service users-service/src/authpb/auth.proto