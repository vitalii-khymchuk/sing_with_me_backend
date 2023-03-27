const axios = require("axios");
const FormData = require("form-data");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const options = {
  endpoint: "/v1/identify",
  signature_version: "1",
  data_type: "audio",
  secure: true,
  access_key: process.env.ARC_CLOUD_ACCESS_KEY,
  access_secret: process.env.ARC_CLOUD_SECRET_KEY,
  method: "POST",
};

const buildStringToSign = (timestamp) => {
  const {
    method,
    endpoint: uri,
    access_key,
    data_type,
    signature_version,
  } = options;

  return [
    method,
    uri,
    access_key,
    data_type,
    signature_version,
    timestamp,
  ].join("\n");
};

const sign = (signString, accessSecret) => {
  return crypto
    .createHmac("sha1", accessSecret)
    .update(signString)
    .digest("base64");
};

const find = async () => {
  const pathToFile = path.resolve("./tmp/sample.wav");
  const stream = fs.createReadStream(pathToFile);
  const fileSize = fs.statSync(pathToFile).size;

  const current_data = new Date();
  const timestamp = current_data.getTime() / 1000;

  const stringToSign = buildStringToSign(timestamp);
  const signature = sign(stringToSign, options.access_secret);
  const formData = new FormData();
  formData.append("sample", stream, { filename: "sample.wav" });
  formData.append("access_key", options.access_key);
  formData.append("data_type", options.data_type);
  formData.append("signature_version", options.signature_version);
  formData.append("signature", signature);
  formData.append("sample_bytes", fileSize);
  formData.append("timestamp", timestamp);

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      ...formData.getHeaders(),
    },
  };

  try {
    const { data } = await axios.post(
      "https://identify-eu-west-1.acrcloud.com/v1/identify",
      formData,
      config
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { find };
