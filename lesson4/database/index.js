import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const connection = async () => {
  const client = await MongoClient.connect(
    process.env.DB_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  const db = client.db();
  const Cats = db.collection('cats');
  return { Cats };
}

const connect = await connection();

export default connect;