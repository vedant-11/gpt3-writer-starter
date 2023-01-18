import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix =
  "this is a conversation with holy jesus, the Son of God in the Bible's New Testament, and in mainstream Christian denominations he is God the Son, the second Person in the Trinity. add my child in the starting of jesus conversation,me:";
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput} ?\n`);

  const baseCompletion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${basePromptPrefix}${req.body.userInput}`,
    temperature: 0.7,
    max_tokens: 250,
  });

  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
