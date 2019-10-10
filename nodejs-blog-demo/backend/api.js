const db = require('./db');

module.exports.afterUserCreate = async function (req, res) {
    const client = await db.connect();
    try {
        const user = req.body.payload.user;
        await db.saveUser(client, user);

        res.send(user);
    } finally {
        await client.close();
    }
};

module.exports.fetchBlogs = async function (req, res) {
    const client = await db.connect();
    try {
        const blogs = await db.fetchBlogs(client);

        res.send({ result: blogs });
    } finally {
        await client.close();
    }
}

module.exports.writeBlog = async function (req, res) {
    const client = await db.connect();
    try {
        const userID = req.body.userID;
        const title = req.body.title;
        const content = req.body.content;
        await db.saveBlog(client, userID, title, content);

        res.send('OK');
    } finally {
        await client.close();
    }
};
