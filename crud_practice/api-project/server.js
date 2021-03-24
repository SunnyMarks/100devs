const express = require('express');
const app = express();

app.get('/', (request, response) => {
    response.sendFile(/Library/art/2021/projects/projects_current/PracticeEveryCycle/leonbootcamp/hundreddevs/crud_practice/api-project + '/index.html')
})