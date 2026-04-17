import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { nanoid } from 'nanoid';
import emailjs from '@emailjs/nodejs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // EmailJS Configuration
  const EMAILJS_SERVICE_ID = 'service_3kbt9ft';
  const EMAILJS_TEMPLATE_ID = 'template_kqhteg9';
  const EMAILJS_PUBLIC_KEY = 'CtZBtL2OiswTAomUD';
  const EMAILJS_PRIVATE_KEY = 'n1OoVsbZdZ7ujIz7sy8OG';
  const COORDINATOR_EMAIL = 'gattu.abhinay33@gmail.com';
  
  const SHEET_URL = 'https://script.google.com/macros/s/AKfycbzJSQgmDpZ8VVgPu8R-n4HiszkMqvhsFJj7Et7ARbWcmRnXsWYDCIs8eMkBQwXFSRNW/exec';

  // API Routes
  app.post('/api/register', async (req, res) => {
    try {
      const {
        fullName,
        rollNumber,
        department,
        year,
        mobile,
        email,
        college,
        preferredDomain,
        transactionId
      } = req.body;

      const registration_id = `SS27-${nanoid(6).toUpperCase()}`;
      const token = nanoid(32);

      // Save to Google Sheets
      const sheetData = {
        registration_id,
        full_name: fullName,
        roll_number: rollNumber,
        department,
        year,
        mobile,
        participant_email: email,
        college,
        preferred_domain: preferredDomain,
        transaction_id: transactionId,
        token,
        status: 'pending',
        timestamp: new Date().toISOString()
      };

      try {
        await fetch(SHEET_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(sheetData)
        });
      } catch (e) {}

      // Send email
      const templateParams = {
        to_email: COORDINATOR_EMAIL,
        registration_id,
        full_name: fullName,
        roll_number: rollNumber,
        department,
        year,
        mobile,
        participant_email: email,
        college,
        transaction_id: transactionId,
        accept_url: `https://ais-dev-bpssvq3hwwuyvqziptv7nj-230014416953.asia-east1.run.app/review/${token}?action=accept`,
        reject_url: `https://ais-dev-bpssvq3hwwuyvqziptv7nj-230014416953.asia-east1.run.app/review/${token}?action=reject`,
        sheet_url: "https://docs.google.com/spreadsheets/d/1jDZTiBfUbAXzKGP698zOpfn9fB-trgowCb4apFxOOIA"
      };

      try {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          templateParams,
          { 
            publicKey: EMAILJS_PUBLIC_KEY,
            privateKey: EMAILJS_PRIVATE_KEY
          }
        );
      } catch (emailError: any) {
        console.error('EmailJS Error Details:', {
          status: emailError.status,
          text: emailError.text,
          message: emailError.message
        });
        // We throw a more descriptive error or just the original one
        throw emailError;
      }

      res.json({ success: true, registration_id, token });
    } catch (error: any) {
      console.error('Registration API error:', error);
      res.status(500).json({ 
        success: false, 
        error: error.message || error.text || 'Unknown Error',
        details: error 
      });
    }
  });

  app.post('/api/review', async (req, res) => {
    const { token, action } = req.body;
    try {
      console.log(`Review action ${action} for token ${token}`);
      // Supabase removed for now. Actions are logged server-side.
      res.json({ 
        success: true, 
        message: `Registration ${action}ed (Logged only - Database is currently disabled)` 
      });
    } catch (error: any) {
      console.error('Review API error:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
