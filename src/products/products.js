import React, {Component} from "react";
import axios from "axios";
import {Row, Col, Nav} from "react-bootstrap";
import {Route, Switch, NavLink, Link} from "react-router-dom";

import "./products.css"
import Items from "./product-item";
import Home from "./home"


class Products extends Component
{
	// iniziling before using
	constructor(props)
	{
		super(props);

		this.state = {
			Products: [],
			filterProducts:[],
			filterProductscpy:[],
			search: "",
			currentpage: ""
		}
	}
	componentWillMount() {
		console.log("will mount");
	}

	componentDidMount()
	{
		axios.get("https://demo8421975.mockable.io/products").then(res2=>{
			this.setState({Products: res2.data.products});
		})
		console.log("did mount")
	}

	// filtering the items with the input
	filterList (event)
	{
		this.setState({search: event.target.value})
		let updatedList = this.state.filterProductscpy;

		updatedList = updatedList.filter((item)=>{
			return item.brand.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
		})
		this.setState({filterProducts: updatedList});
	}

	// Getting Categories Names
	GetCategoriesNames()
	{
		let products = this.state.Products;
		let resultCategoriesArray = [...new Set(products.map((data, i, arr) => data.bsr_category))];

		return resultCategoriesArray;
	}

	// checking for clicked category
	clickedCategory(group)
	{
		// this.setState({currentPage: group})
		let item = this.state.Products.filter(res => res.bsr_category === group);
		this.setState({filterProducts: item});
		this.setState({filterProductscpy: item});
		this.setState({currentpage: group.replace(/\s/g, '')})

		console.log("windowed", window.location.pathname);
		console.log(this.state.currentpage);
	}

	render()
	{
		return (
			<div>
				<Row>
					<Col md={2}>
						<h1>Categories</h1>
						<br/>
						<br/>
						<br/>
						<Nav>
							<div className="Products-nav">
								{
									this.GetCategoriesNames().map((res, i) => {
										return <Link
											key={i}
											onClick={()=> this.clickedCategory(res)}
											to={res} >
											{res}
										</Link>
									})
								}
							</div>
						</Nav>
					</Col>
					<Col md={8}>
						<div className="Product-search">
							<h1>Search Products</h1>
							<label htmlFor="product-search"/>
							<input id="product-search" placeholder="Search..." type="text"
									 onChange={this.filterList.bind(this)}/>
						</div>
						<br/>
						<Route exact path="/" component={Home} />
							{
								this.state.filterProducts.map((data, i)=>{
									return (
										<Switch key={i}>
											<Route exact path={this.state.filterProductscpy.bsr_category} render={(routeProps)=>
												<Items brand={data.brand} img={data.img} price={data.price}
														 rate={data.stars} link={data.link}
														 search={this.state.search}
														 staff={routeProps}
												/>}
											/>
										 </Switch>
									)}
								)
							}
					</Col>
				</Row>
			</div>
		);
	}
}

export default Products;

// to={{pathname: res.replace(/\s/g, ''), search:`?search=${this.state.search}`}} >
