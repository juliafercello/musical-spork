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
    trackListResult: [{
        track_id: "12345",
        track_name: "Hangin Tough",
        artist: "NKOTB",
        album: "Album 1",
        snippet: "hangin tough...."
    }, {
        track_id: "789",
        track_name: "covergirl",
        artist: "NKOTB",
        album: "Album 1",
        snippet: "you're my covergirl...."
    }
    ],
    //snippetList: [{}],
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
                    //get snippet for each track
                    //var snippet = mm.getTrackSnippet(searchResult[i].track.track_id)
                    //console.log("snippet: " + snippet)

                    //create trackInfo object and push to array
                    var trackInfo = {
                        track_id: searchResult[i].track.track_id,
                        track_name: searchResult[i].track.track_name,
                        artist: searchResult[i].track.artist_name,
                        album: searchResult[i].track.album_name,
                        //snippet: snippet
                        //snippet: ""
                    }
                    glblVars.trackListResult.push(trackInfo);
                }
                console.log(glblVars.trackListResult);
                //mm.getTrackSnippet();
                output.showTracks(); 
            });
    }
    //,

//     getTrackSnippet: function () {
//         for (var i = 0; i < glblVars.trackListResult.length; i++) {
//         glblVars.trackId = glblVars.trackListResult.track_id;
//         //  console.log("track id: " + glblVars.trackId)
//         var snippetQueryURL = "https://chriscastle.com/proxy/?:proxy:https://api.musixmatch.com/ws/1.1/track.snippet.get?track_id=" + glblVars.trackId + "&apikey=28e8336b7ccf4b5261bf290e9cfc6874"

//         $.ajax({
//             url: snippetQueryURL,
//             method: 'GET',
//             dataType: 'json'
//         })
//             .then(function (response) {
//                 console.log(response.message.body.snippet.snippet_body);
//                 var snippet = response.message.body.snippet.snippet_body;
//                 glblVars.trackListResult[i].snippet = snippet;     

//                 //console.log("snip" + snippet)
//                 //console.log("i: " + i)
//                 //console.log(glblVars.trackListResult[i].snippet)
//             }); 
//         }
//         console.log(glblVars.trackListResult);
//     }
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

            // var snippetCol = $("<td>");
            // snippetCol.text(glblVars.trackListResult[i].snippet);

            var youTubeCol = $("<td>");
            var songButton = $("<a>");
            songButton.addClass("waves-effect waves-light btn darken-1 modal-trigger youTubeBtn");
            songButton.attr("href", "#demo-modal"); //change later?
            songButton.attr("data-songTitle", glblVars.trackListResult[i].track_name);
            songButton.attr("data-artist", glblVars.trackListResult[i].artist);
            songButton.html("YouTube" + "<i class='material-icons right'>music_video</i>");

            youTubeCol.text("");

            youTubeCol.append(songButton);

            newRow.append(songTitleCol);
            newRow.append(artistCol);
            newRow.append(albumCol);
            //newRow.append(snippetCol);
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

//needed for displaying the modal
$(document).ready(function () {
    $('.modal').modal();
});

//search for songs with the lyrics entered by the user
$("#getLyricResults").on("click", function (event) {
    event.preventDefault();

    glblVars.searchLyric = $("#songLyric").val().trim();
    console.log(glblVars.searchLyric);
    mm.getTracks();
    //output.showTracks();
    fbase.storeSearch();

    $("#songLyric").val("");

});

//Listen for chats and add to the page 
glblVars.database.ref("/searches").orderByChild("dateAdded").on("child_added", function (childSnapshot) {
    var newDiv = $("<div>");
    newDiv.text(childSnapshot.val().lyricSearch);
    $("#recentSearchesDiv").append(newDiv);

}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});

