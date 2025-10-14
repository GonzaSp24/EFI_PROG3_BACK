// app.js (o server.js)
import { initDatabase } from "./models/index.js";

await initDatabase({
    sync: process.env.SYNC_DB === "true", // poné SYNC_DB=true en .env si querés sincronizar
    alter: process.env.DB_ALTER === "true",
    force: process.env.DB_FORCE === "true",
});
