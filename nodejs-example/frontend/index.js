const express = require('express');
const app = express();
const port = 8080;

app.get("/", (req, resp) => {
    console.log("headers=", JSON.stringify(req.headers));
    console.log("body=", JSON.stringify(req.body));

    resp.status(200).send("Hello, world!\n");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
