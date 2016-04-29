import express from 'express';
import path    from 'path';

export default function (app) {

  app.use(express.static(__dirname + '/../../public'));
  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
  });
}
