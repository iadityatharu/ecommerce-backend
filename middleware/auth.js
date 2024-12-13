export const auth = async (req, res) => {
  try {
    const token = req.cookies?.token;
    console.log(token);
  } catch (error) {
    res.status(400).json({
      message: "Invalid credentials",
      data: [],
      error: true,
      success: false,
    });
  }
};
