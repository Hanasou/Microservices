package auth

import (
	"log"
	"time"

	"github.com/Hanasou/Microservices/users-service/src/models"
	"github.com/dgrijalva/jwt-go"
)

// Initialize jwtKey
var jwtKey = []byte("my_secret_key")

// GenTokens generates an access token and a refresh token
func GenTokens(username string) (string, string, error) {

	// Set expiry times
	rtExpiresAt := time.Now().Add(time.Hour * 24).Unix()

	// Create claims
	rt := &models.Token{
		Username: username,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: rtExpiresAt,
		},
	}

	// Create token
	tokenString, err := RefreshToken(username)
	if err != nil {
		log.Println("Error in generating access token")
		return "", "", err
	}
	// Generate refresh token
	refreshToken := jwt.NewWithClaims(jwt.SigningMethodHS256, rt)
	rtString, err := refreshToken.SignedString(jwtKey)
	if err != nil {
		log.Println("Error in generating refresh token")
		return "", "", err
	}

	return tokenString, rtString, nil
}

// RefreshToken generates a new access token
func RefreshToken(username string) (string, error) {
	// Set expiry time
	tkExpiresAt := time.Now().Add(time.Minute * 100000).Unix()

	// Set claims
	tk := &models.Token{
		Username: username,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: tkExpiresAt,
		},
	}

	// Create token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, tk)
	tokenString, err := token.SignedString(jwtKey)
	if err != nil {
		log.Println("Error in generating access token")
		return "", err
	}

	return tokenString, nil
}

// VerifyToken verifies a token
func VerifyToken(tokenString string) {

}

// CheckPassword compares a password to its hash
func CheckPassword(password string) {

}
