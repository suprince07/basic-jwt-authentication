const redis = require('redis');
const client = redis.createClient(process.env.REDIS_PORT);

client.on('error', (err) => console.log('Redis Client Error', err));

(async () => {
  await client.connect();
})();


module.exports = client;