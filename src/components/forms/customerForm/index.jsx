import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";

import CustomerSection from "./CustomerSection";
import STBSection from "./STBSection";
import SeedSection from "./SeedSection";

const CustomerView = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Note: data: filteredCustomers is not object key value pair
    // data: filteredCustomers <-- here  filteredCustomers is alias of data
    const { data: filteredCustomers } = useSelector(state => state.customersFilterationReducer);

    const customer = filteredCustomers.find((customer) => customer._id == id);

    return (
        <>
            <div className="d-flex justify-content-start">
                <Button className="ms-3 mb-3"
                    onClick={() => navigate("/customers")}
                >Back</Button>
            </div>

            <Form className="d-lg-flex row-col-3 gap-3 mx-3">
                <CustomerSection customer={{
                    date: customer?.CustDate,
                    name: customer?.CustName,
                    area: customer?.Area,
                    address: customer?.Address,
                    mobile: customer?.MobNo
                }} />

                <STBSection stb={{
                    status: customer?.STBStatus,
                    state: customer?.STBState,
                    stbs: customer?.STBs,
                    sdHd: customer?.SD_HD,
                    acNo: customer?.AcNo,
                    stb_SN: customer?.STB_SN,
                    nds_No: customer?.NDS_No,
                    vc_Nds_Mac_ID: customer?.VC_NDS_MAC_ID,
                    lcoCode: customer?.LCOCode
                }} />

                <SeedSection seed={{
                    location: customer?.STBLocation,
                    type: customer?.SeedType,
                    origin: customer?.Origin,
                    areaPerson: customer?.AreaPerson,
                    areaManager: customer?.AreaManager,
                    remark: customer?.Remark
                }} />

                {/* <FormGroup className="col border shadow rounded p-3">
                    <span className="fw-bold text-secondary">Customer Details</span>
                    <Form.Floating className="my-3">
                        <Form.Control placeholder="Date" defaultValue={customer.CustDate} />
                        <Form.Label className="text-primary fw-bold">Date</Form.Label>
                    </Form.Floating>

                    <Form.Floating className="mb-3">
                        <Form.Control placeholder="Name" defaultValue={customer.CustName} />
                        <Form.Label className="text-primary fw-bold">Name</Form.Label>
                    </Form.Floating>

                    <Form.Floating className="mb-3">
                        <Form.Control placeholder="Area" defaultValue={customer.Area} />
                        <Form.Label className="text-primary fw-bold">Area</Form.Label>
                    </Form.Floating>

                    <Form.Floating className="mb-3">
                        <Form.Control placeholder="Address" defaultValue={customer.Address} />
                        <Form.Label className="text-primary fw-bold">Address</Form.Label>
                    </Form.Floating>

                    <Form.Floating className="mb-3">
                        <Form.Control placeholder="Mobile" defaultValue={customer.MobNo} />
                        <Form.Label className="text-primary fw-bold">Mobile</Form.Label>
                    </Form.Floating>
                </FormGroup> */}

                {/* <FormGroup className="col border shadow rounded p-3">
                    <span className="fw-bold text-secondary"> STB Details </span>
                    <div className="d-flex justify-content-evenly mt-3">
                        <Form.Floating className="mb-3">
                            <Form.Select placeholder="STB Status" defaultValue={customer.STBStatus} >
                                <option>ACTIVE</option>
                                <option>SUSPEND</option>
                                <option>DISCONNECT</option>
                            </Form.Select>
                            <Form.Label className="text-primary fw-bold">STB Status</Form.Label>
                        </Form.Floating>

                        <Form.Floating className="mb-3">
                            <Form.Select placeholder="STB State" defaultValue={customer.STBState} >
                                <option>Allocated</option>
                                <option>Faulty</option>
                                <option>Good</option>
                                <option>Return</option>
                            </Form.Select>
                            <Form.Label className="text-primary fw-bold">STB State</Form.Label>
                        </Form.Floating>
                    </div>

                    <div className="d-flex justify-content-evenly">
                        <Form.Floating className="col-3 mb-3">
                            <Form.Control placeholder="STBs" defaultValue={customer.STBs} />
                            <Form.Label className="text-primary fw-bold">STBs</Form.Label>
                        </Form.Floating>

                        <Form.Floating className="col-4 mb-3">
                            <Form.Select placeholder="SD/HD" defaultValue={customer.SD_HD} >
                                <option>SD</option>
                                <option>HD</option>
                                <option>HD Jio</option>
                            </Form.Select>
                            <Form.Label className="text-primary fw-bold">SD/HD</Form.Label>
                        </Form.Floating>

                        <Form.Floating className="col-5 mb-3">
                            <Form.Control placeholder="A/c No" defaultValue={customer.AcNo} />
                            <Form.Label className="text-primary fw-bold">A/c No</Form.Label>
                        </Form.Floating>
                    </div>

                    <Form.Floating className="mb-3">
                        <Form.Control placeholder="STB Sr No" defaultValue={customer.STB_SN} />
                        <Form.Label className="text-primary fw-bold">STB Sr No</Form.Label>
                    </Form.Floating>

                    <Form.Floating className="mb-3">
                        <Form.Control placeholder="NDS No" defaultValue={customer.NDS_No} />
                        <Form.Label className="text-primary fw-bold">NDS No</Form.Label>
                    </Form.Floating>

                    <div className="d-flex justify-content-evenly">
                        <Form.Floating className="mb-3">
                            <Form.Control placeholder="VC/NDS/MAC ID" defaultValue={customer.VC_NDS_MAC_ID} />
                            <Form.Label className="text-primary fw-bold">VC/NDS/MAC ID</Form.Label>
                        </Form.Floating>

                        <Form.Floating className="mb-3">
                            <Form.Control placeholder="LCO Code" defaultValue={customer.LCOCode} />
                            <Form.Label className="text-primary fw-bold">LCO Code</Form.Label>
                        </Form.Floating>
                    </div>
                </FormGroup> */}

                {/* <FormGroup className="col border shadow rounded p-3">
                    <span className="fw-bold text-secondary">Seed Info</span>
                    <div className="d-flex justify-content-evenly mt-3">
                        <Form.Floating className="col-6 mb-3">
                            <Form.Select placeholder="Location" defaultValue={customer.STBLocation} >
                                <option>INLINE</option>
                                <option>CAMEIN</option>
                                <option>LEFTOUT</option>
                                <option>OUTGONE</option>
                            </Form.Select>
                            <Form.Label className="text-primary fw-bold">Location</Form.Label>
                        </Form.Floating>

                        <Form.Floating className="col-6 mb-3">
                            <Form.Select placeholder="Seed Type" defaultValue={customer.SeedType} >
                                <option>NEW</option>
                                <option>REPAIRED</option>
                                <option>SAME-LINE</option>
                                <option>SAME-CITY</option>
                                <option>OUT-LINE</option>
                                <option>OUT-CITY</option>
                                <option>OUT-DIST</option>
                                <option>OUT-STATE</option>
                            </Form.Select>
                            <Form.Label className="text-primary fw-bold">Seed Type</Form.Label>
                        </Form.Floating>
                    </div>

                    <Form.Floating className="mb-3">
                        <Form.Select placeholder="Origin" defaultValue={customer.Origin} >
                            <option>Hingoli Store</option>
                            <option>Aurangabad Store</option>
                        </Form.Select>
                        <Form.Label className="text-primary fw-bold">Origin</Form.Label>
                    </Form.Floating>

                    <Form.Floating className="mb-3">
                        <Form.Select placeholder="Area/ Person" defaultValue={customer.AreaPerson} >
                            <option>Ajam Colony</option>
                            <option>Balu Chakke</option>
                            <option>Khwaja Mohammadiya Colony, Shivraj Nagar</option>
                            <option>Hingoli Office Staff</option>
                            <option>Madhav Bangar</option>
                            <option>N P Colony</option>
                            <option>Naik Nagar, NTC</option>
                            <option>Nandalal Sahu</option>
                            <option>Rajesh Chavan</option>
                            <option>Risala</option>
                            <option>Sanjay Ghawad</option>
                            <option>Santosh Afune</option>
                            <option>Sharad Jogdand</option>
                            <option>SRPF Quarter</option>
                            <option>Tofkhana</option>
                        </Form.Select>
                        <Form.Label className="text-primary fw-bold">Area/ Person</Form.Label>
                    </Form.Floating>

                    <Form.Floating className="mb-3">
                        <Form.Select placeholder="Area Manager" defaultValue={customer.AreaManager} >
                            <option>Balu Chakke</option>
                            <option>Madhav Bangar</option>
                            <option>Prakash Mujmule</option>
                            <option>Rajesh Chavan</option>
                            <option>Sanjay Ghawad</option>
                            <option>Santosh Afune</option>
                            <option>Sharad Jogdand</option>
                        </Form.Select>
                        <Form.Label className="text-primary fw-bold">Area Manager</Form.Label>
                    </Form.Floating>

                    <Form.Floating className="mb-3">
                        <Form.Control placeholder="Remark" defaultValue={customer.Remark} />
                        <Form.Label className="text-primary fw-bold">Remark</Form.Label>
                    </Form.Floating>
                </FormGroup> */}
            </Form>


            {customer ?
                <div className="d-flex justify-content-around my-4">
                    <Button variant="danger">Delete</Button>
                    <Button variant="warning">Update</Button>
                </div>
                :
                <Button variant="success" className="my-4">Save</Button>
            }
        </>
    )
}

export default CustomerView