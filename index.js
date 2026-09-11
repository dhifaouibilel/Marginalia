import express from "express";
import bookRoutes from "./routes/bookRoutes.js"
import { themeIcon } from "./lib/theme-icons.js";

const app = express();
const port = 3000;

app.locals.themeIcon = themeIcon;

app.use(express.urlencoded({extended:true}))
app.use(express.static("public"));
app.set("view engine", "ejs");



app.use('/', bookRoutes)



app.listen(port, () => {
  console.log(`Book review app listening on http://localhost:${port}`);
});
