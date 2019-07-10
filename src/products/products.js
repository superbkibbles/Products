import React, {Component} from "react";
import axios from "axios";
import {Button, Row, Col, Nav} from "react-bootstrap";
import "./products.css"

import Kitchen from "./Categories/homeKitchen";
import Baby from "./Categories/baby";
import Health from "./Categories/health"
import Sport from "./Categories/health"


class Products extends Component
{
	// iniziling before using
	constructor(props)
	{
		super(props);

		this.state = {
			Products: [],
			items: [],
			search: "",
			page: ""
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

	// rendering the categories and seperating it
	CheckingCategory()
	{
		let baby = [];
		let kitchen = [];
		let health = [];
		let sport = [];
		this.state.items.map((cat) => {
			if(cat.bsr_category == "Home & Kitchen")
			{
				kitchen.push(cat);
			}
			else if (cat.bsr_category == "Health & Personal Care")
			{
				health.push(cat)
			}
			else if (cat.bsr_category == "Sports & Outdoors")
			{
				sport.push(cat);
			}
			else if (cat.bsr_category == "Baby Products")
			{
				baby.push(cat)
			}
		})
		return {
			health,
			kitchen,
			baby,
			sport
		}
	}

	changePage(newPage)
	{
		this.setState({page: newPage});
	}

	CheckPage()
	{
		if(this.state.page == "health")
		{
			return	<Health cats={this.CheckingCategory().health}/>;

		}
		else if(this.state.page == "kitchen")
		{
			return <Kitchen cats={this.CheckingCategory().kitchen}/>;

		}
		else if (this.state.page == "sport")
		{
			return <Sport cats={this.CheckingCategory().sport}/>;

		}
		else if (this.state.page == "baby")
		{
			return <Baby cats={this.CheckingCategory().baby}/>;
		}

	}


	render()
	{
		let arr = [...this.state.items];
		console.log(this.CheckingCategory())
		return (
			<div>
				<Row>
					<Col md={2}>
						<h1>Categories</h1>
						<br/>
						<br/>
						<br/>
						<Nav>
							<li onClick={()=> this.changePage("health")}>health</li>
							<li onClick={()=> this.changePage("kitchen")}>Kitchen</li>
							<li onClick={()=> this.changePage("sport")}>sport</li>
							<li onClick={()=> this.changePage("baby")}>baby</li>
						</Nav>
					</Col>
					<Col>
						<div className="Product-search">
							<h1>Search Products</h1>
							<label htmlFor="product-search"/>
							<input id="product-search" placeholder="Search..." type="text" onChange={this.filterList.bind(this)}/>
						</div>
						<br/>
						{this.CheckPage()}
						{/*<Health cats={this.CheckingCategory().health}/>*/}
						{/*<Kitchen cats={this.CheckingCategory().kitchen}/>*/}
						{/*<Baby cats={this.CheckingCategory().baby}/>*/}
						{/*<Sport cats={this.CheckingCategory().sport}/>*/}
					</Col>
				</Row>
			</div>
		);
	}
}

export default Products;


