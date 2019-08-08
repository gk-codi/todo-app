import { Router } from 'express';
import db from './database';

const route = new Router();

route.get('/', (req, res) => {
  res.json({
    success: true,
    data: [1, 2, 3],
  });
});

route.get('/tasks', (req, res, next) => {
  const sql = 'select * from task';
  const params = [];
  console.log('rttt');

  // res.json({
  //   data: false,
  // });
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ success: false, error: err.message });
      return;
    }
    res.json({
      success: true,
      data: rows,
    });
  });
});

//read//

route.get('/tasks/:id', (req, res, next) => {
  var sql = 'select * from task where id = ?';
  var params = [req.params.id];
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ success: false, error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: row,
    });
  });
});

//create//

route.post('/tasks', (req, res, next) => {
  var errors = [];
  console.log(req.body);
  if (!req.body.title) {
    errors.push('No title specified');
  }
  if (!req.body.description) {
    errors.push('No description specified');
  }
  if (!req.body.type) {
    errors.push('No type specified');
  }

  if (errors.length) {
    res.status(400).json({ success: false, error: errors.join(',') });
    return;
  }
  var data = {
    title: req.body.title,
    type: req.body.type,
    description: req.body.description,
  };
  var sql = 'INSERT INTO task (title, description, type) VALUES (?,?,?)';
  var params = [data.title, data.description, data.type];
  db.run(sql, params, function(err, result) {
    if (err) {
      res.status(400).json({ success: false, error: err.message });
      return;
    }
    res.json({
      success: true,
      data: data,
      id: this.lastID,
    });
  });
});

route.put('/tasks/:id', (req, res, next) => {
  var data = {
    title: req.body.title,
    type: req.body.type,
    description: req.body.description,
  };
  db.run(
    `UPDATE task set 
           title = COALESCE(?,title), 
           type = COALESCE(?,type), 
           description = COALESCE(?,description) 
           WHERE id = ?`,
    [data.title, data.type, data.description, req.params.id],
    function(err, result) {
      if (err) {
        res.status(400).json({ success: false, error: err.message });
        return;
      }
      res.json({
        success: true,
        data: data,
        changes: this.changes,
      });
    },
  );
});

route.delete('/tasks/:id', (req, res, next) => {
  db.run('DELETE FROM task WHERE id = ?', req.params.id, function(err, result) {
    if (err) {
      res.status(400).json({ success: false, error: res.message });
      return;
    }
    res.json({ success: true, changes: this.changes });
  });
});

export default route;
