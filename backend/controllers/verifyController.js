exports.verifyCode = async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({
        success: false,
        error: "Enter Verification Code",
      });
    } else if (code.length !== 6) {
      return res.status(400).json({
        success: false,
        error: "Code must be 6 characters long",
      });
    } else if (code[5] == 7) {
      return res.status(400).json({
        success: false,
        error: "Code must not end with 7",
      });
    }
    res
      .status(200)
      .json({ success: true, code, message: "Verification Successful." });
  } catch (err) {
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
