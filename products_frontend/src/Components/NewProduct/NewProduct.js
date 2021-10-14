import React from 'react'
import "./NewProduct.css"
import { Link } from "react-router-dom";
import api from "../../Services/api"

class NewProduct extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            description: this.props?.location?.state?.product?.description ?? "",
            brand: this.props?.location?.state?.product?.brand ?? "",
            price: this.props?.location?.state?.product?.price ?? "",
            image: this.props?.location?.state?.product?.image ?? "",
            id: this.props?.location?.state?.product?.id ?? ""
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.submitToApi = this.submitToApi.bind(this);
    }

    submitToApi(event) {
        event.preventDefault();

        if (this.state.id === "") {
            api
                .post("/products", {
                    description: this.state.description,
                    brand: this.state.brand,
                    price: this.state.price,
                    image: this.state.image,
                })
                .then(response => {
                    window.location = "/"
                })
                .catch(err =>
                    console.error(err)
                )
        } else {
            api
                .patch(`/products/${this.state.id}`, {
                    description: this.state.description,
                    brand: this.state.brand,
                    price: this.state.price,
                    image: this.state.image,
                })
                .then(response => {
                    window.location = "/"
                })
                .catch(err =>
                    console.error(err)
                )
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <>
                <header>
                    <Link className="button" to="/">Back</Link>
                </header>
                <div className="form-wrapper">
                    <form onSubmit={this.submitToApi}>
                        <label htmlFor="desc">Description</label>
                        <input type="text" id="desc" name="description" placeholder="Product description" value={this.state.description} onChange={this.handleInputChange} />

                        <label htmlFor="brand">Brand</label>
                        <input type="text" id="brand" name="brand" placeholder="Product brand" value={this.state.brand} onChange={this.handleInputChange} />

                        <label htmlFor="price">Price</label>
                        <input type="text" id="price" name="price" placeholder="Product price" value={this.state.price} onChange={this.handleInputChange} />

                        <label htmlFor="image">Image</label>
                        <input type="text" id="image" name="image" placeholder="Link to product image" value={this.state.image} onChange={this.handleInputChange} />

                        <input type="submit" value={this.state.id === "" ? "Create" : "Update"} />
                    </form>
                </div>
            </>
        )
    }
}

export default NewProduct
