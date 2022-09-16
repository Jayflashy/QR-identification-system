const qrcode = require("qrcode");


const QRencrypt = async (data) => {
  const encryptedData = await qrcode.toString(data);
  return encryptedData;
};

module.exports = {
    QRencrypt
};
