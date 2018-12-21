const redis = require('redis');
const config = require('../config/redis-config.js');

module.exports = {
    redisClient: redis.createClient(config.redis_port, config.redis_host, config.redis_retry_strategy)
}