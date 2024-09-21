import express from 'express'
import type {Express, Request, Response} from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.get('/', (request: Request, response: Response) => {
    response.send({msg: 'Hello There'})
})

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
})