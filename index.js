const express = require('express');
const { json } = require('express');
const app = express();

// //global middleware function, affect all incoming request
// //app.use -> all methods
// app.use((req,res,next) => {
//   console.log(`Middleware trigged`);
//   //修改 request 的方式, 后面跟随 next();
//   req.time = new Date();
//   //修改 response 的方式, 但是后面不能跟随 next(); 不会再触发之后任何内容
//   res.send('Stop here')
//   // next();
// });

//Middleware function
function middleware(req, res, next) {
  console.log(`Middleware trigged`);
  //修改 request 的方式, 后面跟随 next();
  req.time = new Date();
  //修改 response 的方式, 但是后面不能跟随 next(); 不会再触发之后任何内容
  res.status(401).send('Stop here!')
  // next();
}

//time middleware function
function timeMiddleware(req, res, next) {
  req.time = new Date();
  next();
}
//call time middleware function
app.use(timeMiddleware);

//error handler function -- middleware
function errorHandler(err, req, res, next) {
  console.log(err);
  res.status(500).send(json({error: 'server cannot handle this request'}))
  //next();  //only use when there are multi error handler
}

// //call middleware function at root
// app.use(middleware);

//call middleware function at specific path
app.use('/greeting', middleware);
//call middleware at get method
app.get('/greeting', middleware);


// //basic get method
// app.get('/', (req,res) =>{
//   res.send('Hello form node.js');
// });

//how to get params
app.get('/greeting/:name', (req, res) => {
  //destructing -- get route params which is name in this case
  const { name } = req.params;
  //destructing -- get query params
  const { title } = req.query;
  res.send(`Hello ${title}.${name}.`);
});

//test for middleware
app.get('/', (req, res) => {
  res.send(req.time);
});

//basic post method
app.post('/hello', (req, res) => {
  res.send('Hello form post');
});

//call error handler, always put above app.listen
app.use(errorHandler);

//listen method tells whether sever runs, always put at last
app.listen(3000, () => {
  console.log('server listening on port 3000')
});