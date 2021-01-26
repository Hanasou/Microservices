package main

import (
	"context"
	"log"
	"os"
	"os/signal"
	"time"

	"github.com/Hanasou/Microservices/users-service/src/auth"
	"github.com/Hanasou/Microservices/users-service/src/database"
)

func setupEverything() {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	mongoClient, err := database.SetupMongoDb(ctx)
	if err != nil {
		log.Fatalln("Database error", err)
		return
	}

	lis, s, err := auth.BootstrapServer()
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
	log.Println("Closing MongoDB connection")
	mongoClient.Disconnect(context.TODO())
	log.Println("End of Program")
}
func main() {
	setupEverything()
}
