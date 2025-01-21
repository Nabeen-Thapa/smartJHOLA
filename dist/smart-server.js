"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = __importDefault(require("./common/utils/logger"));
const user_routes_1 = __importDefault(require("./users/routes/user-routes"));
const db_connection_config_1 = require("./common/db/db-connection-config");
const admin_routes_1 = __importDefault(require("./admin/routes/admin-routes"));
const common_router_1 = __importDefault(require("./common/routes/common-router"));
const product_routes_1 = __importDefault(require("./products/routers/product-routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json()); // For JSON payloads
app.use(express_1.default.urlencoded({ extended: true })); // For form data (URL-encoded)
db_connection_config_1.smartConnection.initialize()
    .then(() => {
    logger_1.default.info("Database connected successfully!");
})
    .catch((error) => {
    logger_1.default.error("Error during Data Source initialization:", error);
});
//routes
app.use("/", user_routes_1.default);
app.use("/", admin_routes_1.default);
app.use("/", common_router_1.default);
app.use("/", product_routes_1.default);
const port = process.env.PORT || 5500;
app.listen(port, () => {
    logger_1.default.info(`smart jhola server is running at ${port}`);
});
