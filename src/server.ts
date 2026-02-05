import express, { Request, Response } from 'express'
import cors from 'cors'
import locationRoute from "./routes/LocationRoute";
import authRoutes from './routes/AuthRoutes'
import createConstituency from './routes/ConstituencyRoutes'
import voterouter from './routes/VoteRoutes'

const app = express()
const port = 3000
app.use(express.json())
app.use(cors())



app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.use("/", locationRoute);
app.use('/vote', voterouter)
app.use('/auth', authRoutes)
app.use('/cre', createConstituency)


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})