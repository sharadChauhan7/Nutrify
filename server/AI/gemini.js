
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import dotenv from "dotenv";
import axios from 'axios';
import fs from 'fs';
import path from 'path';

dotenv.config('../.env');
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const fileManager = new GoogleAIFileManager(apiKey);

async function uploadToGemini(path, mimeType) {
  const uploadResult = await fileManager.uploadFile(path, {
    mimeType,
    displayName: path,
  });
  const file = uploadResult.file;
  return file;
}
// Download Image
async function downloadImage(url, downloadPath) {
  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream',
  });
  const writer = fs.createWriteStream(downloadPath);
  response.data.pipe(writer);
  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
}

async function deleteImage(filePath) {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(`Error deleting file: ${err}`);
    } else {
      console.log(`File deleted: ${filePath}`);
    }
  });
}

const generationConfig = {
  responseMimeType: "application/json",
};
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig
});

async function findCalories(imageUrl,prompt) {
  const downloadPath = path.join('./uploads', 'temp_image.jpg');
  try {
    await downloadImage(imageUrl, downloadPath);
    const file = await uploadToGemini(downloadPath, "image/jpeg");

    const result = await model.generateContent([
      {
        fileData: {
          mimeType: file.mimeType,
          fileUri: file.uri
        }
      },
      {
        text: prompt
      }
    ]);
    

    return result.response.text();
  } finally {
    // Delete the downloaded image
    deleteImage(downloadPath);
  }
}

export const generateData = async(prompt)=>{
  const result = await model.generateContent(prompt);
  return result.response.text();
}

export default findCalories;