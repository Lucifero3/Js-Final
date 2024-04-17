const express = require("express");
const path = require("path");
const app = express();
const LogInCollection = require("./mongo");
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const templatePath = path.join(__dirname, '../templates');
const publicPath = path.join(__dirname, '../public');

app.set('view engine', 'hbs');
app.set('views', templatePath);
app.use(express.static(publicPath));

// GET routes
app.get('/signup', (req, res) => {
    res.render('signup');
});
app.get('/', (req, res) => {
    res.render('login');
});

// POST /signup route
app.post('/signup', async (req, res) => {
    try {
        const { name, password } = req.body;

        const existingUser = await LogInCollection.findOne({ name });
        if (existingUser) {
            return res.status(409).send("User details already exist");
        }

        const newUser = new LogInCollection({ name, password });
        await newUser.save();

        return res.status(201).render("home", { naming: name });
    } catch (error) {
        console.error("Signup Error:", error);
        return res.status(500).send("An error occurred during signup");
    }
});

// POST /login route
app.post('/login', async (req, res) => {
    try {
        const { name, password } = req.body;
        const user = await LogInCollection.findOne({ name });

        if (!user) {
            return res.status(404).send("User not found");
        }
        if (user.password === password) {
            return res.status(200).render("home", { naming: name });
        } else {
            return res.status(401).send("Incorrect password");
        }
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).send("An error occurred during login");
    }
});





const passport = require("passport");
const GitHubStrategy = require("passport-github").Strategy;
const session = require("express-session");


// const User = require('./models/User'); // Adjust the path based on your project structure





// Replace 'yourClientID' and 'yourClientSecret' with the actual values from GitHub
passport.use(new GitHubStrategy({
    clientID: '4cab5f0d20dde4277fc1',
    clientSecret: '9ae321f6b5455c903cb66cdcc2dad0912525d8dc',
    callbackURL: "http://localhost:3000/auth/github/callback"
  },


  async (accessToken, refreshToken, profile, cb) => {
    try {
      let user = await LogInCollection.findOne({ githubId: profile.id });

      if (!user) {
        // The user does not exist, so create a new user
        user = await LogInCollection.create({
          githubId: profile.id,
          name: profile.displayName,
          // Include other profile information as needed
        });
      }

      return cb(null, user);
    } catch (err) {
      console.error("GitHub Auth Error:", err);
      return cb(err, null);
    }
  }


//   async (accessToken, refreshToken, profile, cb) => {
//     try {
//       let user = await User.findOne({ githubId: profile.id });

//       if (!user) {
//         // The user does not exist, so create a new user
//         user = await User.create({
//           githubId: profile.id,
//           name: profile.displayName,
//           // Include other profile information as needed
//         });
//       }

//       return cb(null, user);
//     } catch (err) {
//       return cb(err, null);
//     }
//   }
));

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

// Use express-session and initialize passport
app.use(session({ secret: "secret", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());




// Route to start OAuth flow with GitHub
app.get('/auth/github',
  passport.authenticate('github'));

// Callback route that GitHub will redirect to
app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    req.session.success = 'You are successfully logged in with GitHub!';
    res.redirect('/');
  });

// Route to handle logout
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.get('/', (req, res) => {
    // Check if the user is logged in and render accordingly
    if (req.isAuthenticated()) {
        res.render('home', { user: req.user, message: req.session.success });
    } else {
        res.render('login');
    }
});






// Server listen
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Authentication middleware
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

// Routes setup
app.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.render('dashboard'); // Example protected route
});









///////////////////////////////

// Require the Product model at the top of your file
const ProductModel = require("./ProductModel"); // Adjust the path according to your project structure

// // Example route for rendering the products page
// app.get('/items', async (req, res) => {
//     try {
//         // Fetch all products from the database
//         const products = await ProductModel.find({});
        
//         // Render the item.hbs template, passing in the products data
//         res.render('item', { products });
//     } catch (error) {
//         console.error("Failed to fetch products:", error);
//         res.status(500).send("Error fetching products");
//     }
// });


app.get('/items', (req, res) => {
  // You might fetch some data to pass to the template here
  res.render('item', { /* data to pass to the template */ });
});


///////////////////


app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../templates/index.html'));
});
