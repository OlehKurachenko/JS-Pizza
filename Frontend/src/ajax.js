var url = "http://localhost:5051/";

function ajaxGet(req_url, success_function, error_function) {
    $.ajax({
        url: url + req_url,
        type: 'GET',
        success: function (data) {
            success_function(data);
        },
        error: function () {
            if (error_function)
                error_function();
            else
                console.log("AJAX failed while trying to load GET url = \"" + url + req_url);
        }
    });
}

function ajaxPost(req_url, req_data, success_function, error_function) {
    $.ajax({
        url: url + req_url,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(req_data),
        success: function (data) {
            success_function(data);
        },
        error: function () {
            if (error_function)
                error_function();
            else
                console.log("AJAX failed while trying to load GET url = \"" + url + req_url);
        }
    });
}

exports.url = url;
exports.get = ajaxGet;
exports.post = ajaxPost;