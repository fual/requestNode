// Модули
var http = require("http");
var fs = require('fs');
var request = require('request');
var urlUtl = require('url');

//Настройки
var YAKEY = 'trnsl.1.1.20140416T130443Z.49db75a946e5d9df.baa803157e4482838c0612cb9c5aa513643049a4';
var index = fs.readFileSync('index.html'); //главная страница


//Отправка данных на сервер яндекса и получение ответа
var sendToTr = function (word, callback) {
    request.get(
        'https://translate.yandex.net/api/v1.5/tr.json/translate?key=' + YAKEY + '&lang=en-ru&text=' + word,
        function (error, response, body) {
            if (error) {
                callback.end(error);
            } else {
                callback.end(JSON.parse(body)['text']['0'], 'utf-8');
            }
        }
    );
};

//Конфиг сервера
function onRequest(req, res) {
    //Главная страница переводчика
    if (req.url == '/') { //Страница текста
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(index, 'utf-8');
    }
    //страница c переводом
    else if (urlUtl.parse(req.url)['query']) {
        res.writeHead(200, {"Content-Type": "text/plain;charset=utf-8"});
        //Слово которое надо перевести.
        var word = urlUtl.parse(req.url, true)['query']['word'];
        sendToTr(word, res);
    }
    //Другие страницы
    else {
        res.writeHead(404, {"Content-Type": "text/plain"});
        res.end('404');
    }
}

http.createServer(onRequest).listen(8888);

console.log("Server has started.");
