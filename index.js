const express = require('express')
const OpenAI = require('openai');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const http = require("http");
const server = http.createServer(app);
const PORT = process.env.PORT;


const openai = new OpenAI({
  apiKey: process.env.Apikey
});




app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res)=>{
    res.send('Letter')
})


app.post('/generate', async (req, res)=>{
  const {question} = req.body

   const completion = await openai.completions.create({
    model: "gpt-3.5-turbo-instruct",
    prompt: `Generate a high score IELTS essay sample to this topic with html <p> and <br> tags: ${question}
    `,
    max_tokens: 800,
    temperature: 0,
  });
  
   res.json(completion)
})





server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
