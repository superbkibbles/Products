import React, {Component} from "react";
import "./product-item.css";
import {Button} from "react-bootstrap";
import axios from "axios";

class Items extends Component
{
	constructor(props)
	{
		super(props);

		this.state = {
			search: this.props.stuff.location.search.split("").splice(9).join(""),
			products: [],
			items: this.props.item,
			currentCategory: this.props.category.split(' ').join('')
		}
	}

	componentWillUpdate(nextProps, nextState, nextContext) {

	}

	componentWillMount() {
		// this.setState({items: this.props.item});

		// let deleted = this.props.stuff.location.search.split("").splice(9).join("")
		// console.log(deleted);
		// this.setState({search: deleted})
		// console.log("seacrcg", this.state.search)
	}

	componentDidMount()
	{

	}

	componentDidUpdate(prevProps, prevState, snapshot) {
	}

	GetItem()
	{
		let arr = this.props.item;
		let items = arr.filter(res2 => res2.bsr_category.split(' ').join('') === this.state.currentCategory);
		return items;
	}

	render()
	{
		let items = this.GetItem().filter((item)=>{
		return item.brand.toLowerCase().search(this.state.search.toLowerCase()) !== -1;
	})
		console.log(items)
		return (
			<div className="">
				<ul>
					{
						items.map((data, i)=>{
							return (
								<div key={i}>
									<img className="Product-img" src={data.img}/>
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
			</div>
		)
	}
}

export default Items;