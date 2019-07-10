import React, {Component} from "react";
import {Col, Row} from "react-bootstrap";
import Items from "../product-item";

class Health extends Component
{
	componentWillUnmount() {
		console.log("will ummount")
	}
	componentDidMount() {
		console.log("did mount")
	}

	render()
	{
		console.log("Render");
		return (
			<div>
				<Row>
				{
					this.props.cats.map((prod, index) => {
						return (
							<Col s={6} md={6} key={index}>
								<div>
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
			</div>
		)
	}
}

export default Health;