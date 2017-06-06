var qr = require('qr-image');




var makeqr = function (req, res) {

var data = req.params.data;



try {
        var img = qr.image(data,{size:10});
        res.writeHead(200, {'Content-Type': 'image/png'});
        img.pipe(res);
    } catch (e) {
        res.writeHead(414, {'Content-Type': 'text/html'});
        res.end('<h1>414 Request-URI Too Large</h1>');
    }

    


};


module.exports = {
    makeqr: makeqr
    
};