import { useRef, useState } from 'react';
import { Button, Container, Form, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { DateTime } from 'luxon';
import { useReactToPrint } from 'react-to-print';

// This component used by pages/TransactionsPage
// This component show print preview, save as pdf or print the transactions
const TransactionsPrint = () => {
    let totalBill = 0;
    let totalLCOPrice = 0;
    const tableRef = useRef();

    const [rcDate, setRcDate] = useState(true);
    const [lastDate, setLastDate] = useState(false);
    const [lcoPrice, setLCOPrice] = useState(false);

    // Get filtered summerized transactions from redux store
    const filteredSummarizedTransactions =
        useSelector(state => state.summarizedTransactionsFilterationReducer)?.data;

    // This function called on print button clicked
    // This function passes form data to print-to-react library
    const handlePrint = useReactToPrint({
        content: () => tableRef.current,
        documentTitle: "Transactions",
        onAfterPrint: () => alert("Printed")
    });

    return (
        <Container>
            <div className="d-flex justify-content-around align-items-center text-start border rounded">
                {/* Check boxes */}
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

            <Table ref={tableRef}
                className="table-striped table-bordered align-top text-start">
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

                        < th > Annotations</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredSummarizedTransactions.map((transactions, index) => {
                        totalBill += parseFloat(transactions.Bill);
                        totalLCOPrice += parseFloat(transactions.LCOPrice);

                        return <tr key={index} >
                            <td style={{ minWidth: "15mm", maxWidth: "15mm", width: "15mm" }} className="text-end">{index + 1}.</td>

                            <td style={{ minWidth: "30mm", maxWidth: "30mm", width: "30mm" }}>
                                {rcDate && <div style={{ lineHeight: "14px" }}>
                                    {DateTime.fromISO(transactions.TransactionDateTime).toFormat("dd-LLL-yy")}
                                    <div style={{ fontSize: "11px", }}>
                                        {DateTime.fromISO(transactions.TransactionDateTime).toFormat("hh:mm a")}
                                    </div>
                                </div>}

                                {lastDate && <div>
                                    {DateTime.fromISO(transactions.ExpiryDate).toFormat("dd-LLL-yy")}
                                </div>}

                                <div style={{ fontSize: "12px", lineHeight: "15px" }} className='text-wrap mt-1'>
                                    {transactions.Customer?.AreaPerson?.slice(0, 20)}
                                </div>
                            </td>

                            <td style={{ minWidth: "20mm", maxWidth: "20mm", width: "20mm" }}>
                                <div style={{ fontSize: "14px" }}>
                                    Ac:{transactions.AcNo?.slice(0, 6)}<br />
                                    {transactions.AcNo?.slice(6, 10)}
                                </div>
                                <div>
                                    ID:{transactions.Customer?.VC_NDS_MAC_ID?.slice(0, 5)}<br />
                                    {transactions.Customer?.VC_NDS_MAC_ID?.slice(5, 12)}
                                </div>
                            </td>

                            <td style={{ minWidth: "55mm", maxWidth: "55mm", width: "55mm" }} >
                                <div className="text-wrap fw-bold" style={{ height: "45px", lineHeight: "18px" }}>
                                    {transactions.Customer?.CustName}
                                </div>

                                <div>
                                    {transactions.Customer?.Area?.slice(0, 20)}<br />
                                    {transactions.Customer?.MobNo?.slice(0, 10)}
                                </div>
                            </td>

                            <td style={{ minWidth: "25mm", maxWidth: "25mm", width: "25mm" }}>
                                <div style={{ fontSize: "17px" }}>
                                    <b>₹{transactions.Bill}</b>
                                </div>

                                {lcoPrice && <div style={{ fontSize: "12px" }}>
                                    ₹{transactions.LCOPrice}<br />
                                </div>
                                }
                            </td>

                            <td> {transactions.Customer?.IsFree ? `Free: ${transactions.Customer?.Remark}` : ""}</td>
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
        </Container >
    )
}

export default TransactionsPrint