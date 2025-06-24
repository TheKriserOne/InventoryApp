// client/src/views/ui/AutoPart.jsx
import React, {useEffect, useState, useContext} from "react";
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    CardText,
    Button,
    Spinner,
} from "reactstrap";
import {useParams} from "react-router-dom";
import SliderComponent from "../../components/SliderComponent.jsx";
import {CartContext} from "../../contexts/CartContext.jsx";
import {get, getDatabase, ref} from "firebase/database";

const AutoPartPage = () => {
    const {id} = useParams();
    const {cart, handleAddToCart} = useContext(CartContext); // Consume the context
    const db = getDatabase();
    const dbRef = ref(db, `/auto_parts/${id}`);
    const [item, setItem] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const res = await get(dbRef).then((res) => {
                    return res.val()
                });
                setItem(res);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        })();
    }, [id]);

    return (
        <Container>
            {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{height: "100vh"}}>
                    <Spinner color="primary"/>
                </div>
            ) : (
                <Card className={"d-flex flex-wrap border-3 w-100"} style={{maxWidth: "800px", margin: "auto"}}>
                    <div>
                        {item.images && <SliderComponent>
                            {item.images.map((url, index) => (
                                <img  key={index} src={url} alt={`Slide ${index}`}/>
                            ))}
                        </SliderComponent>}
                    </div>

                    <Col>
                        <CardBody>
                            <CardTitle tag="h4">{item.auto_part}</CardTitle>
                            <CardText>
                                <strong>Make:</strong> {item.make} <br/>
                                <strong>Model:</strong> {item.model} <br/>
                                <strong>Generation:</strong> {item.generation} <br/>
                                <strong>Year:</strong> {item.year} <br/>
                                <strong>Fuel Type:</strong> {item.fuel_type} <br/>
                                <strong>Engine Size:</strong> {item.engine_size}L <br/>
                                <strong>Gearbox:</strong> {item.gearbox} <br/>
                                <strong>Body:</strong> {item.body} <br/>
                                <strong>Drive:</strong> {item.drive} <br/>
                                <strong>Description:</strong> {item.description} <br/>
                                <strong>Category:</strong> {item.category} <br/>
                                <strong>Price:</strong> {item.price} {item.currency} <br/>
                            </CardText>
                            <Button
                                onClick={() => handleAddToCart(item.id)} // Use context function
                                outline
                                color="primary"
                                className={cart.includes(item.id) ? "bi bi-check" : "bi bi-cart-plus"} // Use context state
                            >
                                {cart.includes(item.id) ? "In Cart" : "Добавить в корзину"}
                            </Button>
                        </CardBody>
                    </Col>

                </Card>
            )}
        </Container>
    );
};

export default AutoPartPage;
