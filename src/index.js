require('dotenv').config();
const connection=require('./db-config');
const app = require('./app');

const PORT = process.env.PORT || 8000;

connection.connect((err)=>{
  if(err){
    console.log('Error connecting DB '+err.stack);
  }
  else
    console.log('connected as id '+ connection.threadId);
});

app.listen(PORT, (err) => {
  // eslint-disable-next-line no-console
  if (err) console.error(err);
  // eslint-disable-next-line no-console
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
