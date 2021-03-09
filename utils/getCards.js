const fetch = require('node-fetch')
const { token, api_key } = require('./api.js')


const getCards = (callback) => {
    let url = "https://api.trello.com/1/members/me/boards?fields=name,url&key=" + api_key + "&token=" + token
    var lists = [];
    fetch(url)
        .then(res => res.json())
        .then(result => {

            var filteredObj = result.find(function (item, i) {
                if (item.name === "The Pizza Project") {
                    index = i;
                    return i;
                }
            });
            return filteredObj
        })
        .then(filteredObj => {
            url = "https://api.trello.com/1/boards/" + filteredObj.id + "/lists?key=" + api_key + "&token=" + token

            return fetch(url)
        })
        .then(res => res.json())
        .then((result) => {
            let urls = []
            result.forEach(list_item => {
                url = "https://api.trello.com/1/lists/" + list_item.id + "/cards?key=" + api_key + "&token=" + token

                urls.push({
                    url: url, 
                    list_id: list_item.id, 
                    list_name: list_item.name})
                
            })
            return urls
        })
        .then((result) => {
            return Promise.all(result.map(item =>
                fetch(item.url)
                .then(response => response.json())
                .then(data => { 
                    let cards = []
                    data.forEach(item => {
                        cards.push({
                            task: item.name
                        })
                    })
                    return cards
                 }).then(result => {
                    lists.push({
                        list_id: item.list_id,
                        list_name: item.list_name,
                        cards: result
                    })
                })
             ))
        })
        .then(() => {
            callback(undefined, lists)
        }).catch(error => {
            callback(error, undefined)
        })
}

module.exports = getCards

