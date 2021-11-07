const { create, Client } = require("@open-wa/wa-automate");
var location = "බණ්ඩාරවෙල";
var lat = "6.8070";
var lon = "80.9572";
var groups = [];
var str = null;

const liveLocationCallback = (currentLiveLocation) => {
  console.log("Live location Update ->", currentLiveLocation, "\n");
  lat = currentLiveLocation.lat;
  lon = currentLiveLocation.lng;
};

function start(client) {
  (async () => {
    var a = await client.getAllGroups();
    for (const key in a) {
      if (Object.hasOwnProperty.call(a, key)) {
        const element = a[key];
        groups.push(`${key} : ${element.formattedTitle} - ${element.id} \n`);
      }
    }
  })();

  try {
    client.onAnyMessage(async (message) => {
      if (message.shareDuration) {
        console.log("Live location started");
        client.onLiveLocation(message.from, liveLocationCallback);
        await client.simulateTyping(message.from, true);
        //wait 3 seconds
        //stop '...typing'
        await client.sendText(message.from, "Location observer runing ......");
        await client.simulateTyping(message.from, false);
      }
    });
    client.onMessage(async (message) => {
      if (message.body.indexOf("!setl") > -1) {
        //"!setl:බණ්ඩාරවෙල  ඉදන් එන ගමන්"
        location = message.body.split(":")[1];
      } else if (message.body === "list") {
        await client.sendText(message.from, groups);
      } else if (message.body.indexOf("!brodcast") > -1) {
        var m = message.body.split(":")[1];
        var mem = message.body.split(":")[2];
        var b = JSON.parse(mem);
        console.log(b);
        for (const iterator of b) {
          await client.sendText(iterator, `${m}  \n _bot by lab24_`);
        }
      } else {
        if (onrecive(message.body)) {
          await client.sendText(
            message.from,
            `${message.sender.pushname} \n
        *${location}* \n
        _bot by lab24_`
          );
          client.sendLocation(message.from, lat, lon, location);
        } else {
          await client.sendText(
            message.from,
            `${message.sender.pushname} \n
          *${reply[1][0]}* \n
          _bot by lab24_`
          );
        }
      }
    });
  } catch (e) {
    console.error("ERRO AT   ->", e, "\n");
  }
}

create().then((client) => start(client));

var messageTemplates = [
  // 0  = location , 1 = fee
  [
    "where",
    "enne",
    "enwd",
    "enna",
    "bandarawela",
    "කොහ",
    "කෙහෙ",
    "කොහෙ",
    "කෙහෙද",
    " එතන",
    "ethana",
    "kohe",
    "location",
    "කොහෙද",
    "කොහේ",
    "කොහා",
    "තැන",
    "ඇවිල්ලද",
    "එන්නෙ",
    "khd",
    "kohed",
    "koth",
    "kota",
    "කොට",
    "keeyt",
    "kiyt",
    "කියට",
    "කයට",
    "loc",
    "lok",
  ],
  [
    "ගාස්තුව",
    "කීයද",
    "ගාන",
    "ගන",
    "ගස්තුව",
    "කියද",
    "කයද",
    "keeyd",
    "kiyd",
    "much",
    "fee",
    "pee",
    "kyada",
    "kiyd",
    "keyd",
    "fees",
    "pees",
    "gana",
    "සල්ලි",
  ],
];
const alternative = [
  "Same",
  "Go on...",
  "Try again",
  "I'm listening...",
  "Bro...",
];

const reply = [
  //0
  [`අපි දැන් ඉන්නෙ ${location}`, `${location} ඉන්නෙ`, `${location} එනගමන්`],
  //1
  [
    `2022 සදහා 2000 ,
    2021 සදහා 1800 `,
  ],
];

function onrecive(message) {
  message = message.toLowerCase();
  for (let index = 0; index < messageTemplates.length; index++) {
    for (var key of messageTemplates[index]) {
      if (message.indexOf(key) > -1) {
        if (index == 0) {
          return true;
        } else {
          return false;
          //return reply[1][0];
        }
        break;
      }
    }
  }
}
