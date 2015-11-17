var s = "3/16";

function quantity(s) {
  var parts = s.split("/");
  
  // no slash included, just return number
  if(parts.length == 1) return parseFloat(s);
  
  // parse "1/2" to 0.5
  return parseFloat(parts[0]) * (1.0 / parseFloat(parts[1]));
}

console.log(quantity(s));
var units = ["teaspoon", "tablespoon", "cup"];

// START CONVERSION
$("#start").on("click", function() {
  var input = $("#in").val();
  
  // loop all lines of recipe
  var lines = input.split("\n");
  for(var i in lines) {
    
    // split line into components
    var line = lines[i].split(" ");
    
    var unitpos = -1;
    console.log(lines[i]);
    
    // try to find unit in line
    for(var j in line) {
      
      // loop available units
      for(var u in units) {
        if(line[j].indexOf(u) >= 0) {
          console.log(line[j]);
          unitpos = j;
          break;
        }
      }
      
      if(unitpos > -1) break;
    }
    
    console.log(unitpos);
  }
});
