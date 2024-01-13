import { Button, Container, Form, FormGroup } from "react-bootstrap"
import { useSelector } from "react-redux";

import { createTransactionsRequest, downloadTransactionsSampleFileRequest } from "../../apiRequests/transactionsAPIs";
import { useRef, useState } from "react";
import { DateTime } from "luxon";
import fileDownload from "js-file-download";
import papaParse from "papaparse";

// This component used by pages/SettingPage.js
// This component used for uploading transactions in bulk
const BulkTransactions = () => {
    const { scrutinizedUser } = useSelector(state => state.usersReducer);

    const [file, setFile] = useState();
    const [isUploading, setIsUploading] = useState(false);

    const selectedMonth = useRef(
        DateTime.now().minus({ months: 1 }).toFormat("LL")
    );
    const selectedYear = useRef(
        DateTime.now().toFormat("yyyy")
    );

    // Initialized array of months
    const monthsList = [
        { MMM: "Jan", MM: "01" }, { MMM: "Feb", MM: "02" },
        { MMM: "Mar", MM: "03" }, { MMM: "Apr", MM: "04" },
        { MMM: "May", MM: "05" }, { MMM: "Jun", MM: "06" },
        { MMM: "Jul", MM: "07" }, { MMM: "Aug", MM: "08" },
        { MMM: "Sep", MM: "09" }, { MMM: "Oct", MM: "10" },
        { MMM: "Nov", MM: "11" }, { MMM: "Dec", MM: "12" }
    ];

    // Initialized array of years and pushed year form 2022 to current year
    const yearsList = [];
    for (let year = DateTime.now().year; year >= 2022; year--) {
        yearsList.push(year);
    }

    const handleUpload = async () => {
        const yearMonth = DateTime.fromISO(`${selectedYear.current}-${selectedMonth.current}-01`).toFormat("yyyy-LLL");
        // let formData = new FormData();
        // formData.append('csvFile', file);

        papaParse.parse(file, {
            skipEmptyLines: true,
            header: true,
            complete: async (data) => {
                setIsUploading(true);

                const fileData = data.data.filter(data => data.CustomerID != "");
                const resp = await createTransactionsRequest(scrutinizedUser, fileData, yearMonth);

                alert(
                    `${resp.packagesBillsRes.message}, ${resp.packageCustomersRes.message} and ${resp.statisticsRes.message} uploaded successfully`
                );

                setIsUploading(false);
            }
        });
    }

    const handleDownload = async () => {
        const file = await downloadTransactionsSampleFileRequest(scrutinizedUser);
        fileDownload(file, "Bulk Transactions.xlsx")
    }

    return (
        <Container className="rounded shadow p-3">
            <div className="d-flex">
                <Button variant="warning" size="sm" className="align-self-start mb-1"
                    onClick={handleDownload}
                >Download sample file</Button>

                <span className="ms-2 fw-bold">Transactions</span>
            </div>

            <FormGroup className="d-flex mb-1">
                <Form.Select name="year" defaultValue={selectedYear.current}
                    style={{ width: "10rem" }}
                    onChange={(e) => selectedYear.current = e.target.value}
                >
                    {yearsList.map((year, index) =>
                        <option key={index} value={year}>{year}</option>
                    )}
                </Form.Select>

                <Form.Select name="month" defaultValue={selectedMonth.current}
                    style={{ width: "8rem" }}
                    onChange={(e) => selectedMonth.current = e.target.value}
                >
                    {monthsList.map((month, index) =>
                        <option key={index} value={month.MM}>{month.MMM}</option>
                    )}
                </Form.Select>
            </FormGroup>

            <FormGroup className="d-flex">
                <Form.Control type="file" accept='.csv' className="me-2"
                    onChange={async (e) => {
                        setFile(e.target.files[0]);
                    }}
                />

                {file?.type === "text/csv" && scrutinizedUser.BulkTransactions && !isUploading &&
                    <Button variant="success" size="sm"
                        onClick={handleUpload}
                    >Upload</Button>
                }

                {isUploading &&
                    <Button variant="success" size="sm" disabled
                    >Uploading wait...</Button>
                }
            </FormGroup>
        </Container>
    )
}

export default BulkTransactions;