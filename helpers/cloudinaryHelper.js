const cloudinary = require('cloudinary');
const cloudinaryConfig = require('../config/cloudinary-config');
const client = require('../redis/client');

cloudinary.config(cloudinaryConfig)

var exports = module.exports = { }

exports.getImages = async () => {
    console.log("[info]: Getting images...");
    let images = await pollCache()
    if(images){
        console.log("[info]: Cache Hit");
        return images
    } else {
        console.log("[info]: Cache Miss");
        let response = await getResources('jedi-cycle-gallery');
        setCache(JSON.stringify(response.resources))
        return response.resources 
    }
}

const getResources = async (tag, nextCursor) => new Promise((resolve, reject) => {
  let params = {resource_type: 'image', max_results: 100}
  if (nextCursor) params.next_cursor = nextCursor
  cloudinary.api.resources_by_tag(tag, (result) => {
    if (!result.resources) return reject(result)
    resolve(result)
  }, params)
})

const pollCache = async (key) => new Promise((resolve, reject) => {
    console.log("[info]: Polling cache");
    client.redisClient.get('images', (error, response) => {
        if(error){
            return resolve(error)
        }
        if(response) resolve(response)
        else {
            resolve()
        }
    })
})

const setCache = (data) => {
    console.log("[info]: Setting cache value for retrieved images");
    client.redisClient.set('images', data, 'EX', 60 * 60 * 24, (error, value) => {
        if (error) {
            console.log("[warn]: Cache not set for images");
        }
    })
}