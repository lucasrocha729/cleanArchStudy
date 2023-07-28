import app from './config/app'
import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helpers'
import env from './config/env'

MongoHelper.connect(env.MONGO_URL).then(() => {
  app.listen(env.PORT, () => { console.log(`Server running at http://localhost:${env.PORT}`) })
}).catch(console.error)
