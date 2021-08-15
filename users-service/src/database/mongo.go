package database

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"

	"github.com/Hanasou/Microservices/users-service/src/core"
	"github.com/Hanasou/Microservices/users-service/src/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var DbCollection *mongo.Collection

// SetupMongoDb sets up Mongodb
func SetupMongoDb(ctx context.Context) (*mongo.Client, error) {
	log.Println("Connecting to MongoDB")

	// Read config file
	data, err := ioutil.ReadFile("./config.json")
	if err != nil {
		log.Fatalln("Error in opening file")
		return nil, err
	}

	var config models.Config
	err = json.Unmarshal(data, &config)
	if err != nil {
		log.Fatalln("Error in unmarshalling json")
		return nil, err
	}

	connectionString := fmt.Sprintf("mongodb+srv://%s:%s@cluster0.zrbnr.mongodb.net/?retryWrites=true&w=majority",
		config.Credentials.Username, config.Credentials.Password)

	// TODO: Replace connection string and move to config file
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(
		connectionString,
	))
	if err != nil {
		log.Fatalln("Connection error: ", err)
		return nil, err
	}

	// TODO: Replace database and collection names and move to config file
	//DbCollection = client.Database(config.Database).Collection(config.Collection)
	return client, nil
}

// AddUserToDb adds a user to the database
func AddUserToMongoDb(ctx context.Context, username string, password string) error {
	passwordHash, err := core.HashPassword(password)
	if err != nil {
		log.Println("Hashing error")
		return err
	}
	userDocument := models.User{
		Username:     username,
		PasswordHash: passwordHash,
	}

	_, err = DbCollection.InsertOne(ctx, userDocument)
	if err != nil {
		log.Println("Insert failed")
		return err
	}

	return nil
}

// GetUserFromDb gets a user from db
func GetUserFromMongoDb(ctx context.Context, username string) (*models.User, error) {
	result := &models.User{}
	filter := bson.D{
		primitive.E{Key: "username", Value: username},
	}

	err := DbCollection.FindOne(ctx, filter).Decode(&result)
	if err != nil {
		log.Println("Error in getting user from Db")
		return nil, err
	}

	return result, nil
}
