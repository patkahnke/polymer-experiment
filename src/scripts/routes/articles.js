var express = require('express');
var router = express.Router();
var pg = require('pg');
var database = 'postgres';
var user = 'postgres';
var password = 'pg12345';
var connectionString = 'postgres://' + user + ':' + password + '@localhost:5432/' + database;

router.post('/', function (req, res) {
  var article = req.body;
  console.log('article: ', article);
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('INSERT INTO articles (content, author, title) ' +
                  'VALUES ($1, $2, $3)',
                   [article.content, article.author, article.title],
     function (err, result) {
        done();

        if (err) {
          res.sendStatus(500);
          return;
        }

        res.redirect('back');
      });
  });
});

router.get('/', function (req, res) {
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    } else {
      client.query('SELECT * FROM articles', function (err, result) {
        done();
        res.send(result.rows);
        console.log(result.rows);
      });
    }
  });
});

// router.delete('/:favorite_id', function (req, res) {
//   var id = req.params.favorite_id;
//   pg.connect(connectionString, function (err, client, done) {
//     if (err) {
//       console.log(err);
//       res.sendStatus(500);
//     }
//
//     client.query('DELETE FROM favorites ' +
//                   'WHERE favorite_id = $1',
//                    [id],
//      function (err, result) {
//         done();
//
//         if (err) {
//           console.log(err);
//           res.sendStatus(500);
//           return;
//         }
//
//         res.sendStatus(200);
//       });
//   });
// });

module.exports = router;
