package models

type Config struct {
	Credentials Creds
	Database    string
	Host        string
	Port        int
}
