var s = "3/16";

function quantity(s) {
  var parts = s.split("/");
  return parseFloat(parts[0]) * (1.0 / parseFloat(parts[1]));
}

console.log(quantity(s));

// START CONVERSION
$("#start").on("click", function() {
  var input = $("#in").val();
  
  // loop all lines of recipe
  var lines = input.split("\n");
  for(var i in lines) {
    
    // split line into components
    var line = lines[i].split(" ");
    console.log(line);
  }
});
