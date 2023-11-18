import { useSelector, useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { useRef, useState } from "react";
import axios from "axios";
import { DateTime } from "luxon";

import CustomerSection from "./CustomerSection";
import STBSection from "./STBSection";
import SeedSection from "./SeedSection";

import checkAdminGetDbName from "../../../functions/checkAdminGetDbName"
import { updateCustomerAction } from "../../../redux/actions";

const CustomerForm = ({ id }) => {
    const customerForm = useRef();
    const action = useRef("Save");
    const dispatch = useDispatch();

    // to get token
    const scrutinizedUser = useSelector(state => state.scrutinyUserReducer);

    const { isAdmin, dbName } = checkAdminGetDbName(scrutinizedUser);

    // Note: data: filteredCustomers is not object key value pair
    // data: filteredCustomers <-- here  filteredCustomers is alias of data
    // const { data: filteredCustomers } = useSelector(state => state.customersFilterationReducer);

    const customersList = useSelector(state => state.customersListReducer)?.data;
    // To count Names those already exist in database
    const countName = (name) => {
        const names = customersList.filter((customer) => {
            return customer.CustName === name
        });

        return (names.length + 1);
    };

    // To get data from Form Controls
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

    const handleSave = async (customerData) => {
        // HTTP request to save data
        const response = await axios("/customers/save", {
            method: "post",
            headers: { authorization: `bearer ${scrutinizedUser.token}` },
            data: { dbName, customerData }
        });

        response.data.code === 201
            ? alert(`${response.data.message}`)
            : response.data.message.code === 11000
                ? alert(`A/c No already exsit.`)
                : alert(`${response.data.message.code} Something went wrong.`)

        response.data.code === 201 &&
            customerForm.current.reset(); // To empty Form controls
    }

    const handleUpdate = async (customerData) => {
        // HTTP request to update data
        const response = await axios(`/customers/update/${id}`, {
            method: "put",
            headers: { authorization: `bearer ${scrutinizedUser.token}` },
            data: { dbName, customerData }
        });

        response.data.code === 202
            ? alert(`${response.data.message}`)
            : response.data.message.code === 11000
                ? alert(`A/c No already exsit.`)
                : alert(`${response.data.message.code} Something went wrong.`)

        if (response.data.code === 202) {
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