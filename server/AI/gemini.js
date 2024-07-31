
import {GoogleGenerativeAI} from "@google/generative-ai";
import {GoogleAIFileManager} from "@google/generative-ai/server";
  import dotenv from "dotenv";

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
  
  async function run(filePath) {
    // TODO Make these files available on the local file system
    // You may need to update the file paths
    const files = [
      await uploadToGemini(filePath, "image/jpeg"),
    ];

    const result = await model.generateContent([
        {
          fileData: {
            mimeType: files[0].mimeType,
            fileUri: files[0].uri
          }
        },
        {text: "Return the following data in json format you are given an image of a food item or items(Note: if multiple food items is dected return array of object of eact item information) if you can not recognise food return an empty object\n[ {\n        calorie: \"total calorie in image food\",\n    foodName: \"name of the image food\",\n        proteins: \"total proteins in image food\",\n        carbs: \"total carbs in image food\",\n        fats: \"total fats in image food\",\n        fiber: \"total fiber in image food\",    } ]"},
      ]);
  
    return result.response.text();
  }
  export default run;