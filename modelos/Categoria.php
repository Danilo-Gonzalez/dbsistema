<?php
    //Incluimos inicialmente la conexion a la base de datos
    require "../config/Conexion.php";

  Class Categoria{
    //Implementacion del constructor
    public function __construct(){

    }
    //Implementacion de un metodo para insertar registros
    public function insertar($nombre,$descripcion){
        $sql="INSERT INTO categoria (nombre,descripcion,condicion) VALUES ('$nombre','$descripcion','1')";
        return ejecutarConsulta($sql);
    }
    //Implementacion de un metodo para editar registros
    public function editar($idcategoria,$nombre,$descripcion){
        $sql="UPDATE categoria SET nombre='$nombre',descripcion='$descripcion' WHERE idcategoria='$idcategoria'";
        return ejecutarConsulta($sql);
    }
    //Implementacion de metodo para desactivar categorias
    public function desactivar($idcategoria){
        $sql="UPDATE categoria SET condicion='0' WHERE idcategoria='$idcategoria'";
        return ejecutarConsulta($sql);
    }
    //Implementacion de metodo para activar categorias
    public function activar($idcategoria){
        $sql="UPDATE categoria SET condicion='1' WHERE idcategoria='$idcategoria'";
        return ejecutarConsulta($sql);
    }
    //Implementacion de un metodo para mostrar los datos de un registro a modificar
    public function mostrar($idcategoria){
        $sql="SELECT * FROM categoria WHERE idcategoria='$idcategoria'";
        return ejecutarConsultaSimpleFila($sql);
    }
    //Implementacion de metodo para listar registros
    public function listar(){
        $sql="SELECT * FROM  categoria";
        return ejecutarConsulta($sql); 
    }
  }    
?>