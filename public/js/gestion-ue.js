(function() {
    /**
     * UE MANAGEMENT
     */
    // delete ue
    $('a#del_ue').on('click', function(e) {
        e.preventDefault();

        var id = $(this).attr('data-id');
        $.ajax({
            url: '/api/ue/' + id,
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

        var $form = $(this),
            method = $form.attr('method');
        console.log(method);
        $.ajax({
            url: $form.attr('action'),
            method: method,
            data: $form.serialize(),
            dataType: 'json',
            success: function(response) {
                if (response.status === 'success') {
                    var str;
                    if (method === 'post')
                        str = "La nouvelle unité d'enseignement a bien été créée !";
                    else
                        str = "La nouvelle unité d'enseignement a bien été modifiée !";

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
})();
