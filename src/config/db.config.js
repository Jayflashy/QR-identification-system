const { connect } = require("mongoose");

const DBConnect = async () => {
  try {
    await connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
    console.log(`Database is successfully connected...`);
  } catch (error) {
    console.log(error);
    process.exit(-1);
  }
};

module.exports = DBConnect;
