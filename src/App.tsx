/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  IndianRupee, 
  CheckCircle2, 
  AlertTriangle, 
  Trophy, 
  Award, 
  Medal, 
  Phone, 
  Mail, 
  ArrowDown, 
  ArrowRight, 
  PlusCircle, 
  MessageSquare,
  Mic,
  Speech,
  ShieldCheck,
  Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
interface FormData {
  college: string;
  customCollege: string;
  fullName: string;
  rollNumber: string;
  department: string;
  year: string;
  mobile: string;
  email: string;
  transactionId: string;
  preferredDomain: string;
}

const COLLEGES = [
  "NNRG - Nalla Narasimha Reddy Education Society's Group of Institutions",
  "GCTC - Geethanjali College of Engineering and Technology",
  "KPRIT - Kommuri Pratap Reddy Institute of Technology",
  "SITS - Siddhartha Institute of Technology & Sciences",
  "ANURAG - Anurag University, Hyderabad",
  "NMREC - Nalla Malla Reddy Engineering College",
  "Other"
];

const DEPARTMENTS = ["CSE", "CSE (AI&ML)", "CSE (DS)", "ECE", "CIVIL", "IT"];
const YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year"];
const DOMAINS = [
  "Technology & Innovation",
  "AI & Machine Learning",
  "Robotics & Automation",
  "Data Science & Analytics",
  "Cyber Security",
  "Cloud Computing",
  "Web Development",
  "5G & IoT",
  "Gaming & Esports",
  "EdTech & Education",
  "Other"
];

const ACCENT_HEX = "#7C3AED";
const ACCENT_RGB = "124, 58, 237";

const supabase = createClient(
  'https://dklzqwcgboolzisqngei.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrbHpxd2NnYm9vbHppc3FuZ2VpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgxNDcxNzEsImV4cCI6MjA4MzcyMzE3MX0.TEqgRDBCHGJJJsOoLdUfXlKXmnR6m_J5woumAjOtw9E'
);

