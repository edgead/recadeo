$(document).ready(function () {
//////////////////////////////CSRF//////////////////////////////////////////////
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    var csrftoken = getCookie('csrftoken');

    function csrfSafeMethod(method) {
        // these HTTP methods do not require CSRF protection
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }

    function sameOrigin(url) {
        // test that a given url is a same-origin URL
        // url could be relative or scheme relative or absolute
        var host = document.location.host; // host + port
        var protocol = document.location.protocol;
        var sr_origin = '//' + host;
        var origin = protocol + sr_origin;
        // Allow absolute or scheme relative URLs to same origin
        return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
            (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
            // or any other URL that isn't scheme relative or absolute i.e relative.
            !(/^(\/\/|http:|https:).*/.test(url));
    }

    $.ajaxSetup({
        beforeSend: function (xhr, settings) {
            if (!csrfSafeMethod(settings.type) && sameOrigin(settings.url)) {
                // Send the token to same-origin, relative URLs only.
                // Send the token only if the method warrants CSRF protection
                // Using the CSRFToken value acquired earlier
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });
    /////////////////////



    $('#seleccion_fichero').on('change', function () {
        //$('#resultado_upload').addClass('hidden');
        //$('#fileForm').removeClass('hidden');
        //$('#tabla_errores').addClass('hidden');
        //$('#button_upload_new').addClass('hidden');
        window.location.replace("/upload-file/");
    })

    $('#button_upload_new').on('click', function () {
        //$('#resultado_upload').addClass('hidden');
        //$('#fileForm').removeClass('hidden');
        //$('#tabla_errores').addClass('hidden');
        //$('#button_upload_new').addClass('hidden');
        window.location.replace("/upload-file/");
    })

    $("#fileForm").on('submit', function (e) {
        $('#loading').removeClass('hidden');
        e.preventDefault();
        var formData = new FormData();
        formData.append('file', $('input[type=file]')[0].files[0]);
        $.ajax({
            url: "/upload-file-request/",             // url to your upload process file
            type: "POST",                  // type of request
            data: formData,                    // form data that is sent to server (key/value pairs)
            processData: false,            // tell jQuery not to process the data
            contentType: false,            // tell jQuery not to set contentType
            success: function (response) {   // success function
                console.log(response);
                if (!response.error_ext) {
                    if (response.data.status == 200) {
                        $('#resultado_upload').removeClass('hidden');
                        $('#numero_registro').html(response.data.data.filas);
                        $('#correctos').html(response.data.data.completos);


                        var cadena_table = '';
                        cadena_table = '<tr><th style="width: 10px">RFC</th><th>Prueba Sanquinea</th><th>Biometria</th><th style="width: 40px">Encontrado</th></tr>';

                        $.each(response.data.data.errores, function (i) {
                            var rfc = response.data.data.errores[i].rfc;
                            var biometria = response.data.data.errores[i].biometria;
                            var encontrado = response.data.data.errores[i].encontrado;
                            var qsanguinea = response.data.data.errores[i].qsanguinea;

                            if (encontrado == true)
                                encontrado = 'SI';
                            else
                                encontrado = 'NO';

                            cadena_table += '<tr>';
                            cadena_table += '<td>' + rfc + '</td>';
                            cadena_table += '<td>' + qsanguinea + '</td>';
                            cadena_table += '<td>' + biometria + '</td>';
                            cadena_table += '<td>' + encontrado + '</td>';
                            cadena_table += '</tr>';
                        })

                        $('#data_error').html(cadena_table);
                        $('#data_error').html(cadena_table);
                        $('#tabla_errores').removeClass('hidden');
                        $('#button_upload_new').removeClass('hidden');
                        $('#fileForm').addClass('hidden');
                        $('#file').val('');

                        toastr.options = {
                            "closeButton": false,
                            "debug": false,
                            "newestOnTop": false,
                            "progressBar": false,
                            "positionClass": "toast-top-center",
                            "preventDuplicates": false,
                            "onclick": null,
                            "showDuration": "300",
                            "hideDuration": "1000",
                            "timeOut": "5000",
                            "extendedTimeOut": "1000",
                            "showEasing": "swing",
                            "hideEasing": "linear",
                            "showMethod": "fadeIn",
                            "hideMethod": "fadeOut"
                        }

                        toastr.success('Datos procesados correctamente');
                        $('#loading').addClass('hidden');
                        $('#subir_doc').removeClass('hidden');

                    }
                    if (response.data.status == 500) {
                        toastr.options = {
                            "closeButton": false,
                            "debug": false,
                            "newestOnTop": false,
                            "progressBar": false,
                            "positionClass": "toast-top-center",
                            "preventDuplicates": false,
                            "onclick": null,
                            "showDuration": "300",
                            "hideDuration": "1000",
                            "timeOut": "5000",
                            "extendedTimeOut": "1000",
                            "showEasing": "swing",
                            "hideEasing": "linear",
                            "showMethod": "fadeIn",
                            "hideMethod": "fadeOut"
                        }

                        toastr.error('Datos procesados con Error');
                        $('#loading').addClass('hidden');
                        $('#tabla_errores').addClass('hidden');
                        $('#file').val('');
                        $('#seleccion_fichero').html('Seleccione el Fichero <i class="fa fa-upload" aria-hidden="true"></i>');
                        $('#seleccion_fichero').removeClass('bg-red');
                        $('#subir_doc').addClass('hidden');
                    }
                }
                else {
                    toastr.options = {
                        "closeButton": false,
                        "debug": false,
                        "newestOnTop": false,
                        "progressBar": false,
                        "positionClass": "toast-top-center",
                        "preventDuplicates": false,
                        "onclick": null,
                        "showDuration": "300",
                        "hideDuration": "1000",
                        "timeOut": "5000",
                        "extendedTimeOut": "1000",
                        "showEasing": "swing",
                        "hideEasing": "linear",
                        "showMethod": "fadeIn",
                        "hideMethod": "fadeOut"
                    }

                    toastr.error('Existe un problema con la carga del fichero.');
                    $('#loading').addClass('hidden');
                    $('#file').val('');
                    $('#seleccion_fichero').html('Seleccione el Fichero <i class="fa fa-upload" aria-hidden="true"></i>');
                    $('#seleccion_fichero').removeClass('bg-red');
                    $('#subir_doc').addClass('hidden');
                }
            }
        });
    });


})

function handleFiles(input) {
        var a = input;
        var array = input.value.split('\\');
        var nombre_fichero = array[array.length - 1];
        var array = nombre_fichero.split('.');
        var ext = array[array.length - 1];
        if (ext == 'csv') {
            $('#seleccion_fichero').html(' <i class="fa fa-file-code-o" aria-hidden="true"></i> ' + nombre_fichero);
            $('#seleccion_fichero').addClass('bg-red');
            $('#subir_doc').removeClass('hidden');
        }
        else {
            $('#seleccion_fichero').html('Seleccione el Fichero <i class="fa fa-upload" aria-hidden="true"></i>');
            $('#seleccion_fichero').removeClass('bg-red');

            toastr.options = {
                "closeButton": false,
                "debug": false,
                "newestOnTop": false,
                "progressBar": false,
                "positionClass": "toast-top-center",
                "preventDuplicates": false,
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "5000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            }

            toastr.error('La extension del fichero no es la correcta, debe ser un .csv');
            $('#loading').addClass('hidden');
            $('#file').val('');
            $('#subir_doc').addClass('hidden');

        }
//use input
    }




