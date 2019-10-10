const db = require("../data/db-config.js");

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove,
    addStep
};

function find() {
    return db("schemes");
}

function findById(id) {
    return db("schemes").where({id});
}

function findSteps(id) {
    return db("steps")
        .join("schemes", "steps.scheme_id", "=", "scheme.id")
        .where({scheme_id: id})
        .select("steps.id", "scheme.scheme_name", "steps.step_number", "steps.instructions")
        .orderBy("steps.step_number", "asc")
}

function add(scheme) {
    return db("schemes").insert(scheme)
}

function update(changes, id) {
    return db("schemes")
        .where({id})
        .update(changes)
}

function remove(id) {
    return db("schemes").where({id}).delete();
}

function addStep(step, scheme_id) {
    step = { ...step, scheme_id};
    return db("steps").insert(step)
}