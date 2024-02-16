import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const sendPrompt = async (prompt: string) => {
  const response = await openai.chat.completions.create({
    messages: [{ role: "system", content: prompt }],
    model: "gpt-3.5-turbo",
    max_tokens: 256,
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  const answer =
    response.choices[0].message.content !== undefined
      ? response.choices[0].message.content?.replace(/\n/g, "")
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
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `Lista de categorias: ${categories}\n\n¿El texto  \"${prompt}\" a cual categoria de la lista pertenece?\n\nCategoria:\n`,
      },
    ],
    max_tokens: 256,
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  const answer =
    response.choices[0].message.content !== undefined
      ? response.choices[0].message.content?.replace(/\n/g, "")
      : "I don't know";
  return answer;
};

const identifyTopic = async (prompt: string) => {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `Extrae el tema principal sobre el que gira el texto en las menores palabras posibles y sin puntos o comas\n\nTexto:  \"${prompt}\" \nTema: \n`,
      },
    ],
    max_tokens: 256,
    temperature: 0.5,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  const answer =
    response.choices[0].message.content !== undefined
      ? response.choices[0].message.content?.replace(/\n/g, "")
      : "I don't know";
  return answer;
};

const identifyMenuProductCategory = async (
  prompt: string,
  categories: Array<string>
) => {
  console.log(prompt + ": " + categories);
  if (!categories || !prompt) {
    return "ERROR_REQUIRED_PARAMS_NOT_FOUND";
  }
  let categoriesString = "";
  categories.forEach((category) => {
    categoriesString += category + ", ";
  });
  const promptString = `Lista de categorías: ${categories}\n\n¿El texto es de un comensal que quiere un platillo  \"${prompt}\" a cual categoría de la lista pertenece lo que el usuario quiere?\n\nCategoría:\n`;
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: promptString,
        },
      ],
      max_tokens: 256,
      temperature: 0.7,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    const answer =
      response.choices[0].message.content !== undefined
        ? response.choices[0].message.content?.replace(/\n/g, "")
        : "I don't know";
    return answer;
  } catch (e) {
    console.log(e);
    return "";
  }
};

const identifySuggestProduct = async (prompt: string, products: Array<any>) => {
  if (!products) {
    return "ERROR_REQUIRED_PARAMS_NOT_FOUND";
  }
  let productsString = JSON.stringify(products);
  const promptString = `Lista de productos: ${productsString}\n\n¿El texto es de un comensal que quiere un platillo  \"${prompt}\" cual es el producto mas recomendado para el comensal?\n\ Dame unicamente el Id del producto recomendado:\n`;
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: promptString,
      },
    ],
    max_tokens: 256,
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  const answer =
    response.choices[0].message.content !== undefined
      ? response.choices[0].message.content?.replace(/\n/g, "")
      : "I don't know";
  return answer;
};

export default {
  sendPrompt,
  findCategory,
  identifyTopic,
  identifyMenuProductCategory,
  identifySuggestProduct,
};
