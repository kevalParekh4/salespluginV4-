var timeout = null;
document.addEventListener("DOMSubtreeModified", function () {
    if (timeout) {
        clearTimeout(timeout);
    }
    timeout = setTimeout(listener, 500);
}, false);