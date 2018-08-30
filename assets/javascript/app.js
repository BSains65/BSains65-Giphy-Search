$(document).ready(function () {
	//array of characters new characters pushed into this array;
	var characters = ["Bugs Bunny", "Ed, Ed, and Eddie", "Dexter's Laboratory", "Courage the Cowardly Dog"];


	// Creating Functions & Methods

	// Function that displays all gif buttons
	function displayGifButtons() {
		$("#gifButtonsView").empty(); // erasing anything in div id so it doesnt duplicate results
		for (var i = 0; i < characters.length; i++) {
			var gifButton = $("<button>");
			gifButton.addClass("character");
			gifButton.addClass("btn btn-primary")
			gifButton.attr("data-name", characters[i]);
			gifButton.text(characters[i]);
			$("#gifButtonsView").append(gifButton);
		}
	}

	// Function to add a new character button
	function addNewButton() {
		$("#addGif").on("click", function () {
			var character = $("#cartoonCharacter-input").val().trim();
			if (character == "") {
				return false; //user cannot add a blank button
			}
			characters.push(character);

			displayGifButtons();
			return false;
		});
	}

	// Function displays all of the gifs
	function displayGifs() {
		var character = $(this).attr("data-name");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + character + "&api_key=DPpqRCJXO8vBLirf55m9VTMFQMw5b1Pz&limit=10";
		console.log(queryURL); // displays constructed url
		$.ajax({
			url: queryURL,
			method: 'GET'
		})
			.done(function (response) {
				console.log(response); // console test to make sure something returns
				$("#gifsView").empty(); // erasing anything in div id so it doesnt keep any from previous click
				var results = response.data; //shows results of gifs
				if (results == "") {
					alert("There isn't a gif for this selected button");
				}
				for (var i = 0; i < results.length; i++) {

					var gifDiv = $("<div>"); //div for the gifs to go inside
					gifDiv.addClass("gifDiv");
					// pulling rating of gif
					var gifRating = $("<p>").text("Rating: " + results[i].rating);
					gifDiv.append(gifRating);
					// pulling gif
					var gifImage = $("<img>");
					gifImage.attr("src", results[i].images.fixed_height_small_still.url); // still image stored into src of image
					gifImage.attr("data-still", results[i].images.fixed_height_small_still.url); // still image
					gifImage.attr("data-animate", results[i].images.fixed_height_small.url); // animated image
					gifImage.attr("data-state", "still"); // set the image state
					gifImage.addClass("image");
					gifDiv.append(gifImage);
					// pulling still image of gif
					// adding div of gifs to gifsView div
					$("#gifsView").prepend(gifDiv);
				}
			});
	}

	// Calling Functions & Methods
	displayGifButtons(); // displays list of characters already created
	addNewButton();

	// Document Event Listeners
	$(document).on("click", ".character", displayGifs);
	$(document).on("click", ".image", function () {

		var $gif = $(this);
		var state = $(this).attr("data-state");


		if (state === "still") {
			$gif.attr("src", $(this).attr("data-animate"));
			$gif.attr("data-state", "animate");
		}

		else {
			$gif.attr("src", $(this).attr("data-still"));
			$gif.attr("data-state", "still");
		}
	});
});