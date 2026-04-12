import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    registration_id, full_name, roll_number, department,
    year, mobile, participant_email, college, preferred_domain,
    transaction_id, accept_url, reject_url, sheet_url,
  } = req.body;

  const htmlContent = `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#0D1117;font-family:Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:24px;">
    <div style="background:#7C3AED;border-radius:12px 12px 0 0;padding:28px 32px;text-align:center;">
      <h1 style="color:white;margin:0;font-size:24px;font-weight:900;">🎤 SPEAKSPHERE 2027</h1>
      <p style="color:rgba(255,255,255,0.8);margin:8px 0 0;font-size:13px;">NEW REGISTRATION — NNRG TECH FEST</p>
    </div>
    <div style="background:#1a0a2e;border:1px solid #7C3AED;border-top:none;padding:16px 32px;text-align:center;">
      <p style="color:#9CA3AF;font-size:11px;margin:0 0 4px;">REGISTRATION ID</p>
      <p style="color:#7C3AED;font-size:22px;font-weight:900;margin:0;">${registration_id}</p>
    </div>
    <div style="background:#161B22;border:1px solid #21262D;border-top:none;padding:28px 32px;">
      <table style="width:100%;border-collapse:collapse;">
        <tr style="border-bottom:1px solid #21262D;">
          <td style="padding:10px 0;color:#6E7681;font-size:12px;width:40%;">👤 Full Name</td>
          <td style="padding:10px 0;color:white;font-size:13px;font-weight:600;">${full_name}</td>
        </tr>
        <tr style="border-bottom:1px solid #21262D;">
          <td style="padding:10px 0;color:#6E7681;font-size:12px;">🏫 College</td>
          <td style="padding:10px 0;color:white;font-size:13px;font-weight:600;">${college}</td>
        </tr>
        <tr style="border-bottom:1px solid #21262D;">
          <td style="padding:10px 0;color:#6E7681;font-size:12px;">🎓 Roll Number</td>
          <td style="padding:10px 0;color:white;font-size:13px;font-weight:600;">${roll_number}</td>
        </tr>
        <tr style="border-bottom:1px solid #21262D;">
          <td style="padding:10px 0;color:#6E7681;font-size:12px;">📚 Department</td>
          <td style="padding:10px 0;color:white;font-size:13px;font-weight:600;">${department}</td>
        </tr>
        <tr style="border-bottom:1px solid #21262D;">
          <td style="padding:10px 0;color:#6E7681;font-size:12px;">📅 Year</td>
          <td style="padding:10px 0;color:white;font-size:13px;font-weight:600;">${year}</td>
        </tr>
        <tr style="border-bottom:1px solid #21262D;">
          <td style="padding:10px 0;color:#6E7681;font-size:12px;">📱 Mobile</td>
          <td style="padding:10px 0;color:white;font-size:13px;font-weight:600;">${mobile}</td>
        </tr>
        <tr style="border-bottom:1px solid #21262D;">
          <td style="padding:10px 0;color:#6E7681;font-size:12px;">📧 Email</td>
          <td style="padding:10px 0;color:white;font-size:13px;font-weight:600;">${participant_email}</td>
        </tr>
        <tr style="border-bottom:1px solid #21262D;">
          <td style="padding:10px 0;color:#6E7681;font-size:12px;">🎯 Domain</td>
          <td style="padding:10px 0;color:white;font-size:13px;font-weight:600;">${preferred_domain}</td>
        </tr>
        <tr>
          <td style="padding:10px 0;color:#6E7681;font-size:12px;">💳 Transaction ID</td>
          <td style="padding:10px 0;color:white;font-size:13px;font-weight:600;">${transaction_id}</td>
        </tr>
      </table>
    </div>
    <div style="background:#0D1117;border:1px solid #21262D;border-top:none;padding:28px 32px;">
      <a href="${accept_url}" style="display:block;background:#22C55E;color:white;text-align:center;padding:16px;border-radius:10px;text-decoration:none;font-weight:700;font-size:15px;margin-bottom:12px;">
        ✅ ACCEPT — Valid Payment
      </a>
      <a href="${reject_url}" style="display:block;background:#EF4444;color:white;text-align:center;padding:16px;border-radius:10px;text-decoration:none;font-weight:700;font-size:15px;margin-bottom:12px;">
        ❌ REJECT — Fake Transaction ID
      </a>
      <a href="${sheet_url}" style="display:block;background:#1E3A5F;color:#60A5FA;text-align:center;padding:16px;border-radius:10px;text-decoration:none;font-weight:700;font-size:15px;border:1px solid #3B82F6;">
        📊 OPEN SPREADSHEET — Auto Fill Data
      </a>
    </div>
    <div style="background:#0D1117;border:1px solid #21262D;border-top:none;border-radius:0 0 12px 12px;padding:16px 32px;text-align:center;">
      <p style="color:#6E7681;font-size:11px;margin:0;">SpeakSphere 2027 · NNRG Tech Fest · AI & ML Department</p>
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
