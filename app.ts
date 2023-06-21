import express, { Request, Response } from "express";
import bodyparser from "body-parser";

const app = express();
app.use(express.json());
app.use(bodyparser.json());

interface TodoItem {
  id: number;
  text: string;
}

let todoList: TodoItem[] = [
  { id: 1, text: "Buy groceries" },
  { id: 2, text: "Walk the dog" },
  { id: 3, text: "Clean the house" },
];

// Get all todo items
app.get("/api/todo", (req: Request, res: Response) => {
  res.json(todoList);
});

// Add a new todo item
app.post("/api/todo", (req: Request, res: Response) => {
  const { id, text }: { id: number; text: string } = req.body;

  if (!id || !text) {
    return res.status(400).json({ message: "Invalid request body" });
  }

  const newItem: TodoItem = { id, text };
  todoList.push(newItem);

  res.status(201).json({ message: "Todo item added successfully", item: newItem });
});

// Delete a todo item
app.post("/api/todo/delete", (req: Request, res: Response) => {
  const { id }: { id: number } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Invalid request body" });
  }

  const index = todoList.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Item not found" });
  }

  const deletedItem = todoList.splice(index, 1)[0];
  res.json({ message: "Todo item deleted successfully", item: deletedItem });
});

// Edit a todo item
app.post("/api/todo/edit", (req: Request, res: Response) => {
  const { id, newText }: { id: number; newText: string } = req.body;

  if (!id || !newText) {
    return res.status(400).json({ message: "Invalid request body" });
  }

  const index = todoList.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Item not found" });
  }

  todoList[index].text = newText;

  res.json({ message: "Todo item edited successfully", item: todoList[index] });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});