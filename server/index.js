const Pusher     = require('pusher');
const express    = require('express');
const bodyParser = require('body-parser')
const config     = require('./config.js')

const pusher     = new Pusher(config.pusher);
const app        = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('client'))

// Expects API Call from Arduino Board
app.post('/api/switch', (req, res, next) => {
  if(req.body.key != config.key)
    return res.json({error: 401})

  let payload = {
    'room': req.body.room,
    'status': req.body.status
  }
  pusher.trigger('statuses', 'new_status', payload)

  res.json({success: 200})
})

// Load the Vue JS Application from the index.html
app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.listen(4000, function() {
    console.log('App listening on port 4000!')
});