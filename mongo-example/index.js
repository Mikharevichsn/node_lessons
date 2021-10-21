import { MongoClient } from 'mongodb';

const connect = async () => {
  const client = await MongoClient.connect(
    'mongodb+srv://serjo:NTE4yw1D5tP2rN7g@cluster0.idfrh.mongodb.net/example?retryWrites=true&w=majority',
    {
    }
  );

  const db = client.db();

  const Cats = db.collection('cats');

  const catsArrOld = await Cats.find().toArray();
  console.log('catsArrOld = ', catsArrOld);
  
  await Cats.insertOne({ name: 'Джони', age: 1 });

  const catsArr = await Cats.find().toArray();

  console.log('------');
  console.log(catsArr);
  console.log('------');
  // return cats;
}

connect();



// serjo
// NTE4yw1D5tP2rN7g