import checkAdminGetDbName from "../../functions/checkAdminGetDbName"
import axios from "axios";

// Save a new Plans to database
const createPlan = async (scrutinizedUser, planData) => {
    const { dbName } = checkAdminGetDbName(scrutinizedUser);
    return (
        (await axios(`/plans/save`,
            {
                method: "post",
                headers: { authorization: `bearer ${scrutinizedUser.token}` },
                data: { dbName, planData }
            }
        ))?.data
    );
};

// Bulk create Planss by sending csv file
const createPlans = async (scrutinizedUser, formData) => {
    const { dbName } = checkAdminGetDbName(scrutinizedUser);

    return (
        (await axios(`/plans/upload`,
            {
                method: "post",
                headers: { authorization: `bearer ${scrutinizedUser.token}`, dbName },
                data: formData
            }
        ))?.data
    )
};

export {
    createPlan,
    createPlans
}