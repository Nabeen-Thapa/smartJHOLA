
const reactDom = require("react-router-dom");
const { default: Registration } = require("./views/user-registration");
const { default: AddProductForm } = require("./views/add-product-form");
const App = () => {
    return (<reactDom.BrowserRouter>
      <h1>Hello World</h1>
      <reactDom.Routes>
        <reactDom.Route path="/register" element={<Registration/>}/>
        <reactDom.Route path="/addProduct" element={<AddProductForm/>}/> 
      </reactDom.Routes>
    </reactDom.BrowserRouter>);
    
};

export default App;
