function search() {

        document.getElementById("data").innerHTML = "";
        var search_text = document.getElementById("search").value;
        var url = "https://kgsearch.googleapis.com/v1/entities:search?query=" + search_text + "&key=AIzaSyAvb4O4Z3Zq0GE4UvOyvl7uZ2AZpfU_r0E&limit=1&indent=True"

    var service_url = 'https://kgsearch.googleapis.com/v1/entities:search';
    var params = {
        'query': search_text,
        'limit': 10,
        'indent': true,
        'key' : 'AIzaSyAvb4O4Z3Zq0GE4UvOyvl7uZ2AZpfU_r0E',
    };
    $.getJSON(service_url + '?callback=?', params, function(response) {
        $.each(response.itemListElement, function(i, element) {
            $('<div>', {text:element['result']['name']}).appendTo(document.getElementById('data'));
        });
    });

}

function logout() {

    document.location.href = "https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=login.html";

}

