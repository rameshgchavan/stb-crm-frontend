import { useRef, useState } from 'react';
import { Button, Container, Form, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { DateTime } from 'luxon';
import { useReactToPrint } from 'react-to-print';

const TrasactionsPrint = () => {
    let totalBill = 0;
    let totalLCOPrice = 0;
    const tableRef = useRef();

    const [rcDate, setRcDate] = useState(true);
    const [lastDate, setLastDate] = useState(false);
    const [lcoPrice, setLCOPrice] = useState(false);

    const filteredSummarizedTransactions =
        useSelector(state => state.summarizedTransactionsFilterationReducer)?.data;

    const handlePrint = useReactToPrint({
        content: () => tableRef.current,
        documentTitle: "Trasactions",
        onAfterPrint: () => alert("Printed")
    });

    return (
        <Container>
            {/* <div>Set printer setting to
                Custome Margines: Left:3.5mm, Right:3.5mm, Top:3.5mm, Bottom:10mm
                and Customized Scale: 70
            </div> */}

            <div className="d-flex justify-content-around align-items-center text-start border rounded">
                <Form.Group className="d-flex justify-content-start align-items-center">
                    <Form.Check variant="outline-primary" type="checkbox" name="rcDate" label="Rechage Date"
                        defaultChecked
                        className="me-sm-3 text-primary fw-bold"
                        onClick={() => setRcDate(!rcDate)}
                    />
                    <Form.Check variant="outline-primary" type="checkbox" name="lastDate" label="Last Date"
                        className="me-sm-3 text-primary fw-bold"
                        onClick={() => setLastDate(!lastDate)}
                    />
                    <Form.Check variant="outline-primary" type="checkbox" name="lcoPrice" label="LCO Price"
                        className="me-sm-3 text-primary fw-bold"
                        onClick={() => setLCOPrice(!lcoPrice)}
                    />
                </Form.Group>

                <Button variant="success" size="sm" className="my-4"
                    onClick={() => handlePrint()}
                >Print</Button>
            </div>

            <div ref={tableRef} style={{ width: "210mm", marginLeft: "5mm" }}>
                <Table className="table-striped table-bordered align-top text-start">
                    <thead >
                        <tr>
                            <th className='text-center'>Sr.No.</th>
                            <th>
                                {rcDate && <span>Date & Time<br /></span>}
                                {lastDate && <span>Last Date</span>}
                            </th>

                            <th >A/c No. & ID</th>
                            <th>Customer Details</th>
                            <th>
                                {lcoPrice && <span>LCO Price <br /></span>}
                                <span>Bill</span>
                            </th>

                            {/* {(!rcDate || !lastDate || !lcoPrice) &&
                                < th > Annotations</th>
                            } */}
                            < th > Annotations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSummarizedTransactions.map((trasactions, index) => {
                            totalBill += parseFloat(trasactions.Bill);
                            totalLCOPrice += parseFloat(trasactions.LCOPrice);


                            return <tr key={index} >
                                <td style={{ minWidth: "15mm", maxWidth: "15mm", width: "15mm" }} className="text-end">{index + 1}.</td>

                                <td style={{ minWidth: "30mm", maxWidth: "30mm", width: "30mm" }}>
                                    {rcDate && <div style={{ lineHeight: "14px" }}>
                                        {DateTime.fromISO(trasactions.TransactionDateTime).toFormat("dd-LLL-yy")}
                                        <div style={{ fontSize: "12px", }}>
                                            {DateTime.fromISO(trasactions.TransactionDateTime).toFormat("hh:mm a")}
                                        </div>
                                    </div>}

                                    {lastDate && <div>
                                        {DateTime.fromISO(trasactions.ExpiryDate).toFormat("dd-LLL-yy")}
                                    </div>}

                                    <div style={{ fontSize: "12px", lineHeight: "15px" }} className='text-wrap mt-1'>
                                        {trasactions.Customer?.AreaPerson?.slice(0, 20) || "N/A"}
                                    </div>
                                </td>

                                <td style={{ minWidth: "20mm", maxWidth: "20mm", width: "20mm" }} className="text-nowrap">
                                    Ac:{trasactions.AcNo?.slice(0, 4)}<br />
                                    {trasactions.AcNo?.slice(4, 10)}<br />
                                    ID:{trasactions.Customer?.VC_NDS_MAC_ID?.slice(0, 5) || "N/A"}<br />
                                    {trasactions.Customer?.VC_NDS_MAC_ID?.slice(5, 12)}
                                </td>

                                <td style={{ minWidth: "55mm", maxWidth: "55mm", width: "55mm" }} >
                                    <div className="text-wrap fw-bold" style={{ height: "45px", lineHeight: "18px" }}>
                                        {trasactions.Customer?.CustName || "Name N/A"}
                                    </div>

                                    <div>
                                        {trasactions.Customer?.Area?.slice(0, 20) || "Area N/A"}<br />
                                        {trasactions.Customer?.MobNo?.slice(0, 10) || "Mobile N/A"}
                                    </div>
                                </td>


                                <td style={{ minWidth: "25mm", maxWidth: "25mm", width: "25mm" }}>
                                    <div style={{ fontSize: "18px" }}>
                                        <b>₹{trasactions.Bill}</b>
                                    </div>

                                    {lcoPrice && <div style={{ fontSize: "12px" }}>
                                        ₹{trasactions.LCOPrice}<br />
                                    </div>
                                    }
                                </td>

                                <td />
                            </tr>
                        }
                        )}
                    </tbody>

                    <tr style={{ height: "25mm" }}>
                        <td />
                        <td />
                        <td />
                        <td className="text-end"><b >Total:</b ></td>
                        <td >
                            <div >
                                <b> ₹{totalBill.toFixed(2)}</b>
                            </div >
                            {lcoPrice && <div >
                                ₹{totalLCOPrice.toFixed(2)}
                            </div>}
                        </td>
                    </tr>
                </Table>
            </div>
        </Container >
    )
}

export default TrasactionsPrint