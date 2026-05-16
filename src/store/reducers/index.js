import { combineReducers } from "redux";
import { errorReducer } from "./errorReducer";
import successReducer from "./successReducer";
import rolesPermissionsReducer from "./rolesPermissionsReducer";
import auditLogsReducer from "./auditLogsReducer";

const rootReducer = combineReducers({
    success: successReducer,
    errors: errorReducer,
    roles: rolesPermissionsReducer,
    auditLogs: auditLogsReducer
});

export default rootReducer;