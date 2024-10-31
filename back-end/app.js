import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import sequelize from "./config/database.js"; 

// rutas
import provincesRoutes from "./routes/provincesRoutes.js";
import localitiesRoutes from "./routes/localitiesRoutes.js";
import schoolsRoutes from "./routes/schoolsRoutes.js";
import sportsAvailabilitiesRoutes from "./routes/sportsAvailabilitiesRoutes.js";
import applicationToSportRoutes from "./routes/applicationToSportRoutes.js";
import photoRoutes from "./routes/photoRoutes.js";
import entitiesRoutes from "./routes/entitiesRoutes.js";
import sportsRoutes from "./routes/sportsRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import applicationsStatusesRouter from "./routes/applicationStatusesRoutes.js";

// Cargar variables de entorno
dotenv.config();

// Obtener __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const corsOptions = {
    origin: 'http://localhost:5173'
};

const app = express();

//CORS
app.use(cors(corsOptions));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/provinces', provincesRoutes);
app.use('/api/localities', localitiesRoutes);
app.use('/api/schools', schoolsRoutes);
app.use('/api/sports-availabilities', sportsAvailabilitiesRoutes);
app.use('/api/application-to-sport', applicationToSportRoutes);
app.use('/ftp/image', photoRoutes);
app.use('/api/entities', entitiesRoutes);
app.use('/api/sports', sportsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/application-statuses', applicationsStatusesRouter);
// Sincronizar modelos con la base de datos
(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Models synchronized with the database.');
  } catch (error) {
    console.error('Error syncing models:', error);
  }
})();

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
