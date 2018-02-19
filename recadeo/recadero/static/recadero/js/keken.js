$(document).ready(function () {


    function init_sliders() {
        init_slider_edad();
        init_slider_imc();
        init_slider_pgc();
        init_slider_pd();
        init_slider_ps();
        init_slider_glucosa();
        init_slider_colesterol();
    }

    function init_slider_edad() {
        var rango_edad_value = $("#rango_edad_value").bootstrapSlider({
            id: "rango_edad_value",
            min: 0,
            max: 100,
            range: true,
            value: [0, 0]
        });
    }

    function clear_slider_edad() {
        rango_edad_value.bootstrapSlider('setValue', [0, 0]);
    }

    function clear_slider_imc() {
        rango_imc_value.bootstrapSlider('setValue', [0, 0]);
    }

    function clear_slider_pgc() {
        rango_pgc_value.bootstrapSlider('setValue', [0, 0]);
    }

    function clear_slider_pd() {
        rango_pd_value.bootstrapSlider('setValue', [0, 0]);
    }

    function clear_slider_ps() {
        rango_ps_value.bootstrapSlider('setValue', [0, 0]);
    }

    function clear_slider_glucosa() {
        rango_glucosa_value.bootstrapSlider('setValue', [0, 0]);
    }

    function clear_slider_colesterol() {
        rango_colesterol_value.bootstrapSlider('setValue', [0, 0]);
    }

    function init_slider_imc() {
        var rango_imc_value = $("#rango_imc_value").bootstrapSlider({
            id: "rango_imc_value",
            min: 0,
            max: 60,
            range: true,
            value: [0, 0]
        });
    }

    function init_slider_pgc() {
        var rango_pgc_value = $("#rango_pgc_value").bootstrapSlider({
            id: "rango_pgc_value",
            min: 0,
            max: 100,
            range: true,
            value: [0, 0]
        });
    }

    function init_slider_pd() {
        var rango_pd_value = $("#rango_pd_value").bootstrapSlider({
            id: "rango_pd_value",
            min: 0,
            max: 200,
            range: true,
            value: [0, 0]
        });

    }

    function init_slider_ps() {
        var rango_ps_value = $("#rango_ps_value").bootstrapSlider({
            id: "rango_ps_value",
            min: 0,
            max: 200,
            range: true,
            value: [0, 0]
        });

    }

    function init_slider_glucosa() {
        var rango_glucosa_value = $("#rango_glucosa_value").bootstrapSlider({
            id: "rango_glucosa_value",
            min: 0,
            max: 300,
            range: true,
            value: [0, 0]
        });

    }

    function init_slider_colesterol() {
        var rango_colesterol_value = $("#rango_colesterol_value").bootstrapSlider({
            id: "rango_colesterol_value",
            min: 0,
            max: 300,
            range: true,
            value: [0, 0]
        });
    }

    var rango_edad_value = $("#rango_edad_value").bootstrapSlider({
        id: "rango_edad_value",
        min: 0,
        max: 100,
        range: true,
        value: [0, 0]
    });
    var rango_imc_value = $("#rango_imc_value").bootstrapSlider({
        id: "rango_imc_value",
        min: 0,
        max: 60,
        range: true,
        value: [0, 0]
    });
    var rango_pgc_value = $("#rango_pgc_value").bootstrapSlider({
        id: "rango_pgc_value",
        min: 0,
        max: 100,
        range: true,
        value: [0, 0]
    });
    var rango_pd_value = $("#rango_pd_value").bootstrapSlider({
        id: "rango_pd_value",
        min: 0,
        max: 200,
        range: true,
        value: [0, 0]
    });
    var rango_ps_value = $("#rango_ps_value").bootstrapSlider({
        id: "rango_ps_value",
        min: 0,
        max: 200,
        range: true,
        value: [0, 0]
    });
    var rango_glucosa_value = $("#rango_glucosa_value").bootstrapSlider({
        id: "rango_glucosa_value",
        min: 0,
        max: 300,
        range: true,
        value: [0, 0]
    });
    var rango_colesterol_value = $("#rango_colesterol_value").bootstrapSlider({
        id: "rango_colesterol_value",
        min: 0,
        max: 300,
        range: true,
        value: [0, 0]
    });

    $('[name=edad_menor]').maskNumber({integer: true});
    $('[name=edad_mayor]').maskNumber({integer: true});
    $('[name=imc_mayor]').maskNumber({integer: true});
    $('[name=imc_menor]').maskNumber({integer: true});
    $('[name=pgc_mayor]').maskNumber({integer: true});
    $('[name=pgc_menor]').maskNumber({integer: true});
    $('[name=presion_diastolica_mayor]').maskNumber({integer: true});
    $('[name=presion_diastolica_menor]').maskNumber({integer: true});
    $('[name=presion_sistolica_mayor]').maskNumber({integer: true});
    $('[name=presion_sistolica_menor]').maskNumber({integer: true});
    $('[name=glucosa_mayor]').maskNumber({integer: true});
    $('[name=glucosa_menor]').maskNumber({integer: true});
    $('[name=colesterol_mayor]').maskNumber({integer: true});
    $('[name=colesterol_menor]').maskNumber({integer: true});

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

    var table_resultado_reporte_keken = $("#table-resultado-reporte-keken").DataTable({
        "order": [],
        columns: [
            {"data": "nombre"},
            {"data": "localidad"},
            {"data": "fecha_registro"},
            {"data": "genero"},
            {"data": "edad"},
            {"data": "diabetes"},
            {"data": "hipertension"},
            {"data": "obesidad"},
            {"data": "dislipidemia"}

            // {
            //     "data": "null",
            //     "defaultContent": "<a data-toggle='modal' rel='detail' class=' icon_detail'  data-target='#modal-data-paciente'><i class='ion-ios-list-outline' aria-hidden='true'></i></a>"
            // }
        ],
        "language": {
            "emptyTable": "No existen datos disponibles en el reporte",
            "lengthMenu": "Mostrar _MENU_ resultados",
            "paginate": {
                "next": "Siguiente",
                "previous": "Anterior"
            }
        },

        "columnDefs": [{
            "targets": [3, 5, 6, 7, 8],
            "orderable": false
        }],
        //  "columnDefs": [{
        //     "targets": 0,
        //   "data": null
        //     //"defaultContent": "<a data-toggle='modal' data-target='#modal-data-paciente'><i class='fa fa-pencil-square-o' aria-hidden='true'></i></a>",
        //}],
        rowCallback: function (row, data) {
        },
        filter: true,
        info: false,
        ordering: true,
        processing: true,
        retrieve: true
    });

    $("#localidad").typeahead({
        source: localidades_cache,
        scrollBar: true,
        minLength: 0,
        highlight: true,
        onSelect: function (item) {
            console.log(item);
        }
    });

    function clear_filtro_reporte() {
        $('#genero').val(0);
        $('#localidad').val('');
        $('#edad_mayor').val('');
        $('#edad_menor').val('');
        $('#cadena_general').val('');
        if ($('#ninio_check').prop('checked'))
            $("#ninio_check").prop("checked", false);
        if ($('#adulto_check').prop('checked'))
            $("#adulto_check").prop("checked", false);

        clear_padecimentos();
        clear_slider_edad();
        clear_slider_imc();
        clear_slider_pgc();
        clear_slider_pd();
        clear_slider_ps();
        clear_slider_glucosa();
        clear_slider_colesterol();
    }

    $('#button-limpiar-filtro').on("click", function () {
        clear_filtro_reporte();
    });

    function clear_padecimentos() {
        $("#diabeticos").prop("checked", false);
        $("#hipertensos").prop("checked", false);
        $("#obesos").prop("checked", false);
        $("#dislipidemicos").prop("checked", false);
        $("#anemicos").prop("checked", false);
    }

    function clear_sanos() {
        $("#sanos").prop("checked", false);
    }

    rango_edad_value.on("slideStart", function (slideEvt) {
        clear_menor();
        clear_adulto();
    });

    rango_imc_value.on("slideStart", function (slideEvt) {
        clear_padecimentos();
        clear_sanos();
    });

    rango_pgc_value.on("slideStart", function (slideEvt) {
        clear_padecimentos();
        clear_sanos();
    });

    rango_pd_value.on("slideStart", function (slideEvt) {
        clear_padecimentos();
        clear_sanos();
    });

    rango_ps_value.on("slideStart", function (slideEvt) {
        clear_padecimentos();
        clear_sanos();
    });

    rango_glucosa_value.on("slideStart", function (slideEvt) {
        clear_padecimentos();
        clear_sanos();
    });

    rango_colesterol_value.on("slideStart", function (slideEvt) {
        clear_padecimentos();
        clear_sanos();
    });

    function clear_adulto() {
        $("#adulto_check").prop("checked", false);
    }

    function clear_anemicos() {
        $("#anemicos").prop("checked", false);
    }

    function clear_menor() {
        $("#ninio_check").prop("checked", false);
    }

    $('#ninio_check').on("click", function () {
        if ($('#ninio_check').prop('checked')) {
            clear_adulto();
            clear_slider_edad();
        }
        else{
            clear_anemicos();
        }
    });
    $('#anemicos').on("click", function () {
        if ($('#anemicos').prop('checked')) {
            clear_adulto();
            $("#ninio_check").prop("checked", true);
        }
    });

    $('#sanos').on("click", function () {
        if ($('#sanos').prop('checked')) {
            clear_padecimentos();
            clear_slider_imc();
            clear_slider_pgc();
            clear_slider_pd();
            clear_slider_ps();
            clear_slider_glucosa();
            clear_slider_colesterol();
        }
    });

    $('#adulto_check').on("click", function () {
        if ($('#adulto_check').prop('checked')) {
            clear_menor();
            clear_slider_edad();
            clear_anemicos();
        }
    });


    $("#localidad").keypress(function (e) {
        if (e.which == 13) {
            cargar_datos_reporte();
        }

    });

    $('.padecimientos').on("click", function () {
        clear_slider_imc();
        clear_slider_pgc();
        clear_slider_pd();
        clear_slider_ps();
        clear_slider_glucosa();
        clear_slider_colesterol();
        clear_sanos();
    });

    $('#close-advanced').on("click", function () {
        clear_slider_imc();
        clear_slider_pgc();
        clear_slider_pd();
        clear_slider_ps();
        clear_slider_edad();
        clear_slider_glucosa();
        clear_slider_colesterol();
    });

    $('#button-generar-reporte').on("click", function () {
        cargar_datos_reporte();
    });

    $("#cadena_general").keypress(function (e) {
        if (e.which == 13) {
            cargar_datos_reporte();
        }
    });


    function cargar_datos_reporte() {
        var data_value = {};
        cadena_filtro = '';

        var adulto_check = 0;
        var ninio_check = 0;

        var cadena_general = $('#cadena_general').val();
        if ($.trim(cadena_general) != '')
            cadena_filtro += " | Filtro por frase: " + $.trim(cadena_general);
        var genero = $('#genero').val();
        if ($.trim(genero) != '0')
            if (genero == 'm')
                cadena_filtro += " | Genero: FEMENINO";
            else
                cadena_filtro += " | Genero: MASCULINO";

        var edad_mayor = rango_edad_value.val().split(',')[0];
        if ($.trim(edad_mayor) != '' && $.trim(edad_mayor) != '0')
            cadena_filtro += " | Edad Mayor: " + $.trim(edad_mayor);
        var edad_menor = rango_edad_value.val().split(',')[1];
        if ($.trim(edad_menor) != '' && $.trim(edad_menor) != '0')
            cadena_filtro += " | Edad Menor: " + $.trim(edad_menor);

        var imc_mayor = rango_imc_value.val().split(',')[0];
        if ($.trim(imc_mayor) != '' && $.trim(imc_mayor) != '0')
            cadena_filtro += " | IMC Mayor: " + $.trim(imc_mayor);
        var imc_menor = rango_imc_value.val().split(',')[1];
        if ($.trim(imc_menor) != '' && $.trim(imc_menor) != '0')
            cadena_filtro += " | IMC Menor: " + $.trim(imc_menor);
        var pgc_menor = rango_pgc_value.val().split(',')[1];
        if ($.trim(pgc_menor) != '' && $.trim(pgc_menor) != '0')
            cadena_filtro += " | Por Ciento Grasa Corporal Menor: " + $.trim(pgc_menor);
        var pgc_mayor = rango_pgc_value.val().split(',')[0];
        if ($.trim(pgc_mayor) != '' && $.trim(pgc_mayor) != '0')
            cadena_filtro += " | Por Ciento Grasa Corporal Mayor: " + $.trim(pgc_mayor);
        var presion_sistolica_mayor = rango_ps_value.val().split(',')[0];
        if ($.trim(presion_sistolica_mayor) != '' && $.trim(presion_sistolica_mayor) != '0')
            cadena_filtro += " | Presion Sistolica Mayor: " + $.trim(presion_sistolica_mayor);
        var presion_sistolica_menor = rango_ps_value.val().split(',')[1];
        if ($.trim(presion_sistolica_menor) != '' && $.trim(presion_sistolica_menor) != '0')
            cadena_filtro += " | Presion Sistolica Menor: " + $.trim(presion_sistolica_menor);
        var presion_diastolica_menor = rango_pd_value.val().split(',')[1];
        if ($.trim(presion_diastolica_menor) != '' && $.trim(presion_diastolica_menor) != '0')
            cadena_filtro += " | Presion Diastolica Menor: " + $.trim(presion_diastolica_menor);
        var presion_diastolica_mayor = rango_pd_value.val().split(',')[0];
        if ($.trim(presion_diastolica_mayor) != '' && $.trim(presion_diastolica_mayor) != '0')
            cadena_filtro += " | Presion Diatolica Mayor: " + $.trim(presion_diastolica_mayor);
        var glucosa_mayor = rango_glucosa_value.val().split(',')[0];
        if ($.trim(glucosa_mayor) != '' && $.trim(glucosa_mayor) != '0')
            cadena_filtro += " | Glucosa Mayor: " + $.trim(glucosa_mayor);
        var glucosa_menor = rango_glucosa_value.val().split(',')[1];
        if ($.trim(glucosa_menor) != '' && $.trim(glucosa_menor) != '0')
            cadena_filtro += " | Glucosa Menor: " + $.trim(glucosa_menor);
        var colesterol_mayor = rango_colesterol_value.val().split(',')[0];
        if ($.trim(colesterol_mayor) != '' && $.trim(colesterol_mayor) != '0')
            cadena_filtro += " | Colesterol Mayor: " + $.trim(colesterol_mayor);
        var colesterol_menor = rango_colesterol_value.val().split(',')[1];
        if ($.trim(colesterol_menor) != '' && $.trim(colesterol_menor) != '0')
            cadena_filtro += " | Colesterol Menor: " + $.trim(colesterol_menor);

        var dislipidemicos = 0;
        var obesos = 0;
        var hipertensos = 0;
        var diabeticos = 0;
        var sanos = 0;
        var anemicos = 0;

        var localidad = $('#localidad').val();
        if ($.trim(localidad) != '')
            cadena_filtro += " | Localidad: " + $.trim(localidad);

        if ($('#adulto_check').prop('checked')) {
            adulto_check = 1;
            cadena_filtro += " | Adultos";
        }
        if ($('#ninio_check').prop('checked')) {
            ninio_check = 1;
            cadena_filtro += " | Niños";
        }

        if ($('#dislipidemicos').prop('checked')) {
            dislipidemicos = 1;
            cadena_filtro += " | Dislipidemicos";
        }
        if ($('#anemicos').prop('checked')) {
            anemicos = 1;
            cadena_filtro += " | Anemicos";
        }
        if ($('#obesos').prop('checked')) {
            obesos = 1;
            cadena_filtro += " | Obesos";
        }
        if ($('#diabeticos').prop('checked')) {
            diabeticos = 1;
            cadena_filtro += " | Diabeticos";
        }
        if ($('#hipertensos').prop('checked')) {
            hipertensos = 1;
            cadena_filtro += " | Hipertensos";
        }
        if ($('#sanos').prop('checked')) {
            sanos = 1;
            cadena_filtro += " | Sanos";
        }

        $('#form-filter').keypress(function (e) {
            if (e.which == 13) {
                return false;
            }
        });


        data_value = {
            cadena_general: cadena_general,
            genero: genero,
            edad_menor: edad_menor,
            edad_mayor: edad_mayor,
            localidad: localidad,
            ninio_check: ninio_check,
            adulto_check: adulto_check,

            imc_mayor: imc_mayor,
            imc_menor: imc_menor,
            pgc_menor: pgc_menor,
            pgc_mayor: pgc_mayor,
            presion_sistolica_mayor: presion_sistolica_mayor,
            presion_sistolica_menor: presion_sistolica_menor,
            presion_diastolica_menor: presion_diastolica_menor,
            presion_diastolica_mayor: presion_diastolica_mayor,
            glucosa_mayor: glucosa_mayor,
            glucosa_menor: glucosa_menor,
            colesterol_mayor: colesterol_mayor,
            colesterol_menor: colesterol_menor,

            obesos: obesos,
            dislipidemicos: dislipidemicos,
            diabeticos: diabeticos,
            hipertensos: hipertensos,
            sanos: sanos,
            anemicos: anemicos

        }

        if (cadena_filtro != '') {
            $('#resumen_filtro_show').html(cadena_filtro + ' |');
            $('#resumen_filtro').val(cadena_filtro + ' |');
        }
        else {
            $('#resumen_filtro_show').html('');
            $('#resumen_filtro').val('');
        }

        $('#time_query').html('');
        $("#total_consulta").html('');
        $('#loading').removeClass('hidden');
        $.ajax({
            type: "get",
            data: data_value,
            url: "/reporte-keken-generico/",
            dataType: "json",
            success: function (data) {
                var total_consulta = data.data.length;
                clear_table(table_resultado_reporte_keken);
                var id_result = [];

                $.each(data.data, function (i) {
                    id_result.push(data.data[i].id_usuario);
                    data.data[i].table_index = i;
                    table_resultado_reporte_keken
                        .row
                        .add(data.data[i])
                        .draw(false);
                })

                $('#time_query').html('Tiempo de ejecucion: ' + data.time_query);

                if (total_consulta > 0) {
                    $('#pdf-reporte-promocion').prop('disabled', false);
                    $('#pdf-reporte-promocion-medicion').prop('disabled', false);
                    $('#response_filter').val(id_result);

                }
                else {
                    $('#pdf-reporte-promocion').prop('disabled', true);
                    $('#pdf-reporte-promocion-medicion').prop('disabled', true);
                }


                $('#loading').addClass('hidden');
                $('#resultados_reporte_paciente').removeClass('hidden');
                $("#total_consulta").html(total_consulta);
            }
        });
    }

    function print_datos_reporte() {
        var data_value = {};

        var adulto_check = 0;
        var ninio_check = 0;

        var cadena_general = $('#cadena_general').val();
        var genero = $('#genero').val();
        var edad_mayor = $('#edad_mayor').val();
        var edad_menor = $('#edad_menor').val();

        var imc_mayor = $('#imc_mayor').val();
        var imc_menor = $('#imc_menor').val();
        var pgc_menor = $('#pgc_menor').val();
        var pgc_mayor = $('#pgc_mayor').val();
        var presion_sistolica_mayor = $('#presion_sistolica_mayor').val();
        var presion_sistolica_menor = $('#presion_sistolica_menor').val();
        var presion_diastolica_menor = $('#presion_diastolica_menor').val();
        var presion_diastolica_mayor = $('#presion_diastolica_mayor').val();
        var glucosa_mayor = $('#glucosa_mayor').val();
        var glucosa_menor = $('#glucosa_menor').val();
        var colesterol_mayor = $('#colesterol_mayor').val();
        var colesterol_menor = $('#colesterol_menor').val();

        var dislipidemicos = 0;
        var obesos = 0;
        var hipertensos = 0;
        var diabeticos = 0;
        var sanos = 0;
        var anemicos = 0;

        var localidad = $('#localidad').val();

        if ($('#adulto_check').prop('checked'))
            adulto_check = 1;
        if ($('#ninio_check').prop('checked'))
            ninio_check = 1;

        if ($('#dislipidemicos').prop('checked'))
            dislipidemicos = 1;
        if ($('#anemicos').prop('checked'))
            anemicos = 1;
        if ($('#obesos').prop('checked'))
            obesos = 1;
        if ($('#diabeticos').prop('checked'))
            diabeticos = 1;
        if ($('#hipertensos').prop('checked'))
            hipertensos = 1;
        if ($('#sanos').prop('checked'))
            sanos = 1;


        data_value = {
            cadena_general: cadena_general,
            genero: genero,
            edad_menor: edad_menor,
            edad_mayor: edad_mayor,
            localidad: localidad,
            ninio_check: ninio_check,
            adulto_check: adulto_check,

            imc_mayor: imc_mayor,
            imc_menor: imc_menor,
            pgc_menor: pgc_menor,
            pgc_mayor: pgc_mayor,
            presion_sistolica_mayor: presion_sistolica_mayor,
            presion_sistolica_menor: presion_sistolica_menor,
            presion_diastolica_menor: presion_diastolica_menor,
            presion_diastolica_mayor: presion_diastolica_mayor,
            glucosa_mayor: glucosa_mayor,
            glucosa_menor: glucosa_menor,
            colesterol_mayor: colesterol_mayor,
            colesterol_menor: colesterol_menor,

            obesos: obesos,
            dislipidemicos: dislipidemicos,
            diabeticos: diabeticos,
            hipertensos: hipertensos,
            sanos: sanos,
            anemicos: anemicos

        }

        $('#loading').removeClass('hidden');
        $.ajax({
            type: "post",
            data: data_value,
            url: "/generate/pdf/",
            success: function (data) {
                var total_consulta = data;
                // var doc = new jsPDF();
                // doc.fromHTML(data, 15, 15, {
                //     'width': 1000
                // });
                // doc.save('sample-file.pdf');

            }
        });
    }

    function clear_table(table) {
        table
            .clear()
            .draw();
    }


    $(".rangos-mediciones-value").keypress(function (e) {

    });

    $(".rangos-edad-value").keypress(function (e) {
        clear_adulto();
        clear_menor();

        if (e.which == 13) {
            cargar_datos_reporte();
        }
    });


})




