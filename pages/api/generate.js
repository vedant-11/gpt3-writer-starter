import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix =
  "you will receive an array of crowdfunding titles, you have to return an array with first title as the most needed funding one based on the following rules:\n1. The medical emergency is to be ranked higher\n2. The crowd funding for poors or by ngos must be then considered\n3. on a tie rank the title which was first in the array\n";
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`);

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
