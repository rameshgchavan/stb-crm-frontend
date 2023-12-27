import { Button, Container, Form, FormGroup } from "react-bootstrap"
import { useSelector } from "react-redux";
import fileDownload from "js-file-download";

import { createCustomers, downloadCustomersSampleFile } from "../../crudAPIs/customersAPIs";
import { useState } from "react";
import papaParse from "papaparse";

// This component used by pages/SettingPage.js
// This component used for uploading customers in bulk
export const BulkCustomers = () => {
    const scrutinizedUser = useSelector(state => state.scrutinyUserReducer);

    const [file, setFile] = useState();
    const [isUploading, setIsUploading] = useState(false);

    const handleUpload = async () => {
        // let formData = new FormData();
        // formData.append('csvFile', file);

        papaParse.parse(file, {
            skipEmptyLines: true,
            header: true,
            complete: async (data) => {
                setIsUploading(true);

                const fileData = data.data.filter(data => data.AcNo != "");

                const resp = await createCustomers(scrutinizedUser, fileData);
                alert(resp.message);

                setIsUploading(false);
            }
        });
    }

    const handleDownload = async () => {
        const file = await downloadCustomersSampleFile(scrutinizedUser);
        fileDownload(file, "Bulk Customers.xlsx")
    }

    return (
        <Container className="rounded shadow p-3">
            <div className="d-flex">
                <Button variant="warning" size="sm" className="align-self-start mb-1"
                    onClick={handleDownload}
                >Download sample file</Button>

                <span className="ms-2 fw-bold">Customers</span>
            </div>

            <FormGroup className="d-flex">
                <Form.Control type="file" accept='.csv' className="me-2"
                    onChange={async (e) => {
                        setFile(e.target.files[0]);
                    }}
                />

                {file?.type === "text/csv" && !isUploading &&
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

export default BulkCustomers;
