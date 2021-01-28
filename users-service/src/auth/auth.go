package auth

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"time"

	"github.com/Hanasou/Microservices/users-service/src/models"
	"github.com/dgrijalva/jwt-go"
	"golang.org/x/crypto/bcrypt"
)

type secrets struct {
	tokenKey string
}

// GetJwtKey gets the key
func GetJwtKey() []byte {
	data, err := ioutil.ReadFile("./secrets.json")
	if err != nil {
		log.Fatalln("Error in opening file")
	}

	var secrets secrets
	err = json.Unmarshal(data, &secrets)
	if err != nil {
		log.Fatalln("Error in unmarshalling json")
	}

	jwtKey := []byte(secrets.tokenKey)
	return jwtKey
}

var jwtKey []byte = GetJwtKey()

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
	tokenString, err := RefreshToken(username, jwtKey)
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
func RefreshToken(username string, jwtKey []byte) (string, error) {
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

// HashPassword hashes a password and returns the hash
func HashPassword(password string) (string, error) {
	// Generate password hash
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		msg := "Error in hashing"
		log.Println(msg)
		return "", err
	}
	return string(hash), nil
}

// VerifyToken verifies a token and returns a new key to sign another one
func VerifyToken(tokenString string) ([]byte, error) {
	claims := &models.Token{}

	token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		return jwtKey, nil
	})
	if err != nil {
		log.Println("Error in parsing token")
		if err == jwt.ErrSignatureInvalid {
			log.Println("Invalid token")
			return []byte{}, err
		}
		return []byte{}, err
	}
	if token.Valid {
		return jwtKey, nil
	} else {
		return []byte{}, nil
	}
}

// CheckPassword compares a password to its hash returns true if password matches hash
func CheckPassword(password string, hash string) (bool, error) {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	if err != nil && err == bcrypt.ErrMismatchedHashAndPassword { //Password does not match!
		log.Println("Password does not match")
		return false, err
	}

	return true, nil
}
