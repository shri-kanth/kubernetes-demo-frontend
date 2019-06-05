
var fs = require('fs')
const folder = 'dist/to-do-list-app/';

fs.readdirSync(folder)
    .filter(fn => fn.endsWith('.js') && fn.startsWith('main'))
    .forEach(file => {
        var path = folder+file;
        fs.readFile(path, 'utf8', function (err,data) {
        if (err) {return console.log(err);}
        var result = data.replace(/\${SERVER_URI}/g, process.env.SERVER_URI);    
        fs.writeFile(path, result, 'utf8', function (err) {
            if (err) return console.log(err);
        });
        });
});

