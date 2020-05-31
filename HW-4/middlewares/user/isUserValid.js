module.exports = async (req, res, next) => {
    try {
        const {name, email, password} = req.body;

        if (!name || !email || !password) throw new Error('User is not valid');

        if (name.length < 2 && name.length > 20) throw new Error('Name is not valid');

        if (password.length < 6) throw new Error('Password is not valid');

        next();
    } catch (e) {
        res.json({error: e.message});
    }
}