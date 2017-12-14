const express = require('express');
const path = require('path');
const fs = require('fs');

const app = new express();

app.use(function (req, res, next) {
  req.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

app.get('/list.json', function (req, res, next) {
  res.json({
    error_code: 0,
    data: {
      list: [
        {
          name: '章三',
          age: 11,
        },
        {
          name: '李四',
          age: 12,
        },
      ],
    },
  });
});

app.get('/filejson/list.json', function (req, res, next) {
  let json = fs.readFileSync(path.resolve(__dirname, 'data/list.json'), 'utf-8');
  try {
    json = JSON.parse(json);
  } catch(err) {
    json = {
      error_code: 0,
      error_message: err,
    };
  }
  res.json(json);
});

let filejsList;
const load = function(path){
  if(require.resolve(path)){
    delete require.cache[require.resolve(path)];
    filejsList = require(path);
  }
};
load('./data/list');
app.get('/filejs/list.json', function (req, res, next) {
  load('./data/list');
  res.json(filejsList.get());
});

app.all('*', function (req, res) {
  res.json({
    error_code: 0,
    error_message: 'api not found.',
  })
});

app.listen(8081, function () {
  console.log('listen to 8081');
});