import React, {Component} from "react";
import "./app.css";
import Products from "./products/products.js"

class App extends Component
{
    render()
    {
        return (
            <div>
                <Products/>
            </div>
        );
    }
}

export default App;