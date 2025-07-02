const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post("/alexa", (req, res) => {
  const intent = req.body.request.intent;
  let responseText = "Desculpa, não percebi.";

  if (intent && intent.name === "ChatIntent") {
    const slot = intent.slots?.anyText?.value;
    responseText = `Recebi: ${slot || "sem conteúdo"}.`;
  }

  res.json({
    version: "1.0",
    response: {
      shouldEndSession: false,
      outputSpeech: {
        type: "PlainText",
        text: responseText,
      },
    },
  });
});

app.get("/", (req, res) => {
  res.send("Jarvis Alexa está online!");
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Servidor a correr em http://0.0.0.0:${port}`);
});
