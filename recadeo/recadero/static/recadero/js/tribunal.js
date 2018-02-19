$(document).ready(function () {

    var table_index_row = 100000000;
    var data_table_temp = {};

    if ($("#edificio"))
        $("#edificio_paciente").typeahead({
            source: edificios_cache,
            scrollBar: true
        });

    $("#adscripcion_paciente").typeahead({
        source: adscripcion_cache,
        scrollBar: true
    });

    if ($("#edificio"))
        $("#edificio").typeahead({
            source: edificios_cache,
            scrollBar: true,
            onSelect: function (item) {
                console.log(item);
            }
        });

    // $("#edificio_paciente").typeahead({
    //     onSelect: function (item) {
    //         console.log(item);
    //     },
    //     ajax: {
    //         url: "/getEdificiosByCadena",
    //         timeout: 500,
    //         displayField: "nombre",
    //         valueField: 'id',
    //         triggerLength: 1,
    //         method: "get",
    //         loadingClass: "loading-circle",
    //         preDispatch: function (query) {
    //             //showLoadingMask(true);
    //             return {
    //                 query: query
    //             }
    //         },
    //         preProcess: function (data) {
    //             //showLoadingMask(false);
    //             if (data.success === false) {
    //                 // Hide the list, there was some error
    //                 return false;
    //             }
    //             // We good!
    //             return data.data;
    //         },
    //     }
    // });

    // $("#adscripcion_paciente").typeahead({
    //     onSelect: function (item) {
    //         console.log(item);
    //     },
    //     ajax: {
    //         url: "/getadscripcionbycadena",
    //         timeout: 500,
    //         displayField: "title",
    //         triggerLength: 1,
    //         method: "get",
    //         loadingClass: "loading-circle",
    //         preDispatch: function (query) {
    //             //showLoadingMask(true);
    //             return {
    //                 query: query
    //             }
    //         },
    //         preProcess: function (data) {
    //             //showLoadingMask(false);
    //             if (data.success === false) {
    //                 // Hide the list, there was some error
    //                 return false;
    //             }
    //             // We good!
    //             return data;
    //         }
    //     }
    // });


    var table_resultado_reporte = $("#table-resultado-reporte").DataTable({

        columns: [
            {"data": "rfc"},
            {"data": "nombre"},
            {"data": "edificio"},
            {"data": "adscripcion"},
            {"data": "nombre_modulo"},
            {"data": "fecha_agendada"},
            {"data": "hora_agendada"},
            {"data": "nombre_consultorio"},
            {"data": "fecha_toma_muestra"},
            {
                "data": "null",
                "defaultContent": "<a data-toggle='modal' rel='edit' class=' icon_edit' data-target='#modal-data-paciente'><i class='ion ion-compose' aria-hidden='true'></i></a>"
            },
            {
                "data": "null",
                "defaultContent": "<a data-toggle='modal' rel='detail' class=' icon_detail'  data-target='#modal-data-paciente'><i class='ion-ios-list-outline' aria-hidden='true'></i></a>"
            }
        ],
        "language": {
            "emptyTable": "No existen datos disponibles en el reporte"
        },
        // ,
        // "columnDefs": [{
        //     "targets": -1,
        //     "data": null,
        //     //"defaultContent": "<a data-toggle='modal' data-target='#modal-data-paciente'><i class='fa fa-pencil-square-o' aria-hidden='true'></i></a>",
        // }],
        rowCallback: function (row, data) {
        },
        filter: true,
        info: false,
        ordering: true,
        processing: true,
        retrieve: true
    });

//////////////////////////////
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

    function clear_filtro_promocion_reporte() {
        $('#fecha_inicio').val('');
        $('#fecha_fin').val('');
        $('#edificio').val('');
        $('#cadena_general').val('');
        if ($('#promocionado').prop('checked'))
            $("#promocionado").prop("checked", false);

    }

    $('#button-limpiar-filtro').on("click", function () {
        clear_filtro_promocion_reporte();
    });

    $('.generar_pdf_button').on('click', function () {
        var print_funcion = $(this).attr('rel');
        var data_value =
        $.ajax({
            type: "post",
            data: data_value,
            url: "/reporte-tribunal-generico/",
            dataType: "json",
            success: function (data) {
                var total_consulta = data.total_consulta;
                clear_table(table_resultado_reporte);

                $.each(data.data, function (i) {
                    data.data[i].table_index = i;
                    table_resultado_reporte
                        .row
                        .add(data.data[i])
                        .draw(false);
                })

                $('#loading').addClass('hidden');
                $('#resultados_reporte_paciente').removeClass('hidden');
                $("#total_consulta").html(total_consulta);
            }
        });

    })

    function clear_table(table) {
        table
            .clear()
            .draw();
    }

    function clear_modal_data_paciente() {
        $('#rfc_paciente').val('');
        $("#modal-data-paciente").attr('rel', '0');
        $('#nombre_paciente').val('');
        $('#paterno_paciente').val('');
        $('#materno_paciente').val('');
        $('#correo_paciente').val('');
        $('#edificio').val('');
        $('#adscripcion_paciente').val('');
        $('#fecha_nacimiento_paciente').val('');
        $('#celular_paciente').val('');
        $('#form-data-edit').bootstrapValidator('resetForm', true);
    }

    function disable_modal_element_paciente() {
        $("#rfc_paciente").attr("disabled", "disabled");
        $("#nombre_paciente").attr("disabled", "disabled");
        $("#paterno_paciente").attr("disabled", "disabled");
        $("#materno_paciente").attr("disabled", "disabled");
        $("#correo_paciente").attr("disabled", "disabled");
        $("#edificio_paciente").attr("disabled", "disabled");
        $("#adscripcion_paciente").attr("disabled", "disabled");
        $("#fecha_nacimiento_paciente").attr("disabled", "disabled");
        $("#celular_paciente").attr("disabled", "disabled");
        $('#salvar_cambios_paciente').addClass('hidden');
    }

    function enable_modal_element_paciente() {
        $("#rfc_paciente").removeAttr("disabled", "disabled");
        $("#nombre_paciente").removeAttr("disabled", "disabled");
        $("#paterno_paciente").removeAttr("disabled", "disabled");
        $("#materno_paciente").removeAttr("disabled", "disabled");
        $("#correo_paciente").removeAttr("disabled", "disabled");
        $("#edificio_paciente").removeAttr("disabled", "disabled");
        $("#adscripcion_paciente").removeAttr("disabled", "disabled");
        $("#fecha_nacimiento_paciente").removeAttr("disabled", "disabled");
        $("#celular_paciente").removeAttr("disabled", "disabled");
        $('#salvar_cambios_paciente').removeClass('hidden');
    }

    $('#table-resultado-reporte tbody').on('click', 'a', function () {
        var data = table_resultado_reporte.row($(this).parents('tr')).data();
        var action = $(this).attr('rel');
        clear_modal_data_paciente();
        table_index_row = data.table_index;
        data_table_temp = data;

        if (data.id_usuario != null) {
            $.ajax({
                type: "get",
                data: {id_usuario: data.id_usuario},
                url: "/crud-tribunal/",
                dataType: "json",
                success: function (data) {
                    if (data != null) {
                        if (action === 'detail')
                            disable_modal_element_paciente();
                        else
                            enable_modal_element_paciente();

                        $("#modal-data-paciente").attr('rel', data.id_usuario);
                        $('#rfc_paciente').val(data.rfc);
                        $('#id_usuario').val(data.id_usuario);
                        $('#nombre_paciente').val(data.nombre_simple);
                        $('#paterno_paciente').val(data.paterno);
                        $('#materno_paciente').val(data.materno);
                        $('#correo_paciente').val(data.correo);
                        $('#edificio_paciente').val(data.edificio);
                        $('#adscripcion_paciente').val(data.adscripcion);
                        $('#fecha_nacimiento_paciente').val(data.fecha_nacimiento);
                        $('#celular_paciente').val(data.celular);
                    }
                }
            });
        }


        // $.ajax({
        //     type: "post",
        //     url: "/getEdificioAdscripcionTribunal/",
        //     dataType: "json",
        //     success: function (data) {
        //
        //         var cadena_edificio = '';
        //         var cadena_adscripcion = '';
        //         $.each(data.edificios, function (i) {
        //             cadena_edificio += '<option value="' + data.edificios[i] + '">' + data.edificios[i] + '</option>'
        //         })
        //
        //         $.each(data.adscripciones, function (i) {
        //             cadena_adscripcion += '<option value="' + data.adscripciones[i] + '">' + data.adscripciones[i] + '</option>'
        //         })
        //
        //         $('#edificio_paciente').html(cadena_edificio);
        //         $('#adscripcion_paciente').html(cadena_adscripcion);
        //
        //         $('#loading').addClass('hidden');
        //         $('#resultados_reporte_paciente').removeClass('hidden');
        //         $("#total_consulta").html(total_consulta);
        //     }
        // });
    });

    $("#cadena_general").keypress(function (e) {
        if (e.which == 13) {
            cargar_datos_reporte();
        }
    });

    function cargar_datos_reporte() {

        var cadena_filtro = '';
        var promocionado_check = 0;

        var cadena_general = $('#cadena_general').val();
        if ($.trim(cadena_general) != '')
            cadena_filtro += " | Filtro por frase: " + $.trim(cadena_general);
        var edificio = $('#edificio').val();
        if ($.trim(edificio) != '')
            cadena_filtro += " | Edificio: " + $.trim(edificio);
        var fecha_inicio = $('#fecha_inicio').val();
        if ($.trim(fecha_inicio) != '')
            cadena_filtro += " | Fecha inicio de agenda: " + $.trim(fecha_inicio);
        var fecha_fin = $('#fecha_fin').val();
        if ($.trim(fecha_fin) != '')
            cadena_filtro += " | Fecha fin de agenda: " + $.trim(fecha_fin);
        if ($('#promocionado').prop('checked')) {
            promocionado_check = 1;
            cadena_filtro += " | Promocionado";
        }


        var data_value = {};
        var cadena_general = $('#cadena_general').val();
        var fecha_inicio = $('#fecha_inicio').val();
        var fecha_fin = $('#fecha_fin').val();
        var edificio = $('#edificio').val();
        var promocionado = 0;
        if ($('#promocionado').prop('checked'))
            promocionado = 1;
        data_value = {
            cadena_general: cadena_general,
            fecha_inicio: fecha_inicio,
            fecha_fin: fecha_fin,
            edificio: edificio,
            promocionado: promocionado
        }

        if (cadena_filtro != '') {
            $('#resumen_filtro_show').html(cadena_filtro + ' |');
            $('#resumen_filtro').val(cadena_filtro + ' |');
        }
        else {
            $('#resumen_filtro_show').html('');
            $('#resumen_filtro').val('');
        }

        $('#loading').removeClass('hidden');
        $.ajax({
            type: "post",
            data: data_value,
            url: "/reporte-tribunal-generico/",
            dataType: "json",
            success: function (data) {
                var total_consulta = data.total_consulta;
                clear_table(table_resultado_reporte);

                var id_result = [];

                $.each(data.data, function (i) {
                    id_result.push(data.data[i].id_usuario);
                    data.data[i].table_index = i;
                    table_resultado_reporte
                        .row
                        .add(data.data[i])
                        .draw(false);
                })

                 if (total_consulta > 0) {
                    $('#pdf-reporte-promocion').prop('disabled', false);
                    $('#response_filter').val(id_result);

                }

                $('#loading').addClass('hidden');
                $('#resultados_reporte_paciente').removeClass('hidden');
                $("#total_consulta").html(total_consulta);
            }
        });
    }

    $('#button-generar-reporte').on("click", function () {
        cargar_datos_reporte();
    });


    /////////////////////////////////////////////

    $('#salvar_cambios_paciente').click(function () {
        var validatorObj = $('#form-data-edit').data('bootstrapValidator');
        validatorObj.validate();
        if (validatorObj.isValid()) {
            $('#modal-data-paciente').modal('hide')
            var str_serialize = $('#form-data-edit').serialize();
            $.ajax({
                type: "post",
                data: str_serialize,
                url: "/crud-tribunal/",
                dataType: "json",
                success: function (data) {
                    if (data != undefined) {
                        if (data.ok) {

                            //RFC
                            table_resultado_reporte
                                .cell(table_index_row, 0)
                                .data(data.rfc)
                                .draw();


                            //Nombre
                            table_resultado_reporte
                                .cell(table_index_row, 1)
                                .data(data.nombre)
                                .draw();


                            //Edificio
                            table_resultado_reporte
                                .cell(table_index_row, 2)
                                .data(data.edificio)
                                .draw();


                            //Adscripcion
                            table_resultado_reporte
                                .cell(table_index_row, 3)
                                .data(data.adscripcion)
                                .draw();


                            //Modulo
                            table_resultado_reporte
                                .cell(table_index_row, 4)
                                .data(data.nombre_modulo)
                                .draw();


                            //Fecha Agenda
                            table_resultado_reporte
                                .cell(table_index_row, 5)
                                .data(data.fecha_agendada)
                                .draw();

                            //Hora Agenda
                            table_resultado_reporte
                                .cell(table_index_row, 6)
                                .data(data.hora_agendada)
                                .draw();

                            //COns Muestra
                            table_resultado_reporte
                                .cell(table_index_row, 7)
                                .data(data.nombre_consultorio)
                                .draw();

                            //Fecha Muestra
                            table_resultado_reporte
                                .cell(table_index_row, 8)
                                .data(data.fecha_toma_muestra)
                                .draw();

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

                            toastr.success('Datos de ' + data.nombre + ' salvados correctamente')

                        }
                        else {
                            toastr.error('Error en el proceso de salva de la informacion')
                        }
                    }
                    else {
                        toastr.error('Error en el proceso de salva de la informacion')
                    }
                }
            });

            $('#form-data-edit').bootstrapValidator('resetForm', true);
        }
        return validatorObj.isValid();
    });

    $('#form-data-edit').bootstrapValidator({
        // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            nombre_paciente: {
                validators: {
                    stringLength: {
                        min: 2,
                        message: 'Por favor teclee  nombre con mas de 2 letras'
                    },
                    notEmpty: {
                        message: 'Por favor teclee nombre'
                    }
                }
            },
            paterno_paciente: {
                validators: {
                    stringLength: {
                        min: 2,
                        message: 'Por favor teclee  apellido paterno con mas de 2 letras'
                    },
                    notEmpty: {
                        message: 'Por favor teclee apellido paterno'
                    }
                }
            },
            celular_paciente: {
                validators: {
                    stringLength: {
                        max: 10,
                        message: 'Por favor el numero de celular debe tener menos de 10 digitos'
                    }
                }
            },
            materno_paciente: {
                validators: {
                    stringLength: {
                        min: 2,
                        message: 'Por favor teclee  apellido materno con mas de 2 letras'
                    },
                    notEmpty: {
                        message: 'Por favor teclee apellido materno'
                    }
                }
            },
            rfc_paciente: {
                validators: {
                    regexp: {
                        regexp: /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/,
                        message: 'El RFC no presenta el formato adecuado'
                    },
                    notEmpty: {
                        message: 'Por favor teclee RFC'
                    }
                }
            },
            correo_paciente: {
                validators: {
                    notEmpty: {
                        message: 'Por favor teclee direccion de Correo'
                    },
                    emailAddress: {
                        message: 'El Correo no presenta el formato adecuado'
                    }
                }
            },
            edificio_paciente: {
                validators: {
                    notEmpty: {
                        message: 'Por favor seleccione Edificio'
                    }
                }
            },
            adscripcion_paciente: {
                validators: {
                    notEmpty: {
                        message: 'Por favor seleccione Adscripcion'
                    }
                }
            },
            fecha_nacimiento_paciente: {
                validators: {
                    notEmpty: {
                        message: 'Por favor seleccione Fecha nacimiento'
                    }
                }
            }
        }
    })

    $('#fecha_nacimiento_paciente')
        .on('change click keypress', function () {
            $('#form-data-edit').bootstrapValidator('revalidateField', 'fecha_nacimiento_paciente')
        });


})
;


$(function () {
    $('#fecha_inicio').datetimepicker({
        daysOfWeekDisabled: [0, 6],
        format: 'DD/MM/YYYY',
        showClear: true,
    });


})

$(function () {
    $('#fecha_fin').datetimepicker({
        daysOfWeekDisabled: [0, 6],
        format: 'DD/MM/YYYY',
        showClear: true,
    });


})

$(function () {
    $('#fecha_nacimiento_paciente').datetimepicker({
        daysOfWeekDisabled: [0, 6],
        format: 'YYYY-MM-DD'
    })


})




