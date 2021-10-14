import React from "react";
import api from "../../Services/api";
import Card from "../Card/Card";
import "./Product.css"
import { Link } from "react-router-dom";

class Product extends React.Component {

    constructor() {
        super();
        this.state = {
            products: [],
            productsDidLoad: false
        }
    }

    setProducts(products) {
        this.setState({
            products: products.data,
            productsDidLoad: true
        })
    }

    componentDidMount() {
        api
            .get("/products")
            .then(response => this.setProducts(response))
            .catch((err) => {
                console.error(err)
            })
    }

    render() {
        return (
            <>
                <header>
                    <Link className="button" to="/NewProduct">New Product</Link>
                </header>

                {!this.state.productsDidLoad ?
                    <div>Loading...</div> :
                    this.state.products.length === 0 ?
                    <div>No products</div> :
                    <div className="row">
                        {this.state.products.map(p => {
                            return <Card key={p.id} product={p} />
                        })}
                    </div>
                }
            </>
        )
    }
}

export default Product;