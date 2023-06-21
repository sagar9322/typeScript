"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
var todoList = [
    { id: 1, text: "Buy groceries" },
    { id: 2, text: "Walk the dog" },
    { id: 3, text: "Clean the house" },
];
// Get all todo items
app.get("/api/todo", function (req, res) {
    res.json(todoList);
});
// Add a new todo item
app.post("/api/todo", function (req, res) {
    var _a = req.body, id = _a.id, text = _a.text;
    if (!id || !text) {
        return res.status(400).json({ message: "Invalid request body" });
    }
    var newItem = { id: id, text: text };
    todoList.push(newItem);
    res.status(201).json({ message: "Todo item added successfully", item: newItem });
});
// Delete a todo item
app.post("/api/todo/delete", function (req, res) {
    var id = req.body.id;
    if (!id) {
        return res.status(400).json({ message: "Invalid request body" });
    }
    var index = todoList.findIndex(function (item) { return item.id === id; });
    if (index === -1) {
        return res.status(404).json({ message: "Item not found" });
    }
    var deletedItem = todoList.splice(index, 1)[0];
    res.json({ message: "Todo item deleted successfully", item: deletedItem });
});
// Edit a todo item
app.post("/api/todo/edit", function (req, res) {
    var _a = req.body, id = _a.id, newText = _a.newText;
    if (!id || !newText) {
        return res.status(400).json({ message: "Invalid request body" });
    }
    var index = todoList.findIndex(function (item) { return item.id === id; });
    if (index === -1) {
        return res.status(404).json({ message: "Item not found" });
    }
    todoList[index].text = newText;
    res.json({ message: "Todo item edited successfully", item: todoList[index] });
});
var port = 3000;
app.listen(port, function () {
    console.log("Server is running on port ".concat(port));
});
