const orderByToObject = (orderBy, allowed) => {
    let newObject = {};

    if (orderBy) {
        orderBy = orderBy.includes(";") ? orderBy.split(";") : [orderBy];

        orderBy.length > 0 &&
            orderBy.map((value) => {
                let order = value.split("-");
                let columnName = allowed.find((item) => item == order[0]);
                if (columnName && (order[1] == "desc" || order[1] == "asc")) {
                    newObject = Object.assign({}, newObject, {
                        [columnName]: order[1],
                    });
                }
            });
    }

    return Object.values(newObject).length > 0 ? newObject : false;
};

module.exports = { orderByToObject };
