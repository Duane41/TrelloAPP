const request = require('request')
const { token, api_key } = require('./api.js')


const getCards = (callback) => {
    let url = "https://api.trello.com/1/members/me/boards?fields=name,url&key=" + api_key + "&token=" + token

    request({ 
        url,
        json: true
        }, (error, response) => {
            if (error) {
                callback('Unable to connect to Trello services', undefined)
            } else {
                for (i = 0; i < response.body.length; i++) {
                    if (response.body[i].name == 'The Pizza Project') {
                        url = "https://api.trello.com/1/boards/" + response.body[i].id +"/lists?key=" + api_key + "&token=" + token
                        request({ 
                            url,
                            json: true
                            }, (error, response) => {
                                var lists = [];
                                if (error) {
                                    callback('Unable to connect to Trello services', undefined)
                                } else {
                                    if(!response.body) {
                                        callback('Unable to load lists in the board', undefined)
                                    }
                                    response.body.forEach(list_item => {
                                        url = "https://api.trello.com/1/lists/" + list_item.id +"/cards?key=" + api_key + "&token=" + token
                                        var cards = []
                                        request({ 
                                            url,
                                            json: true
                                            }, (error, response) => {
                                                if (error) {
                                                    callback('Unable to connect to Trello services', undefined)
                                                } else {
                                                    if(!response.body) {
                                                        callback('Unable to load lists in the board', undefined)
                                                    } else {
                                                        response.body.forEach(item => {
                                                            cards.push({
                                                                list_id: list_item.id,
                                                                list_name: list_item.name,
                                                                task: item.name
                                                            })
                                                        })
                                                        callback(undefined, cards)
                                                    }
                                                }
                                        })                                      
                                    });
                                }
                        })
                        break;
                    }
                }
               
            }
    })
}

module.exports = getCards

