package main

import (
	"context"
	"log"
	"os"
	"os/signal"
	"time"

	"github.com/Hanasou/Microservices/users-service/src/database"
	"github.com/Hanasou/Microservices/users-service/src/server"
)

func setupEverything() {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	conn, err := database.SetupPostgres(ctx)
	if err != nil {
		log.Fatalln("Database error", err)
		return
	}

	lis, s, err := server.BootstrapServer()
	if err != nil {
		log.Fatalln("Server error", err)
		return
	}

	// Wait for ctrl + c to exit
	ch := make(chan os.Signal, 1)
	signal.Notify(ch, os.Interrupt)

	// Block until signal is received
	<-ch
	log.Println("Stopping server")
	s.Stop()
	log.Println("Closing listener")
	(*lis).Close()
	log.Println("Closing Postgres connection")
	conn.Close(ctx)
	log.Println("End of Program")
}

func main() {
	setupEverything()
}
