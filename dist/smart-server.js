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
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json()); // For JSON payloads
app.use(express_1.default.urlencoded({ extended: true })); // For form data (URL-encoded)
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
// Set up session middleware
db_connection_config_1.smartConnection.initialize()
    .then(() => {
    logger_1.default.info("Database connected successfully!");
})
    .catch((error) => {
    logger_1.default.error("Error during Data Source initialization:", error);
});
app.use((0, express_session_1.default)({
    secret: 'yourSecretKey', // Change this to a strong secret key
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: false, // Set to true if using HTTPS
        maxAge: 1000 * 60 * 60 * 24, // Session expiration (1 day)
    },
}));
//routes
app.use("/smartjhola", user_routes_1.default);
app.use("/smartjhola", admin_routes_1.default);
app.use("/smartjhola", common_router_1.default);
app.use("/smartjhola", product_routes_1.default);
const port = process.env.PORT || 5500;
app.listen(port, () => {
    logger_1.default.info(`smart jhola server is running at ${port}`);
});
