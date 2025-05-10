"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contact_routes_1 = __importDefault(require("./interfaces/http/routes/contact.routes"));
const database_1 = require("./config/database");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use(contact_routes_1.default);
async function startServer() {
    try {
        await database_1.sequelize.authenticate();
        console.log('Database connection has been established successfully.');
        await database_1.sequelize.sync();
        console.log('Database synchronized successfully.');
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
    catch (error) {
        console.error('Unable to start server:', error);
    }
}
startServer();
//# sourceMappingURL=index.js.map