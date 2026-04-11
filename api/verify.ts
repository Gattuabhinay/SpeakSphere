import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  const { id, action, mobile, name, email } = 
    req.query as Record<string, string>;

  if (!id || !action) {
    return res.status(400).send(
      renderPage('Error', 
        'Missing parameters.', 
        '#EF4444'
      )
    );
  }

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { error } = await supabase
    .from('register')
    .update({ status: action })
    .eq('registration_id', id);

  if (error) {
    return res.status(500).send(
      renderPage(
        'Error',
        'Database update failed: ' + error.message,
        '#EF4444'
      )
    );
  }

  if (action === 'accept') {
    const waMessage = encodeURIComponent(
      `Hi ${name}! 🎉\n\n` +
      `Your SpeakSphere registration has been ` +
      `confirmed!\n\n` +
      `*Registration ID:* ${id}\n\n` +
      `Join our WhatsApp group for all event ` +
      `updates:\n` +
      `https://chat.whatsapp.com/BlDY7ksIseOIF4oSUFfw90\n\n` +
      `See you at NNRG Tech Fest 2027! 🚀`
    );
    const waLink = 
      `https://wa.me/91${mobile}?text=${waMessage}`;

    return res.status(200).send(
      renderAcceptPage(id, name, waLink)
    );
  }

  if (action === 'reject') {
    return res.status(200).send(
      renderRejectPage(id, name)
    );
  }

  return res.status(400).send(
    renderPage('Error', 'Invalid action.', '#EF4444')
  );
}

function renderPage(
  title: string, 
  message: string, 
  color: string
): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" 
    content="width=device-width,initial-scale=1.0"/>
  <title>${title} - SpeakSphere 2027</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { 
      background:#0D1117; 
      color:white; 
      font-family:Arial,sans-serif;
      min-height:100vh;
      display:flex;
      align-items:center;
      justify-content:center;
      padding:20px;
    }
    .card {
      background:#161B22;
      border-radius:16px;
      padding:40px;
      max-width:500px;
      width:100%;
      text-align:center;
      border:1px solid #30363D;
    }
    .badge {
      font-size:48px;
      margin-bottom:16px;
    }
    h1 { 
      color:${color}; 
      font-size:28px;
      margin-bottom:8px;
    }
    p { 
      color:#9CA3AF; 
      margin-top:8px;
      line-height:1.6;
    }
    .footer {
      margin-top:24px;
      color:#6E7681;
      font-size:12px;
      border-top:1px solid #21262D;
      padding-top:16px;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">⚠️</div>
    <h1>${title}</h1>
    <p>${message}</p>
    <div class="footer">
      SpeakSphere 2027 | NNRG Tech Fest
    </div>
  </div>
</body>
</html>`;
}

function renderAcceptPage(
  id: string, 
  name: string, 
  waLink: string
): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" 
    content="width=device-width,initial-scale=1.0"/>
  <title>Accepted - SpeakSphere 2027</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body {
      background:#0D1117;
      color:white;
      font-family:Arial,sans-serif;
      min-height:100vh;
      display:flex;
      align-items:center;
      justify-content:center;
      padding:20px;
    }
    .card {
      background:#161B22;
      border-radius:16px;
      padding:40px;
      max-width:500px;
      width:100%;
      text-align:center;
      border:1px solid #22C55E;
    }
    .badge { font-size:48px; margin-bottom:16px; }
    h1 { color:#22C55E; font-size:28px; margin-bottom:8px; }
    .reg-id {
      background:#0D2818;
      border:1px solid #22C55E;
      border-radius:8px;
      padding:12px 20px;
      margin:16px 0;
      color:#22C55E;
      font-size:18px;
      font-weight:bold;
    }
    p { color:#9CA3AF; margin-top:8px; line-height:1.6; }
    .wa-btn {
      display:inline-block;
      margin-top:24px;
      background:#25D366;
      color:white;
      padding:16px 32px;
      border-radius:12px;
      text-decoration:none;
      font-weight:bold;
      font-size:16px;
      width:100%;
    }
    .footer {
      margin-top:24px;
      color:#6E7681;
      font-size:12px;
      border-top:1px solid #21262D;
      padding-top:16px;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">✅</div>
    <h1>ACCEPTED</h1>
    <div class="reg-id">${id}</div>
    <p>
      Registration for <strong>${name}</strong> 
      has been accepted successfully.
    </p>
    <p style="margin-top:12px;">
      Click the button below to send the 
      WhatsApp group link to the participant.
    </p>
    <a href="${waLink}" 
       target="_blank" 
       class="wa-btn">
      Send WhatsApp Group Link
    </a>
    <div class="footer">
      SpeakSphere 2027 | NNRG Tech Fest
    </div>
  </div>
</body>
</html>`;
}

function renderRejectPage(
  id: string, 
  name: string
): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" 
    content="width=device-width,initial-scale=1.0"/>
  <title>Rejected - SpeakSphere 2027</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body {
      background:#0D1117;
      color:white;
      font-family:Arial,sans-serif;
      min-height:100vh;
      display:flex;
      align-items:center;
      justify-content:center;
      padding:20px;
    }
    .card {
      background:#161B22;
      border-radius:16px;
      padding:40px;
      max-width:500px;
      width:100%;
      text-align:center;
      border:1px solid #EF4444;
    }
    .badge { font-size:48px; margin-bottom:16px; }
    h1 { color:#EF4444; font-size:28px; margin-bottom:8px; }
    .reg-id {
      background:#2D0A0A;
      border:1px solid #EF4444;
      border-radius:8px;
      padding:12px 20px;
      margin:16px 0;
      color:#EF4444;
      font-size:18px;
      font-weight:bold;
    }
    p { color:#9CA3AF; margin-top:8px; line-height:1.6; }
    .footer {
      margin-top:24px;
      color:#6E7681;
      font-size:12px;
      border-top:1px solid #21262D;
      padding-top:16px;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">❌</div>
    <h1>REJECTED</h1>
    <div class="reg-id">${id}</div>
    <p>
      Registration for <strong>${name}</strong> 
      has been rejected.
    </p>
    <p style="margin-top:12px;">
      The participant submitted an invalid or 
      fake Transaction ID. 
      This record has been marked as rejected 
      in the database.
    </p>
    <div class="footer">
      SpeakSphere 2027 | NNRG Tech Fest
    </div>
  </div>
</body>
</html>`;
}
