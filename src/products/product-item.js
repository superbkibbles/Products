import React, {Component} from "react";
import {createBrowserHistory} from "history";
import {Button} from "react-bootstrap";

import "./product-item.css";

const history = createBrowserHistory();

class Items extends Component
{
	constructor(props)
	{
		super(props);

		this.state = {
			search: this.props.stuff.location.search.split("").splice(8).join(""),
			input: "",
			items: this.props.item,
			currentCategory: this.props.category.split(' ').join('')
		}
	}

	// Get Each Item
	GetItem()
	{
		let arr = this.props.item;
		let items = arr.filter(res2 => res2.bsr_category.split(' ').join('') === this.state.currentCategory);
		let item = items.filter((item)=>{
			return item.brand.toLowerCase().search(this.state.search.toLowerCase()) !== -1;
		})
		return item;
	}

	filterList (event)
	{
		this.setState({input: event.target.value});
	}

	changeQuery(event) {
		this.setState({search: this.state.input.toString()});

		event.preventDefault();
		history.push({
			pathname: this.state.currentCategory,
			search: `?search=${this.state.input}`
		})
		this.setState({input: ""});
	}


	renderSearch()
	{
		return (
			<div className="Product-search">
				<h1>Search Products</h1>
				<form onSubmit={this.changeQuery.bind(this)}>
					<label htmlFor="product-search"/>
					<input id="product-search" placeholder="Search..." type="text"
							 value={this.state.input}
							 onChange={this.filterList.bind(this)}
					/>
				</form>
				<p className="Product-item-hide">you are searching for {this.state.search}</p>
			</div>
		)
	}

	renderItem()
	{
		return(
			<ul>
				{
					this.GetItem().map((data, i)=>{
						return (
							<div key={i}>
								<img className="Product-img" src={data.img} alt={data.brand}/>
								<p> <strong>Product name</strong>: {data.brand}</p>
								<p> <strong>Price</strong>: {data.price}£</p>
								<p><strong>Rating</strong>: {data.rate}</p>
								<Button variant="warning">
									<a target="_blank" href={data.link} rel="noopener noreferrer">BUY</a>
								</Button>
							</div>
						)
					})
				}
			</ul>
		)
	}

	render()
	{
		return (
			<div>
				{this.renderSearch()}
				{this.renderItem()}
			</div>
		)
	}
}

export default Items;