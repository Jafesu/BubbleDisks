const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');



const app = express();
const port = process.env.PORT || 8081;

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'o3iyh8bgYJN7rhmLfs' }));

app.use(express.static(path.join(__dirname, '/public')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/css', express.static(path.join(__dirname, './src/resources/css')));
app.use('/fonts', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/fonts')));
app.use('/fonts', express.static(path.join(__dirname, './src/resources/fonts')));
app.use('/js', express.static(path.join(__dirname, './src/resources/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views/');
app.set('view engine', 'ejs');


const nav = [
  { link: '/', title: 'Dashboard', icon: 'fa-bullseye', sub: 'Statistics and more' },
  { link: '/disks', title: 'Disks', icon: 'fa-tasks', sub: 'View and Manage' }
];
const title = 'BubbleDisks'

const diskRouter = require('./src/routes/diskRoutes')(nav, title);

app.use('/disks', diskRouter);

app.get('/', (req, res) => {
  res.render(
    'index',
    {
      nav,
      title,
      active: 'Dashboard'
    }
  );
});


app.listen(port, () => {
  debug(`Listening on port ${chalk.white(port)}`);
});  