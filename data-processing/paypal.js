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

var first = true

// parse all lines of a file and populate array with resulting objects
// and write to a file.
function readLines (line, isLast) {
    if (first) {
        first = false
    } else {
        var lineobj = parseLine(line);
        if (lineobj) {
            lines.push(lineobj);
        }
        if (isLast) {
            console.log(lines[0])
            writeFile();
        }
    }
}

// parse data line into JSON
function parseLine (line) {
    var split = line.split(',');
    // if (split.length < 4) return;

    var obj = {};
    obj.date = cleanString(split[0])
    obj.time = cleanString(split[1])
    obj.name = cleanString(split[3])
    obj.type = cleanString(split[4])
    obj.gross = cleanString(split[7])
    obj.title = cleanString(split[14])
    obj.quantity = cleanString(split[25])
    // obj.category = split[0];
    // obj.class = categoryToClass(split[0]);
    // obj.lastname = split[1];
    // obj.firstname = split[2];
    // obj.business = split[3];
    // obj.url = fixUrl(split[4]);
    return obj;
}

function cleanString (str) {
    return str.replace(/"/gi, '')
}

function categoryToClass (category) {
    return category.toLowerCase().replace(' ', '-');
}

// url string cleanup
function fixUrl (url) {
    var fixed = url.replace('https://', '');
    return fixed.replace('http://', '');
}

// write data to a json file
function writeFile () {
    var data = {
        "lines": lines
    }
    fs.writeFile(fileout, JSON.stringify(data), function(err) {
        if (err) {
            return console.log(err);
        }
        console.log('Out: ' + fileout + ' = ' + lines.length + ' entries.');
    });
}
