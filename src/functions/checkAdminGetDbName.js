
const checkAdminGetDbName = (loggedUser) => {
    const dbName = loggedUser.Admin == "self"
        ? loggedUser.Email.replace(".", "-")
        : loggedUser.Admin;

    const isAdmin = loggedUser.Admin == "self"
        || loggedUser.Admin == "stb-crm";

    return { isAdmin, dbName }
}

export default checkAdminGetDbName;