import { useSelector, useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { useRef, useState } from "react";
import { DateTime } from "luxon";

import CustomerSection from "./CustomerSection";
import STBSection from "./STBSection";
import SeedSection from "./SeedSection";

import checkAdminGetDbName from "../../../functions/checkAdminGetDbName"
import { updateCustomerAction } from "../../../redux/features/customers/customersSlice";
import { createCustomerRequest, updateCustomerRequest } from "../../../apiRequests/customersAPIs";

// This component combines customer related components
// This index component used by modals/CustomerModal
const CustomerForm = ({ id }) => {
    const customerForm = useRef();
    const action = useRef("Save");
    const dispatch = useDispatch();

    // to get token
    const { scrutinizedUser } = useSelector(state => state.usersReducer);

    const { isAdmin } = checkAdminGetDbName(scrutinizedUser);

    // Got customer list from redux store
    const { customers: customersList } = useSelector(state => state.customersReducer);

    // To count Names those already exist in database
    const countName = (name) => {
        const names = customersList.filter((customer) => {
            return customer.CustName === name
        });

        return (names.length + 1);
    };

    // This function get data from Form Controls
    // This function called by on form submit button (Save or Update) clicked
    const handleSubmit = (e) => {
        e.preventDefault();

        // following are name (propetiy) of Form Controls
        // these are destructed from customerForm
        const { date, name, area, address, mobile,
            status, state, stbs, sdHd, acNo, stbSrNo, ndsNo, vcNdsMacID, lcoCode,
            location, type, origin, areaPerson, areaManager, remark
        } = customerForm.current

        // customerData object is created to send data to database
        const customerData = {
            _id: "ac" + acNo?.value,
            IsFree: isFree,
            CustDate: date?.value,
            CustName: name?.value,
            Area: area?.value,
            Address: address?.value,
            MobNo: mobile?.value,

            STBStatus: status?.value || "ACTIVE",
            STBState: state?.value || "Allocated",
            STBs: stbs?.value || countName(name.value),
            SD_HD: sdHd?.value,
            AcNo: acNo?.value,
            STB_SN: stbSrNo?.value,
            NDS_No: ndsNo?.value,
            VC_NDS_MAC_ID: vcNdsMacID?.value,
            LCOCode: lcoCode?.value,

            STBLocation: location?.value || "INLINE",
            SeedType: type?.value,
            Origin: origin?.value,
            AreaPerson: areaPerson?.value,
            AreaManager: areaManager?.value,
            Remark: remark?.value
        }

        action.current === "Save" && handleSave(customerData);
        action.current === "Update" && handleUpdate(customerData);
    }

    // This function saves customer's and stb's details to database
    // This function called by handleSubmit function
    const handleSave = async (customerData) => {
        // Save a customer data
        const response = await createCustomerRequest(scrutinizedUser, customerData);

        response.code === 201
            ? alert(`${response.message}`)
            : response.message.code === 11000
                ? alert(`A/c No already exsit.`)
                : alert(`${response.message.code} Something went wrong.`)

        response.code === 201 &&
            customerForm.current.reset(); // To empty Form controls
    }

    // This function update customer's and stb's details in database
    // This function called by handleSubmit function
    const handleUpdate = async (customerData) => {
        // Update a customer data
        const response = await updateCustomerRequest(scrutinizedUser, customerData, id);

        response.code === 202
            ? alert(`${response.message}`)
            : response.message.code === 11000
                ? alert(`A/c No already exsit.`)
                : alert(`${response.message.code} Something went wrong.`)

        if (response.code === 202) {
            delete customerData._id;
            dispatch(updateCustomerAction({ ...customerData, _id: id }, id));
        }
    }

    // Find customer where id matches
    const customer = customersList?.find((customer) => customer._id === id);

    const [isFree, setIsFree] = useState(customer?.IsFree || false);

    return (
        <Form ref={customerForm} onSubmit={handleSubmit}>
            <div className="d-lg-flex  gap-3 mx-sm-3">
                <CustomerSection customer={{
                    isFree,
                    setIsFree,
                    date: DateTime.fromISO(customer?.CustDate).toISODate(),
                    name: customer?.CustName,
                    area: customer?.Area,
                    address: customer?.Address,
                    mobile: customer?.MobNo
                }} />

                <STBSection stb={{
                    status: customer?.STBStatus,
                    state: customer?.STBState,
                    location: customer?.STBLocation,
                    type: customer?.SeedType,
                    stbs: customer?.STBs,
                    sdHd: customer?.SD_HD,
                    acNo: customer?.AcNo,
                    stb_SN: customer?.STB_SN,
                    nds_No: customer?.NDS_No,
                    vc_Nds_Mac_ID: customer?.VC_NDS_MAC_ID,
                    lcoCode: customer?.LCOCode
                }} />

                <SeedSection customersList={customersList}
                    seed={{
                        isFree,
                        origin: customer?.Origin,
                        areaPerson: customer?.AreaPerson,
                        areaManager: customer?.AreaManager,
                        remark: customer?.Remark
                    }}
                />
            </div>

            <div className="d-flex justify-content-around my-4">
                {customer && isAdmin &&
                    <Button variant="danger" className="my-4"
                    >Delete</Button>
                }

                {customer && isAdmin &&
                    <Button type="submit" variant="warning" className="my-4"
                        onClick={() => { action.current = "Update" }}
                    >Update</Button>
                }

                {!customer &&
                    <Button type="submit" variant="success" className="my-4"
                        onClick={() => { action.current = "Save" }}
                    >Save</Button>
                }
            </div>
        </Form>
    )
}

export default CustomerForm