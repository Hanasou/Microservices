package models

import "github.com/dgrijalva/jwt-go"

// Token represents a jwt token claims object
type Token struct {
	Username string
	jwt.StandardClaims
}
