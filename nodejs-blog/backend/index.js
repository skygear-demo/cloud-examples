const express = require('express');
const app = express();
const port = 8080;

app.use(require('body-parser').json());

const api = require('./api');
app.post('/after_user_create', api.afterUserCreate);
app.post('/write_blog', api.writeBlog);
app.post('/fetch_blogs', api.fetchBlogs);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
