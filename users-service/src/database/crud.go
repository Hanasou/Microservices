package database

import (
	"context"
	"log"

	"github.com/Hanasou/Microservices/users-service/src/auth"
	"github.com/Hanasou/Microservices/users-service/src/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// AddUserToDb adds a user to the database
func AddUserToDb(username string, password string) error {
	passwordHash, err := auth.HashPassword(password)
	if err != nil {
		log.Println("Hashing error")
		return err
	}
	userDocument := models.User{
		Username:     username,
		PasswordHash: passwordHash,
	}

	_, err = DbCollection.InsertOne(context.Background(), userDocument)
	if err != nil {
		log.Println("Insert failed")
		return err
	}

	return nil
}

// GetUserFromDb gets a user from db
func GetUserFromDb(username string) (*models.User, error) {
	result := &models.User{}
	filter := bson.D{
		primitive.E{Key: "username", Value: username},
	}

	err := DbCollection.FindOne(context.Background(), filter).Decode(&result)
	if err != nil {
		log.Println("Error in getting user from Db")
		return nil, err
	}

	return result, nil
}
