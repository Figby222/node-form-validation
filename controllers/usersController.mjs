import usersStorage from "../storages/usersStorage.mjs";

function usersListGet(req, res) {
    res.render("users", {
        title: "User List",
        users: usersStorage.getUsers(),
    })
}

function usersCreateGet(req, res) {
    res.render("createUser", {
        title: "Create user",
    })
}

function usersCreatePost(req, res) {
    const { firstName, lastName } = req.body;
    usersStorage.addUser({ firstName, lastName });
    res.redirect("/users");
}

export { usersListGet, usersCreateGet, usersCreatePost }