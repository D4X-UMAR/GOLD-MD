import fetch from 'node-fetch';

let handler = async (message, {
  conn: connection,
  args: arguments,
  usedPrefix: prefix,
  command: cmd,
  text: inputText
}) => {
  if (!inputText && !(message.quoted && message.quoted.text)) {
    throw "Mujh se koi sawal pucho \n Ese likho: \n\n\n ${usedprefix + command} pakistan independence day";
  }
  if (!inputText && message.quoted && message.quoted.text) {
    inputText = message.quoted.text;
  }
  message.reply("Me apke sawal ka jawab dhund loo please wait....");
  message.react('🔰');
  const encodedText = encodeURIComponent(inputText);
  let response = await Bing(encodedText);
  if (!response) {
    throw new Error("Apke is sawal ka jawab nahi mere pass sorry koi aur sawal pucho");
  }
  await connection.reply(message.chat, response, message);
};

handler.help = ["bing"];
handler.tags = ['AI'];
handler.command = /^(bing)$/i;
export default handler;

async function Bing(queryText) {
  let response = await (await fetch("https://copilot.github1s.tk/v1/chat/completions", {
    'method': "POST",
    'headers': {
      'Authorization': "dummy",
      'Content-Type': "application/json"
    },
    'body': JSON.stringify({
      'model': "Creative",
      'max_tokens': 100,
      'messages': [{
        'role': "system",
        'content': "You are an helpful assistant."
      }, {
        'role': "user",
        'content': queryText
      }]
    })
  })).json();
  return response.choices[0].message.content;
}
