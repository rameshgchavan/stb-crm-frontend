import { Form, FormGroup } from "react-bootstrap";
import { object } from "yup";

const SeedSection = ({ customersList, seed }) => {
    const {
        isFree,
        origin,
        areaPerson,
        areaManager,
        remark
    } = seed;

    const uniqueAreaPersons = customersList.filter((customers, index, array) => {
        return array.findIndex(object => object.AreaPerson == customers.AreaPerson) == index
    });

    const uniqueAreaManagers = customersList.filter((customers, index, array) => {
        return array.findIndex(object => object.AreaManager === customers.AreaManager) === index
    });

    return (
        <FormGroup className="col border shadow rounded p-3">
            <span className="fw-bold text-secondary">Seed Info</span>

            <Form.Floating className="my-3">
                <Form.Control name="origin" placeholder="Origin"
                    defaultValue={origin} required
                    list="originList" />
                <datalist id="originList">
                    <option>Hingoli Store</option>
                    <option>Aurangabad Store</option>
                </datalist>

                <Form.Label className="text-primary fw-bold">Origin</Form.Label>
            </Form.Floating>

            <Form.Floating className="mb-3">
                <Form.Control name="areaPerson" placeholder="Area || Person" defaultValue={areaPerson} required
                    list="areaPeronsList" />
                <datalist id="areaPeronsList">
                    {uniqueAreaPersons.map((customers, index) => {
                        return <option key={index} value={customers.AreaPerson}>{customers.AreaPerson}</option>
                    })}
                </datalist>

                <Form.Label className="text-primary fw-bold">Area || Person</Form.Label>
            </Form.Floating>

            <Form.Floating className="mb-3">
                <Form.Control name="areaManager" placeholder="Area Manager" defaultValue={areaManager} required
                    list="areaManagerList" />
                <datalist id="areaManagerList">
                    {uniqueAreaManagers.map((customers, index) => {
                        return <option key={index} value={customers.AreaManager}>{customers.AreaManager}</option>
                    })}
                </datalist>

                <Form.Label className="text-primary fw-bold">Area Manager</Form.Label>
            </Form.Floating>

            <Form.Floating className="mb-3">
                <Form.Control name="remark" placeholder="Remark" defaultValue={remark} required={isFree} />
                <Form.Label className="text-primary fw-bold">Remark</Form.Label>
            </Form.Floating>
        </FormGroup>
    )
}

export default SeedSection