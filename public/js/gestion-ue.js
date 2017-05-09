(function() {
    /**
     * UE MANAGEMENT
     */
    // deletes ue
    $('a#del_ue').on('click', function(e) {
        e.preventDefault();

        var url = $(this).attr('href');
        $.ajax({
            url: url,
            method: 'delete',
            dataType: 'json',
            success: function() {
                var str = "L'unité d'enseignement a bien été supprimée !";
                window.location.replace('/?notif=' + encodeURI(str) + '&type=success');
            }
        })
    });

    // Updates and creates ue
    $('form#form_ue').on('submit', function(e) {
        e.preventDefault();

        checkForm($(this), "La nouvelle unité d'enseignement a bien été créée !", "L'unité d'enseignement a bien été modifiée !");
    });

    /**
     * ACTIVITY MANAGEMENT
     */
    // Updates and creates activity
    $('form#form_activity').on('submit', function(e) {
        e.preventDefault();

        checkForm($(this), "La nouvelle activité a bien été créée !", "L'activité a bien été modifiée !");
    });

    // deletes activity
    $('a#del_activity').on('click', function(e) {
        e.preventDefault();

        var url = $(this).attr('href');
        $.ajax({
            url: url,
            method: 'delete',
            dataType: 'json',
            success: function() {
                var str = "L'activité a bien été supprimée !";
                window.location.replace('/?notif=' + encodeURI(str) + '&type=success');
            }
        })
    });


    /**
     * Main method
     */
    $(document).ready(function() {
        var notif = getParameterByName('notif'),
            type = getParameterByName('type');

        if (notif) {
            $.iaoAlert({
                msg: notif,
                type: type ? type : 'success',
                mode: 'dark'
            });
        }
    });

    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    function checkForm($form, on_create_msg, on_update_msg) {
        var method = $form.attr('method');
        $.ajax({
            url: $form.attr('action'),
            method: method,
            data: $form.serialize(),
            dataType: 'json',
            success: function(response) {
                if (response.status === 'success') {
                    var str;
                    if (method === 'post')
                        str = on_create_msg;
                    else
                        str = on_update_msg;

                    window.location.replace('/?notif=' + encodeURI(str) + '&type=success');
                } else {
                    $.iaoAlert({
                        msg: response.data,
                        type: 'error',
                        mode: 'dark'
                    });
                }
            }
        });
    }
})();
