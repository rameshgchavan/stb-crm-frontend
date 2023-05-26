import { Button, ButtonGroup } from "react-bootstrap"
import CustomerCard from "../components/cards/CustomerCard"

const CustomersPage = () => {
    const customerData = {
        Name: "Ramesh Chavan",
        Mobile: "7020554505",
        Area: "Risala",
        Address: "Ganeshwadi road",
    }
    const stbData = {
        STB_Date: "01/01/2022",
        STBs: 1,
        State: "Allocated",
        Status: "Active",
        Type: "NEW",
        SDHD: "SD",
        NDS: "5944738115550728",
        STB_SR: "C763714102331377",
        VCNDSMAC_ID: "0001234566",
        AcNo: "1025468528",
        LCO_Code: "1012464567"
    }
    const seedData = {
        Location: "INLINE",
        Origin: "Hingoli Store",
        Area_Person: "Risala",
        Area_Manager: "Ramesh Chavan"
    }

    return (
        <div>
            <CustomerCard customer={customerData} stb={stbData} seed={seedData} />
            <CustomerCard customer={customerData} stb={stbData} seed={seedData} />
        </div>
    )
}

export default CustomersPage
