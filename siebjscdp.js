function crossDomainPost(url, card, count, keyUrl) {
    console.log("http://localhost:1594/api/" + url);
    try {
        $.ajax({
            type: "POST",
            //url: "https://loadcrm.com/SalesPlugin/debug/api/" + url,
            url: "http://localhost:2043/api/" + url,
            contentType: "application/json",
            dataType: "json",
            data: card,
            success: function (list) {
                console.log("success");
                console.log(list);
                if (list != null && list.statusText == 'OK') {
                    console.log("successInOk");
                    if (localStorage.length > 0) {
                        repeatLocalStorage();
                    }
                }
                return true;S
            },
            fail: function (xhr, textStatus, errorThrown) {
                console.log("failed");
                crossDomainPost("Exception", textStatus, 1, "exec");
                localStorage.setItem(keyUrl + "*" + url, card);
                return true;
            }
        });
    } catch (err) {
        var exception = {
            Exception:err.stack, Type:"EnquiryPluginCDPost"
        };
        crossDomainPost("Exception", JSON.stringify(exception), 1, "exec");
    }
    return true;
}

function crossDomainPost1(url, card, count, keyUrl) {
    try {
        $.ajax({
            type: "POST",
            //url: "https://loadcrm.com/JCCred/api/" + url,
            url: "http://localhost:2043/api/" + url,
            contentType: "application/json",
            dataType: "json",
            data: card,
            success: function (list) {
                console.log("success");
                console.log(list);
                if (list != null && list.statusText == 'OK') {
                    console.log("successInOk");
                    if (localStorage.length > 0) {
                        repeatLocalStorage();
                    }
                }
                return true;
            },
            fail: function (xhr, textStatus, errorThrown) {
                console.log("failed");
                crossDomainPost1("Exception", textStatus, 1, "exec");
                localStorage.setItem(keyUrl + "*" + url, card);
                return true;
            }
        });
    } catch (err) {
        var exception = {
            Exception: err.stack, Type: "EnquiryPluginCDPost"
        };
        crossDomainPost1("Exception", JSON.stringify(exception), 1, "exec");
    }
    return true;
}
function repeatLocalStorage() {
    if (localStorage.length > 0) {
        for (var i = 0; i < localStorage.length; i++) {
            if (localStorage.key(i).indexOf("*") > 0) {
                var url = localStorage.key(i).split('*')[1];
                var key = localStorage.key(i).split('*')[0];
                var card = localStorage.getItem(localStorage.key(i));
                localStorage.removeItem(localStorage.key(i));
                var temp = crossDomainPost(url, card, 1, key);

            }
        }
    }
}
