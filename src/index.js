require('dotenv').config();
require('./config/mongoose.config');
const app=require('./config/express.config');

app.listen(process.env.APP_PORT,()=>{
  console.log(`Listening to port ${process.env.APP_PORT}`);
})