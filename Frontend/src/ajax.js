var url = "http://localhost:5052/";

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
    var data_val = JSON.stringify(req_data);
    console.log("Tying to send:" + data_val);
    $.ajax({
        url: url + req_url,
        type: 'POST',
        contentType: 'application/json',
        data: data_val,
        success: function (res_data) {
            success_function(res_data);
        },
        error: function () {
            if (error_function)
                error_function();
            else
                console.log("AJAX failed while trying to load POST url = \"" + url + req_url + 'with data' + data_val);
        }
    });
}

exports.url = url;
exports.get = ajaxGet;
exports.post = ajaxPost;