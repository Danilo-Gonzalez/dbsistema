var tabla;
//Funcion que se ejecutara al inicio
function init(){
    mostrarform(false);
    listar();

    $("#formulario").on("submit",function(e){
        guardaryeditar(e);
    })
}
//Funcion limpiar
function limpiar(){
    $("#idcategoria").val("");
    $("#nombre").val("");
    $("#descripcion").val("");
}
//Funcion mostrar formulario
function mostrarform(flag){
    limpiar();
    if(flag){
        $("#listadoregistros").hide();
        $("#formularioregistros").show();
        $("#btnGuardar").prop("disabled",false);
    }else{
        $("#listadoregistros").show();
        $("#formularioregistros").hide();
    }
}
//Cancelar form (ocultar un formulario)
function cancelarform(){
    limpiar();
    mostrarform(false);
}
//listar
function listar(){
    tabla=$("#tbllistado").dataTable(
    {
        "aProcessing": true, //Activamos el procesamiento del datatables
        "aServerSide": true, //Paginacion y filtrado realizados por el servidor
        dom: 'Bfrtip',  //Definimos los elementos del control de la tabla
        buttons:[
                'copyHtml5',
                'excelHtml5',
                'csvHtml5',
                'pdf'
                ],
        "ajax":{
                url: '../ajax/categoria.php?op=listar',
                type: "get",
                datatype: "json",
                error: function(e){
                    console.log(e.responseText);
                    }
                },
        "bDestroy": true,
        "iDisplayLength": 5, //Paginacion
        "order": [[0,"desc"]] //ordenar (columna,fila)
    }).DataTable();
}
//Funcion para guardar o editar
function guardaryeditar(e){
    e.preventDefault(); //No se activara la accion predeterminada del evento
    $("#btnGuardar").prop("disabled",true);
    var formData = new FormData($("#formulario")[0]);

    $.ajax({
        url: "../ajax/categoria.php?op=guardaryeditar",
        type: "POST",
        data: formData,
        contentType: false,
        processData: false,

        success: function(datos){
            bootbox.alert(datos);
            mostrarform(false);
            tabla.ajax.reload();
        } 
    });
    limpiar();
}
function mostrar(idcategoria){
    $.post("../ajax/categoria.php?op=mostrar",{idcategoria : idcategoria}, function(data, status){
        data = JSON.parse(data);
        mostrarform(true);

        $("#nombre").val(data.nombre);
        $("#descripcion").val(data.descripcion);
        $("#idcategoria").val(data.idcategoria);
    })
}
//Funcion desactivar registros(Eliminar)
function desactivar(idcategoria){
    bootbox.confirm("Esta seguro de desactivar la Categoria?", function(result){
        if(result){
            $.post("../ajax/categoria.php?op=desactivar", {idcategoria : idcategoria}, function(e){
                bootbox.alert(e);
                tabla.ajax.reload();
            });

        }
    })
}
//Funcion activar registros
function activar(idcategoria){
    bootbox.confirm("Esta seguro de activar la Categoria?", function(result){
        if(result){
            $.post("../ajax/categoria.php?op=activar", {idcategoria : idcategoria}, function(e){
                bootbox.alert(e);
                tabla.ajax.reload();
            });

        }
    })
}

init();
        