// Create web server
// **********************************************
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(cors());
app.use(bodyParser.json());

// Get all comments
app.get('/comments', (req, res) => {
  fs.readFile('comments.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading comments.json');
    } else {
      res.send(data);
    }
  });
});

// Add a new comment
app.post('/comments', (req, res) => {
  fs.readFile('comments.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading comments.json');
    } else {
      const comments = JSON.parse(data);
      const newComment = req.body;
      comments.push(newComment);

      fs.writeFile('comments.json', JSON.stringify(comments), 'utf8', (err) => {
        if (err) {
          res.status(500).send('Error writing to comments.json');
        } else {
          res.send('Comment added');
        }
      });
    }
  });
});

// Start web server
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
// **********************************************