var request = require('request'),
    cheerio = require('cheerio');

request('http://www.webdesignernews.com/', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var news = [];
        var $ = cheerio.load(body, {normalizeWhitespace: true});
        $('div.post').each(function () {
            var newNews = [];
            newNews['title'] = null || $(this).find('a.post-title').text();
            newNews['date'] = null || $(this).find('span.p-time-label').attr('data-time');
            newNews['link'] = null || $(this).find('a.post-title').attr('href');
            news.push(newNews);
        });
        // Выводим первую новость
        console.log(news[0]);
    }
    ;
});
