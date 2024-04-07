import { comparePassword, formatDataToSend, generateUsername, hashPassword, isValidEmail, isValidPassword } from "../helper/authHelper.js";
//schema
import User from "../Schema/User.js";
import admin from 'firebase-admin';

const signupController = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;
        if (!fullname) return res.status(400).json({ error: "Fullname is required." });
        if (fullname.length < 3) return res.status(400).json({ error: "Fullname must be at least 3 characters long." });
        if (!email) return res.status(400).json({ error: "Email is required." });
        if (!email.length) return res.status(400).json({ error: "Email is required." });
        if (!password) return res.status(400).json({ error: "Password is required." });
        if (!isValidEmail(email)) return res.status(400).json({ error: "Invalid email format." });
        if (!isValidPassword(password)) return res.status(400).json({ error: "Password must be between 6 and 20 characters long and contain at least one digit, one lowercase letter, and one uppercase letter." });
        const hashedPassword = await hashPassword(password);
        const username = await generateUsername(email);
        let user = new User({
            personal_info: { fullname, email, username, password: hashedPassword }
        })
        await user.save();
        return res.status(200).json(formatDataToSend(user));
    } catch (error) {
        if (error.code == 11000) return res.status(400).json({ error: "Email already exsists" })
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
};

const signinController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ "personal_info.email": email })
        if (!user) return res.status(403).json({ error: "Email not found" })
        if(user.google_auth) return res.status(403).json({error: "Account was created using google. Try logging with google."})
        const doesPasswordMatch = await comparePassword(password, user.personal_info.password);
        if (!doesPasswordMatch) return res.status(403).json({ error: "Incorrect Password" })
        return res.status(200).json(formatDataToSend(user));
    } catch (error) {
        console.error("error", error);
        return res.status(error.status || 500).json({ error: error.message });
    }
}

const googleAuthController = async (req, res) => {
    let { access_token } = req.body;
    admin.auth()
        .verifyIdToken(access_token)
        .then(async (decodedUser) => {
            let { email, name, picture } = decodedUser;
            picture = picture.replace("s96-c", "s384-c");
            let user = await User.findOne({ "personal_info.email": email }).select("personal_info.fullname personal_info.username personal_info.profile_img google_auth").then((u) => {
                return u || null;
            })
                .catch(err => {
                    return res.status(500).json({ error: err.message })
                })
            if (user) {//login
                if (!user.google_auth) {
                    return res.status(403).json({ error: "This email was signed up without google. Please log in with password to access the account" })
                }
            } else {//signup
                let username = await generateUsername(email);
                user = new User({
                    personal_info: { fullname: name, email, profile_img: picture, username },
                    google_auth: true
                })
                await user.save().then( (u) => {
                    user = u;
                })
                .catch(err => {
                    return res.status(500).json({error : err.message});
                })
            }
            return res.status(200).json(formatDataToSend(user));
        })
        .catch(err => {
            return res.status(500).json({error : "Failed to authenticate you with google. Try with some other google account"})
        });
}

export { signupController, signinController, googleAuthController };
