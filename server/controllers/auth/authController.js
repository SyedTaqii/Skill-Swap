const User = require('../../models/User');
const { hashPassword, comparePassword } = require('../../utils/hash');
const { generateToken } = require('../../utils/jwt');

exports.signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const hashed = await hashPassword(password);

        const user = new User({ name, email, password: hashed, role });
        await user.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: "User not found" });

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

        const token = generateToken(user);
        res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.verifyUser = async (req, res) => {
    const { code, userId } = req.body;
  
    // mock verification: any code works, or just check === "123456"
    if (code !== "123456") {
      return res.status(400).json({ error: "Invalid code" });
    }
  
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });
  
    user.verified = true;
    await user.save();
  
    res.json({ message: "User successfully verified" });
};
  
exports.resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: "User not found" });

  const hashed = await bcrypt.hash(newPassword, 10);
  user.password = hashed;
  await user.save();

  res.json({ message: "Password reset successful" });
};
