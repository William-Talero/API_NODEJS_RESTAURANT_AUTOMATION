import { Schema, model } from "mongoose";

const ItemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

//Recibe nombre de la coleccion (Tabla de la BD)  y el esquema
const ItemModel = model("Item", ItemSchema);

export default ItemModel;
