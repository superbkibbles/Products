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
			items: [],
			filterProducts:[],
			filterProductscpy:[],
			categoryArr: [],
			search: "",
			currentpage: ""
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
		// this.setState({search: event.target.value})
		// let updatedList = this.state.Products;
		//
		// updatedList = updatedList.filter((item)=>{
		// 	return item.brand.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
		// })
		// this.setState({items: updatedList});
		this.setState({search: event.target.value})
		let updatedList = this.state.Products;

		updatedList = updatedList.filter((item)=>{
			return item.brand.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
		})
		this.setState({items: updatedList});
	}

	clickedCategory(group)
	{
		// this.setState({currentPage: group})
		let item = this.state.Products.filter(res => res.bsr_category === group);
		this.setState({filterProducts: item});
		this.setState({filterProductscpy: item});
		this.setState({currentpage: group.split(' ').join('')})
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
													to={`/${res.split(' ').join('')}`} >
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
							<label htmlFor="product-search"/>
							<input id="product-search" placeholder="Search..." type="text"
									 onChange={this.filterList.bind(this)}/>
						</div>
						<br/>
							{/*{*/}
							{/*	this.state.filterProducts.map((data, i)=>{*/}
							{/*		return (*/}
							{/*			<Switch key={i}>*/}
							{/*				{	console.log(this.state.currentpage ==data.bsr_category.split(' ').join(''))}*/}
							{/*				{console.log(data.bsr_category.split(' ').join(''))}*/}
							{/*				<Route exact path={`/cates/${this.state.currentpage}`} render={(routeProps)=>*/}
							{/*					<Items brand={data.brand} img={data.img} price={data.price}*/}
							{/*							 rate={data.stars} link={data.link}*/}
							{/*							 search={this.state.search}*/}
							{/*							 staff={routeProps}*/}
							{/*					/>}*/}
							{/*				/>*/}
							{/*			 </Switch>*/}
							{/*		)}*/}
							{/*	)*/}
							{/*}*/}
						<Route exact path="/" component={Home}/>
						{
							this.state.categoryArr.map((res, i)=>{
								return(
									//send the items
									<Route key={i} exact path={`/${res.split(' ').join('')}`} render={() =>
										<Items item={this.state.items} search={this.state.search} category={res}/>}
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

// to={{pathname: res.replace(/\s/g, ''), search:`?search=${this.state.search}`}} >
