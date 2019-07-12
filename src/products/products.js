import React, {Component} from "react";
import axios from "axios";
import {Row, Col, Nav, Button} from "react-bootstrap";
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
			items: [],
			filterProducts:[],
			filterProductscpy:[],
			categoryArr: [],
			search: "",
			currentpage: "",
			urlQuery: ""
		}
	}
	componentWillMount() {
		// console.log("will mount");
	}

	componentDidMount()
	{
		axios.get("https://demo8421975.mockable.io/products").then(res=>{
			let resultCategoriesArray = [...new Set(res.data.products.map((data, i, arr) => data.bsr_category))];
			this.setState({categoryArr: [...resultCategoriesArray]})
			return res.data.products;
		}).then(res2=>{
			this.setState({Products: res2});
			return res2;
		}).then(res3=>{
			this.setState({items: res3})
		})
	}

	// filtering the items on user input
	filterList (event)
	{
		this.setState({search: event.target.value})
		let updatedList = this.state.Products;

		// updatedList = updatedList.filter((item)=>{
		// 	return item.brand.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
		// })
		// this.setState({items: updatedList});

		let query = `/search=${event.target.value}`
		this.setState({urlQuery: query})
	}

	clickedCategory(group)
	{
		// this.setState({currentPage: group})
		let item = this.state.Products.filter(res => res.bsr_category === group);
		this.setState({filterProducts: item});
		this.setState({filterProductscpy: item});
		this.setState({currentpage: group.split(' ').join('')})
	}

	changeQuery(va)
	{
		va.preventDefault();
		let updatedList = this.state.Products;

		updatedList = updatedList.filter((item)=>{
			return item.brand.toLowerCase().search(this.state.search.toLowerCase()) !== -1;
		})
		this.setState({items: updatedList});
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
									this.state.categoryArr.map((res, i) => {
										return (
											<div key={i}>
												<Link
													onClick={()=> this.clickedCategory(res)}
													to={{pathname: `/${res.split(' ').join('')}`, search:`${this.state.urlQuery}`}} >
													{res}
												</Link>
											</div>
										)
									})
								}
							</div>
						</Nav>
					</Col>
					<Col md={8}>
						<div className="Product-search">
							<h1>Search Products</h1>
							<form onSubmit={this.changeQuery.bind(this)}>
								<label htmlFor="product-search"/>
								<input id="product-search" placeholder="Search..." type="text"
										 value={this.state.search}
										 onChange={this.filterList.bind(this)}/>
								<Button onClick={(va)=> this.changeQuery(va)}>search</Button>
							</form>
						</div>
						<br/>
						<Route exact path="/" component={Home}/>
						{
							this.state.categoryArr.map((res, i)=>{
								return(
									//send the items
									<Route key={i} exact path={`/${res.split(' ').join('')}`} render={(routeProps) =>
										<Items item={this.state.items}
												 search={this.state.search}
												 stuff={routeProps} category={res}
										/>}
									/>
								)
							})
						}
					</Col>
				</Row>
			</div>
		);
	}
}

export default Products;

