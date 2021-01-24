package models

import "github.com/dgrijalva/jwt-go"

// Token represents a jwt token object
type Token struct {
	Username string
	jwt.StandardClaims
}
