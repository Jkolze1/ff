module.exports = function(app) {

  app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname, "./app/public/survey.html"));
  });

  // If no matching route is found default to home
  app.use("/index.html", function(req, res) {
    res.sendFile(path.join(__dirname, './app/public/index.html'));
  });
};