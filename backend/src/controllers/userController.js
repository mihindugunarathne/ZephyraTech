export const getMe = (req, res) => {
  // req.user comes from JWT middleware
  res.json({
    message: "Protected data access Successfully!",
    user: req.user,
  });
};
