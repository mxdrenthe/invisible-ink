'use strict';

const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const _ = require('lodash');

const options = {};
const flag = fs.readFileSync('./flag', 'utf-8').trim();
const docHtml = fs.readFileSync('./src/index.html', 'utf-8');

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send(docHtml);
});

app.post('/echo', (req, res) => {
    const out = {
        userID: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
        time: Date.now()
    };

    _.merge(out, req.body);

    if (options.flag) {
        out.flag = flag;
    } else {
        out.flag = 'disabled';
    }

    res.json(out);
});

app.listen(8000);
