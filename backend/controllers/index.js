const admin = require("firebase-admin");
const serviceAccount = require("../key.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

const authToken = process.env.AUTH_TOKEN;
const accountSid = process.env.ACCOUNT_SID;
const client = require("twilio")(accountSid, authToken);

const userController = {
  CreateNewAccessCode: (req, res) => {
    try {
      client.messages
        .create({
          from: "+19137331238",
          to: `${req.body.phoneNumber}`,
          body: Math.floor(100000 + Math.random() * 900000),
        })
        .then((message) => {
          const accessCode = message.body.split(" ").slice(-1).toString() ?? "";
          const userJson = {
            phoneNumber: req.body.phoneNumber,
            accessCode,
            created: new Date(Date.now()).toLocaleDateString(),
          };
          db.collection("users").add(userJson);
          res.status(200).json("SENT");
        });
    } catch (error) {
      res.json(error);
    }
  },
  ValidateAccessCode: async (req, res) => {
    try {
      let tmpArr = [];
      const userRef = db.collection("users");
      const response = await userRef.get();
      response.forEach((doc) => tmpArr.push(doc.data()));
      tmpArr.filter((item) => {
        if (item.phoneNumber === req.body.phoneNumber && item.accessCode === req.body.accessCode) {
          res.status(200).json("You are verified");
        }
      });
    } catch (error) {
      res.status(400).json(error);
    }
  },
};

module.exports = userController;
