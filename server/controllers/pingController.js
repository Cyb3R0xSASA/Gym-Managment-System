const ping = (req, res) => {
  res.status(200).json({ message: "Pong! Server is alive ✅" });
};

module.exports = { ping };
