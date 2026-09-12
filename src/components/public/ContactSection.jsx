import React, { useState } from 'react';
import { useChurch } from '../../context/ChurchContext';
import { MapPin, Phone, Mail, Send, CheckCircle2 } from 'lucide-react';

export const ContactSection = () => {
  const { churchSettings } = useChurch();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <div className="space-y-12 w-full">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold uppercase tracking-wider">
          Reach Out to Us
        </span>
        <h1 className="font-serif-spiritual text-4xl sm:text-5xl font-extrabold text-slate-900">
          Contact <span className="gradient-text-gold">{churchSettings.name}</span>
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          We would love to pray with you, answer your questions, or welcome you to our next service.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Contact Info & Timings */}
        <div className="lg:col-span-5 space-y-6 animate-fadeInUp stagger-1">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 glass-card-glow hover-lift shadow-sm space-y-6">
            <h2 className="font-serif-spiritual text-2xl font-bold text-slate-900">Church Office Info</h2>

            <div className="space-y-4 text-xs text-slate-700">
              <div className="flex items-start gap-3 group">
                <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 shrink-0 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Main Campus Address</h4>
                  <p className="text-slate-600 mt-0.5 font-medium">{churchSettings.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 group">
                <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 shrink-0 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Pastoral Office Phone</h4>
                  <p className="text-slate-600 mt-0.5 font-medium">{churchSettings.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 group">
                <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 shrink-0 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">General Email</h4>
                  <p className="text-slate-600 mt-0.5 font-medium">{churchSettings.email}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-3">
              <h3 className="text-xs font-bold uppercase text-amber-700 tracking-wider">Office Hours</h3>
              <div className="text-xs text-slate-600 space-y-1 font-medium">
                <p>Monday - Friday: 08:30 AM - 05:00 PM</p>
                <p>Saturday: 09:00 AM - 01:00 PM</p>
                <p>Sunday: Active Service Hours</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact & Prayer Request Form */}
        <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-3xl border border-slate-200 glass-card-glow hover-lift shadow-sm space-y-6 animate-fadeInUp stagger-2">
          <div>
            <h2 className="font-serif-spiritual text-2xl font-bold text-slate-900">Send Us a Message or Prayer Request</h2>
            <p className="text-xs text-slate-500 mt-1 font-medium">Our pastoral care team responds to every inquiry within 24 hours.</p>
          </div>

          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl text-center space-y-3 animate-scaleIn">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
              <h3 className="text-lg font-bold text-slate-900">Thank You! Message Received</h3>
              <p className="text-xs text-slate-700 font-medium">Your message has been sent to our pastoral team. We are praying with you!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g. Brother Mark"
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="mark@example.com"
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700">Subject</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500"
                  >
                    <option value="">General Inquiry</option>
                    <option value="Prayer Request">Prayer Request</option>
                    <option value="Pastoral Counseling">Pastoral Counseling</option>
                    <option value="Joining a Ministry">Joining a Ministry</option>
                    <option value="Worker Registration">Worker Registration</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700">Your Message / Prayer Request *</label>
                <textarea
                  rows="4"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="How can we serve or pray for you today?"
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl p-4 focus:outline-none focus:border-amber-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-2xl flex items-center justify-center gap-2 shadow-md transition-all hover:scale-[1.01]"
              >
                <Send className="w-4 h-4" />
                Submit Inquiry to Pastoral Office
              </button>
            </form>
          )}
        </div>

      </div>

      {/* Google Maps Location Placeholder */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between px-2">
          <h3 className="font-serif-spiritual text-lg font-bold text-slate-900 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-amber-600" />
            Church Location Map
          </h3>
          <span className="text-xs text-slate-500">{churchSettings.address}</span>
        </div>
        <div className="w-full h-72 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 relative">
          <iframe
            title="Church Location Map"
            src={churchSettings.googleMapsEmbed}
            className="w-full h-full border-0 transition-opacity"
            loading="lazy"
          ></iframe>
        </div>
      </div>

    </div>
  );
};
