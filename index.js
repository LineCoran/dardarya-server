
import express  from 'express';
import cors from 'cors'
import orderRouter from './routes/order.js';
import fileUpload from 'express-fileupload';
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(cors());
app.use(fileUpload({}));
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('Server started on port: ', port)
})

app.use('/', orderRouter)










