const { app } = require('@azure/functions');
const openai = require("../../lib/openai.js")

app.http('getChatGPTSuggestion', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: 'Escreva uma sugestão de prompt para o DALLE-E gerar uma imagem. Esse prompt será mostrado para o usuário, inclua detalhes como qual tipo de pintura deve ser, opções podem incluir: Pintura em óleo, aquarela, foto-realista, surrealista, 4k, abstrato, moderno, preto e branco, ou qualquer outro tipo de movimento artístico. NÃO envelope a resposta em aspas.',
            max_tokens: 100,
            temperature: 0.8,
        })
        context.log(`Http function processed request for url "${request.url}"`);

        const responseText = response.data.choices[0].text


        return { body: responseText };
    }
});
