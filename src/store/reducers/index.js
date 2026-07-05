import { combineReducers } from "redux";
import { errorReducer } from "./errorReducer";
import successReducer from "./successReducer";
import rolesPermissionsReducer from "./rolesPermissionsReducer";
import auditLogsReducer from "./auditLogsReducer";
import locationsReducer from "./locationsReducer";
import assetsReducer from "./assetsReducer";
import eventsReducer from "./eventsReducer";
import usersReducer from "./usersReducer";
import productsReducer from "./productsReducer";

const rootReducer = combineReducers({
    success: successReducer,
    errors: errorReducer,
    roles: rolesPermissionsReducer,
    auditLogs: auditLogsReducer,
    locations: locationsReducer,
    assets: assetsReducer,
    events: eventsReducer,
    users: usersReducer,
    products: productsReducer
});

export default rootReducer;