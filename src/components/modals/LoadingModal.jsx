import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";

// This component used by pages/LoadingsPage, cards/LoadingCard and cards/TransactionCard
const LoadingModal = () => {
  const { isLoading: showMe } = useSelector(state => state.loadingReducer);

  if (!showMe) return null;

  return (
    <Modal show={showMe} className="d-flex align-items-center">
      <Modal.Header >
          <Modal.Title style={{ height: "16px", fontSize: "16px" }}>Please wait</Modal.Title>
        </Modal.Header>
      <Modal.Body className="text-center">
        <h4>Loading...</h4>
      </Modal.Body>
      {/* <Modal.Footer>
                    <Button variant="secondary" onClick={() => closeMe(false)}>
                        Close
                    </Button>
                </Modal.Footer> */}
    </Modal>
  )
}

export default LoadingModal