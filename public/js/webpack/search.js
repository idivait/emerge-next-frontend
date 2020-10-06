function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return false;
}
function replaceSearchText() {
    let queryTitle = document.getElementById("search-title");
    let queryText = document.getElementById("search-query");
    if (queryText) {
        (function () {
            var cx = "014500518797051411214:vj61bld-o4q";
            var gcse = document.createElement("script");
            gcse.type = "text/javascript";
            gcse.async = true;
            gcse.src = "https://cse.google.com/cse.js?cx=" + cx;
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(gcse, s);
        })();
        let qVar = getQueryVariable("q");
        if (qVar) {
            queryText.innerHTML = getQueryVariable("q");
        } else {
            queryTitle.innerHTML = "Search Results";
        }
    }
}
module.exports = replaceSearchText;
