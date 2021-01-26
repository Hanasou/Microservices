# Generate gRPC Auth Go Code
protoc -I users-service/ --go_out=./users-service users-service/src/authpb/auth.proto

protoc -I users-service/ --go_out=plugins=grpc:./users-service users-service/src/authpb/auth.proto