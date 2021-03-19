package models

// User struct denotes a user we put into our database
type User struct {
	ID           string
	Username     string
	PasswordHash string
}
