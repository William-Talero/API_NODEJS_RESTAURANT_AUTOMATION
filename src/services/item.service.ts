import { Car } from "../interfaces/car.interface";
import ItemModel from "../models/item";

const createItem = (item: Car) => {
    const newItem = new ItemModel(item);
    return newItem.save();
}

const getItems = () => {
    return ItemModel.find();
}

const getItem = (id: string) => {
    const newItem = ItemModel.findById(id);
    return newItem;
}

const updateItem = (id: string, item: Car) => {
    const newItem = ItemModel.findById(id);
    return newItem.updateOne(item);
}

const deleteItem = (id: string) => {
    const newItem = ItemModel.findById(id);
    return newItem.deleteOne();
}

export default { createItem, getItems, getItem, updateItem, deleteItem };