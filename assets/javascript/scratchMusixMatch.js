var glblVars = {
    searchLyric: "",
    //searchArtist: "",
    trackId: "",
    //searchQuery: searchLyric + "&q_artist=" + searchArtist,
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
    ]
}

// var mm = {
//     getTracks: function () {
//        var trackQueryURL = "https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_lyrics=" + glblVars.searchLyric + "&apikey=28e8336b7ccf4b5261bf290e9cfc6874&s_track_rating=desc&page_size=10&page=1"
//        //var trackQueryURL = " http://cors-proxy.htmldriven.com/?url=https://api.musixmatch.com/ws/1.1/track.search?q_lyrics=" + glblVars.searchLyric + "&apikey=28e8336b7ccf4b5261bf290e9cfc6874&s_track_rating=desc&page_size=10&page=1"


//         console.log("search: " + glblVars.searchLyric);
//         $.ajax({
//             url: trackQueryURL,
//             method: 'GET',
//             dataType: 'json'
//         })
//             //  success: function(response){
//             .then(function (response) {
//                 console.log(response);
//                 console.log(response.message.body.track_list[0].track.track_id)
//                 glblVars.trackListResult.length = 0; //clear out the array from the last search??
//                 var searchResult = response.message.body.track_list
//                 for (var i = 0; i < searchResult.length; i++) {
//                     //get snippet for each track
//                     //  var snippet = mm.getTrackSnippet(searchResult[i].track.track_id)
//                     //  console.log("snippet: " + snippet)
//                     //create trackInfo object and push to array
//                     var trackInfo = {
//                         track_id: searchResult[i].track.track_id,
//                         track_name: searchResult[i].track.track_name,
//                         artist: searchResult[i].track.artist_name,
//                         album: searchResult[i].track.album_name,
//                         //snippet: snippet
//                         snippet: ""
//                     }
//                     glblVars.trackListResult.push(trackInfo);
//                 }
//                 console.log(glblVars.trackListResult);
//                 mm.getTrackSnippet();
//             });
//     },

//     // getTrackSnippet: function (trackId) {
//     getTrackSnippet: function () {

//         for (var i = 0; i < glblVars.trackListResult.length; i++) {

//             glblVars.trackId = glblVars.trackListResult[i].track_id; 
//             console.log("track id: " + glblVars.trackId)
//             var snippetQueryURL = "https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.snippet.get?track_id=" + glblVars.trackId + "&apikey=28e8336b7ccf4b5261bf290e9cfc6874"

//             $.ajax({
//                 url: snippetQueryURL,
//                 method: 'GET',
//                 dataType: 'json'
//             })
//                .then(function(response) {
//                     console.log(response.message.body.snippet.snippet_body);
//                     var snippet = response.message.body.snippet.snippet_body;
//                     console.log("snip" + snippet)
//                     console.log(glblVars.trackListResult[i].snippet)

//                     glblVars.trackListResult[i].snippet = snippet;

//                     //console.log("each snip" + glblVars.trackListResult[i].snippet);
//                 })
//         }
//         console.log(glblVars.trackListResult)
//     }
// }

output = {
    showTracks: function () {
        for (var i = 0; i < glblVars.trackListResult.length; i++) {
            var newRow = $("<tr>");
    
            var songTitleCol = $("<td>");
            songTitleCol.text(glblVars.trackListResult[i].track_name);
    
            var artistCol = $("<td>");
            artistCol.text(glblVars.trackListResult[i].artist);
    
            var albumCol = $("<td>");
            albumCol.text(glblVars.trackListResult[i].album);
    
            var snippetCol = $("<td>");
            snippetCol.text(glblVars.trackListResult[i].snippet);
    
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
            newRow.append(snippetCol);
            newRow.append(youTubeCol);
            $("#bodyMusicResults").append(newRow);
        }
    }
}

//$(document).on("click", "#getLyricResults", mm.getTracks);

$("#getLyricResults").on("click", function () {
    glblVars.searchLyric = $("#songLyric").val().trim();
    // mm.getTracks();
    output.showTracks();     
    })
