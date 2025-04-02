module.exports = (req, res) => {
    res.status(200).json({
      message: "Screenshots are handled client-side using html2canvas"
    });
  };