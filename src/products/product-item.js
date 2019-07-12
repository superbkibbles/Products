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
			search: this.props.search,
			products: [],
			items: this.props.item,
			currentCategory: this.props.category.split(' ').join('')
		}
	}

	componentWillUpdate(nextProps, nextState, nextContext) {

	}

	componentWillMount() {
		// this.setState({items: this.props.item});
	}

	componentDidMount()
	{
		// this.setState({items: this.props.item})
		// axios.get("https://demo8421975.mockable.io/products").then(res=>{
		// 	let items = res.data.products.filter(res2 => res2.bsr_category.split(' ').join('') === this.state.currentCategory);
		// 	this.setState({products: items})
		// 	return res.data.products;
		// }).then((products)=> {
		// 	let items = products.filter(res2 => res2.bsr_category.split(' ').join('') === this.state.currentCategory);
		// 	this.setState({items: items})
		// })
		// this.setState({items: this.prop.item})
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
	}

	render()
	{
		let arr = this.props.item
		let items = arr.filter(res2 => res2.bsr_category.split(' ').join('') === this.state.currentCategory);
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