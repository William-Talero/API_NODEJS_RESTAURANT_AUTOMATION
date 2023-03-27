import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const sendPrompt = async (prompt: string) => {
  console.log(prompt);
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 256,
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  console.log(response.data.choices[0].text);
  const answer =
    response.data.choices[0].text !== undefined
      ? response.data.choices[0].text.replace(/\n/g, "")
      : "I don't know";
  return answer;
};

const findCategory = async (prompt: string, categories: Array<string>) => {
  if (!categories || !prompt) {
    return "ERROR_REQUIRED_PARAMS_NOT_FOUND";
  }
  let categoriesString = "";
  categories.forEach((category) => {
    categoriesString += category + ", ";
  });
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Lista de categorias: ${categories}\n\n¿El texto  \"${prompt}\" a cual categoria de la lista pertenece?\n\nCategoria:\n`,
    max_tokens: 256,
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  console.log(response.data.choices[0].text);
  const answer =
    response.data.choices[0].text !== undefined
      ? response.data.choices[0].text.replace(/\n/g, "")
      : "I don't know";
  return answer;
};

const identifyTopic = async (prompt: string) => {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Extrae el tema principal sobre el que gira el texto en las menores palabras posibles y sin puntos o comas\n\nTexto:  \"${prompt}\" \nTema: \n`,
    max_tokens: 256,
    temperature: 0.5,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  console.log(response.data.choices[0].text);
  const answer =
    response.data.choices[0].text !== undefined
      ? response.data.choices[0].text.replace(/\n/g, "")
      : "I don't know";
  return answer;
};

export default {
  sendPrompt,
  findCategory,
  identifyTopic,
};
