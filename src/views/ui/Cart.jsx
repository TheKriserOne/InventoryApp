import React, {useContext, useEffect, useState} from "react";
import {Badge, Button, Card, CardBody, CardHeader, CardImg, Col, Container, Row,} from "reactstrap";
import {useNavigate} from "react-router-dom";
import {CartContext} from "../../contexts/CartContext.jsx";
import {get, getDatabase, ref} from "firebase/database";

const Cart = () => {
    const {cart, handleRemoveFromCart} = useContext(CartContext);
    const navigate = useNavigate();
    const [cartDetails, setCartDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const db = getDatabase()

    // Fetch item details for each ID in cartItems
    useEffect(() => {
        const fetchCartDetails = async () => {
            setLoading(true);

                const itemDetails = await Promise.allSettled(
                    cart.map(async (itemId) => {
                        const dbRef = ref(db, `/auto_parts/${itemId}`);
                        const snapshot = await get(dbRef);

                        if (!snapshot.exists()) {
                            handleRemoveFromCart(itemId);
                            throw new Error(`Item ${itemId} not found`);
                        }

                        return snapshot.val();
                    })
                );
                const validItemDetails = itemDetails
                    .filter((result) => result.status === "fulfilled")
                    .map((result) => result.value);
                setCartDetails(validItemDetails);
                setLoading(false);
        };
        fetchCartDetails();
    }, [cart]);

    const calculateTotal = () => {
        return cartDetails.reduce((acc, cartDetail) => acc + cartDetail.price, 0);
    };

    return (<Container className="mt-5 flex-lg-column">
            <h1 className="text-center mb-4">
                Your Cart
            </h1>
                    <Card className="sticky-top w-100" style={{top: "20px"}}>
                        <CardBody>
                            <h4 className="text-center">Order Summary</h4>
                            <div className="d-flex justify-content-between">
                                <span>Total Items:</span>
                                <span>{cart.length}</span>
                            </div>
                            <div className="d-flex justify-content-between">
                                <span>Total Price:</span>
                                <span>{"$" + calculateTotal()}</span>
                            </div>
                            <Button color="primary" size="lg" block className="mt-4">
                                Place Order
                            </Button>
                        </CardBody>
                    </Card>

                        <div className={"d-flex cart flex-column"}>
                            {loading ? (
                                <h4 className="text-center">Loading...</h4>
                            ) : cartDetails.length > 0 ? (
                                cartDetails.map((cartDetail, index) => {
                                    return (
                                        <Card
                                            key={index}
                                            className="card-mobile flex-lg-row align-items-start"
                                            style={{ border: "1px solid gray"}}
                                        >
                                            <CardImg
                                                top
                                                onClick={() => navigate(`/store/${cartDetail.id}`)}
                                                src={cartDetail.images[0]}
                                                alt={cartDetail.auto_part}
                                                style={{aspectRatio:"1/1", objectFit: "cover", width:"17.9rem"}}

                                            />
                                            <CardHeader>
                                                <h5>{cartDetail.auto_part}</h5>
                                                <Badge color="secondary">
                                                    {cartDetail.price + " " + cartDetail.currency}
                                                </Badge>
                                            </CardHeader>
                                            <CardBody className={"d-flex justify-content-end"}>
                                                <Button
                                                    color="danger"
                                                    outline
                                                    size="sm"
                                                    onClick={() => handleRemoveFromCart(cartDetail.id)} // Use the renamed local function
                                                >
                                                    Remove
                                                </Button>
                                            </CardBody>
                                        </Card>
                                    );
                                })
                            ) : (
                                <h4 className="text-center">Your cart is empty.</h4>
                            )}
                        </div>

        </Container>
    );
};

export default Cart;


