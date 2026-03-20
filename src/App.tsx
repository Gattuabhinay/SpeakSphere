/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
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
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
interface FormData {
  college: string;
  otherCollege: string;
  fullName: string;
  rollNumber: string;
  department: string;
  year: string;
  mobile: string;
  email: string;
  preferredDomain: string;
  transactionId: string;
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

export default function App() {
  const [formData, setFormData] = useState<FormData>({
    college: COLLEGES[0],
    otherCollege: '',
    fullName: '',
    rollNumber: '',
    department: DEPARTMENTS[0],
    year: YEARS[0],
    mobile: '',
    email: '',
    preferredDomain: DOMAINS[0],
    transactionId: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const formRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: false }));
    }
  };

  const validateForm = () => {
    const newErrors: Partial<Record<keyof FormData, boolean>> = {};
    if (!formData.fullName) newErrors.fullName = true;
    if (!formData.rollNumber) newErrors.rollNumber = true;
    if (!formData.mobile || formData.mobile.length < 10) newErrors.mobile = true;
    if (!formData.preferredDomain) newErrors.preferredDomain = true;
    if (!formData.transactionId) newErrors.transactionId = true;
    if (formData.college === "Other" && !formData.otherCollege) newErrors.otherCollege = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const collegeName = formData.college === "Other" ? formData.otherCollege : formData.college;
      const message = `Hello! I have registered for *SPEAKSPHERE* event at NNRG Tech Fest 2027.

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
Please verify my payment and confirm my registration for SpeakSphere.
Thank you! 🙏
━━━━━━━━━━━━━━━━━━━━━━━`;

      const encodedMessage = encodeURIComponent(message);
      window.open(`https://wa.me/918309030400?text=${encodedMessage}`, '_blank');
    } else {
      // Scroll to first error
      const firstErrorField = document.querySelector('.border-red-500');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  return (
    <div className="min-h-screen font-sans selection:bg-purple-500/30 selection:text-purple-200">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#0D1117]">
        {/* Background Layers */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center opacity-100"
          style={{ backgroundImage: 'url("https://res.cloudinary.com/djz4ulfhh/image/upload/v1774013931/speak_sphere_main_image_l1h1tz.jpg")' }}
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/20 via-transparent to-[#0D1117]" />

        {/* Floating Snippets */}
        <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
          {[
            { text: "Speak your mind...", top: "20%", left: "10%" },
            { text: "💬 Words matter", top: "15%", right: "15%" },
            { text: "🎤 Your stage", bottom: "25%", left: "15%" },
            { text: "🗣️ Be heard", top: "40%", right: "10%" },
          ].map((snippet, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.1 }}
              transition={{ delay: i * 0.5, duration: 2 }}
              className="absolute text-[13px] text-[#7C3AED] font-medium"
              style={{ top: snippet.top, left: snippet.left, right: snippet.right, bottom: snippet.bottom }}
            >
              {snippet.text}
            </motion.span>
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-30 flex flex-col items-center text-center px-4 max-w-5xl">
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 0.35, y: 0 }}
            className="text-[11px] font-mono mb-4"
          >
            visitor@nnrg:~$ ./launch speaksphere --year=2027
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 px-6 py-2 border border-[#7C3AED]/30 rounded-full bg-black/40 backdrop-blur-sm flex items-center gap-3"
          >
            <span className="text-[#7C3AED]">⚡</span>
            <span className="text-white/80 text-[12px] md:text-[14px] font-bold tracking-[2px] uppercase">
              NNRG TECH FEST 2027 | <span className="text-[#3B82F6]">AI & ML DEPARTMENT</span>
            </span>
          </motion.div>

          <div className="mb-4">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[56px] md:text-[100px] font-[900] leading-none tracking-[-3px] flex flex-wrap justify-center gap-x-4"
            >
              <span className="text-white">SPEAK</span>
              <span className="text-[#7C3AED] drop-shadow-[0_0_15px_rgba(124,58,237,0.3)]">SPHERE</span>
            </motion.h1>
          </div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.4 }}
            className="text-white text-sm md:text-base tracking-[3px] uppercase mb-12"
          >
            Public speaking and presentation competition
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center items-center gap-4 mb-12 text-[13px] text-white/90"
          >
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
          </motion.div>

          <div className="relative w-full max-w-[500px] mx-auto">
            <motion.a 
              href="#register"
              whileHover={{ scale: 1.02, backgroundColor: '#6D28D9' }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-[#7C3AED] text-white py-[18px] rounded-xl font-bold text-[15px] shadow-[0_0_25px_rgba(124,58,237,0.5)] transition-all flex items-center justify-center gap-3"
            >
              <ArrowDown className="w-4 h-4" />
              Register Now
              <ArrowRight className="w-4 h-4" />
            </motion.a>

            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-8 text-white/80 text-[18px] tracking-wide"
            >
              Organizing by <span className="text-[#3B82F6] font-bold">AI & ML Department</span>
            </motion.p>
          </div>

          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/20 text-[10px] tracking-[4px] font-bold"
          >
            ↓ SCROLL TO EXPLORE ↓
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-12 right-[5%] md:right-[10%] text-[#7C3AED] font-medium italic text-[14px] tracking-wider whitespace-nowrap z-40"
          >
            Find your voice...
          </motion.p>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="bg-[#F5F5F5] py-20">
        
        {/* Event Details Section */}
        <section className="container mx-auto px-4 mb-32">
          <h2 className="text-[36px] font-[900] tracking-[3px] text-[#7C3AED] text-center mb-16 uppercase">
            EVENT DETAILS
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { emoji: "📅", label: "DATE", value: "Feb 26, 2027" },
              { emoji: "⏰", label: "TIME", value: "9:30 AM" },
              { emoji: "📍", label: "VENUE", value: "T03" },
              { emoji: "👤", label: "TEAM", value: "Individual" },
              { emoji: "💰", label: "FEE", value: "₹100 / Person" },
            ].map((card, i) => (
              <motion.div 
                key={i}
                whileHover={{ borderColor: 'rgba(124,58,237,0.4)' }}
                className="bg-[#0D1B2A] rounded-2xl p-7 text-center border border-white/5 transition-colors"
              >
                <div className="text-4xl mb-4">{card.emoji}</div>
                <div className="text-[#9CA3AF] text-[11px] tracking-[2px] uppercase mb-1">{card.label}</div>
                <div className="text-[#7C3AED] font-bold text-base">{card.value}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Event Rounds Section */}
        <section className="container mx-auto px-4 mb-32">
          <h2 className="text-[36px] font-[900] tracking-[3px] text-[#7C3AED] text-center mb-16 uppercase">
            EVENT ROUNDS
          </h2>
          <div className="flex flex-col gap-4 max-w-5xl mx-auto">
            {/* Round 1 */}
            <motion.div className="bg-[#0D1B2A] rounded-2xl p-7 border border-white/5">
              <div className="flex items-start gap-6">
                <div className="w-10 h-10 bg-[#7C3AED] rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-xl mb-1">Speak Off</h3>
                  <p className="text-[#9CA3AF] text-sm mb-4">⏱ 3-5 Minutes | Individual Speech</p>
                  <ul className="space-y-2 mb-6">
                    {[
                      "Select one domain and deliver a speech lasting 3-5 minutes",
                      "Domains: AI, Robotics, Data Science, ML, IoT, Cyber Security, Cloud Computing, Programming, EdTech, Gaming, 5G, Web Development",
                      "Evaluation: vocabulary, sentence formation, fluency, body language, eye contact",
                      "Selected students proceed to next round"
                    ].map((bullet, i) => (
                      <li key={i} className="flex items-start gap-3 text-[#8b949e] text-sm">
                        <span className="text-[#7C3AED] mt-1">►</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  <div className="border-l-[3px] border-[#7C3AED] bg-[#7C3AED]/10 p-3 text-[#7C3AED] text-sm font-medium">
                    🏆 Selected students advance to Round 2
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Round 2 */}
            <motion.div className="bg-[#0D1B2A] rounded-2xl p-7 border border-white/5">
              <div className="flex items-start gap-6">
                <div className="w-10 h-10 bg-[#06B6D4] rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-xl mb-1">Group Decision</h3>
                  <p className="text-[#9CA3AF] text-sm mb-4">⏱ 10 Minutes | Group Activity</p>
                  <ul className="space-y-2 mb-6">
                    {[
                      "Participants divided into groups randomly",
                      "Real-time problem given to the group",
                      "10 minutes for each group to decide",
                      "Groups must provide effective solutions",
                      "Effective groups proceed to next round"
                    ].map((bullet, i) => (
                      <li key={i} className="flex items-start gap-3 text-[#8b949e] text-sm">
                        <span className="text-[#06B6D4] mt-1">►</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  <div className="border-l-[3px] border-[#06B6D4] bg-[#06B6D4]/10 p-3 text-[#06B6D4] text-sm font-medium">
                    🏆 Effective groups advance to Round 3
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Round 3 */}
            <motion.div className="bg-[#0D1B2A] rounded-2xl p-7 border border-white/5">
              <div className="flex items-start gap-6">
                <div className="w-10 h-10 bg-[#EC4899] rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-xl mb-1">Face Off</h3>
                  <p className="text-[#9CA3AF] text-sm mb-4">⏱ Final Round | One-on-One Debate</p>
                  <ul className="space-y-2 mb-6">
                    {[
                      "Two participants selected randomly",
                      "Statement given to both participants",
                      "Each takes a different stand",
                      "Speak one after the other, no interrupting",
                      "Most efficient speaker wins"
                    ].map((bullet, i) => (
                      <li key={i} className="flex items-start gap-3 text-[#8b949e] text-sm">
                        <span className="text-[#EC4899] mt-1">►</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  <div className="border-l-[3px] border-[#EC4899] bg-[#EC4899]/10 p-3 text-[#EC4899] text-sm font-medium">
                    🏆 Final Round — Winners announced here!
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Event Rules Section */}
        <section className="container mx-auto px-4 mb-32">
          <h2 className="text-[36px] font-[900] tracking-[3px] text-[#7C3AED] text-center mb-16 uppercase">
            EVENT RULES
          </h2>
          <div className="bg-[#0D1B2A] rounded-2xl p-8 border border-white/5 max-w-[900px] mx-auto">
            <div className="space-y-6">
              {[
                { id: "01", text: "Participants must refrain from using foul language or unparliamentary words" },
                { id: "02", text: <>All decisions made by the panel of judges are <span className="text-[#7C3AED] font-bold">final and binding</span></> },
                { id: "03", text: <>Only <span className="text-[#7C3AED] font-bold">individual</span> participation is allowed</> },
                { id: "04", text: "The decision of the judges will be final in all rounds" },
              ].map((rule, i) => (
                <div key={i} className={`flex gap-6 items-start ${i !== 3 ? 'pb-6 border-b border-white/5' : ''}`}>
                  <span className="text-[#7C3AED] font-bold text-lg leading-none">{rule.id}</span>
                  <p className="text-[#8b949e] text-[13px] leading-relaxed">{rule.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Prizes & Rewards Section */}
        <section className="container mx-auto px-4 mb-32">
          <h2 className="text-[36px] font-[900] tracking-[3px] text-[#7C3AED] text-center mb-16 uppercase">
            PRIZES & REWARDS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* 1st Place */}
            <motion.div className="bg-[#1A0F00] rounded-2xl p-7 text-center border border-[#7C3AED]/30">
              <div className="text-[36px] mb-4">🥇</div>
              <div className="text-[#7C3AED] text-[11px] tracking-[3px] uppercase mb-1">1ST PLACE</div>
              <div className="text-white font-[900] text-[22px] mb-4">WINNER</div>
              <div className="space-y-2 text-white/80 text-sm">
                <div className="flex items-center justify-center gap-2">💵 Cash Prize</div>
                <div className="flex items-center justify-center gap-2">🎖 Certificate</div>
                <div className="flex items-center justify-center gap-2">🏆 Trophy</div>
              </div>
            </motion.div>

            {/* 2nd Place */}
            <motion.div className="bg-[#0D1B2A] rounded-2xl p-7 text-center border border-[#8B5CF6]/30">
              <div className="text-[36px] mb-4">🥈</div>
              <div className="text-[#A78BFA] text-[11px] tracking-[3px] uppercase mb-1">2ND PLACE</div>
              <div className="text-white font-[900] text-[22px] mb-4">RUNNER-UP</div>
              <div className="space-y-2 text-white/80 text-sm">
                <div className="flex items-center justify-center gap-2">💵 Cash Prize</div>
                <div className="flex items-center justify-center gap-2">🎖 Certificate</div>
              </div>
            </motion.div>

            {/* 3rd Place */}
            <motion.div className="bg-[#0D1117] rounded-2xl p-7 text-center border border-gray-500/30">
              <div className="text-[36px] mb-4">🥉</div>
              <div className="text-[#9CA3AF] text-[11px] tracking-[3px] uppercase mb-1">3RD PLACE</div>
              <div className="text-white font-[900] text-[22px] mb-4">FINALIST</div>
              <div className="space-y-2 text-white/80 text-sm">
                <div className="flex items-center justify-center gap-2">💵 Cash Prize</div>
                <div className="flex items-center justify-center gap-2">🎖 Certificate</div>
              </div>
            </motion.div>
          </div>
          <p className="text-center text-[#6e7681] text-[13px] mt-8">
            🎓 Every participant will receive a participation certificate
          </p>
        </section>

        {/* Payment Details Section */}
        <section className="container mx-auto px-4 mb-32">
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
                  src="https://quickchart.io/qr?text=upi://pay?pa=8309030400-id8e@axl%26pn=GattuAbhinay%26am=100%26cu=INR%26tn=NNRG_TechFest_SpeakSphere&size=300" 
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
              📋 Note: NNRG TechFest - SpeakSphere
            </div>
          </div>
        </section>

        {/* Registration Form Section */}
        <section id="register" className="container mx-auto px-4 mb-32" ref={formRef}>
          <h2 className="text-[36px] font-[900] tracking-[3px] text-[#7C3AED] text-center mb-4 uppercase">
            REGISTRATION FORM
          </h2>
          <p className="text-center text-[#6e7681] mb-12 max-w-2xl mx-auto">
            Fill in your details below. After submission, you'll be redirected to WhatsApp to confirm your registration.
          </p>

          <div className="bg-[#0D1B2A] rounded-2xl p-9 border border-white/5 max-w-[760px] mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* College Selection */}
              <div>
                <label className="block text-[#7C3AED] text-[10px] font-bold uppercase tracking-[2px] mb-2">
                  COLLEGE *
                </label>
                <select 
                  name="college"
                  value={formData.college}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-[13px] focus:border-[#7C3AED] outline-none transition-all"
                >
                  {COLLEGES.map(c => <option key={c} value={c} className="bg-[#0D1B2A]">{c}</option>)}
                </select>
              </div>

              {formData.college === "Other" && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                  <label className="block text-[#7C3AED] text-[10px] font-bold uppercase tracking-[2px] mb-2 mt-4">
                    SPECIFY COLLEGE NAME *
                  </label>
                  <input 
                    type="text"
                    name="otherCollege"
                    placeholder="Type your college name"
                    value={formData.otherCollege}
                    onChange={handleInputChange}
                    className={`w-full bg-white/5 border ${errors.otherCollege ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-white text-[13px] focus:border-[#7C3AED] outline-none transition-all`}
                  />
                </motion.div>
              )}

              {/* Full Name */}
              <div>
                <label className="block text-[#7C3AED] text-[10px] font-bold uppercase tracking-[2px] mb-2">
                  FULL NAME *
                </label>
                <input 
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`w-full bg-white/5 border ${errors.fullName ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-white text-[13px] focus:border-[#7C3AED] outline-none transition-all`}
                />
              </div>

              {/* Roll Number */}
              <div>
                <label className="block text-[#7C3AED] text-[10px] font-bold uppercase tracking-[2px] mb-2">
                  ROLL NUMBER *
                </label>
                <input 
                  type="text"
                  name="rollNumber"
                  placeholder="e.g. 22A91A0501"
                  value={formData.rollNumber}
                  onChange={handleInputChange}
                  className={`w-full bg-white/5 border ${errors.rollNumber ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-white text-[13px] focus:border-[#7C3AED] outline-none transition-all`}
                />
              </div>

              {/* Dept & Year */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#7C3AED] text-[10px] font-bold uppercase tracking-[2px] mb-2">
                    DEPARTMENT *
                  </label>
                  <select 
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-[13px] focus:border-[#7C3AED] outline-none transition-all"
                  >
                    {DEPARTMENTS.map(d => <option key={d} value={d} className="bg-[#0D1B2A]">{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[#7C3AED] text-[10px] font-bold uppercase tracking-[2px] mb-2">
                    YEAR *
                  </label>
                  <select 
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-[13px] focus:border-[#7C3AED] outline-none transition-all"
                  >
                    {YEARS.map(y => <option key={y} value={y} className="bg-[#0D1B2A]">{y}</option>)}
                  </select>
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
                    name="mobile"
                    placeholder="10-digit mobile number"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    className={`w-full bg-white/5 border ${errors.mobile ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-white text-[13px] focus:border-[#7C3AED] outline-none transition-all`}
                  />
                </div>
                <div>
                  <label className="block text-[#7C3AED] text-[10px] font-bold uppercase tracking-[2px] mb-2">
                    EMAIL (OPTIONAL)
                  </label>
                  <input 
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-[13px] focus:border-[#7C3AED] outline-none transition-all"
                  />
                </div>
              </div>

              {/* Preferred Domain */}
              <div>
                <label className="block text-[#7C3AED] text-[10px] font-bold uppercase tracking-[2px] mb-2">
                  PREFERRED DOMAIN *
                </label>
                <select 
                  name="preferredDomain"
                  value={formData.preferredDomain}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-[13px] focus:border-[#7C3AED] outline-none transition-all"
                >
                  {DOMAINS.map(d => <option key={d} value={d} className="bg-[#0D1B2A]">{d}</option>)}
                </select>
              </div>

              {/* Transaction ID */}
              <div>
                <label className="block text-[#7C3AED] text-[10px] font-bold uppercase tracking-[2px] mb-2">
                  TRANSACTION ID *
                </label>
                <input 
                  type="text"
                  name="transactionId"
                  placeholder="UPI Transaction ID after payment"
                  value={formData.transactionId}
                  onChange={handleInputChange}
                  className={`w-full bg-white/5 border ${errors.transactionId ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-white text-[13px] focus:border-[#7C3AED] outline-none transition-all`}
                />
              </div>

              {/* Reminder Box */}
              <div className="bg-[#7C3AED]/5 border-l-[3px] border-[#7C3AED] p-4 my-6">
                <p className="text-[#7C3AED] text-[13px] leading-relaxed">
                  💡 Reminder: Pay ₹100 to UPI ID <span className="font-bold">8309030400-id8e@axl</span> first, then enter your Transaction ID above.
                </p>
              </div>

              {/* On Submit Box */}
              <div className="bg-[#22C55E]/5 border-l-[3px] border-[#22C55E] p-4 my-6">
                <p className="text-[#22C55E] text-[13px] leading-relaxed">
                  🟢 On Submit: You'll be redirected to WhatsApp to send your registration details to the coordinator for confirmation.
                </p>
              </div>

              {/* Submit Button */}
              <motion.button 
                type="submit"
                whileHover={{ scale: 1.01, backgroundColor: '#6D28D9' }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#7C3AED] text-white py-[18px] rounded-xl font-bold text-[15px] shadow-[0_0_30px_rgba(124,58,237,0.4)] transition-all flex items-center justify-center gap-3 mt-8"
              >
                <PlusCircle className="w-5 h-5" />
                Submit Registration & Open WhatsApp
                <ArrowRight className="w-5 h-5" />
              </motion.button>

              <p className="text-center text-[#6e7681] text-[11px] mt-6 leading-relaxed">
                By submitting, you agree to the event rules and confirm that your payment has been made. All decisions by the organizing committee are final.
              </p>
            </form>
          </div>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="bg-black relative py-20 overflow-hidden">
        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
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
                    <span className="text-gray-500 text-xs">{coord.phone}</span>
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
                  className="block bg-[#120a1e] border-l-4 border-[#7C3AED] rounded-r-md p-4 flex justify-between items-center transition-colors hover:bg-[#1a0f2b]"
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
                      <p className="text-gray-500 text-[8px] font-bold uppercase">STUDENT COORDINATOR</p>
                      <span className="text-white font-bold text-sm">{coord.name}</span>
                    </div>
                    <span className="text-gray-500 text-xs">{coord.phone}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 mt-20 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-white/20 text-[10px] text-center md:text-left">
            <p>Developed and maintained by CSM Department</p>
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
