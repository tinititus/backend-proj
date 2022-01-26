import { app } from './app'
import 'dotenv/config'

const server = app.listen(4000, () => {
  console.log('Server is running on port 4000')
})

export { server }
