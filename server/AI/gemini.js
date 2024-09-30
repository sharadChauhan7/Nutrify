
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
console.log(apiKey);

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



const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

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
        text: `Return the following data in JSON array format:
        [{
          calorie: "total calorie in image food",
          foodName: "name of the image food",
          proteins: "total proteins in image food",
          carbs: "total carbs in image food",
          fats: "total fats in image food",
          fiber: "total fiber in image food"
        }]
        If you cannot recognize the food, return an empty array [].`
      }
    ]);
    

    return result.response.text();
  } finally {
    // Delete the downloaded image
    deleteImage(downloadPath);
  }
}

export const generateData = async(prompt)=>{
  const model  = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(prompt);
  console.log(result.response.text());

  }

export default findCalories;