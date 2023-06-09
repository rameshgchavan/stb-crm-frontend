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
            <Table ref={tableRef} style={{ fontSize: "1.2rem" }}
                className="table-striped table-bordered align-top text-start">
                <thead >
                    <tr>
                        <th className='text-center'>Sr.No.</th>
                        <th>Date & Time</th>
                        <th>A/c No. & ID</th>
                        <th>Name</th>
                        <th>Area Mob.No.</th>
                        <th>Bill</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredSummarizedTransactions.map((trasactions, index) => {
                        totalBill += parseFloat(trasactions.Bill);

                        return <tr key={index} style={{ height: "8rem" }}>
                            <td className="text-end">{index + 1}.</td>
                            <td className="text-nowrap">
                                {DateTime.fromISO(trasactions.TransactionDateTime).toFormat("dd-LLL-yy")}<br />
                                {DateTime.fromISO(trasactions.TransactionDateTime).toFormat("hh:mm a")}
                            </td>
                            <td>Ac:{trasactions.AcNo}<br />{trasactions.Customer.VC_NDS_MAC_ID}</td>
                            <td>{trasactions.Customer.CustName}</td>
                            <td>{trasactions.Customer.Area}<br />
                                {trasactions.Customer.MobNo}</td>
                            <td>₹{trasactions.Bill}</td>
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

            <Button variant="success" size="sm" className="my-4"
                onClick={() => handlePrint()}
            >Print</Button>
        </Container>
    )
}

export default TrasactionsPrint