const express = require('express');
const app = express();
const port = 8080;

const colors = [
    'Red',
    'Orange',
    'Pink',
    'Blue',
    'Green'
];

function computeLuckyNumber(s) {
    let n = 0;
    for (const c of s) {
        n = (n * 31 + c.charCodeAt(0)) % 100000;
    }
    return n;
}

app.get('/fortune', (req, resp) => {
    const userID = req.headers['x-skygear-user-id'];
    if (!userID) {
        const color = colors[computeLuckyNumber(new Date().toDateString()) % colors.length];
        resp.json({
            headline: "Today's lucky color is...",
            body: `${color} !`
        });
    } else {
        const num = computeLuckyNumber(String(userID)) % 100;
        resp.json({
            headline: 'Your lucky number is...',
            body: `${num} !`
        });
    }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
