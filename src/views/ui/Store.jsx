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
    const [search, setSearch] = useState("");

    const database = getDatabase()
    const dbref = ref(database, "/auto_parts")

    const filteredData = useMemo(() => {
        if (!search) {
            return data;
        }
        setCurrentPage(1); // Reset to first page on new search
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
            <h1>Auto Parts Shop</h1>
            <Input className={"mb-4"} onChange={(e) => setSearch(e.target.value)} type={"search"}
                   placeholder={"Search"}/>
            <div className={"d-flex flex-lg-column justify-content-around flex-wrap"}>
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
                                className="card-mobile flex-lg-row align-items-start"
                                style={{
                                    border: "1px solid black",
                                }}
                            >
                                {item.images && (
                                    <CardImg
                                        loading={"lazy"}
                                        src={item.images[0]}
                                        alt={`${item.auto_part} image-${item.id}`}
                                        style={{aspectRatio:"1/1", objectFit: "cover", width:"17.9rem"}}
                                    />
                                )}
                                <CardBody className={"w-100 d-flex flex-lg-row flex-column justify-content-lg-between"}>
                                    <div className={"h-100"}>
                                        <h2>{item.auto_part}</h2>
                                        <p>{item.make + " " + item.model}</p>
                                        <p>{item.generation}</p>
                                    </div>
                                    <div className={"d-flex flex-column align-items-end"}>
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
                                            style={{fontSize: "1.75rem", width: "5rem", height: "5rem"}}
                                        ></Button>
                                    </div>
                                </CardBody>
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