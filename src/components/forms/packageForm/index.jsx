import { useParams } from "react-router-dom";
import { Form } from "react-bootstrap";

import CustomerSection from "./CustomerSection";
import PackageSection from "./PackageSection";
// import BillSection from "./BillSection";

const PackageForm = () => {
    const { acNo } = useParams();
    const { transactionDate } = useParams();

    return (
        <Form >
            <div className="mx-sm-3">
                <CustomerSection acNo={acNo} />

                <PackageSection acNo={acNo} transactionDate={transactionDate} />

                {/* <BillSection acNo={acNo} /> */}
            </div>
        </Form>
    )
}

export default PackageForm