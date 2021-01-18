import "reflect-metadata";
import express from 'express';
import cors from 'cors';

const app = express();

async function bootstrap() {

    // enable cors
    app.use(cors());

    app.listen(4000, () => {
        console.log("Listening on port 4000");
    });
}

bootstrap();