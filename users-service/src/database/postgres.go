package database

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"

	"github.com/Hanasou/Microservices/users-service/src/models"
	"github.com/jackc/pgx/v4"
)

var postgres *pgx.Conn

func SetupPostgres(ctx context.Context) (*pgx.Conn, error) {
	log.Println("Connecting to Postgres Database")

	// Read config file
	data, err := ioutil.ReadFile("./config.json")
	if err != nil {
		log.Fatalln("Error in opening file")
		return nil, err
	}

	var config models.Config
	err = json.Unmarshal(data, &config)
	if err != nil {
		log.Fatalln("Error in unmarshalling json")
		return nil, err
	}

	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
		"password=%s dbname=%s sslmode=disable",
		config.Host, config.Port, config.Credentials.Username, config.Credentials.Password, config.Database)

	conn, err := pgx.Connect(ctx, psqlInfo)
	if err != nil {
		log.Fatalln("Can't connect to database:", err)
		return nil, err
	}

	postgres = conn

	return conn, nil
}
