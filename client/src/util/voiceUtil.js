import { ElevenLabsClient } from "elevenlabs";
export const texttospeech = async (text) => {
    let audioBase64 = await createAudioStreamFromText(text);
    console.log("Audion played");
    return audioBase64;
}
const client = new ElevenLabsClient({
        apiKey: import.meta.env.VITE_ELEVEN_API_KEY,
});

const createAudioStreamFromText = async (text) => {
    const audioStream = await client.generate({
        voice: 'Rachel',
        model_id: 'eleven_turbo_v2_5',
        text,
    });
    const chunks = [];
    for await (const chunk of audioStream) {
        chunks.push(chunk);
    }

    const audioBuffer = Buffer.concat(chunks);
    const audioBase64 = audioBuffer.toString('base64');
    return audioBase64;
};