export default function App() {
  const [formData, setFormData] = useState<FormData>({
    college: COLLEGES[0],
    customCollege: '',
    fullName: '',
    rollNumber: '',
    department: '',
    year: '',
    mobile: '',
    email: '',
    transactionId: '',
    preferredDomain: DOMAINS[0]
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [registrationCount, setRegistrationCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const calculateTimeLeft = () => {
    const targetDate = new Date('2027-02-26T09:30:00');
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    if (difference <= 0) {
      return { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    // Calculate years
    let years = targetDate.getFullYear() - now.getFullYear();
    let months = targetDate.getMonth() - now.getMonth();
    let days = targetDate.getDate() - now.getDate();

    if (days < 0) {
      months -= 1;
      const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return { years, months, days, hours, minutes, seconds };
  };

  const fetchCount = async () => {
    try {
      const { count } = await supabase
        .from('register')
        .select('*', { count: 'exact', head: true });
      setRegistrationCount(count ?? 0);
    } catch (err) {
      console.error('Error fetching count:', err);
    }
  };

  useEffect(() => {
    fetchCount();
    const countInterval = setInterval(fetchCount, 30000);
    
    const timerInterval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => {
      clearInterval(countInterval);
      clearInterval(timerInterval);
    };
  }, []);

  const validators = {
    college: (v: string, custom?: string) => {
      if (!v) return 'Please select your college';
      if (v === 'Other' && !custom?.trim())
        return 'Please enter your college name';
      return '';
    },

    fullName: (v: string) => {
      if (!v.trim()) return 'Full name is required';
      if (v.trim().length < 3)
        return 'Name must be at least 3 characters';
      if (!/^[a-zA-Z\s]+$/.test(v.trim()))
        return 'Name must contain letters only (no numbers or symbols)';
      return '';
    },

    rollNumber: (v: string) => {
      if (!v.trim()) return 'Roll number is required';
      return '';
    },

    department: (v: string) => {
      if (!v) return 'Please select your department';
      return '';
    },

    year: (v: string) => {
      if (!v) return 'Please select your year';
      return '';
    },

    mobile: (v: string) => {
      if (!v.trim()) return 'Mobile number is required';
      if (!/^[6-9][0-9]{9}$/.test(v.trim()))
        return 'Enter a valid 10-digit Indian mobile number starting with 6-9';
      return '';
    },

    email: (v: string) => {
      if (!v.trim()) return ''; // optional field
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()))
        return 'Enter a valid email address';
      return '';
    },

    transactionId: (v: string) => {
      const t = v.trim();
      if (!t) return 'Transaction ID is required';
      if (t.length < 12)
        return 'Transaction ID must be at least 12 characters';
      if (t.length > 25)
        return 'Transaction ID is too long (max 25 characters)';
      if (!/^[a-zA-Z0-9]+$/.test(t))
        return 'Only letters and numbers allowed — no spaces or symbols';
      if (!/\d{4,}/.test(t))
        return 'Transaction ID must contain at least 4 digits (looks fake)';
      return '';
    },

    preferredDomain: (v: string) => {
      if (!v) return 'Please select your preferred domain';
      return '';
    },
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: '' }));
    }
  };

  const handleSubmit = async () => {
    const collegeName =
      formData.college === 'Other'
        ? formData.customCollege
        : formData.college;

    const newErrors: Record<string, string> = {
      college:       validators.college(formData.college, formData.customCollege),
      fullName:      validators.fullName(formData.fullName),
      rollNumber:    validators.rollNumber(formData.rollNumber),
      department:    validators.department(formData.department),
      year:          validators.year(formData.year),
      mobile:        validators.mobile(formData.mobile),
      email:         validators.email(formData.email),
      transactionId: validators.transactionId(formData.transactionId),
      preferredDomain: validators.preferredDomain(formData.preferredDomain),
    };

    setErrors(newErrors);

    // Find first field with error and scroll to it
    const firstErrorKey = Object.keys(newErrors).find(
      (k) => newErrors[k] !== ''
    );

    if (firstErrorKey) {
      const el = document.getElementById(firstErrorKey);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.focus();
        el.classList.add('shake');
      }
      return; // STOP — do not open WhatsApp
    }

    // SAVE TO SUPABASE
    try {
      const { error } = await supabase
        .from('register')
        .insert([{
          college: collegeName,
          name: formData.fullName,
          roll_number: formData.rollNumber,
          department: formData.department,
          year: formData.year,
          mobile_no: formData.mobile,
          e_mail: formData.email || null,
          transaction_id: formData.transactionId
        }]);

      if (error) {
        console.error('Supabase error:', error);
      } else {
        console.log('Saved successfully!');
        fetchCount(); // refresh counter
      }
    } catch (err) {
      console.error('Failed to save to Supabase:', err);
    }

    // ALL VALID — build WhatsApp message
    const message =
`Hello! I have registered for *SPEAKSPHERE* event at NNRG Tech Fest 2027.

*Registration Details:*
━━━━━━━━━━━━━━━━
College: ${collegeName}
Name: ${formData.fullName}
Roll No: ${formData.rollNumber}
Department: ${formData.department}
Year: ${formData.year}
Mobile: ${formData.mobile}
Email: ${formData.email || 'Not provided'}
Preferred Domain: ${formData.preferredDomain}

*Payment Details:*
Amount Paid: ₹100
Transaction ID: ${formData.transactionId}
━━━━━━━━━━━━━━━━
Please verify my payment and confirm
my registration for SPEAKSPHERE.
Thank you! 🙏`;

    window.open(
      `https://wa.me/918309030400?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  return (
    <div className="min-h-screen font-sans selection:bg-purple-500/30 selection:text-purple-200">
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          15%       { transform: translateX(-5px); }
          30%       { transform: translateX(5px); }
          45%       { transform: translateX(-4px); }
          60%       { transform: translateX(4px); }
          75%       { transform: translateX(-2px); }
          90%       { transform: translateX(2px); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.3); }
        }

        .shake {
          animation: shake 0.5s ease-in-out;
        }

        html {
          scroll-behavior: smooth;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#0D1117]">
        {/* Background Layers */}
        <div className="absolute inset-0 z-0 bg-[#0D1117]" />
        <div 
          className="absolute inset-0 z-[1] bg-cover bg-center opacity-50"
          style={{ backgroundImage: 'url("https://res.cloudinary.com/djz4ulfhh/image/upload/v1774013931/speak_sphere_main_image_l1h1tz.jpg")' }}
        />
        <div 
          className="absolute inset-0 z-[2]" 
          style={{ 
            background: 'linear-gradient(to bottom, rgba(13,17,23,0.5) 0%, rgba(13,17,23,0.3) 40%, rgba(13,17,23,0.92) 100%)' 
          }} 
        />

        {/* Floating Snippets */}
        <div className="absolute inset-0 z-[3] pointer-events-none overflow-hidden">
          {[
            { text: "Speak your mind...", top: "20%", left: "10%" },
            { text: "💬 Words matter", top: "15%", right: "15%" },
            { text: "🎤 Your stage", bottom: "25%", left: "15%" },
            { text: "🗣️ Be heard", top: "40%", right: "10%" },
            { text: "Find your voice...", bottom: "15%", right: "12%" }
          ].map((snippet, i) => (
            <span
              key={i}
              className="absolute font-mono text-[13px] z-0"
              style={{ 
                top: snippet.top, 
                left: snippet.left, 
                right: snippet.right, 
                bottom: snippet.bottom,
                color: `rgba(${ACCENT_RGB}, 0.08)`
              }}
            >
              {snippet.text}
            </span>
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl">
          <p className="text-[11px] font-mono mb-4 text-white/35">
            visitor@nnrg:~$ ./launch speaksphere --year=2027
          </p>

          <div className="mb-8 px-6 py-2 border border-[#7C3AED] rounded-full bg-[#7C3AED]/10 flex items-center gap-3">
            <span className="text-[#7C3AED]">⚡</span>
            <span className="text-[#7C3AED] text-[10px] font-bold tracking-[2px] uppercase">
              NNRG TECH FEST 2027 | AI & ML DEPARTMENT
            </span>
          </div>

          <div className="mb-4">
            <h1 className="text-[56px] md:text-[100px] font-[900] leading-none tracking-[-3px] flex flex-wrap justify-center gap-x-4">
              <span className="text-white">SPEAK</span>
              <span className="text-[#7C3AED] drop-shadow-[0_0_15px_rgba(124,58,237,0.3)]">SPHERE</span>
            </h1>
          </div>

          <p className="text-white/60 text-base tracking-[3px] uppercase mb-12">
            Public speaking and presentation competition
          </p>

          {/* Countdown Timer */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {[
              { label: 'YEARS', value: timeLeft.years },
              { label: 'MONTHS', value: timeLeft.months },
              { label: 'DAYS', value: timeLeft.days },
              { label: 'HOURS', value: timeLeft.hours },
              { label: 'MINS', value: timeLeft.minutes },
              { label: 'SECS', value: timeLeft.seconds },
            ].map((unit, i) => (
              <div key={i} className="flex flex-col items-center min-w-[70px] md:min-w-[85px] p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <span className="text-2xl md:text-3xl font-black text-[#7C3AED] tabular-nums">
                  {unit.value.toString().padStart(2, '0')}
                </span>
                <span className="text-[9px] font-bold tracking-[1px] text-white/40 mt-1 uppercase">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center items-center gap-4 mb-4 text-[13px] text-white/90">
            <div className="flex items-center gap-2 pr-4 border-r border-white/20">
              <Calendar className="w-4 h-4 text-[#7C3AED]" />
              <span>Feb 26, 2027</span>
            </div>
            <div className="flex items-center gap-2 pr-4 border-r border-white/20">
              <Users className="w-4 h-4 text-[#7C3AED]" />
              <span>Individual</span>
            </div>
            <div className="flex items-center gap-2 pr-4 border-r border-white/20">
              <MapPin className="w-4 h-4 text-[#7C3AED]" />
              <span>T03</span>
            </div>
            <div className="flex items-center gap-2">
              <IndianRupee className="w-4 h-4 text-[#7C3AED]" />
              <span>₹100</span>
            </div>
          </div>

          {/* Registration Counter */}
          <div className="inline-flex items-center gap-3 bg-[#7C3AED]/12 border border-[#7C3AED]/40 rounded-full px-6 py-2.5 backdrop-blur-md shadow-[0_0_30px_rgba(124,58,237,0.2)] mb-5 hover:border-[#7C3AED]/80 hover:shadow-[0_0_40px_rgba(124,58,237,0.35)] transition-all duration-300 group">
            <div className="w-2.5 h-2.5 bg-[#7C3AED] rounded-full shadow-[0_0_10px_rgba(124,58,237,0.8)] animate-[pulse_1.5s_infinite]" />
            <p className="text-white text-[13px] font-bold tracking-[3px] uppercase">
              LIVE  •  <span className="text-[#7C3AED] text-lg font-black">{registrationCount}</span> REGISTERED
            </p>
            <Users className="w-4 h-4 text-[#7C3AED]/70" />
          </div>

          <div className="w-full max-w-[500px] mx-auto mb-8">
            <a 
              href="#register"
              className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white py-[18px] rounded-xl font-bold text-[15px] shadow-[0_0_25px_rgba(124,58,237,0.5)] transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
            >
              <ArrowDown className="w-4 h-4" />
              Register Now
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="mb-12">
            <p className="text-white/80 text-[18px] font-bold">
              Organizing by <span className="text-[#3B82F6]">AI & ML Department</span>
            </p>
          </div>

          <div className="text-white/20 text-[10px] tracking-[4px] font-bold">
            ↓ SCROLL TO EXPLORE ↓
          </div>
        </div>
      </section>

      {/* Event Details Section */}
      <section className="bg-[#F5F5F5] py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-[36px] font-[900] tracking-[3px] text-[#7C3AED] text-center mb-16 uppercase">
            EVENT DETAILS
          </h2>
          <div className="flex overflow-x-auto md:grid md:grid-cols-5 gap-4 pb-4 md:pb-0 no-scrollbar">
            {[
              { emoji: "📅", label: "DATE", value: "Feb 26, 2027" },
              { emoji: "⏰", label: "TIME", value: "9:30 AM" },
              { emoji: "📍", label: "VENUE", value: "T03" },
              { emoji: "👤", label: "TEAM", value: "Individual" },
              { emoji: "💰", label: "FEE", value: "₹100 / Person" },
            ].map((card, i) => (
              <div 
                key={i}
                className="min-w-[200px] bg-[#0D1B2A] rounded-2xl p-7 text-center border border-white/5 transition-colors hover:border-[#7C3AED]/40"
              >
                <div className="text-4xl mb-4">{card.emoji}</div>
                <div className="text-[#9CA3AF] text-[11px] tracking-[2px] uppercase mb-1">{card.label}</div>
                <div className="text-[#7C3AED] font-bold text-base">{card.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Rounds Section */}
      <section className="bg-[#F5F5F5] py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-[36px] font-[900] tracking-[3px] text-[#7C3AED] text-center mb-16 uppercase">
            EVENT ROUNDS
          </h2>
          <div className="flex flex-col gap-4 max-w-5xl mx-auto">
            {/* Round 1 */}
            <div className="bg-[#0D1B2A] rounded-2xl p-7 border border-white/5 flex flex-col md:flex-row gap-6">
              <div className="w-10 h-10 bg-[#7C3AED] rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-[18px]">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-white font-bold text-xl mb-1">Speak Off</h3>
                <p className="text-[#6e7681] text-xs mb-4">⏱ 3-5 Minutes | Individual Speech</p>
                <ul className="space-y-2 mb-6">
                  {[
                    "Select one domain and deliver a speech lasting 3-5 minutes",
                    "Domains: AI, Robotics, Data Science, ML, IoT, Cyber Security, Cloud Computing, Programming, EdTech, Gaming, 5G, Web Development",
                    "Evaluation: vocabulary, sentence formation, fluency, body language, eye contact",
                    "Selected students proceed to next round"
                  ].map((bullet, i) => (
                    <li key={i} className="flex items-start gap-3 text-[#8b949e] text-[13px]">
                      <span className="text-[#7C3AED] mt-1">►</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
                <div className="border-l-[3px] border-[#7C3AED] bg-[#7C3AED]/10 p-3 text-[#7C3AED] text-xs font-medium">
                  🏆 Selected students advance to Round 2
                </div>
              </div>
            </div>

            {/* Round 2 */}
            <div className="bg-[#0D1B2A] rounded-2xl p-7 border border-white/5 flex flex-col md:flex-row gap-6">
              <div className="w-10 h-10 bg-[#06B6D4] rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-[18px]">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-white font-bold text-xl mb-1">Group Decision</h3>
                <p className="text-[#6e7681] text-xs mb-4">⏱ 10 Minutes | Group Activity</p>
                <ul className="space-y-2 mb-6">
                  {[
                    "Participants divided into groups randomly",
                    "Real-time problem given to the group",
                    "10 minutes for each group to decide",
                    "Groups must provide effective solutions",
                    "Effective groups proceed to next round"
                  ].map((bullet, i) => (
                    <li key={i} className="flex items-start gap-3 text-[#8b949e] text-[13px]">
                      <span className="text-[#06B6D4] mt-1">►</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
                <div className="border-l-[3px] border-[#06B6D4] bg-[#06B6D4]/10 p-3 text-[#06B6D4] text-xs font-medium">
                  🏆 Effective groups advance to Round 3
                </div>
              </div>
            </div>

            {/* Round 3 */}
            <div className="bg-[#0D1B2A] rounded-2xl p-7 border border-white/5 flex flex-col md:flex-row gap-6">
              <div className="w-10 h-10 bg-[#8B5CF6] rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-[18px]">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-white font-bold text-xl mb-1">Face Off</h3>
                <p className="text-[#6e7681] text-xs mb-4">⏱ Final Round | One-on-One Debate</p>
                <ul className="space-y-2 mb-6">
                  {[
                    "Two participants selected randomly",
                    "Statement given to both participants",
                    "Each takes a different stand",
                    "Speak one after the other, no interrupting",
                    "Most efficient speaker wins"
                  ].map((bullet, i) => (
                    <li key={i} className="flex items-start gap-3 text-[#8b949e] text-[13px]">
                      <span className="text-[#8B5CF6] mt-1">►</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
                <div className="border-l-[3px] border-[#8B5CF6] bg-[#8B5CF6]/10 p-3 text-[#8B5CF6] text-xs font-medium">
                  🏆 Final Round — Winners announced here!
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Timeline Section */}
      <section className="bg-[#F5F5F5] py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-[36px] font-[900] tracking-[3px] text-[#7C3AED] text-center mb-16 uppercase">
            EVENT TIMELINE
          </h2>
          <div className="max-w-4xl mx-auto relative">
            {/* Vertical Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-[#7C3AED]/20 -translate-x-1/2" />

            <div className="space-y-12">
              {[
                { date: "Feb 10, 2027", title: "Registrations Open", desc: "Online registration portal goes live for all colleges.", icon: <PlusCircle className="w-4 h-4" /> },
                { date: "Feb 24, 2027", title: "Registration Deadline", desc: "Last day to secure your spot for SPEAKSPHERE.", icon: <Calendar className="w-4 h-4" /> },
                { date: "Feb 25, 2027", title: "Slot Allotment", desc: "Participants receive their specific time slots and briefing.", icon: <Clock className="w-4 h-4" /> },
                { date: "Feb 26, 2027", title: "The Main Event", desc: "Rounds 1, 2, and 3 take place throughout the day.", icon: <Speech className="w-4 h-4" /> },
                { date: "Feb 26, 2027", title: "Winners Announced", desc: "Grand finale and prize distribution ceremony.", icon: <Trophy className="w-4 h-4" /> },
              ].map((item, i) => (
                <div key={i} className={`relative flex items-center ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-[#7C3AED] rounded-full border-4 border-[#F5F5F5] -translate-x-1/2 flex items-center justify-center text-white z-10 shadow-[0_0_15px_rgba(124,58,237,0.4)]">
                    {item.icon}
                  </div>
                  
                  {/* Content Card */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}>
                    <div className="bg-[#0D1B2A] p-6 rounded-2xl border border-white/5 shadow-xl hover:border-[#7C3AED]/40 transition-all group">
                      <div className="text-[#7C3AED] font-bold text-xs tracking-[2px] mb-2 uppercase">{item.date}</div>
                      <h3 className="text-white font-bold text-lg mb-2 group-hover:text-[#7C3AED] transition-colors">{item.title}</h3>
                      <p className="text-[#8b949e] text-[13px] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Event Rules Section */}
      <section className="bg-[#F5F5F5] py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-[36px] font-[900] tracking-[3px] text-[#7C3AED] text-center mb-16 uppercase">
            EVENT RULES
          </h2>
          <div className="bg-[#0D1B2A] rounded-2xl p-8 border border-white/5 max-w-[900px] mx-auto">
            <div className="space-y-6">
              {[
                "Participants must refrain from using foul language or unparliamentary words",
                "All decisions made by the panel of judges are final and binding",
                "Only individual participation is allowed",
                "The decision of the judges will be final in all rounds"
              ].map((rule, i) => (
                <div key={i} className={`flex gap-6 items-start ${i !== 3 ? 'pb-6 border-b border-white/0.06' : ''}`}>
                  <span className="text-[#7C3AED] font-bold text-[18px] min-w-[36px]">0{i+1}</span>
                  <p className="text-[#8b949e] text-[13px] leading-relaxed">
                    {rule.split(' ').map((word, idx) => (
                      <span key={idx} className={['final', 'binding', 'individual'].includes(word.toLowerCase().replace(/[^a-z]/g, '')) ? 'text-[#7C3AED] font-bold' : ''}>
                        {word}{' '}
                      </span>
                    ))}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Prizes & Rewards Section */}
      <section className="bg-[#F5F5F5] py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-[36px] font-[900] tracking-[3px] text-[#7C3AED] text-center mb-16 uppercase">
            PRIZES & REWARDS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* 1st Place */}
            <div className="bg-[#1A0F00] rounded-2xl p-7 text-center border border-[#7C3AED]/30">
              <div className="text-[36px] mb-4">🥇</div>
              <div className="text-[#7C3AED] text-[11px] tracking-[3px] uppercase mb-1">1ST PLACE</div>
              <div className="text-white font-[900] text-[22px] mb-4 uppercase">WINNER</div>
              <div className="space-y-2 text-white/80 text-sm">
                <div>💵 Cash Prize</div>
                <div>🎖 Certificate</div>
                <div>🏆 Trophy</div>
              </div>
            </div>

            {/* 2nd Place */}
            <div className="bg-[#0D1B2A] rounded-2xl p-7 text-center border border-[#3B82F6]/30">
              <div className="text-[36px] mb-4">🥈</div>
              <div className="text-[#60A5FA] text-[11px] tracking-[3px] uppercase mb-1">2ND PLACE</div>
              <div className="text-white font-[900] text-[22px] mb-4 uppercase">RUNNER-UP</div>
              <div className="space-y-2 text-white/80 text-sm">
                <div>💵 Cash Prize</div>
                <div>🎖 Certificate</div>
              </div>
            </div>

            {/* All Participants */}
            <div className="bg-[#0A1F0A] rounded-2xl p-7 text-center border border-[#22C55E]/30">
              <div className="text-[36px] mb-4">⭐</div>
              <div className="text-[#22C55E] text-[11px] tracking-[3px] uppercase mb-1">ALL PARTICIPANTS</div>
              <div className="text-[#22C55E] font-[900] text-[22px] mb-4 uppercase">CERTIFICATE</div>
              <div className="space-y-2 text-white/80 text-sm">
                <div>🎖 Participation Certificate for all</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Details Section */}
      <section className="bg-[#F5F5F5] py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-[36px] font-[900] tracking-[3px] text-[#7C3AED] text-center mb-16 uppercase">
            PAYMENT DETAILS
          </h2>
          <div className="bg-[#0D1B2A] rounded-2xl p-8 border border-white/5 max-w-[700px] mx-auto">
            <div className="bg-[#7C3AED]/10 border-l-[3px] border-[#7C3AED] p-4 mb-8 flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-[#7C3AED]" />
              <p className="text-[#7C3AED] text-xs font-bold uppercase tracking-wide">
                ⚠ PAY FIRST, THEN FILL THE FORM | Keep your Transaction ID ready
              </p>
            </div>

            <div className="text-center mb-6">
              <p className="text-[#6e7681] text-[10px] tracking-[3px] uppercase mb-6">SCAN QR CODE TO PAY</p>
              <div className="inline-block bg-white p-3 rounded-xl mb-8">
                <img 
                  src="https://quickchart.io/qr?text=upi://pay?pa=8309030400-id8e@axl%26pn=GattuAbhinay%26cu=INR%26tn=NNRG_TechFest_speaksphere&size=300" 
                  alt="Payment QR Code"
                  className="w-[260px] h-[260px]"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-1">
                <p className="text-[#6e7681] text-[10px] uppercase tracking-wider">UPI ID</p>
                <p className="text-[#7C3AED] font-mono break-all">8309030400-id8e@axl</p>
              </div>
              <div className="space-y-1">
                <p className="text-[#6e7681] text-[10px] uppercase tracking-wider">PHONE</p>
                <p className="text-[#7C3AED] font-mono">8309030400</p>
              </div>
              <div className="space-y-1">
                <p className="text-[#6e7681] text-[10px] uppercase tracking-wider">NAME</p>
                <p className="text-white font-bold">GATTU ABHINAY</p>
              </div>
              <div className="space-y-1">
                <p className="text-[#6e7681] text-[10px] uppercase tracking-wider">AMOUNT</p>
                <p className="text-[#22C55E] font-bold text-lg">₹100</p>
              </div>
            </div>

            <div className="bg-[#7C3AED]/5 border-l-2 border-[#7C3AED] p-3 text-[#7C3AED] text-sm">
              📋 Note: NNRG TechFest - SPEAKSPHERE
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form Section */}
      <section id="register" className="bg-[#F5F5F5] py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-[36px] font-[900] tracking-[3px] text-[#7C3AED] text-center mb-4 uppercase">
            REGISTRATION FORM
          </h2>
          <p className="text-center text-[#6e7681] mb-12 max-w-2xl mx-auto">
            Fill in your details below. After submission, you'll be redirected to WhatsApp to confirm your registration.
          </p>

          <div className="bg-[#0D1B2A] rounded-2xl p-9 border border-white/5 max-w-[760px] mx-auto">
            <div className="space-y-4">
              {/* College Selection */}
              <div>
                <label className="block text-[#7C3AED] text-[10px] font-bold uppercase tracking-[2px] mb-2">
                  COLLEGE
                </label>
                <select 
                  id="college"
                  value={formData.college}
                  onChange={handleInputChange}
                  className={`w-full bg-white/5 border ${errors.college ? 'border-[#EF4444] shake' : 'border-white/10'} rounded-lg px-4 py-3 text-white text-[13px] focus:border-[#7C3AED] outline-none transition-all`}
                  onAnimationEnd={(e) => e.currentTarget.classList.remove('shake')}
                >
                  {COLLEGES.map(c => <option key={c} value={c} className="bg-[#0D1B2A]">{c}</option>)}
                </select>
                {errors.college && (
                  <p style={{ color: '#EF4444', fontSize: '11px', marginTop: '4px', marginBottom: '12px', paddingLeft: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    ⚠ {errors.college}
                  </p>
                )}
              </div>

              {formData.college === "Other" && (
                <div>
                  <label className="block text-[#7C3AED] text-[10px] font-bold uppercase tracking-[2px] mb-2">
                    SPECIFY COLLEGE NAME *
                  </label>
                  <input 
                    type="text"
                    id="customCollege"
                    placeholder="Type your college name"
                    value={formData.customCollege}
                    onChange={handleInputChange}
                    className={`w-full bg-white/5 border ${errors.college ? 'border-[#EF4444] shake' : 'border-white/10'} rounded-lg px-4 py-3 text-white text-[13px] focus:border-[#7C3AED] outline-none transition-all`}
                    onAnimationEnd={(e) => e.currentTarget.classList.remove('shake')}
                  />
                </div>
              )}

              {/* Full Name */}
              <div>
                <label className="block text-[#7C3AED] text-[10px] font-bold uppercase tracking-[2px] mb-2">
                  FULL NAME *
                </label>
                <input 
                  type="text"
                  id="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`w-full bg-white/5 border ${errors.fullName ? 'border-[#EF4444] shake' : 'border-white/10'} rounded-lg px-4 py-3 text-white text-[13px] focus:border-[#7C3AED] outline-none transition-all`}
                  onAnimationEnd={(e) => e.currentTarget.classList.remove('shake')}
                />
                {errors.fullName && (
                  <p style={{ color: '#EF4444', fontSize: '11px', marginTop: '4px', marginBottom: '12px', paddingLeft: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    ⚠ {errors.fullName}
                  </p>
                )}
              </div>

              {/* Roll Number */}
              <div>
                <label className="block text-[#7C3AED] text-[10px] font-bold uppercase tracking-[2px] mb-2">
                  ROLL NUMBER *
                </label>
                <input 
                  type="text"
                  id="rollNumber"
                  placeholder="e.g. 22A91A0501"
                  value={formData.rollNumber}
                  onChange={handleInputChange}
                  className={`w-full bg-white/5 border ${errors.rollNumber ? 'border-[#EF4444] shake' : 'border-white/10'} rounded-lg px-4 py-3 text-white text-[13px] focus:border-[#7C3AED] outline-none transition-all`}
                  onAnimationEnd={(e) => e.currentTarget.classList.remove('shake')}
                />
                {errors.rollNumber && (
                  <p style={{ color: '#EF4444', fontSize: '11px', marginTop: '4px', marginBottom: '12px', paddingLeft: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    ⚠ {errors.rollNumber}
                  </p>
                )}
              </div>

              {/* Dept & Year */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#7C3AED] text-[10px] font-bold uppercase tracking-[2px] mb-2">
                    DEPARTMENT *
                  </label>
                  <select 
                    id="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className={`w-full bg-white/5 border ${errors.department ? 'border-[#EF4444] shake' : 'border-white/10'} rounded-lg px-4 py-3 text-white text-[13px] focus:border-[#7C3AED] outline-none transition-all`}
                    onAnimationEnd={(e) => e.currentTarget.classList.remove('shake')}
                  >
                    <option value="" className="bg-[#0D1B2A]">Select Department</option>
                    {DEPARTMENTS.map(d => <option key={d} value={d} className="bg-[#0D1B2A]">{d}</option>)}
                  </select>
                  {errors.department && (
                    <p style={{ color: '#EF4444', fontSize: '11px', marginTop: '4px', marginBottom: '12px', paddingLeft: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      ⚠ {errors.department}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-[#7C3AED] text-[10px] font-bold uppercase tracking-[2px] mb-2">
                    YEAR *
                  </label>
                  <select 
                    id="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    className={`w-full bg-white/5 border ${errors.year ? 'border-[#EF4444] shake' : 'border-white/10'} rounded-lg px-4 py-3 text-white text-[13px] focus:border-[#7C3AED] outline-none transition-all`}
                    onAnimationEnd={(e) => e.currentTarget.classList.remove('shake')}
                  >
                    <option value="" className="bg-[#0D1B2A]">Select Year</option>
                    {YEARS.map(y => <option key={y} value={y} className="bg-[#0D1B2A]">{y}</option>)}
                  </select>
                  {errors.year && (
                    <p style={{ color: '#EF4444', fontSize: '11px', marginTop: '4px', marginBottom: '12px', paddingLeft: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      ⚠ {errors.year}
                    </p>
                  )}
                </div>
              </div>

              {/* Mobile & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#7C3AED] text-[10px] font-bold uppercase tracking-[2px] mb-2">
                    MOBILE *
                  </label>
                  <input 
                    type="tel"
                    id="mobile"
                    maxLength={10}
                    placeholder="10-digit mobile number"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    className={`w-full bg-white/5 border ${errors.mobile ? 'border-[#EF4444] shake' : 'border-white/10'} rounded-lg px-4 py-3 text-white text-[13px] focus:border-[#7C3AED] outline-none transition-all`}
                    onAnimationEnd={(e) => e.currentTarget.classList.remove('shake')}
                  />
                  {errors.mobile && (
                    <p style={{ color: '#EF4444', fontSize: '11px', marginTop: '4px', marginBottom: '12px', paddingLeft: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      ⚠ {errors.mobile}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-[#7C3AED] text-[10px] font-bold uppercase tracking-[2px] mb-2">
                    EMAIL
                  </label>
                  <input 
                    type="email"
                    id="email"
                    placeholder="your@email.com (optional)"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full bg-white/5 border ${errors.email ? 'border-[#EF4444] shake' : 'border-white/10'} rounded-lg px-4 py-3 text-white text-[13px] focus:border-[#7C3AED] outline-none transition-all`}
                    onAnimationEnd={(e) => e.currentTarget.classList.remove('shake')}
                  />
                  {errors.email && (
                    <p style={{ color: '#EF4444', fontSize: '11px', marginTop: '4px', marginBottom: '12px', paddingLeft: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      ⚠ {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Preferred Domain */}
              <div>
                <label className="block text-[#7C3AED] text-[10px] font-bold uppercase tracking-[2px] mb-2">
                  PREFERRED DOMAIN *
                </label>
                <select 
                  id="preferredDomain"
                  value={formData.preferredDomain}
                  onChange={handleInputChange}
                  className={`w-full bg-white/5 border ${errors.preferredDomain ? 'border-[#EF4444] shake' : 'border-white/10'} rounded-lg px-4 py-3 text-white text-[13px] focus:border-[#7C3AED] outline-none transition-all`}
                  onAnimationEnd={(e) => e.currentTarget.classList.remove('shake')}
                >
                  {DOMAINS.map(d => <option key={d} value={d} className="bg-[#0D1B2A]">{d}</option>)}
                </select>
                {errors.preferredDomain && (
                  <p style={{ color: '#EF4444', fontSize: '11px', marginTop: '4px', marginBottom: '12px', paddingLeft: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    ⚠ {errors.preferredDomain}
                  </p>
                )}
              </div>

              {/* Transaction ID */}
              <div>
                <label className="block text-[#7C3AED] text-[10px] font-bold uppercase tracking-[2px] mb-2">
                  TRANSACTION ID *
                </label>
                <input 
                  type="text"
                  id="transactionId"
                  placeholder="UPI Transaction ID after payment"
                  value={formData.transactionId}
                  onChange={handleInputChange}
                  className={`w-full bg-white/5 border ${errors.transactionId ? 'border-[#EF4444] shake' : 'border-white/10'} rounded-lg px-4 py-3 text-white text-[13px] focus:border-[#7C3AED] outline-none transition-all`}
                  onAnimationEnd={(e) => e.currentTarget.classList.remove('shake')}
                />
                {errors.transactionId && (
                  <p style={{ color: '#EF4444', fontSize: '11px', marginTop: '4px', marginBottom: '12px', paddingLeft: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    ⚠ {errors.transactionId}
                  </p>
                )}
                <p style={{
                  color: '#6e7681',
                  fontSize: '10px',
                  marginTop: errors.transactionId ? '0' : '4px',
                  marginBottom: '16px',
                  paddingLeft: '2px'
                }}>
                  e.g. 419259330046 or T2502261234ABC
                  · Min 12 chars · Numbers required · No spaces
                </p>
              </div>

              {/* Reminder Box */}
              <div className="bg-[#7C3AED]/5 border-l-[3px] border-[#7C3AED] p-4 my-6">
                <p className="text-[#7C3AED] text-[13px] leading-relaxed">
                  💡 Reminder: Pay ₹100 to UPI ID <span className="text-[#7C3AED] font-bold">8309030400-id8e@axl</span> first, then enter your Transaction ID above.
                </p>
              </div>

              {/* On Submit Box */}
              <div className="bg-[#22C55E]/5 border-l-[3px] border-[#22C55E] p-4 my-6">
                <p className="text-[#22C55E] text-[13px] leading-relaxed">
                  🟢 On Submit: You'll be redirected to WhatsApp to send your registration details to the coordinator for confirmation.
                </p>
              </div>

              {/* Submit Button */}
              <button 
                type="button"
                onClick={handleSubmit}
                className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white py-[18px] rounded-xl font-bold text-[15px] shadow-[0_0_30px_rgba(124,58,237,0.4)] transition-all flex items-center justify-center gap-3 mt-8 active:scale-[0.98]"
              >
                <PlusCircle className="w-5 h-5" />
                Submit Registration & Open WhatsApp
                <ArrowRight className="w-5 h-5" />
              </button>

              <p className="text-center text-[#6e7681] text-[11px] mt-6 leading-relaxed">
                By submitting, you agree to the event rules and confirm that your payment has been made. All decisions by the organizing committee are final.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="relative py-20 overflow-hidden bg-black">
        {/* Background Image Layer */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: 'url("https://res.cloudinary.com/djz4ulfhh/image/upload/v1775127709/lander_page_x1734b.png")' }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/80 via-black/40 to-black/90" />

        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[2]">
          <span className="text-[clamp(60px,12vw,160px)] font-[900] text-white/[0.03] tracking-[8px] whitespace-nowrap uppercase">
            TECH FEST 2027
          </span>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-white text-[28px] font-bold text-center mb-16">NEED HELP?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Faculty Coordinators */}
            <div>
              <h3 className="text-white/30 text-[10px] font-bold tracking-[3px] uppercase mb-6">FACULTY COORDINATORS</h3>
              <div className="space-y-2">
                {[
                  { name: "Dr. V.V. Appaji", phone: "9949062386" },
                  { name: "Mr. M. Eswara Rao", phone: "8143848778" },
                ].map((coord, i) => (
                  <div key={i} className="bg-[#0D1117] border border-[#21262d] rounded-md p-4 flex justify-between items-center">
                    <span className="text-white font-bold text-sm">{coord.name}</span>
                    <span className="text-white/40 text-xs">{coord.phone}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Student Coordinators */}
            <div>
              <h3 className="text-white/30 text-[10px] font-bold tracking-[3px] uppercase mb-6">STUDENT COORDINATORS</h3>
              <div className="space-y-2">
                {/* Main Student Coordinator */}
                <a 
                  href="https://wa.me/918309030400" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block bg-[#0a0f1e] border-l-4 border-[#7C3AED] rounded-r-md p-4 flex justify-between items-center transition-colors hover:bg-[#1a0f2b]"
                >
                  <div>
                    <p className="text-[#7C3AED]/60 text-[8px] font-bold uppercase mb-1">STUDENT COORDINATOR</p>
                    <p className="text-[#7C3AED] font-bold text-base">GATTU ABHINAY</p>
                  </div>
                  <span className="text-[#7C3AED] font-bold text-[13px]">8309030400 ↗</span>
                </a>

                {[
                  { name: "Nithish", phone: "6301234532" },
                  { name: "Akhil", phone: "7281823454" },
                ].map((coord, i) => (
                  <div key={i} className="bg-[#0D1117] border border-[#21262d] rounded-md p-4 flex justify-between items-center">
                    <div>
                      <p className="text-white/30 text-[8px] font-bold uppercase">STUDENT COORDINATOR</p>
                      <span className="text-white font-bold text-sm">{coord.name}</span>
                    </div>
                    <span className="text-white/40 text-xs">{coord.phone}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/0.07 mt-20 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-white/20 text-[10px] text-center md:text-left">
            <p>Developed by the CSM Department</p>
            <p>© 2027 NNRG Fest. All rights reserved.</p>
            <a 
              href="https://wa.me/918309030400" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#7C3AED] hover:underline"
            >
              Designed by GATTU ABHINAY ↗
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
