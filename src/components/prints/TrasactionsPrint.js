import { useRef, useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { DateTime } from 'luxon';
import { useReactToPrint } from 'react-to-print';

const TrasactionsPrint = () => {
    let totalBill = 0;
    const tableRef = useRef();

    const filteredSummarizedTransactions =
        useSelector(state => state.summarizedTransactionsFilterationReducer)?.data;

    const handlePrint = useReactToPrint({
        content: () => tableRef.current,
        documentTitle: "Trasactions",
        onAfterPrint: () => alert("Printed")
    });

    return (
        <Container>
            <div className="d-flex justify-content-around text-start">
                <div>Set printer setting to
                    Custome Margines: Left:3.5mm, Right:3.5mm, Top:3.5mm, Bottom:40mm
                    and Customized Scale: 70</div>
                <Button variant="success" size="sm" className="my-4"
                    onClick={() => handlePrint()}
                >Print</Button>
            </div>
            <Table ref={tableRef} style={{ width: "100%" }}
                className="fs-5 table-striped table-bordered align-top text-start">
                <thead >
                    <tr>
                        <th className='text-center'>Sr.No.</th>
                        <th>Date & Time</th>
                        <th >A/c No. & ID</th>
                        <th>Area||Person.</th>
                        <th>Customer Details</th>
                        <th>Bill</th>
                        <th>Annotations</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredSummarizedTransactions.map((trasactions, index) => {
                        totalBill += parseFloat(trasactions.Bill);

                        return <tr key={index} >
                            <td style={{ width: "5%" }} className="text-end">{index + 1}.</td>
                            <td style={{ width: "8%" }} className="text-nowrap">
                                {DateTime.fromISO(trasactions.TransactionDateTime).toFormat("dd-LLL-yy")}<br />
                                {DateTime.fromISO(trasactions.TransactionDateTime).toFormat("hh:mm a")}
                            </td>
                            <td style={{ width: "12%", wordBreak: "break-word" }}>
                                Ac:{trasactions.AcNo}<br />
                                ID:{trasactions.Customer.VC_NDS_MAC_ID}
                            </td>

                            <td style={{ width: "8%" }}>
                                {trasactions.Customer.AreaPerson}
                            </td>

                            <td style={{ width: "25%" }}>
                                {trasactions.Customer.CustName} <br />
                                {trasactions.Customer.Area}<br />
                                {trasactions.Customer.MobNo}
                            </td>

                            <td style={{ width: "7%" }}>₹{trasactions.Bill}</td>
                            <td style={{ width: "33%" }} />
                        </tr>
                    }
                    )}
                </tbody>

                <tr className="fw-bold  text-nowrap">
                    <td /> <td /> <td /> <td />
                    <td className="text-end">Total:</td>
                    <td className="fs-5">₹{totalBill.toFixed(2)}</td>
                </tr>
            </Table>
        </Container>
    )
}

export default TrasactionsPrint