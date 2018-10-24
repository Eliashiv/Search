var fs = require('fs');
var path = require('path');

var searchRecursive = function(dir, ext, info) {
  // This is where we store files that match our search
  var results = [];
	
	// Read contents of directory
	fs.readdirSync(dir).forEach(function (dirInner) {
    // Obtain absolute path
    dirInner = path.resolve(dir, dirInner);
	
    // Get stats to determine if path is a directory or a file
    var stat = fs.statSync(dirInner);

    // If path is a directory, recursively scan it and combine results
    if (stat.isDirectory()) {
      results = results.concat(searchRecursive(dirInner, ext, info));
    }
	
    // If path is a file and ends with extension and contains the info then push it onto results
    if (stat.isFile() && dirInner.endsWith(ext) && fs.readFileSync(dirInner).indexOf(info)>-1 ) {
				results.push(dirInner);
			}		
  });

  return results;
};

// When receiving less then 2 argument for the program 
if (process.argv.length < 4) {
    console.log("Usage: node search [EXT] [TEXT]");
    process.exit(-1);
}

var files = searchRecursive('./', process.argv[2], process.argv[3]); 

// When the search does not find any matching result
if (files.length == 0)
{
	console.log("No file was found");
    process.exit(-1);
}

//Print the results Array
Array.from(files).forEach((el)=> console.log(el));
