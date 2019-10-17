const MongoClient = require('mongodb').MongoClient;

module.exports.connect = async function connectDB() {
    const uri = process.env.MONGO_DB_URL;
    const client = new MongoClient(uri, { useNewUrlParser: true });

    return client.connect();
}

module.exports.saveUser = async function saveUser(client, user) {
    const collection = client.db('test').collection('users');
    return await collection.updateOne({ id: user.id }, { $set: user }, { upsert: true });
}

module.exports.fetchBlogs = async function fetchBlogs(client, user) {
    const collection = client.db('test').collection('blogs');
    return await collection.find().toArray();
}

module.exports.saveBlog = async function saveBlog(client, userID, title, content) {
    const collection = client.db('test').collection('blogs');
    const data = { title, content, userID: userID };
    return await collection.insertOne(data);
}
