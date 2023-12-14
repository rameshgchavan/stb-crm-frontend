import checkAdminGetDbName from "../../functions/checkAdminGetDbName"
import axios from "axios";

// Update a Plan
const updatePlan = async (scrutinizedUser, planName, planData) => {
    const { dbName } = checkAdminGetDbName(scrutinizedUser);

    return (
        (await axios(`/plans/update/`,
            {
                method: "put",
                headers: { authorization: `bearer ${scrutinizedUser.token}` },
                data: { dbName, planName, planData }
            }
        ))?.data
    );
};

export { updatePlan };