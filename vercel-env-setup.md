# Vercel Environment Variables Setup
Add these in Vercel Dashboard → 
Project → Settings → Environment Variables

| Name | Value |
|------|-------|
| VITE_EMAILJS_SERVICE_ID | service_3kbt9ft |
| VITE_EMAILJS_TEMPLATE_ID | template_kqhteg9 |
| VITE_EMAILJS_PUBLIC_KEY | CtZBtL2OiswTAomUD |
| VITE_VERCEL_URL | your speaksphere vercel URL |
| VITE_SHEET_URL | https://script.google.com/macros/s/AKfycbwY9AomyTCLZWxJSdJD40EoJ9KdmZSVAt7eOQXBlu29AJjmxW5kCfeNjS61NXplV_2i/exec |
| SUPABASE_URL | https://ximypoaoorqtjreefqkq.supabase.co |
| SUPABASE_SERVICE_ROLE_KEY | get from Supabase → Settings → API Keys → Legacy tab → service_role key |

IMPORTANT NOTES:
- VITE_VERCEL_URL = your actual deployed Vercel URL
- SUPABASE_SERVICE_ROLE_KEY = from Supabase dashboard
- Never share these values publicly
- .env.local is gitignored and never pushed to GitHub
- All VITE_ variables are for frontend (src/App.tsx)
- SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are 
  for backend only (api/verify.ts)
