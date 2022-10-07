export var MODELS;
(function (MODELS) {
    MODELS["ACTION"] = "dami_rbac_actions";
    MODELS["ROLE"] = "dami_rbac_role";
    MODELS["USER_ROLE"] = "dami_rbac_user_role";
    MODELS["ROLE_ACTION"] = "dami_rbac_role_action";
})(MODELS || (MODELS = {}));
export const TableList = [
    {
        model_name: 'Actions',
        table_name: MODELS.ACTION,
    },
    {
        model_name: 'Actions',
        table_name: MODELS.ROLE,
    },
    {
        model_name: 'Actions',
        table_name: MODELS.ROLE_ACTION,
    },
    {
        model_name: 'Actions',
        table_name: MODELS.USER_ROLE,
    },
];
