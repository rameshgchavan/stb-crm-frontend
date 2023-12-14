import { Form } from "react-bootstrap";

import CustomerSection from "./CustomerSection";
import PackageSection from "./PackageSection";

// This component combines customer and package components
// This index component used by modals/PackageModal
const PackageForm = ({ transaction }) => {
    const { customer } = transaction

    return (
        <Form >
            <div className="mx-sm-3">
                <CustomerSection customer={customer} />
                <PackageSection transaction={transaction} />
            </div>
        </Form>
    )
}

export default PackageForm