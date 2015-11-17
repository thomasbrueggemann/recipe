var $ = require("jquery");
var convert = require("convert-units");

var units = ["teaspoon", "tablespoon", "cup", "liter", "gallon"];
var convert_units = ["tsp", "Tbs", "cup", "lit", "gal"];

function toQuantity(s) {
	var parts = s.split("/");

	// no slash included, just return number
	if (parts.length == 1) return parseFloat(s);

	// parse "1/2" to 0.5
	return parseFloat(parts[0]) * (1.0 / parseFloat(parts[1]));
}

function toUnit(u) {
	for (var i in units) {
		if (u.toLowerCase().indexOf(units[i]) >= 0) {
			return convert_units[i];
		}
	}

	return null;
}

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
				if (line[j].toLowerCase().indexOf(units[u]) >= 0) {
					unitpos = j;
					break;
				}
			}

			if (unitpos > -1) break;
		}

		// unit found so add to data array
		if (unitpos > -1) {
			data.push({
				"quantity": toQuantity(line[unitpos - 1]),
				"unit": toUnit(line[unitpos]),
				"ingredient": line.slice(parseInt(unitpos) + 1).join(" ")
			});
		}
	}

	// find smallest measurement
	var minval = Number.MAX_VALUE;
	var mindata = null;
	for (var d in data) {
		if (data[d].quantity < minval) {
			minval = data[d].quantity;
			mindata = data[d];
		}
	}

	var output = "<h2 style='margin-top:15px'>Results:</h2>";
	for (var t in data) {

		var v = (1 / minval) * convert(data[t].quantity).from(data[t].unit).to(mindata.unit);
		output += v;
		if (v === 1) output += " part of ";
		else output += " parts of ";
		output += data[t].ingredient;
		output += "<br />";
	}

	$("#out").html(output);
});