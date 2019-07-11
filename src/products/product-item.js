import React, {Component} from "react";
import "./product-item.css";
import {Button} from "react-bootstrap";

class Items extends Component
{
	render()
	{
		return (
			<div className="">
				<ul>
					<img className="Product-img" src={this.props.img} alt={this.props.brand}/>
					<p> <strong>Product name</strong>: {this.props.brand}</p>
					<p> <strong>Price</strong>: {this.props.price}£</p>
					<p><strong>Rating</strong>: {this.props.rate}</p>
					<Button variant="warning">
						<a target="_blank" href={this.props.link} rel="noopener noreferrer">BUY</a>
					</Button>
				</ul>
			</div>
		)
	}
}

export default Items;