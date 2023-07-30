import { Button, ButtonGroup, Container, Form, FormGroup } from "react-bootstrap"
import { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { filterCustomersAction } from "../../redux/actions";

const CustomersFilter = () => {
    const dispatch = useDispatch();

    const cardsPerPage = useRef(12);
    const [currentPage, setCurrentPage] = useState(1);
    const lastPage = useRef(1);
    const firtCardIndex = useRef(0);
    const lastCardIndex = useRef(cardsPerPage.current);

    const searchedName = useRef("");

    const [filteredCustomres, setFilteredCutomers] = useState();

    const customersList = useSelector(state => state.customersListReducer)?.data;
    const scrutinizedUser = useSelector(state => state.scrutinyUserReducer);

    const { Admin, Name: userName } = scrutinizedUser;
    const isAdmin = Admin === "self" || Admin === "stb-crm" ? true : false;

    const [filterSetting, setFilterSetting] = useState(JSON.parse(localStorage.getItem("FiterSetting")));

    const location = useRef(
        filterSetting?.custLocation ||
        "INLINE"
    );
    const areaManager = useRef(
        isAdmin
            ? filterSetting?.custAreaManager || "All"
            : userName
    );
    const areaPerson = useRef(
        filterSetting?.custAreaPerson ||
        "All"
    );

    useEffect(() => {
        filterCustomers();
    }, [customersList === undefined])

    const listAreaManagers = () => {
        const areaManagers = customersList?.filter((customer, index, array) => {
            return array.findIndex(object =>
                object.AreaManager === customer.AreaManager
            ) === index
        })

        return areaManagers
    };

    const listAreaPersons = () => {
        const areaPersons = customersList?.filter(customer =>
            areaManager.current !== "All"
                ? customer.AreaManager === areaManager.current
                : customer.AreaManager
        )
            ?.filter((manager, index, array) => {
                return array.findIndex(object =>
                    object.AreaPerson === manager.AreaPerson
                ) === index
            });

        return areaPersons
    };

    const filterCustomers = () => {
        let filteredData;

        if (location.current === "INLINE") {
            filteredData = customersList
                ?.filter((customer, index) => {
                    return customer.STBState === "Allocated"
                })
                ?.filter((customer) => {
                    return customer.STBLocation === "INLINE" || customer.STBLocation === "CAMEIN"
                })
                ?.filter((customer, index) => {
                    return areaManager.current !== "All"
                        ? customer.AreaManager === areaManager.current
                        : customer.AreaManager
                })
                ?.filter((customer, index) => {
                    return areaPerson.current !== "All"
                        ? customer.AreaPerson === areaPerson.current
                        : customer.AreaPerson
                })
                ?.filter((customer) => {
                    return customer.CustName.toLowerCase().includes(searchedName.current.toLowerCase())
                        || customer.Area.toLowerCase().includes(searchedName.current.toLowerCase())
                        || customer.Address.toLowerCase().includes(searchedName.current.toLowerCase())
                        || customer.MobNo.toLowerCase().includes(searchedName.current.toLowerCase())
                        || customer.AcNo.toLowerCase().includes(searchedName.current.toLowerCase())
                        || customer.VC_NDS_MAC_ID.toLowerCase().includes(searchedName.current.toLowerCase())
                        || customer.NDS_No.toLowerCase().includes(searchedName.current.toLowerCase())
                        || customer.STB_SN.toLowerCase().includes(searchedName.current.toLowerCase());
                });
        }
        else if (location.current === "OTHER") {
            filteredData = customersList
                ?.filter((customer, index) => {
                    return customer.STBState !== "Allocated"
                })
                ?.filter((customer) => {
                    return customer.STBLocation !== "LEFTOUT" && customer.STBLocation !== "OUTGONE"
                })
                ?.filter((customer, index) => {
                    return areaManager.current !== "All"
                        ? customer.AreaManager === areaManager.current
                        : customer.AreaManager
                })
                ?.filter((customer, index) => {
                    return areaPerson.current !== "All"
                        ? customer.AreaPerson === areaPerson.current
                        : customer.AreaPerson
                })
                ?.filter((customer) => {
                    return customer.CustName.toLowerCase().includes(searchedName.current.toLowerCase())
                        || customer.Area.toLowerCase().includes(searchedName.current.toLowerCase())
                        || customer.Address.toLowerCase().includes(searchedName.current.toLowerCase())
                        || customer.MobNo.toLowerCase().includes(searchedName.current.toLowerCase())
                        || customer.AcNo.toLowerCase().includes(searchedName.current.toLowerCase())
                        || customer.VC_NDS_MAC_ID.toLowerCase().includes(searchedName.current.toLowerCase())
                        || customer.NDS_No.toLowerCase().includes(searchedName.current.toLowerCase())
                        || customer.STB_SN.toLowerCase().includes(searchedName.current.toLowerCase());
                });
        }
        else {
            filteredData = customersList
                ?.filter((customer) => {
                    return customer.STBLocation === location.current
                })
                ?.filter((customer, index) => {
                    return areaManager.current !== "All"
                        ? customer.AreaManager === areaManager.current
                        : customer.AreaManager
                })
                ?.filter((customer, index) => {
                    return areaPerson.current !== "All"
                        ? customer.AreaPerson === areaPerson.current
                        : customer.AreaPerson
                })
                ?.filter((customer) => {
                    return customer.CustName.toLowerCase().includes(searchedName.current.toLowerCase())
                        || customer.Area.toLowerCase().includes(searchedName.current.toLowerCase())
                        || customer.Address.toLowerCase().includes(searchedName.current.toLowerCase())
                        || customer.MobNo.toLowerCase().includes(searchedName.current.toLowerCase())
                        || customer.AcNo.toLowerCase().includes(searchedName.current.toLowerCase())
                        || customer.VC_NDS_MAC_ID.toLowerCase().includes(searchedName.current.toLowerCase())
                        || customer.NDS_No.toLowerCase().includes(searchedName.current.toLowerCase())
                        || customer.STB_SN.toLowerCase().includes(searchedName.current.toLowerCase());
                });
        }

        setFilteredCutomers(filteredData);
        setCurrentPage(1);

        sliceCustomers(filteredData);
    };

    const sliceCustomers = (filteredData, curPage = 1) => {
        lastCardIndex.current = curPage * cardsPerPage.current;
        firtCardIndex.current = lastCardIndex.current - cardsPerPage.current;
        lastPage.current = Math.ceil(filteredData?.length / cardsPerPage.current)

        dispatch(
            filterCustomersAction(
                filteredData?.slice(firtCardIndex.current, lastCardIndex.current),
                firtCardIndex.current
            )
        );
    }

    const handlePagination = (pageNo) => {
        sliceCustomers(filteredCustomres, pageNo);
        setCurrentPage(pageNo);
    }

    return (
        <Container className="bg-secondary shadow rounded-bottom">
            <Form className="py-1">
                <div className="d-lg-flex justify-content-between align-items-start">
                    <FormGroup className="d-flex flex-wrap gap-2 text-start">
                        <Form.Check variant="outline-success" type="radio" name="stbs" label="INLINE"
                            className="me-sm-3 text-warning fw-bold"
                            defaultChecked={location.current === "INLINE"}

                            onClick={() => {
                                location.current = "INLINE"; filterCustomers();

                                setFilterSetting({
                                    ...filterSetting,
                                    custLocation: "INLINE"
                                });

                                localStorage.setItem("FiterSetting", JSON.stringify({
                                    ...filterSetting,
                                    custLocation: "INLINE"
                                }));
                            }}
                        />

                        <Form.Check variant="outline-warning" type="radio" name="stbs" label="LEFTOUT"
                            className="me-sm-3 text-warning fw-bold"
                            defaultChecked={location.current === "LEFTOUT"}

                            onClick={() => {
                                location.current = "LEFTOUT"; filterCustomers();

                                setFilterSetting({
                                    ...filterSetting,
                                    custLocation: "LEFTOUT"
                                });

                                localStorage.setItem("FiterSetting", JSON.stringify({
                                    ...filterSetting,
                                    custLocation: "LEFTOUT"
                                }));
                            }}
                        />

                        <Form.Check variant="outline-danger" type="radio" name="stbs" label="OUTGONE"
                            className="me-sm-3 text-warning fw-bold"
                            defaultChecked={location.current === "OUTGONE"}

                            onClick={() => {
                                location.current = "OUTGONE"; filterCustomers();

                                setFilterSetting({
                                    ...filterSetting,
                                    custLocation: "OUTGONE"
                                });

                                localStorage.setItem("FiterSetting", JSON.stringify({
                                    ...filterSetting,
                                    custLocation: "OUTGONE"
                                }));
                            }}
                        />

                        <Form.Check variant="outline-primary" type="radio" name="stbs" label="OTHER"
                            className="text-warning fw-bold"
                            defaultChecked={location.current === "OTHER"}

                            onClick={() => {
                                location.current = "OTHER"; filterCustomers();

                                setFilterSetting({
                                    ...filterSetting,
                                    custLocation: "OTHER"
                                });

                                localStorage.setItem("FiterSetting", JSON.stringify({
                                    ...filterSetting,
                                    custLocation: "OTHER"
                                }));
                            }}
                        />
                    </FormGroup>

                    <FormGroup className={`d-flex align-items-start ${isAdmin ? "col-lg-4" : "col-lg-3"}`}>
                        {isAdmin &&
                            <Form.Select name="areaManager" defaultValue={areaManager.current}
                                onChange={(e) => {
                                    areaManager.current = e.target.value;

                                    setFilterSetting({
                                        ...filterSetting,
                                        custAreaManager: e.target.value
                                    });

                                    localStorage.setItem("FiterSetting", JSON.stringify({
                                        ...filterSetting,
                                        custAreaManager: e.target.value
                                    }));

                                    filterCustomers();
                                }}
                            >
                                {<option>All</option>}
                                {listAreaManagers()?.map((manager, index) => {
                                    return <option key={index}>{manager.AreaManager}</option>
                                })}
                            </Form.Select>
                        }
                        <Form.Select name="areaPerosn" defaultValue={areaPerson.current}
                            onChange={(e) => {
                                areaPerson.current = e.target.value;

                                setFilterSetting({
                                    ...filterSetting,
                                    custAreaPerson: e.target.value
                                });

                                localStorage.setItem("FiterSetting", JSON.stringify({
                                    ...filterSetting,
                                    custAreaPerson: e.target.value
                                }));

                                filterCustomers();
                            }}
                        >
                            <option>All</option>
                            {listAreaPersons()?.map((areaPerson, index) => {
                                return <option key={index}>{areaPerson.AreaPerson}</option>
                            })}
                        </Form.Select>
                    </FormGroup>

                    <FormGroup size="sm" className="d-flex mt-xl-0 mt-1 align-items-start">
                        <Form.Control type="text"
                            placeholder="Type and search"
                            onChange={(e) => { searchedName.current = e.target.value }} />
                        <Button className="ms-2"
                            onClick={() => { filterCustomers(); }}
                        >Search</Button>
                    </FormGroup>
                </div>

                {filteredCustomres?.length > cardsPerPage.current &&
                    <FormGroup className="mt-2 d-flex justify-content-center align-items-start">
                        {currentPage > 1 && <ButtonGroup size="sm">
                            <Button variant="dark" className="fw-bold text-light"
                                onClick={() => { handlePagination(1); }}
                            > First </Button>

                            <Button variant="light" className="fw-bold text-primary"
                                onClick={() => { handlePagination(currentPage - 1); }}
                            >Prev</Button>
                        </ButtonGroup>}

                        <Form.Label className="text-light mx-2">
                            {
                                firtCardIndex.current + 1 === filteredCustomres?.length // if first index equal to no of records
                                    ? ""
                                    : firtCardIndex.current + 1 + "-"
                            }
                            {
                                lastCardIndex.current > filteredCustomres?.length // if last index is greater than no of records
                                    ? filteredCustomres?.length
                                    : lastCardIndex.current
                            }
                            {
                                " of " + filteredCustomres?.length
                            }
                        </Form.Label>

                        {currentPage < lastPage.current && <ButtonGroup size="sm">
                            <Button variant="light" className="fw-bold text-primary"
                                onClick={() => { handlePagination(currentPage + 1); }}
                            >Next</Button>

                            <Button variant="dark" className="fw-bold text-light"
                                onClick={() => { handlePagination(lastPage.current); }}
                            >Last</Button>
                        </ButtonGroup>}
                    </FormGroup>
                }
            </Form>
        </Container>
    )
}

export default CustomersFilter