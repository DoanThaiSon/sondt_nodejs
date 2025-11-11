export const getHomepage = (req, res) => {
  return res.render('home.ejs');
};

export const checkABC = (req, res) => {
  return res.send('Hello from checkABC');
};

export const getHoidanit = (req, res) => {
  return res.send('Hello from Hoi Dan IT');
};