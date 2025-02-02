
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const user_registration_1 = __importDefault(require("./views/user-registration"));
const add_product_form_1 = __importDefault(require("./views/add-product-form")); // Corrected component name
const App = () => {
    return (<react_router_dom_1.BrowserRouter>
      <react_router_dom_1.Routes>
        <react_router_dom_1.Route path="/register" element={<user_registration_1.default />}/>
        <react_router_dom_1.Route path="/addProduct" element={<add_product_form_1.default />}/>  {/* Corrected component name */}
      </react_router_dom_1.Routes>
    </react_router_dom_1.BrowserRouter>);
};
exports.default = App;
