import React, {useRef, useState, useEffect} from "react";
import {Container, Row, Col, Form, Label, Input, Button} from "reactstrap";
import {set, ref, getDatabase, get} from "firebase/database";
import {useParams, useNavigate} from "react-router-dom";

const EditInventory = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const formRef = useRef(null);
    const [imageLinks, setImageLinks] = useState([""]);
    const [loading, setLoading] = useState(true);
    const [itemData, setItemData] = useState({});
    const db = getDatabase();

    useEffect(() => {
        const fetchItemData = async () => {
            try {
                const itemRef = ref(db, `auto_parts/${id}`);
                const snapshot = await get(itemRef);
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    setItemData(data);
                    setImageLinks(data.images || [""]);
                } else {
                    console.error("Item not found");
                    navigate("/inventory");
                }
            } catch (error) {
                console.error("Error fetching item:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchItemData();
    }, [id, db, navigate]);

    const handleAddImageLink = () => {
        setImageLinks([...imageLinks, ""]);
    };

    const handleImageLinkChange = (index, value) => {
        const newImageLinks = [...imageLinks];
        newImageLinks[index] = value;
        setImageLinks(newImageLinks);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const userConfirmed = confirm("Are you sure you want to update this item?");
        if (!userConfirmed) {
            return;
        }

        const formData = new FormData(formRef.current);
        const data = Object.fromEntries(formData.entries());

        // Ensure images array is correctly assigned
        data.images = imageLinks.filter((link) => link !== "");
        data.id = id; // Keep the same ID

        // Update the item in Firebase
        const itemRef = ref(db, `auto_parts/${id}`);
        set(itemRef, data)
            .then(() => {
                console.log("Data updated successfully!", data);
                navigate("/inventory");
            })
            .catch((error) => console.error("Error updating data:", error));
    };

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <h3>Loading...</h3>
            </Container>
        );
    }

    return (
        <Container className="edit-inventory-container">
            <Row className="justify-content-center">
                <Col md="8" lg="6">
                    <h2 className="text-center mb-4">Edit Inventory Item</h2>
                    <Form innerRef={formRef}>
                        <Label for="auto_part">Auto Part</Label>
                        <Input
                            type="text"
                            name="auto_part"
                            id="auto_part"
                            placeholder="Enter Auto Part"
                            defaultValue={itemData.auto_part || ""}
                        />

                        <Label for="make">Make</Label>
                        <Input
                            type="text"
                            name="make"
                            id="make"
                            placeholder="Enter make"
                            defaultValue={itemData.make || ""}
                        />

                        <Label for="model">Model</Label>
                        <Input
                            type="text"
                            name="model"
                            id="model"
                            placeholder="Enter model"
                            defaultValue={itemData.model || ""}
                        />

                        <Label for="generation">Generation</Label>
                        <Input
                            type="text"
                            name="generation"
                            id="generation"
                            placeholder="Enter generation"
                            defaultValue={itemData.generation || ""}
                        />

                        <Label for="year">Year</Label>
                        <Input
                            type="number"
                            name="year"
                            id="year"
                            placeholder="Enter year"
                            defaultValue={itemData.year || ""}
                        />

                        <Label for="fuel_type">Fuel Type</Label>
                        <Input
                            type="text"
                            name="fuel_type"
                            id="fuel_type"
                            placeholder="Enter fuel type"
                            defaultValue={itemData.fuel_type || ""}
                        />

                        <Label for="engine_size">Engine Size</Label>
                        <Input
                            type="number"
                            name="engine_size"
                            id="engine_size"
                            placeholder="Enter engine size"
                            defaultValue={itemData.engine_size || ""}
                        />

                        <Label for="engine_type">Engine Type</Label>
                        <Input
                            type="text"
                            name="engine_type"
                            id="engine_type"
                            placeholder="Enter engine type"
                            defaultValue={itemData.engine_type || ""}
                        />

                        <Label for="gearbox">Gearbox</Label>
                        <Input
                            type="text"
                            name="gearbox"
                            id="gearbox"
                            placeholder="Enter gearbox"
                            defaultValue={itemData.gearbox || ""}
                        />

                        <Label for="body">Body</Label>
                        <Input
                            type="text"
                            name="body"
                            id="body"
                            placeholder="Enter body"
                            defaultValue={itemData.body || ""}
                        />

                        <Label for="serial_id">Serial ID</Label>
                        <Input
                            type="text"
                            name="serial_id"
                            id="serial_id"
                            placeholder="Enter serial ID"
                            defaultValue={itemData.serial_id || ""}
                        />

                        <Label for="description">Description</Label>
                        <Input
                            type="textarea"
                            name="description"
                            id="description"
                            placeholder="Enter description"
                            defaultValue={itemData.description || ""}
                        />

                        <Label for="price">Price</Label>
                        <Input
                            type="number"
                            name="price"
                            id="price"
                            placeholder="Enter price"
                            defaultValue={itemData.price || ""}
                        />

                        <Label for="currency">Currency</Label>
                        <Input
                            type="text"
                            name="currency"
                            id="currency"
                            placeholder="Enter currency"
                            defaultValue={itemData.currency || ""}
                        />

                        <Label for="category">Category</Label>
                        <Input
                            type="text"
                            name="category"
                            id="category"
                            placeholder="Enter category"
                            defaultValue={itemData.category || ""}
                        />

                        <Label for="drive">Drive</Label>
                        <Input
                            type="text"
                            name="drive"
                            id="drive"
                            placeholder="Enter drive"
                            defaultValue={itemData.drive || ""}
                        />

                        <Label for="r_diameter">R Diameter</Label>
                        <Input
                            type="number"
                            name="r_diameter"
                            id="r_diameter"
                            placeholder="Enter R diameter"
                            defaultValue={itemData.r_diameter || ""}
                        />

                        <Label for="j_width">J Width</Label>
                        <Input
                            type="number"
                            name="j_width"
                            id="j_width"
                            placeholder="Enter J width"
                            defaultValue={itemData.j_width || ""}
                        />

                        <Label for="bolt_pattern">Bolt Pattern</Label>
                        <Input
                            type="text"
                            name="bolt_pattern"
                            id="bolt_pattern"
                            placeholder="Enter bolt pattern"
                            defaultValue={itemData.bolt_pattern || ""}
                        />

                        <Label for="et">ET</Label>
                        <Input
                            type="number"
                            name="et"
                            id="et"
                            placeholder="Enter ET"
                            defaultValue={itemData.et || ""}
                        />

                        <Label for="dia">DIA</Label>
                        <Input
                            type="number"
                            name="dia"
                            id="dia"
                            placeholder="Enter DIA"
                            defaultValue={itemData.dia || ""}
                        />

                        <Label for="pcd">PCD</Label>
                        <Input
                            type="text"
                            name="pcd"
                            id="pcd"
                            placeholder="Enter PCD"
                            defaultValue={itemData.pcd || ""}
                        />

                        <Label for="discount">Discount</Label>
                        <Input
                            type="number"
                            name="discount"
                            id="discount"
                            placeholder="Enter discount"
                            defaultValue={itemData.discount || ""}
                        />

                        <Label for="active">Active</Label>
                        <Input
                            type="number"
                            name="active"
                            id="active"
                            defaultValue={itemData.active || ""}
                        />

                        <Label>Image Links</Label>
                        {imageLinks.map((link, index) => (
                            <Input
                                key={index}
                                type="url"
                                placeholder={`Image URL ${index + 1}`}
                                value={link}
                                onChange={(e) => handleImageLinkChange(index, e.target.value)}
                                className="mb-2"
                            />
                        ))}
                        <Button
                            color="secondary"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleAddImageLink();
                            }}
                            className="mb-3"
                        >Add Another Image
                        </Button>
                        <Col>
                            <Button onClick={handleSubmit} className="mt-2" color="primary">
                                Update Item
                            </Button>
                        </Col>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default EditInventory;