import React from 'react';
import { useChurch } from '../../context/ChurchContext';
import { Target, Compass, BookOpen, ShieldCheck } from 'lucide-react';

export const AboutSection = () => {
  const { churchSettings, workers } = useChurch();

  const beliefs = [
    { title: "The Holy Trinity", desc: "We believe in one God eternally existing in three co-equal persons: Father, Son, and Holy Spirit." },
    { title: "Authority of Scripture", desc: "The Bible is the inspired, infallible, and authoritative Word of God for faith and conduct." },
    { title: "Salvation Through Grace", desc: "Salvation is received by grace through faith in Jesus Christ alone, who died for our sins and rose again." },
    { title: "Church & Kingdom Service", desc: "Every believer is gifted by the Holy Spirit to serve in the body of Christ and make disciples globally." },
    { title: "Worship & Prayer", desc: "Continuous prayer and Spirit-led worship unlock God's supernatural power and presence in daily life." }
  ];

  return (
    <div className="space-y-12 w-full">
      
      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold uppercase tracking-wider">
          Our Foundation & Heritage
        </span>
        <h1 className="font-serif-spiritual text-4xl sm:text-5xl font-extrabold text-slate-900">
          About <span className="gradient-text-gold">{churchSettings.name}</span>
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Discover our rich history, divine vision, foundational doctrines, and leadership dedicated to serving God's flock.
        </p>
      </div>

      {/* Vision & Mission Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center font-bold">
            <Compass className="w-6 h-6" />
          </div>
          <h2 className="font-serif-spiritual text-2xl font-bold text-slate-900">Our Vision</h2>
          <p className="text-slate-600 text-sm leading-relaxed">{churchSettings.vision}</p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center font-bold">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="font-serif-spiritual text-2xl font-bold text-slate-900">Our Mission</h2>
          <p className="text-slate-600 text-sm leading-relaxed">{churchSettings.mission}</p>
        </div>

      </div>

      {/* Church History */}
      <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-serif-spiritual text-2xl font-bold text-slate-900">Church History & Heritage</h2>
            <p className="text-xs text-amber-700 font-semibold">Over 28 years of God's faithfulness</p>
          </div>
        </div>

        <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
          {churchSettings.history}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-100 text-center">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="font-serif-spiritual text-3xl font-extrabold text-amber-600">1998</div>
            <div className="text-xs text-slate-500 font-medium mt-1">Year Founded</div>
          </div>
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="font-serif-spiritual text-3xl font-extrabold text-amber-600">2,000+</div>
            <div className="text-xs text-slate-500 font-medium mt-1">Active Congregation</div>
          </div>
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="font-serif-spiritual text-3xl font-extrabold text-amber-600">125+</div>
            <div className="text-xs text-slate-500 font-medium mt-1">Dedicated Workers</div>
          </div>
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="font-serif-spiritual text-3xl font-extrabold text-amber-600">8</div>
            <div className="text-xs text-slate-500 font-medium mt-1">Ministry Departments</div>
          </div>
        </div>
      </div>

      {/* Statement of Beliefs */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="font-serif-spiritual text-3xl font-bold text-slate-900">Statement of Beliefs</h2>
          <p className="text-xs text-slate-500">What we believe and stand upon in faith</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {beliefs.map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
                <h3 className="font-bold text-sm text-slate-900">{item.title}</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Leadership Showcase */}
      <div className="space-y-6 pt-6">
        <div className="text-center space-y-2">
          <h2 className="font-serif-spiritual text-3xl font-bold text-slate-900">Pastoral & Departmental Leadership</h2>
          <p className="text-xs text-slate-500">Servant leaders guiding our ministries with integrity and wisdom</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {workers.slice(0, 8).map((leader) => (
            <div key={leader.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-4 text-center">
              <img
                src={leader.photo}
                alt={leader.name}
                className="w-24 h-24 rounded-full mx-auto object-cover ring-4 ring-amber-200 shadow-md"
              />
              <div>
                <h3 className="font-bold text-sm text-slate-900">{leader.name}</h3>
                <p className="text-xs text-amber-700 font-semibold mt-0.5">{leader.designation}</p>
                <p className="text-[11px] text-slate-500 mt-1">{leader.department}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
