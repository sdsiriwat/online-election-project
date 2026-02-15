import express, { Request, Response } from 'express'
import cors from 'cors'
import authRoutes from './routes/AuthRoutes'
import ConstituencyRoutes from './routes/ConstituencyRoutes'
import voterouter from './routes/VoteRoutes'
import partyRoutes from './routes/PartyRoutes';

const app = express()
const port = 3000
app.use(express.json())
app.use(cors())



app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.use('/vote', voterouter)
app.use('/auth', authRoutes)
app.use('/constituencies', ConstituencyRoutes) // cre-->constituencies
app.use('/party', partyRoutes);



app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})