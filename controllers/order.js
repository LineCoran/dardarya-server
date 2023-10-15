import path from 'path'
import { fileURLToPath } from 'url';
import * as uuid from 'uuid'
import pool from "../db.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createOrder = async (req, res) => {
    try {
        const { description, link, cost, weight, createdat } = req.body
        const { img } = req.files

        let fileName = uuid.v4() + ".jpg"
        img.mv(path.resolve(__dirname, '..', 'static', fileName))
        const q = `INSERT INTO orders(description, cost, weight, link, img, createdat) VALUES ('${description}', ${cost}, ${weight}, '${link}', '${fileName}', '${createdat}');`
    
        pool.query(q, (err, data) => {
            if (err) {
                return res.status(500).json(err);
            }
            return res.status(200).json(data);
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const getOrders = async (req, res) => {
    const q = 'SELECT * FROM orders'

    pool.query(q, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data.rows);
    })
}

export const getOrder = async (req, res) => {
    const q = 'SELECT * FROM orders WHERE id = $1'
    const { id } = req.params

    pool.query(q, [id], (err, data) => {
        if(err) return res.status(500).json(err)

        return res.status(200).json(data.rows)
    })
}

export const deleteOrder = async (req, res) => {
    const q = 'DELETE FROM orders WHERE id = $1'
    const { id } = req.params

    pool.query(q, [id], (err, data) => {
        if(err) return res.status(500).json(err)

        return res.status(200).json(data.rows)
    })
}