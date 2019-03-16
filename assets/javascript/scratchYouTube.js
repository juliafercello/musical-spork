//YOUTUBE API

// Sample js code for search.list

// See full sample for buildApiRequest() code, which is not
// specific to a particular API or API method.

buildApiRequest('GET',
    '/youtube/v3/search',
    {
        'maxResults': '25',
        'part': 'snippet',
        'q': 'surfing',
        'type': ''
    });


// EXAMPLE
// This code sample calls the API's search.list method to retrieve search results associated with a particular
// keyword. The HTML page uses JQuery, along with the auth.js and search.js JavaScript files, to show a simple search
// form and display the list of search results. This example uses the JavaScript client library.

// After the API loads, call a function to enable the search box.
function handleAPILoaded() {
    $('#search-button').attr('disabled', false);
}

// Search for a specified string.
function search() {
    var q = $('#query').val();
    var request = gapi.client.youtube.search.list({
        q: q,
        part: 'snippet'
    });

    request.execute(function (response) {
        var str = JSON.stringify(response.result);
        $('#search-container').html('<pre>' + str + '</pre>');
    });
}


//WHat we need is response.items[0].kind.videoId

yt = {
    var q = "",
    var ytUrl = "",

    // Sample js code for search.list

    // See full sample for buildApiRequest() code, which is not
    // specific to a particular API or API method.

    $(".youTubeBtn").on("click", function () {
        //Reset q
        q = ""
        console.log("q #1: " + q)

        //Set q to the conjoined title and artist of song
        q = this.parent().attr("data-songTitle") + "+" + this.parent().attr("data-artist")
        console.log("q #2: " + q)
    }).then(search()),

    // Search for a specified string.
    search: function () {
        var q = q;
        var request = gapi.client.youtube.search.list({
            q: q,
            key: "AIzaSyAMwh-UbR8X4wAZe65g_-4uI5AQ3rE1i1M",
            part: 'snippet',
            maxResults: "1",
            type: "video",
            videoSyndicated: "true",
            videoEmbeddable: "true"
        });

        request.execute(function (response) {
            ytUrl = ;
            $('#search-container').html('<pre>' + str + '</pre>');
        });

        ytRes = response.items[0].kind.videoId
    }

}