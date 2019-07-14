import React, {Component} from "react";
import axios from "axios";
import {Row, Col, Nav} from "react-bootstrap";
import {Route, Switch, NavLink} from "react-router-dom";

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
			categoryArr: []
		}
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

	clickedCategory(group)
	{
		this.setState({currentpage: group.split(' ').join('')})
	}

	renderSlideBar()
	{
		return(
			<div className="Products-nav">
				{
					this.state.categoryArr.map((res, i) => {
						return (
							<div key={i}>
								<NavLink
									onClick={()=> this.clickedCategory(res)}
									to={{pathname: `/${res.split(' ').join('')}`}}
								>
									{res}
								</NavLink>
							</div>
						)
					})
				}
			</div>
		)
	}

	renderRoutes()
	{
		return (
			<Switch>
				<Route exact path="/" component={Home}/>
				{
					this.state.categoryArr.map((res, i)=>{
						return(
							<Route key={i} exact path={`/${res.split(' ').join('')}`} render={(routeProps) =>
								<Items item={this.state.items}
										 stuff={routeProps} category={res}
								/>}
							/>
						)
					})
				}
			</Switch>
		);
	}

	render()
	{
		return (
			<div>
				<Row>
					<Col md={2}>
						<h1>Categories</h1>
						<br/>
						<Nav>
							{this.renderSlideBar()}
						</Nav>
					</Col>
					<Col md={8}>
						{this.renderRoutes()}
					</Col>
				</Row>
			</div>
		);
	}
}

export default Products;

