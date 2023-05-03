const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration ({
    organization: process.env.OPEN_AI_ORGANIZATION,
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(config);

module.exports = openai;