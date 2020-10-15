const express = require('express');
const app = express();
const port = 8080;

app.get("/", (req, resp) => {
    resp.status(200).send("Hello, world!\n");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
