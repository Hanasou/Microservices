package models

// User struct denotes a user we put into our database
type User struct {
	ID           string `bson:"_id,omitempty"`
	Username     string `bson:"username,omitempty"`
	PasswordHash string `bson:"password,omitempty"`
}
