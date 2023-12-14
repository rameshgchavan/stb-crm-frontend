import BulkTransactions from "../components/settings/BulkTransactions";
import BulkCustomers from "../components/settings/BulkCutomers";
import BulkPlans from "../components/settings/BulkPlans";
import { Container } from "react-bootstrap";

// This page used by routes/PagesRoutes
// This page shows setting components
const SettingPage = () => {
    return (
        <Container className="rouded shadow p-3">
            <h4 className="mb-2">Bulk upload</h4>
            <div className="mb-3">
                <BulkCustomers />
            </div>

            <div className="mb-3">
                <BulkPlans />
            </div>

            <BulkTransactions />
        </Container>
    )
}

export default SettingPage;