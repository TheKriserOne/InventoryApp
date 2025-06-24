import React, {useRef, useState} from "react";
import {Container, Row, Col, Form, Label, Input, Button} from "reactstrap";
import {set, push, getDatabase, ref} from "firebase/database";

const AddInventory = () => {
    const formRef = useRef(null);
    const [imageLinks, setImageLinks] = useState([""]);
    const db = getDatabase();
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
        const userConfirmed = confirm("Are you sure you want to submit this data?");
        if (!userConfirmed) {
            return;
        }

        const formData = new FormData(formRef.current);
        const data = Object.fromEntries(formData.entries());


        // Ensure images array is correctly assigned
        data.images = imageLinks.filter((link) => link !== "");

        // Generate a unique push key first
        const dbRef = ref(db, "auto_parts");
        const newPostRef = push(dbRef); // This generates a unique key

        // Attach the key as "id" to the data object
        data.id = newPostRef.key;

        // Push the modified data object to Firebase
        set(newPostRef, data)
            .then(() => console.log("Data sent successfully!", data))
            .catch((error) => console.error("Error sending data:", error));
    };


    return (
        <Container className="add-inventory-container">
            <Row className="justify-content-center">
                <Col md="8" lg="6">
                    <h2 className="text-center mb-4">Add New Inventory Item</h2>
                    <Form innerRef={formRef}>
                        <Label for="auto_part">Auto Part</Label>
                        <Input
                            type="text"
                            name="auto_part"
                            id="auto_part"
                            placeholder="Enter Auto Part"
                        />

                        <Label for="make">Make</Label>
                        <Input type="text" name="make" id="make" placeholder="Enter make"/>

                        <Label for="model">Model</Label>
                        <Input
                            type="text"
                            name="model"
                            id="model"
                            placeholder="Enter model"
                        />

                        <Label for="generation">Generation</Label>
                        <Input
                            type="text"
                            name="generation"
                            id="generation"
                            placeholder="Enter generation"
                        />

                        <Label for="year">Year</Label>
                        <Input
                            type="number"
                            name="year"
                            id="year"
                            placeholder="Enter year"
                        />

                        <Label for="fuel_type">Fuel Type</Label>
                        <Input
                            type="text"
                            name="fuel_type"
                            id="fuel_type"
                            placeholder="Enter fuel type"
                        />

                        <Label for="engine_size">Engine Size</Label>
                        <Input
                            type="number"
                            name="engine_size"
                            id="engine_size"
                            placeholder="Enter engine size"
                        />

                        <Label for="engine_type">Engine Type</Label>
                        <Input
                            type="text"
                            name="engine_type"
                            id="engine_type"
                            placeholder="Enter engine type"
                        />

                        <Label for="gearbox">Gearbox</Label>
                        <Input
                            type="text"
                            name="gearbox"
                            id="gearbox"
                            placeholder="Enter gearbox"
                        />

                        <Label for="body">Body</Label>
                        <Input type="text" name="body" id="body" placeholder="Enter body"/>

                        <Label for="serial_id">Serial ID</Label>
                        <Input
                            type="text"
                            name="serial_id"
                            id="serial_id"
                            placeholder="Enter serial ID"
                        />

                        <Label for="description">Description</Label>
                        <Input
                            type="textarea"
                            name="description"
                            id="description"
                            placeholder="Enter description"
                        />

                        <Label for="price">Price</Label>
                        <Input
                            type="number"
                            name="price"
                            id="price"
                            placeholder="Enter price"
                        />

                        <Label for="currency">Currency</Label>
                        <Input
                            type="text"
                            name="currency"
                            id="currency"
                            placeholder="Enter currency"
                        />

                        <Label for="category">Category</Label>
                        <Input
                            type="text"
                            name="category"
                            id="category"
                            placeholder="Enter category"
                        />

                        <Label for="drive">Drive</Label>
                        <Input
                            type="text"
                            name="drive"
                            id="drive"
                            placeholder="Enter drive"
                        />

                        <Label for="r_diameter">R Diameter</Label>
                        <Input
                            type="number"
                            name="r_diameter"
                            id="r_diameter"
                            placeholder="Enter R diameter"
                        />

                        <Label for="j_width">J Width</Label>
                        <Input
                            type="number"
                            name="j_width"
                            id="j_width"
                            placeholder="Enter J width"
                        />

                        <Label for="bolt_pattern">Bolt Pattern</Label>
                        <Input
                            type="text"
                            name="bolt_pattern"
                            id="bolt_pattern"
                            placeholder="Enter bolt pattern"
                        />

                        <Label for="et">ET</Label>
                        <Input type="number" name="et" id="et" placeholder="Enter ET"/>

                        <Label for="dia">DIA</Label>
                        <Input type="number" name="dia" id="dia" placeholder="Enter DIA"/>

                        <Label for="pcd">PCD</Label>
                        <Input type="text" name="pcd" id="pcd" placeholder="Enter PCD"/>

                        <Label for="discount">Discount</Label>
                        <Input
                            type="number"
                            name="discount"
                            id="discount"
                            placeholder="Enter discount"
                        />

                        <Label for="active">Active</Label>
                        <Input type="number" name="active" id="active"/>

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
                                Add Item
                            </Button>
                        </Col>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default AddInventory;
