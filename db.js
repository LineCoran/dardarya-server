import * as dotenv from 'dotenv';
import pg from 'pg';
const { Pool } = pg;

dotenv.config();

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
})



pool.connect((err) => {
    if (err) throw err
    const createTableText = `
    CREATE TABLE IF NOT EXISTS orders (
      id serial primary key, 
      description varchar(480) not null,
      weight int default null,
      cost int default null,
      link varchar(255) not null,
      img varchar(255) not null,
      createdAt date not null
    );
`

    pool.query(createTableText, (err, data) => {
      if (err) {
          console.log(err)
          return
      }
      console.log('Table order created successfully!')
  })
}) 

export default pool