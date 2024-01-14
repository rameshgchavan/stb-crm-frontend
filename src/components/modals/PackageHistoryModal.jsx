import PackageHistoryCard from "../cards/PackageHistoryCard";
import { Modal } from "react-bootstrap";

// This component used by cards/CustomerCard
const PackageHistoryModal = ({ showMe, closeMe, title, customer, packageHistory }) => {
    if (!showMe) return null;

    return (
        <div >
            <Modal show={showMe} fullscreen={true} onHide={() => closeMe(false)}>
                <Modal.Header closeButton>
                    <Modal.Title style={{ height: "16px", fontSize: "16px" }}>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        packageHistory.length == 0 && <h4>Oops... no record found</h4>
                    }
                    {
                        packageHistory.map(packages =>
                            <div className="mb-3">
                                <PackageHistoryCard customer={customer} packageHistory={packages} />
                            </div>
                        )
                    }
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button variant="secondary" onClick={() => closeMe(false)}>
                        Close
                    </Button>
                </Modal.Footer> */}
            </Modal>
        </div>
    )
}

export default PackageHistoryModal