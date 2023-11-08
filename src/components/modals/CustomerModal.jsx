import CustomerForm from "../forms/customerForm";
import { Modal } from "react-bootstrap";

const CustomerModal = ({ showMe, closeMe, title, id }) => {
    if (!showMe) return null;

    return (
        <div >
            <Modal show={showMe} fullscreen={true} onHide={() => closeMe(false)}>
                <Modal.Header closeButton>
                    <Modal.Title style={{ height: "16px" }}>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CustomerForm id={id} />
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

export default CustomerModal