import usersStorage from "../storages/usersStorage.mjs";
import { body, validationResult } from "express-validator";

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters";

const validateUser = [
    body("firstName").trim()
        .isAlpha().withMessage(`First name ${alphaErr}`)
        .isLength({ min: 1, max: 10 }).withMessage(`First name ${lengthErr}`),
    body("lastName").trim()
    .isAlpha().withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 10 }).withMessage(`Last name ${lengthErr}`),
];

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

const usersCreatePost = [
    validateUser,
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("createUser", {
                title: "Create user",
                errors: errors.array(),
            });
        }
        const { firstName, lastName } = req.body;
        usersStorage.addUser({ firstName, lastName });
        res.redirect("/users");
    }
]

const usersUpdateGet = (req, res) => {
    const user = usersStorage.getUser(req.params.id);
    res.render("updateUser", {
        title: "Update User",
        user: user,
    })
}

const usersUpdatePost = [
    validateUser,
    (req, res) => {
        const user = usersStorage.getUser(req.params.id);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("updateUser", {
                title: "Update User",
                user: user,
                errors: errors.array(),
            });
        }
        const { firstName, lastName } = req.body;
        usersStorage.updateUser(req.params.id, { firstName, lastName });
        res.redirect("/users");
    }
]

function usersDeletePost(req, res) {
    usersStorage.deleteUser(req.params.id);
    res.redirect("/users");
}


export { usersListGet, usersCreateGet, usersCreatePost, usersUpdateGet, usersUpdatePost, usersDeletePost }