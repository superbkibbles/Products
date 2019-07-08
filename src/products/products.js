import React, {Component} from "react";
import axios from "axios";
import "./products.css"

class Products extends Component
{
  // iniziling before using
  constructor(props)
    {
        super(props);

        this.state = {
        Products: [],
        items: [],
        search: ""
    }
  }

  componentDidMount()
    {
        axios.get("https://demo8421975.mockable.io/products").then(res => {
            this.setState({items: res.data.products});
            return res;
        }).then(res2=>{
            this.setState({Products: res2.data.products});
        })
    }
    filterList (event)
    {
        this.setState({search: event.target.value})
        var updatedList = this.state.Products;
        updatedList = updatedList.filter((item)=>{
          return item.brand.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
        })
        console.log(this.state.search.length)
        this.setState({items: updatedList});            
        }
  render()
  {
    let arr = [...this.state.items]
    console.log(this.state.items)
    return (
        <div>
            <div className="Product-search">
                <h1>Search Products</h1>
                <label htmlFor="product-search"/>
                <input id="product-search" placeholder="Search..." type="text" onChange={this.filterList.bind(this)}/>
            </div>
            <ul>
            {
            arr.map((prod, index) => {
                return (
                <div className="Product-div" key={index}>
                    <img className="Product-img" src={prod.img} />
                    <p> <strong>Product name</strong>: {prod.brand}</p>
                    <p> <strong>Price</strong>: {prod.price}£</p>
                    <p><strong>Rating</strong>: {prod.stars}</p>
                    <a target="_blank" className="Product-button" href={prod.link}>BUY</a>
                </div>
                )
            })
            }
            </ul>
        </div>
    );
  }
}

export default Products;