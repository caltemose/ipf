var fs = require('fs');
var linereader = require('line-reader');



//
// Init
//

var filein = process.argv[2];
var fileout = process.argv[3];
var lines = []; // array of converted line objects

if (!filein || !fileout) {
    return console.log('You must supply file paths for input and output.');
}

// TODO check the filepaths for validity

console.log('In:', filein);

// activate file parsing
linereader.eachLine(filein, readLines);


//
// Helper functions
//

function isUrl (url) {
    return url && url !== '' && url !== ' ' && url.toLowerCase() !== 'none' && url.toLowerCase() !== 'n\/a'
}

// parse all lines of a file and populate array with resulting objects
// and write to a file.
function readLines (line, isLast) {
    var lineobj = parseLine(line);
    if (lineobj) {
        lines.push(lineobj);
    }
    if (isLast) {
        writeFile();
    }
}

/*
0 = first name
1 = last name
2 = business name
3 = url
4 = category
*/

// parse data line into JSON
function parseLine (line) {
    var split = line.split('\t');
    // if (split.length < 4) return;

    var obj = {};
    var nonJuriedRegex = /\s-\snon\sjuried/gi
    var juriedRegex = /\s-\sjuried/gi
    obj.category = split[0].replace(nonJuriedRegex, '');
    obj.category = obj.category.replace(juriedRegex, '');
    obj.class = categoryToClass(obj.category.trim());
    obj.lastname = split[2];
    obj.firstname = split[1];
    obj.business = split[3];
    obj.url = fixUrl(split[4]);
    return obj;
}

function categoryToClass (category) {
    return category.toLowerCase().replace(' ', '-');
}

// url string cleanup
function fixUrl (url) {
    // var fixed = url.replace('https://', '');
    // return fixed.replace('http://', '');
    if (url && url.indexOf('http') < 0 && isUrl(url)) {
        return 'http://' + url
    } else {
        if (!isUrl(url)) {
            return null
        } else {
            return url
        }
    }
}

// write data to a json file
function writeFile () {
    var data = {
        "lines": lines
    }
    fs.writeFile(fileout, JSON.stringify(data, null, '\t'), function(err) {
        if (err) {
            return console.log(err);
        }
        console.log('Out: ' + fileout + ' = ' + lines.length + ' entries.');
    });
}
