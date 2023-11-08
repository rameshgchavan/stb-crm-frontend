import PackageForm from "../forms/packageForm";
import { Modal } from "react-bootstrap";

const PackageModal = ({ showMe, closeMe, title, acNo, transactionDate }) => {
    if (!showMe) return null;

    return (
        <div >
            <Modal show={showMe} fullscreen={true} onHide={() => closeMe(false)}>
                <Modal.Header closeButton>
                    <Modal.Title style={{ height: "16px" }}>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PackageForm acNo={acNo} transactionDate={transactionDate} />
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

export default PackageModal