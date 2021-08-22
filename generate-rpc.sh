# Generate gRPC Auth Go Code
protoc -I users-service/ --go_out=./users-service users-service/src/authpb/auth.proto

protoc -I users-service/ --go_out=plugins=grpc:./users-service users-service/src/authpb/auth.proto

# Generate grpc typescript code
protoc --plugin=./gateway/node_modules/.bin/protoc-gen-ts_proto --ts_proto_out=./gateway/src --ts_proto_opt=esModuleInterop=true --ts_proto_opt=outputServices=grpc-js ./protobuf/auth.proto