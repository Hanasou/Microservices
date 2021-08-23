package models

type Config struct {
	DbConfigs *DbConfigs
}

type DbConfigs struct {
	Credentials *Creds
	Database    string
	Host        string
	Port        int
	Collection  string
}
