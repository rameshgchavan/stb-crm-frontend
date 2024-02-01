import { Button, ButtonGroup, Container, Form, FormGroup } from "react-bootstrap"
import { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { addFilteredSlicedCustomersAction } from "../../redux/features/customers/customersSlice";

/*This component filters customer data as user choice*/
// This component is used in routes/FilterRoutes
const CustomersFilter = () => {
    const dispatch = useDispatch();

    // Initialized pagination data
    const cardsPerPage = useRef(12);
    const [currentPage, setCurrentPage] = useState(1);
    const lastPage = useRef(1);
    const firstCardIndex = useRef(0);
    const lastCardIndex = useRef(cardsPerPage.current);

    const searchedName = useRef("");

    const [filteredCustomres, setFilteredCustomers] = useState();

    // Get customers list and scrutinized user 
    const customersList = useSelector(state => state.customersReducer.customers);
    const { scrutinizedUser } = useSelector(state => state.usersReducer);


    // Checked and initialized. Is user admin or not.  
    const { Admin, Name: userName } = scrutinizedUser;
    const isAdmin = Admin === "self" || Admin === "stb-crm" ? true : false;

    // Getting and initialized user seletion from local storage
    const [filterSetting, setFilterSetting] = useState(JSON.parse(localStorage.getItem("FilterSetting")));

    // Initialized check box values
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

    // This function is called in option element to list area managers
    const listAreaManagers = () => {
        // Filter and return area managers
        const areaManagers = customersList?.filter((customer, index, array) => {
            return array.findIndex(object =>
                object.AreaManager === customer.AreaManager
            ) === index
        })

        return areaManagers
    };

    // This function is called in option element to list area or persons
    const listAreaPersons = () => {
        // Filter and rerutn area or persons
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

    // This function filters customer data as user choice
    // This function used by useEffect
    const filterCustomers = () => {
        // Initialized data varible
        let filteredData;

        // Check customer location, filter and return customer data
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

        // Set filtered customer data to state
        setFilteredCustomers(filteredData);
        setCurrentPage(1);

        // Send filtered customer to slice
        sliceCustomers(filteredData);
    };

    // This function slice filterd cutomers data and send to redux store
    // This function called by filterCustomers and handlePagination functions
    const sliceCustomers = (filteredData, curPage = 1) => {
        // Set up index for pages
        lastCardIndex.current = curPage * cardsPerPage.current;
        firstCardIndex.current = lastCardIndex.current - cardsPerPage.current;
        lastPage.current = Math.ceil(filteredData?.length / cardsPerPage.current)

        // Updating sliced data to redux store using redux action
        dispatch(
            addFilteredSlicedCustomersAction(
                {
                    slicedData: filteredData?.slice(firstCardIndex.current, lastCardIndex.current),
                    firstCardIndex: firstCardIndex.current
                }
            )
        );
    }

    // This function calls sliceCustomers and setCurrentPage functions
    // This function used by pagination element (buttons) to move on first, last, next and pre page
    const handlePagination = (pageNo) => {
        sliceCustomers(filteredCustomres, pageNo);

        // set current page no to state
        setCurrentPage(pageNo);
    }

    return (
        <Container className="bg-secondary shadow rounded-bottom">
            <Form className="py-1">
                <div className="d-lg-flex justify-content-between align-items-start">
                    {/* Check boxes */}
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

                                localStorage.setItem("FilterSetting", JSON.stringify({
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

                                localStorage.setItem("FilterSetting", JSON.stringify({
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

                                localStorage.setItem("FilterSetting", JSON.stringify({
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

                                localStorage.setItem("FilterSetting", JSON.stringify({
                                    ...filterSetting,
                                    custLocation: "OTHER"
                                }));
                            }}
                        />
                    </FormGroup>

                    {/* Select options */}
                    <FormGroup className={`d-flex align-items-start ${isAdmin ? "col-lg-4" : "col-lg-3"}`}>
                        {isAdmin &&
                            <Form.Select name="areaManager" defaultValue={areaManager.current}
                                onChange={(e) => {
                                    areaManager.current = e.target.value;

                                    setFilterSetting({
                                        ...filterSetting,
                                        custAreaManager: e.target.value
                                    });

                                    localStorage.setItem("FilterSetting", JSON.stringify({
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

                                localStorage.setItem("FilterSetting", JSON.stringify({
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

                    {/* Type and search */}
                    <FormGroup size="sm" className="d-flex mt-xl-0 mt-1 align-items-start">
                        <Form.Control type="text"
                            placeholder="Type and search"
                            onChange={(e) => { searchedName.current = e.target.value }} />
                        <Button className="ms-2"
                            onClick={() => { filterCustomers(); }}
                        >Search</Button>
                    </FormGroup>
                </div>

                {/* Page Navigation buttons */}
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
                                firstCardIndex.current + 1 === filteredCustomres?.length // if first index equal to no of records
                                    ? ""
                                    : firstCardIndex.current + 1 + "-"
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