import { Form } from "react-bootstrap";

import CustomerSection from "./CustomerSection";
import PackageSection from "./PackageSection";

// This component combines customer and package components
// This index component used by modals/PackageModal
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