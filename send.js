
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const { imageBase64 } = req.body;

  // あなたの提供してくださったWebhook URLに変更
  const webhookUrl = "https://discordapp.com/api/webhooks/1366689686218735626/VAGdTPy0ArlSVfSjpyo8znkMp1zc4At4D8ydN_7-d7d-48agfbo2BoJB3us7l0ZtCoT1";

  // 画像をBufferに変換して送信
  const buffer = Buffer.from(imageBase64.split(",")[1], 'base64');
  const formData = new FormData();
  formData.append("file", new Blob([buffer]), "face.png");

  const response = await fetch(webhookUrl, {
    method: "POST",
    body: formData
  });

  if (response.ok) {
    res.status(200).send("Image sent to Discord");
  } else {
    res.status(500).send("Failed to send image");
  }
}
