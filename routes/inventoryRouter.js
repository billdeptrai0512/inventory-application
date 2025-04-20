const { Router } = require("express");
const inventoryController = require("../controllers/inventoryController");
const inventoryRouter = Router();

inventoryRouter.get("/", inventoryController.HomePage);

inventoryRouter.get("/categories", inventoryController.Categories);
inventoryRouter.get("/categories/:categoriesId", inventoryController.getCategoriesID);

inventoryRouter.get("/all-items", inventoryController.Items);
inventoryRouter.get("/all-items/:categoriesId", inventoryController.getAllItemInCategory);

inventoryRouter.get("/create", inventoryController.GetNewItemForm);
inventoryRouter.post("/create", inventoryController.PostNewItem);

inventoryRouter.get("/delete/:id", inventoryController.DeleteItem);
// inventoryRouter.get("/delete-all", inventoryController.DeleteAllMessage);

inventoryRouter.get("/update/:id", inventoryController.GetUpdateItemForm);
inventoryRouter.post("/update/:id", inventoryController.PostUpdateItemForm);

module.exports = inventoryRouter;