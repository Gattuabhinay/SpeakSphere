import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    registration_id,
    full_name,
    roll_number,
    department,
    year,
    mobile,
    participant_email,
    college,
    preferred_domain,
    transaction_id,
    accept_url,
    reject_url,
    sheet_url,
  } = req.body;

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<body style="margin:0;padding:0;background:#0D1117;font-family:Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:24px;">
    
    <!-- Header -->
    <div style="background:#7C3AED;border-radius:12px 12px 0 0;padding:28px 32px;text-align:center;">
      <h1 style="color:white;margin:0;font-size:24px;font-weight:900;letter-spacing:3px;">
        🎤 SPEAKSPHERE 2027
      </h1>
      <p style="color:rgba(255,255,255,0.8);margin:8px 0 0;font-size:13px;letter-spacing:2px;">
        NEW REGISTRATION — NNRG TECH FEST
      </p>
    </div>

    <!-- Registration ID Banner -->
    <div style="background:#1a0a2e;border:1px solid #7C3AED;border-top:none;padding:16px 32px;text-align:center;">
      <p style="color:#9CA3AF;font-size:11px;margin:0 0 4px;letter-spacing:2px;text-transform:uppercase;">
        Registration ID
      </p>
      <p style="color:#7C3AED;font-size:22px;font-weight:900;margin:0;letter-spacing:2px;">
        ${registration_id}
      </p>
    </div>

    <!-- Participant Details -->
    <div style="background:#161B22;border:1px solid #21262D;border-top:none;padding:28px 32px;">
      <h2 style="color:#7C3AED;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;margin:0 0 16px;">
        PARTICIPANT DETAILS
      </h2>
      
      <table style="width:100%;border-collapse:collapse;">
        ${[
          ['👤 Full Name', full_name],
          ['🏫 College', college],
          ['🎓 Roll Number', roll_number],
          ['📚 Department', department],
          ['📅 Year', year],
          ['📱 Mobile', mobile],
          ['📧 Email', participant_email],
          ['🎯 Preferred Domain', preferred_domain],
          ['💳 Transaction ID', transaction_id],
        ].map(([label, value], i) => `
          <tr style="border-bottom:1px solid #21262D;">
            <td style="padding:10px 0;color:#6E7681;font-size:12px;width:40%;">${label}</td>
            <td style="padding:10px 0;color:white;font-size:13px;font-weight:600;">${value}</td>
          </tr>
        `).join('')}
      </table>
    </div>

    <!-- Action Buttons -->
    <div style="background:#0D1117;border:1px solid #21262D;border-top:none;padding:28px 32px;">
      <h2 style="color:#9CA3AF;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;margin:0 0 20px;text-align:center;">
        COORDINATOR ACTIONS
      </h2>
      
      <!-- Accept Button -->
      <a href="${accept_url}" 
         style="display:block;background:#22C55E;color:white;text-align:center;padding:16px;border-radius:10px;text-decoration:none;font-weight:700;font-size:15px;margin-bottom:12px;letter-spacing:1px;">
        ✅ ACCEPT — Valid Payment
      </a>
      
      <!-- Reject Button -->
      <a href="${reject_url}"
         style="display:block;background:#EF4444;color:white;text-align:center;padding:16px;border-radius:10px;text-decoration:none;font-weight:700;font-size:15px;margin-bottom:12px;letter-spacing:1px;">
        ❌ REJECT — Fake Transaction ID
      </a>

      <!-- Open Sheet Button -->
      <a href="${sheet_url}"
         style="display:block;background:#1E3A5F;color:#60A5FA;text-align:center;padding:16px;border-radius:10px;text-decoration:none;font-weight:700;font-size:15px;border:1px solid #3B82F6;letter-spacing:1px;">
        📊 OPEN SPREADSHEET — Auto Fill Data
      </a>
    </div>

    <!-- Footer -->
    <div style="background:#0D1117;border:1px solid #21262D;border-top:none;border-radius:0 0 12px 12px;padding:16px 32px;text-align:center;">
      <p style="color:#6E7681;font-size:11px;margin:0;">
        SpeakSphere 2027 · NNRG Tech Fest · AI & ML Department
      </p>
    </div>

  </div>
</body>
</html>`;

  try {
    const { data, error } = await resend.emails.send({
      from: 'SpeakSphere 2027 <onboarding@resend.dev>',
      to: 'gattu.abhinay333@gmail.com',
      subject: `🎤 New Registration — ${full_name} | ${registration_id}`,
      html: htmlContent,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(400).json({ error });
    }

    return res.status(200).json({ success: true, data });
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
