import { app } from './app'
import * as dotenv from 'dotenv'

dotenv.config()

const server = app.listen(4000, () => {
  console.log('Server is running on port 4000')
})

export { server }
