import React, {useEffect, useState, useContext, useMemo} from "react";
import {
    Button,
    Card,
    CardBody,
    CardImg,
    Input,
} from "reactstrap";
import PaginationComponent from "../../components/PaginationComponent.jsx";
import {useNavigate} from "react-router-dom";
import {CartContext} from "../../contexts/CartContext";
import {get, getDatabase, ref} from "firebase/database";

const Store = () => {
    const navigate = useNavigate();
    const {cart, handleAddToCart} = useContext(CartContext);

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const database = getDatabase()
    const dbref = ref(database, "/auto_parts")
    const [search, setSearch] = useState("");
    const filteredData = useMemo(() => {
        if (!search) {
            return data;
        }
        return data.filter((item) =>
            item.auto_part.toLowerCase().includes(search.toLowerCase())
        );
    }, [data, search]);

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const res = await get(dbref).then((res) => {
                    return Object.values(res.val())
                });
                setData(res);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    //Pagination parameters
    const itemsPerPage = 25;
    const maxPageButtons = 6;
    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <>
            {
                console.log("Env:" + import.meta.env)
            }
            <h1>Auto Parts Shop</h1>
            <Input className={"mb-4"} onChange={(e) => setSearch(e.target.value)} type={"search"}
                   placeholder={"Search"}/>
            <div className="flex-column">
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    paginatedData.map((item, index) => {
                        return (
                            <Card
                                onClick={() => {
                                    navigate(`/store/${item.id}`)
                                }}
                                key={index}
                                className="flex-row align-items-start"
                                style={{width: "100%", border: "1px solid black"}}
                            >
                                {item.images && (
                                    <CardImg
                                        src={item.images[0]}
                                        alt={`${item.auto_part} image-${item.id}`}
                                        style={{
                                            width: "250px",
                                            height: "15rem",
                                        }}
                                    />
                                )}
                                <div className="d-lg-flex autoCard flex-grow-1">
                                    <CardBody>
                                        <div>
                                            <h1>{item.auto_part}</h1>
                                            <p>{item.make + " " + item.model}</p>
                                            <p>{item.generation}</p>
                                        </div>
                                    </CardBody>
                                    <div className={"d-flex flex-column align-items-end m-3"}>
                                        <p className={"fs-1"}>{item.price + item.currency}</p>
                                        <Button
                                            outline
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleAddToCart(item.id);
                                            }}
                                            className={
                                                cart.includes(item.id)
                                                    ? "bi bi-check"
                                                    : "bi bi-cart-plus"
                                            }
                                            style={{fontSize: "1.75rem", width: "75px", height: "75px"}}
                                        ></Button>
                                    </div>
                                </div>
                            </Card>
                        );
                    })
                )}
            </div>

            {filteredData.length > itemsPerPage && (
                <PaginationComponent
                    dataLength={filteredData.length}
                    itemsPerPage={itemsPerPage}
                    maxPageButtons={maxPageButtons}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                />
            )}
        </>
    );

};

export default Store;