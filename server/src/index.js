import express from 'express'
import rootRouter from './routers/rootRouter.js'
import cors from "cors"

const app = express()
app.use(express.json())
app.use(express.static("."))
app.use(cors())
app.listen(3001)

app.use("/api",rootRouter)
