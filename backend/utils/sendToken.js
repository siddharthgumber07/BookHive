export const sendToken = (user, statusCode, message, res) => {
    try {
      const token = user.generateToken();
  
      const cookieExpireDays = Number(process.env.COOKIE_EXPIRE || 3);
      if (!token) throw new Error("Token generation failed");
  
      res
        .status(statusCode)
        .cookie("token", token, {
          expires: new Date(Date.now() + cookieExpireDays * 24 * 60 * 60 * 1000),
          secure:true,
          sameSite: "None",
        })
        .json({
          success: true,
          user,
          message,
          token,
        });
    } catch (error) {
      console.error("Error in sendToken:", error.message);
      res.status(500).json({
        success: false,
        message: "Internal Server Error during token sending",
        error: error.message,
      });
    }
  };
  