// Initialize Firebase
var config = {
    apiKey: "AIzaSyCjexeT-tM-VflHnLImCyMEZhgw-O16OMY",
    authDomain: "musicalspork-bfe10.firebaseapp.com",
    databaseURL: "https://musicalspork-bfe10.firebaseio.com",
    projectId: "musicalspork-bfe10",
    storageBucket: "",
    messagingSenderId: "1029385151250"
};

firebase.initializeApp(config);

//global variables
var glblVars = {
    searchLyric: "",
    trackId: "",
    trackListResult: [],
    database: firebase.database()
}

//musixMatch methods
var mm = {
    getTracks: function () {
        var trackQueryURL = "https://chriscastle.com/proxy/?:proxy:https://api.musixmatch.com/ws/1.1/track.search?q_lyrics=" + glblVars.searchLyric + "&apikey=28e8336b7ccf4b5261bf290e9cfc6874&s_track_rating=desc&page_size=10&page=1"

        console.log("search: " + glblVars.searchLyric);

        $.ajax({
            url: trackQueryURL,
            method: 'GET',
            dataType: 'json',
        })
            .then(function (response) {
                glblVars.trackListResult.length = 0; //clear out the array from the last search
                var searchResult = response.message.body.track_list
                for (var i = 0; i < searchResult.length; i++) {

                    //create trackInfo object and push to array
                    var trackInfo = {
                        track_id: searchResult[i].track.track_id,
                        track_name: searchResult[i].track.track_name,
                        artist: searchResult[i].track.artist_name,
                        album: searchResult[i].track.album_name,
                    }
                    glblVars.trackListResult.push(trackInfo);
                }
                console.log(glblVars.trackListResult);
                output.showTracks();
            });
    }
}

//methods to show the search results on the page
var output = {
    showTracks: function () {
        $("#bodyMusicResults").empty();
        for (var i = 0; i < glblVars.trackListResult.length; i++) {
            var newRow = $("<tr>");

            var songTitleCol = $("<td>");
            songTitleCol.text(glblVars.trackListResult[i].track_name);

            var artistCol = $("<td>");
            artistCol.text(glblVars.trackListResult[i].artist);

            var albumCol = $("<td>");
            albumCol.text(glblVars.trackListResult[i].album);

            var youTubeCol = $("<td>");
            var songButton = $("<a>");
            songButton.addClass("waves-effect waves-light btn darken-1 modal-trigger youTubeBtn");
            songButton.attr("href", "#demo-modal");
            songButton.attr("data-songTitle", glblVars.trackListResult[i].track_name);
            songButton.attr("data-artist", glblVars.trackListResult[i].artist);
            songButton.html("YouTube" + "<i class='material-icons right'>music_video</i>");

            youTubeCol.text("");

            youTubeCol.append(songButton);

            newRow.append(songTitleCol);
            newRow.append(artistCol);
            newRow.append(albumCol);
            newRow.append(youTubeCol);
            $("#bodyMusicResults").append(newRow);
        }
        $("#tableMusicResults").attr("style", "display: block")
    }
}

//store search to firebase and then present it in a div on the page
var fbase = {
    storeSearch: function () {
        glblVars.database.ref("/searches").push({
            lyricSearch: glblVars.searchLyric,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });

    }
}

// Needed for displaying the modal
$(document).ready(function () {
    $('.modal').modal();
});

// Search for songs with the lyrics entered by the user
$("form").on("submit", function (event) {
   event.preventDefault();
        glblVars.searchLyric = $("#songLyric").val().trim();
        console.log(glblVars.searchLyric);
        mm.getTracks();
        fbase.storeSearch();
        $("#songLyric").val("");
});

// Listen for chats and add to the page 
glblVars.database.ref("/searches").orderByChild("dateAdded").on("child_added", function (childSnapshot) {
    var newDiv = $("<div>");
    newDiv.text(childSnapshot.val().lyricSearch);
    $("#recentSearchesDiv").append(newDiv);

}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});
