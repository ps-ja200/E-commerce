router.get('/profile', authMiddleware, async (req, res) => {
    try {
      const user = await User.findById(req.session.userId);
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });