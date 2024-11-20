const express = require('express');
const app = express();
const port = 3000;
const auctionRoutes = require('./server/routes/auctionRoutes');

app.use(express.static('public'));
app.use(express.json());
app.use('/api', auctionRoutes);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});