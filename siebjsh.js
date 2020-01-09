function get_hostname(url) {
    //var m = url.match(/^http:\/\/[^/]+/);
    //return m ? m[0] : null;
    return $('<a>').prop('href', url).prop('hostname');
}
// Retrieve your data from localStorage
var saveData = JSON.parse(localStorage.saveData || null) || {};

// Store your data.
function saveStuff(obj) {
    saveData.obj = obj;
    // saveData.foo = foo;
    saveData.time = new Date().getTime();
    localStorage.saveData = JSON.stringify(saveData);
}

// Do something with your data.
function loadStuff() {
    return saveData.obj || "default";
}