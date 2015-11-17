var s = "3/16";

function quantity(s) {
	var parts = s.split("/");

	// no slash included, just return number
	if (parts.length == 1) return parseFloat(s);

	// parse "1/2" to 0.5
	return parseFloat(parts[0]) * (1.0 / parseFloat(parts[1]));
}

var units = ["teaspoon", "tablespoon", "cup"];

// START CONVERSION
$("#start").on("click", function() {
	var data = [];
	var input = $("#in").val();

	// loop all lines of recipe
	var lines = input.split("\n");
	for (var i in lines) {

		// split line into components
		var line = lines[i].split(" ");

		var unitpos = -1;

		// try to find unit in line
		for (var j in line) {

			// loop available units
			for (var u in units) {
				if (line[j].indexOf(units[u]) >= 0) {
					unitpos = j;
					break;
				}
			}

			if (unitpos > -1) break;
		}

		// unit found so add to data array
		if (unitpos > -1) {
			data.push({
				"quantity": quantity(line[unitpos - 1]),
				"unit": line[unitpos],
				"ingredient": line.slice(parseInt(unitpos) + 1).join(" ")
			});
		}
	}

	console.table(data);
});