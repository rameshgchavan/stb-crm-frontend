import { Form } from "react-bootstrap";

import CustomerSection from "./CustomerSection";
import PackageSection from "./PackageSection";

const PackageForm = ({ acNo, transactionDate }) => {
    return (
        <Form >
            <div className="mx-sm-3">
                <CustomerSection acNo={acNo} />
                <PackageSection acNo={acNo} transactionDate={transactionDate} />
            </div>
        </Form>
    )
}

export default PackageForm