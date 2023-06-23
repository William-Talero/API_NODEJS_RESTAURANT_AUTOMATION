import { Schema, model } from "mongoose";

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category:{
    type: String,
    required: true,
  },
  subcategory:{
    type: String,
    required: false,
  },
  subcategory2:{
    type: String,
    required: false,
  },
  tags:{
    type: Array,
    required: true,
  },
  top:{
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image:{
    type: String,
    required: true,
  },
});

//Recibe nombre de la coleccion (Tabla de la BD)  y el esquema
const ProductModel = model("MenuProducts", ProductSchema);

export default ProductModel;
