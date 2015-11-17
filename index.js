var s = "3/16";

var parts = s.split("/");
var result = parseFloat(parts[0]) * (1.0 / parseFloat(parts[1]));
console.log(result);
