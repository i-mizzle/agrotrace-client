import { combineReducers } from "redux";
import { errorReducer } from "./errorReducer";
import successReducer from "./successReducer";
import rolesPermissionsReducer from "./rolesPermissionsReducer";
import auditLogsReducer from "./auditLogsReducer";
import locationsReducer from "./locationsReducer";
import assetsReducer from "./assetsReducer";

const rootReducer = combineReducers({
    success: successReducer,
    errors: errorReducer,
    roles: rolesPermissionsReducer,
    auditLogs: auditLogsReducer,
    locations: locationsReducer,
    assets: assetsReducer
});

export default rootReducer;