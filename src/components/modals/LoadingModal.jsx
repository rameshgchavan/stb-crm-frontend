import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";

// This component used by pages/LoadingsPage, cards/LoadingCard and cards/TransactionCard
const LoadingModal = () => {
  const { isLoading: showMe } = useSelector(state => state.loadingReducer);
  
  if (!showMe) return null;

  return (
    <div >
      <Modal show={showMe} fullscreen={true}>
        <Modal.Header closeButton>
          <Modal.Title style={{ height: "16px", fontSize: "16px" }}>Loading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>Loading... please wait</h3>
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

export default LoadingModal