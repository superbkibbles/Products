import React, {Component} from "react";
import Items from "./product-item";
import axios from "axios";
import {Button, Row, Col, Nav} from "react-bootstrap";
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
	// filtering the items with the input
	filterList (event)
	{
		this.setState({search: event.target.value})
		var updatedList = this.state.Products;
		updatedList = updatedList.filter((item)=>{
			return item.brand.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
		})
		this.setState({items: updatedList});
	}

	// changing
	toKitchen(e)
	{
		let HomeKitchen = [];
		let arr = [...this.state.Products];
		arr.map(pre => {
			switch(pre.bsr_category)
			{
				case "Home & Kitchen":
					HomeKitchen.push(pre)
					break;
			}
		})
		this.setState({items: HomeKitchen});
	}
	toSport(e)
	{
		let selected = [];
		let arr = [...this.state.Products];
		arr.map(pre => {
			switch(pre.bsr_category)
			{
				case "Sports & Outdoors":
					selected.push(pre)
					break;
			}
		})
		this.setState({items: selected});
	}
	toHealth(e)
	{
		let selected = [];
		let arr = [...this.state.Products];
		arr.map(pre => {
			switch(pre.bsr_category)
			{
				case "Health & Personal Care":
					selected.push(pre)
					break;
			}
		})
		this.setState({items: selected});
	}
	toBaby(e)
	{
		let selected = [];
		let arr = [...this.state.Products];
		arr.map(pre => {
			switch(pre.bsr_category)
			{
				case "Baby Products":
					selected.push(pre)
					break;
			}
		})
		this.setState({items: selected});
	}

	render()
	{
		let arr = [...this.state.items];
		let categories= [];
		arr.map((cat) => {
			if(!categories.includes(cat.bsr_category))
			{
				categories.push(cat.bsr_category)
			}
		})
		return (
			<div>
				<Row>
					<Col md={2}>
						<h1>Categories</h1>
						<br/>
						<br/>
						<br/>
						<Nav className="flex-column">
							<div>
								<Button onClick={this.toKitchen.bind(this)}>Home And Kitchen</Button>
							</div>
							<br/>
							<div>
								<Button onClick={this.toSport.bind(this)}>Sports</Button>
							</div>
							<br/>
							<div>
								<Button onClick={this.toHealth.bind(this)}>Health</Button>
							</div>
							<br/>
							<div>
								<Button onClick={this.toBaby.bind(this)}>Baby Products</Button>
							</div>
						</Nav>
					</Col>
					<Col>
						<div className="Product-search">
							<h1>Search Products</h1>
							<label htmlFor="product-search"/>
							<input id="product-search" placeholder="Search..." type="text" onChange={this.filterList.bind(this)}/>
						</div>
						<br/>
						<Row>
							{
								arr.map((prod, index) => {
									return (
										<Col s={6} md={4}>
											<div key={index}>
												<Items brand={prod.brand}
													   img={prod.img} price={prod.price}
													   rate={prod.stars} link={prod.link}
												/>
											</div>
										</Col>
									)
								})
							}
						</Row>
					</Col>
				</Row>
			</div>
		);
	}
}

export default Products;


