import React from "react";
import "./Card.css"
import { Link } from "react-router-dom";
import api from "../../Services/api";

class Card extends React.Component {
    constructor() {
        super()
        this.deleteProduct = this.deleteProduct.bind(this)
    }

    deleteProduct() {
        api
            .delete(`/products/${this.props.product.id}`)
            .then(response => {
                window.location = "/"
            })
            .catch(err =>
                console.error(err)
            )
    }

    render() {
        return (
            <div className="el-wrapper">
                <div className="box-up">
                    <img className="img" src={this.props.product.image} alt="" />
                    <div className="img-info">
                        <div className="info-inner">
                            <span className="p-name">{this.props.product.description}</span>
                            <span className="p-company">{this.props.product.brand}</span>
                            <button className="p-company" onClick={this.deleteProduct}>X</button>
                        </div>
                    </div>
                </div>

                <div className="box-down">
                    <div className="h-bg">
                        <div className="h-bg-inner"></div>
                    </div>

                    <Link className="cart" to={{
                        pathname: "/NewProduct",
                        state: {
                            product: {
                                id: this.props.product.id,
                                description: this.props.product.description,
                                image: this.props.product.image,
                                brand: this.props.product.brand,
                                price: this.props.product.price
                            }
                        }
                    }}>
                        <span className="price">R${this.props.product.price}</span>
                        <span className="add-to-cart">
                            <span className="txt">Edit</span>
                        </span>
                    </Link>
                </div>
            </div>
        )
    }
}

export default Card;