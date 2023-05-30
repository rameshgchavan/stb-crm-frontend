import { Button } from "react-bootstrap";
import CustomerCard from "../components/cards/CustomerCard";
import { useSelector } from "react-redux";

const CustomersPage = () => {
    // Note: data: filteredCustomers is not object key value pair
    // data: filteredCustomers <-- here  filteredCustomers is alias of data
    const { data: filteredCustomers, firtCardIndex } =
        useSelector(state => state.customersFilterationReducer);

    // console.warn(filteredCustomers);

    return (
        <>
            <div className="d-flex flex-wrap justify-content-evenly">
                {filteredCustomers?.length == 0 ? <h3>Oops... no record found.</h3> : ""}

                {
                    filteredCustomers?.map((customer, index) => {
                        return <CustomerCard
                            customer={{
                                key: customer._id,
                                SrNo: (index + 1) + firtCardIndex,
                                Name: customer.CustName,
                                Area: customer.Area,
                                Address: customer.Address,
                                Mobile: customer.MobNo
                            }}
                            stb={{
                                AcNo: customer.AcNo,
                                Status: customer.STBStatus,
                                LCOCode: customer.LCOCode,
                                VCNDSMAC_ID: customer.VC_NDS_MAC_ID
                            }}
                        />
                    })
                }
            </div>

            <Button variant="success" size="sm" className="my-4">Add New</Button>
        </>
    )
}

export default CustomersPage
