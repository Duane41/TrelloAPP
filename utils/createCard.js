const fetch = require('node-fetch')
const { token, api_key } = require('./api.js')


const createCard = (name, list_id, callback) => {
    let url = "https://api.trello.com/1/cards?key=" + api_key + "&token=" + token + "&name" + name + "&idList" + list_id

    fetch(url)
        .then(res => res.json())
        .then(result => {
            if (result.idList == list_id) {
                callback(undefined, {
                    success: true
                })
            } else {
                callback(undefined, {
                    success: false
                })
            }
        })
        .catch(error => {
            callback(error, undefined)
        })
}

module.exports = createCard

