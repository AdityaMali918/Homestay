const express = require('express');
const cors = require('cors');
const app = express();
//mongodb
const mongoose = require("mongoose");
const UserModel = require('./models/User');
const Place = require('./models/Place')
//encryption
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bcryptSalt = bcrypt.genSaltSync(10);
//jwt where privatekey in jwt.sign
const jwtSecret = "asdakgmfdgsfdgfd";
require('dotenv').config();
//cookie
const cookieParser = require('cookie-parser');
//photo link uploader
const imageDownloader = require('image-downloader');
const fs = require('fs')
const multer = require('multer');
//booking
const Booking = require('./models/Booking')

// app.use('/uploads',express.static(__dirname+"\\uploads\\"));//image uploading from uploads

app.use('/uploads', express.static(__dirname + "/uploads"));

app.use(express.json());

app.use(cookieParser());

//app.use(cors({
//     credentials: true,
//     origin: 'http://localhost:5173',
// }));

//app.use(cors());

// app.use(cors({
//     credentials: true,
//     origin: 'http://localhost:5173',
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     allowedHeaders: 'Content-Type, Authorization',
// }));

// const corsOptions = {
//     origin: 'https://airbnbclone-app.onrender.com',
//     credentials: true,
// };

// app.use(cors(corsOptions));

app.use(cors({
    origin:'https://airbnbclone-app.onrender.com',
}))

//MONGOOSE
mongoose.connect(process.env.MONGO_URL);


app.get('/test', (req, res) => {
    res.json("test ok")
});



app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userDoc = await UserModel.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
        });


        // Only return necessary user information
        const userData = {
            _id: userDoc._id,
            name: userDoc.name,
            email: userDoc.email,
        };

        res.status(200).json(userData); // Use 200 status for success
    } catch (e) {
        console.error('Registration error:', e);
        res.status(422).json({ error: 'Registration failed' }); // Use 422 status for failure
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const userDoc = await UserModel.findOne({ email });

    if (userDoc) {
        const passOk = bcrypt.compareSync(password, userDoc.password);

        if (passOk) {
            jwt.sign({ email: userDoc.email, id: userDoc._id, name: userDoc.name }, jwtSecret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(userDoc);
            });
        } else {
            res.status(422).json('password not ok');
        }
    } else {
        res.status(404).json('not found'); // Adjusted status to 404 for not found
    }
});


app.get('/profile', async (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const userDoc = await UserModel.findById(userData.id); // Use findById to fetch user data

            if (userDoc) {
                const { name, email, _id } = userDoc;
                res.json({ name, email, _id });
            } else {
                res.status(404).json({ error: 'User not found' }); // Adjusted status to 404 for user not found
            }
        });
    } else {
        res.json({ token: null });
    }
});

//console.log({__dirname})
app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true);
})

app.post('/upload-by-link', async (req, res) => {
    const { link } = req.body;
    const newName = 'photo' + Date.now() + '.jpg';
    await imageDownloader.image({
        url: link,
        dest: __dirname + '/uploads/' + newName,
    });
    res.json(newName);
})

const photosMiddleware = multer({ dest: 'uploads/' });

// app.post('/upload',photosMiddleware.array('photos',100),(req,res)=>{
//     const uploadedFiles = [];
//     for(let i=0;i<req.files.length;i++){
//         const {path,originalname} = req.files[i];
//         const parts = originalname.split('.');
//         const ext = parts[parts.length-1];
//         const newPath =path+'.'+ext;
//         fs.renameSync(path,newPath); 

//         uploadedFiles.push(newPath.replace('uploads/',''));
//     }
//   res.json(uploadedFiles);
// });

app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath);

        // Remove the 'uploads/' part from the path before pushing to the array
        uploadedFiles.push(newPath.replace('uploads/', ''));
    }
    res.json(uploadedFiles);
});

app.post('/places', (req, res) => {
    const { token } = req.cookies;
    const{
        title,
        address,
        addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,price,
    }=req.body
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        //const userDoc = await UserModel.findById(userData.id); // Use findById to fetch user data
       const placeDoc= await Place.create({
            owner: userData.id,
            title,
            address,
            photos:addedPhotos,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,price,
        })
       res.json(placeDoc);
    });

   
})


app.get('/user-places',(req,res)=>{
    const {token} =req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const {id}=userData;
        res.json(await Place.find({owner:id}));
    });
})

app.get('/places/:id',async (req,res)=>{
   const{id}=req.params;
   res.json(await Place.findById(id));
})

app.put('/places',async (req,res)=>{
    const { token } = req.cookies;
    const{id,
        title,
        address,
        addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,price,
    }=req.body
   
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const placeDoc=await Place.findById(id);
        if(userData.id === placeDoc.owner.toString()){
            placeDoc.set({
                title,
                address,
                photos:addedPhotos,
                description,
                perks,
                extraInfo,
                checkIn,
                checkOut,
                maxGuests,price
            })
            await placeDoc.save();
            res.json('ok');
        }
    });

});


app.get('/places',async (req,res)=>{
    res.json(await Place.find({}));
})

function getUserDataFromReq(req){
    return new Promise((resolve,rejects)=>{
        jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
            if(err) throw err;
            resolve(userData);
        });
    });
};

app.post('/bookings',async (req,res)=>{
    const userData=await getUserDataFromReq(req);
    const {place,checkIn,checkOut,numberOfGuests,name,phone,price,}=req.body;
    Booking.create({
        place,checkIn,checkOut,numberOfGuests,name,phone,price,user:userData.id,
    }).then((doc)=>{
        res.json(doc);
    }).catch((err)=>{
        throw err;
    });

});


app.get('/bookings',async (req,res)=>{
    const userData = await getUserDataFromReq(req);
    res.json(await Booking.find({user:userData.id}).populate('place'))
})

app.listen(4000, () => {
    console.log('LISTENING PORT 4000');
});



