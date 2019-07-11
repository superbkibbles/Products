import React, {Component} from "react";
import {Col, Row} from "react-bootstrap";
import Items from "../product-item";

class Health extends Component
{
	componentWillUnmount() {
		console.log("will ummount")
	}
	componentDidMount() {
		console.log(this.props.search)
	}

	render()
	{
		console.log("you are here")
		console.log("Render");
		return (
			<div>
				<h1>fgd</h1>
				<Row>
				{
					// this.props.cats.map((prod, index) => {
					// 	return (
							<Col s={6} md={6} key={index}>
								<div>
									<Items brand={this.props.cats}
										   img={prod.img} price={prod.price}
										   rate={prod.stars} link={prod.link}
									/>
								</div>
							</Col>
					// 	)
					// })
				}
				</Row>
			</div>
		)
	}
}

export default Health;