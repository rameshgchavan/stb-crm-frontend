import checkAdminGetDbName from "../../functions/checkAdminGetDbName"
import axios from "axios";

// Get all Plans
const readPlans = async (scrutinizedUser) => {
    const { dbName } = checkAdminGetDbName(scrutinizedUser);

    return (
        (await axios(`/plans`,
            {
                method: "get",
                headers: { authorization: `bearer ${scrutinizedUser.token}`, dbName }
            }
        ))?.data
    );
};

//Download Bulk Plans.xlsx file
const downloadPlansSampleFile = async (scrutinizedUser) => {
    return (
        (await axios(`/plans/download`,
            {
                method: "post",
                headers: { authorization: `bearer ${scrutinizedUser.token}` },
                responseType: "blob"
            }
        ))?.data
    )
};

export {
    readPlans,
    downloadPlansSampleFile
}