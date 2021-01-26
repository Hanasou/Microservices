package database

import (
	"context"
	"log"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var DbCollection *mongo.Collection

// SetupMongoDb sets up Mongodb
func SetupMongoDb(ctx context.Context) {
	log.Println("Connecting to MongoDB")
	// TODO: Replace connection string and move to config file
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(
		"placeholder",
	))
	if err != nil {
		log.Fatal(err)
	}

	// TODO: Replace database and collection names and move to config file
	DbCollection = client.Database("grpcdb").Collection("blog")
}
