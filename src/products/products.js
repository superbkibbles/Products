import React, {Component} from "react";
import axios from "axios";
import {Row, Col, Nav} from "react-bootstrap";
import {Route, Switch, NavLink} from "react-router-dom";
import { connect } from "react-redux"

import "./products.css"
import Items from "./product-item";
import Home from "./home"
import * as Actionstypes from "../store/actions"

class Products extends Component
{
	constructor(props)
	{
		super(props);

		this.state = {
			categoryArr: []
		}
	}

	componentDidMount()
	{
		axios.get("https://demo8421975.mockable.io/products").then(res=>{
			let resultCategoriesArray = [...new Set(res.data.products.map((data, i, arr) => data.bsr_category))];
			this.setState({categoryArr: [...resultCategoriesArray]})
			return res.data.products;
		}).then(data => {
			this.props.OnFetch(data)
		})
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
								<Items item={this.props.Products}
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

const mapStateToProps = state => {
	return{
		Products: state.Products
	}
}

const mapDispatchToProps = dispatch=>{
	return{
		OnFetch: (data)=> dispatch({type: Actionstypes.FETCH, value: data})
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);

