import { Button, Form, FormGroup } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import { DateTime } from "luxon";

const TransactionCard = ({ transaction, srNo }) => {
    const navigate = useNavigate();

    // Destructured and put aliases. Here rechargeDate is an alias of TransactionDateTime
    // Its not an object of key value pair.
    const {
        TransactionDateTime: rechargeDate,
        Bill: bill,
        AcNo: acNo
    } = transaction;

    const id = transaction?.Customer?._id;
    const name = transaction?.Customer?.CustName;
    const area = transaction?.Customer?.Area;
    const address = transaction?.Customer?.Address;
    const mobile = transaction?.Customer?.MobNo;
    const areaPerson = transaction?.Customer?.AreaPerson;
    const areaManager = transaction?.Customer?.AreaManager;

    return (
        <Form >
            <FormGroup className="border rounded shadow px-3 py-2 mb-3" style={{ width: "20rem" }}>
                <Form.Label className="d-flex justify-content-between fw-bold">
                    <div className="fs-6 fw-bold text-start">{srNo}.</div>
                    <div className="fs-6 fw-bold text-danger">{DateTime.fromISO(rechargeDate).toFormat("dd-LLL-yy")}</div>
                    <div className="fs-6 fw-bold">A/c:{acNo}</div>
                </Form.Label>

                <Form.Label className="d-block text-uppercase fw-bold text-primary text-truncate">{name ? name : "NA"}</Form.Label>
                <Form.Label className="d-block text-truncate">{area}<br /> {mobile ? mobile : "NA"}</Form.Label>

                <div className="d-flex justify-content-between">
                    <Button variant="danger">₹{bill}</Button>
                    <Button size="sm" className="align-self-end"
                        onClick={() => { navigate(`/customer/${id}`) }}
                    >more...</Button>
                </div>

                <hr />
                <Form.Label className="d-flex justify-content-between text-truncate" >
                    <div className="me-3 lh-1">
                        <span style={{ fontSize: "x-small" }}>
                            {areaManager ? "Manager" : "NA"}
                        </span><br />
                        <span style={{ fontSize: "smaller", fontWeight: "bold" }}>
                            {areaManager ? areaManager : "NA"}
                        </span>
                    </div>

                    <div className="text-truncate lh-1">
                        <span style={{ fontSize: "x-small" }}>
                            {areaPerson != areaManager && "Area"}
                        </span><br />
                        <span style={{ fontSize: "smaller", fontWeight: "bold" }}>
                            {areaPerson != areaManager && areaPerson}
                        </span>
                    </div>
                </Form.Label>
            </FormGroup>
        </Form>
    )
}

export default TransactionCard