import express, { Express } from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../../../swagger.json'
import VerifyAuthToken from '../../UseCases/Auth/verifyAuthToken.usecase'
import dotenv from 'dotenv'
import NotificationRoutes from './Routes/NotificationRoutes'
import { RouteTypeEnum } from '../../Entities/Enums/RouteType'
dotenv.config()

const getApiRoute = (name: String) => `/api/${name}`

const app: Express = express()
app.use(express.json())

const jwtSecret = process.env.JWT_SECRET || ''

const verifyAuthToken = new VerifyAuthToken(jwtSecret)

const notificationRoutes = new NotificationRoutes()

app.use(
    `/${RouteTypeEnum.PUBLIC}/docs`,
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, {
        swaggerOptions: { url: `${process.env.SWAGGER_URL}` },
    })
)
app.use(getApiRoute('notification'), notificationRoutes.buildRouter())

export default app
