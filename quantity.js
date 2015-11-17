var s = "3/16";

function quantity(s) {
  var parts = s.split("/");
  return parseFloat(parts[0]) * (1.0 / parseFloat(parts[1]));
}

console.log(quantity(s));
