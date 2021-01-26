package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// User struct denotes a user we put into our database
type User struct {
	ID           primitive.ObjectID `bson:"_id,omitempty"`
	Username     string             `bson:"username,omitempty"`
	PasswordHash string             `bson:"password_hash,omitempty"`
}
