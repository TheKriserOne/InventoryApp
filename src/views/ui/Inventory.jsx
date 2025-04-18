import React, {useEffect, useMemo, useState} from 'react';
import {Button, Card, CardBody, Col, Input, InputGroup} from 'reactstrap';
import DataTable from "../../components/DataTable";
import {getDatabase, ref, get, remove} from "firebase/database";
import {useNavigate} from "react-router-dom";

const keys = [
    "make",
    "model",
    "generation",
    "year",
    "auto_part",
    "fuel_type",
    "engine_size",
    "engine_type",
    "gearbox",
    "body",
    "serial_id",
    "description",
    "price",
    "currency",
    "category",
    "drive",
    "r_diameter",
    "j_width",
    "bolt_pattern",
    "et",
    "dia",
    "pcd",
    "discount",
    "active"
];

const Inventory = () => {
    const [table, setTable] = useState([]);
    const [select, setSelect] = useState("id");
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const database = getDatabase()
    const dbref = (path = "/auto_parts") => ref(database, `${path}`)

    const fetchData = async () => {

        setLoading(true);
        try {
            const data = await get(dbref()).then((res) => Object.values(res.val()))
                .catch((error) => console.log("null data detected"));
            setTable(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchData()
    }, []);

    const filteredTable = useMemo(() => {
        if (!input) {
            return table;
        }
        return table.filter((item) => String(item[select]).toLowerCase().includes(input.toLowerCase()))
    }, [table, select, input]);

    const handleDelete = (arrOfIds) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this item?");
        if (isConfirmed && arrOfIds.length > 0) {
            arrOfIds.map((id) => {
                const itemRef = dbref(`/auto_parts/${id}`);
                remove(itemRef)
                    .then(() => console.log("Item deleted successfully!"))
                    .catch((error) => console.error("Error deleting item:", error));
            })
        }
        fetchData();
    };
    return (
        <Card className="overflow-y-scroll" style={{height: '90vh'}}>

            <CardBody>
                <InputGroup className={"z-0 sticky-top"}>
                    <Col xs="w-auto">
                        <Input
                            name="select"
                            type="select"
                            onChange={(e) => setSelect(e.target.value)}
                        >
                            {keys.map((key) => <option key={key}>{key}</option>)}
                        </Input>
                    </Col>
                    <Input onChange={(e) => setInput(e.target.value)}/>
                </InputGroup>

                <Button onClick={() => navigate("/inventory/add")} className="mb-3" style={{width: '100%'}}>
                    Add Inventory <i className="bi bi-plus-lg"></i>
                </Button>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    table ? <DataTable
                        row={keys}
                        data={filteredTable}
                        onDelete={(data) => handleDelete(data)}
                    /> : <div>No Data</div>
                )}
            </CardBody>
        </Card>
    );
};

export default Inventory;
