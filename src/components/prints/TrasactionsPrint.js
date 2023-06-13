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
            <div>Set printer setting to
                Custome Margines: Left:3.5mm, Right:3.5mm, Top:3.5mm, Bottom:40mm
                and Customized Scale: 70
            </div>

            <div className="d-flex justify-content-around align-items-center text-start border rounded-top">
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


            <Table ref={tableRef} style={{ width: "100%" }}
                className="fs-5 table-striped table-bordered align-top text-start">
                <thead >
                    <tr>
                        <th className='text-center'>Sr.No.</th>
                        {rcDate && <th>Date & Time</th>}
                        {lastDate && <th>Last Date</th>}
                        <th >A/c No. & ID</th>
                        <th>Area||Person.</th>
                        <th>Customer Details</th>
                        {lcoPrice && <th>LCO Price</th>}
                        <th>Bill</th>
                        {(!rcDate || !lastDate || !lcoPrice) &&
                            < th > Annotations</th>
                        }
                    </tr>
                </thead>
                <tbody>
                    {filteredSummarizedTransactions.map((trasactions, index) => {
                        totalBill += parseFloat(trasactions.Bill);
                        totalLCOPrice += parseFloat(trasactions.LCOPrice);


                        return <tr key={index} >
                            <td style={{ width: "5%" }} className="text-end">{index + 1}.</td>
                            {rcDate &&
                                <td style={{ width: "8%" }} className="text-nowrap">
                                    {DateTime.fromISO(trasactions.TransactionDateTime).toFormat("dd-LLL-yy")}<br />
                                    {DateTime.fromISO(trasactions.TransactionDateTime).toFormat("hh:mm a")}
                                </td>
                            }

                            {lastDate &&
                                <td style={{ width: "8%" }} className="text-nowrap">
                                    {DateTime.fromISO(trasactions.ExpiryDate).toFormat("dd-LLL-yy")}
                                </td>
                            }
                            <td style={{ width: "12%", wordBreak: "break-word" }}>
                                Ac:{trasactions.AcNo}<br />
                                ID:{trasactions.Customer?.VC_NDS_MAC_ID || "N/A"}
                            </td>

                            <td style={{ width: "8%" }}>
                                {trasactions.Customer?.AreaPerson || "Area||Person N/A"}
                            </td>

                            <td style={{ width: "25%" }}>
                                {trasactions.Customer?.CustName || "Name N/A"} <br />
                                {trasactions.Customer?.Area || "Area N/A"}<br />
                                {trasactions.Customer?.MobNo || "Mobile N/A"}
                            </td>

                            {lcoPrice &&
                                <td style={{ width: "7%" }}>₹{trasactions.LCOPrice}</td>
                            }
                            <td style={{ width: "7%" }}>₹{trasactions.Bill}</td>

                            {(!rcDate || !lastDate || !lcoPrice) &&
                                <td style={{ width: "33%" }} />
                            }
                        </tr>
                    }
                    )}
                </tbody>

                <tr className="fw-bold  text-nowrap">
                    <td />
                    {rcDate && <td />}
                    {lastDate && <td />}
                    <td /> <td />
                    <td className="fs-5 text-end">Total:</td>
                    {lcoPrice &&
                        <td className="fs-5">₹{totalLCOPrice.toFixed(2)}</td>
                    }
                    <td className="fs-5">₹{totalBill.toFixed(2)}</td>
                </tr>
            </Table>
        </Container >
    )
}

export default TrasactionsPrint