const mongoose = require('mongoose');
const AWS = require('aws-sdk');


AWS.config.update({ region: 'ap-south-1' }); 
// Configure the Secrets Manager client
const secretsManager = new AWS.SecretsManager();

async function getMongoURI() {
  try {
    const data = await secretsManager.getSecretValue({ SecretId: 'arn:aws:secretsmanager:ap-south-1:054037101383:secret:myapp/mongodb-uri-jHUMKq' }).promise();
    if (data.SecretString) {
      const secret = JSON.parse(data.SecretString);
      return secret.Mongo_URI;  // Assuming Mongo_URI is the key in your secret JSON
    }
  } catch (error) {
    console.error('Error retrieving Mongo_URI from Secrets Manager:', error);
    throw error;
  }
}

const connectDB = async () => {
  try {
    const mongoURI = await getMongoURI();
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
