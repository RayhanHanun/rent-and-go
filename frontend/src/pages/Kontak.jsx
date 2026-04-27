import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, Clock } from 'lucide-react';

const QUICK_CONTACTS = [
  {
    icon: Phone,
    title: 'WhatsApp / Telepon',
    value: '+62 812-3456-7890'
  },
  {
    icon: Mail,
    title: 'Email Corporate',
    value: 'hello@rentandgo.com'
  },
  {
    icon: MapPin,
    title: 'Kantor Pusat',
    value: 'Jl. Ring Road Utara, Condongcatur, Yogyakarta'
  }
];

const Kontak = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[50vh] bg-slate-950 flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=2670&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-linear-to-b from-slate-950/60 via-slate-900/70 to-slate-950/95 mix-blend-multiply" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-10">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 drop-shadow-lg"
          >
            Hubungi Kami
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-300 font-light leading-relaxed max-w-3xl mx-auto"
          >
            Punya pertanyaan seputar armada atau butuh penawaran khusus untuk perusahaan? Jangan ragu untuk menghubungi tim kami.
          </motion.p>
        </div>
      </section>

      {/* Quick Contacts Grid */}
      <section className="py-20 -mt-8 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {QUICK_CONTACTS.map((contact, idx) => (
              <motion.div
                key={contact.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + idx * 0.1 }}
                className="bg-white p-8 rounded-2xl border border-slate-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="w-14 h-14 bg-slate-50 text-slate-900 rounded-2xl flex items-center justify-center mb-6">
                  <contact.icon size={28} strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{contact.title}</h3>
                <p className="text-slate-500 leading-relaxed">{contact.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left Column: Form */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl border border-slate-100 p-8 lg:p-10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]"
            >
              <h2 className="text-2xl font-bold text-slate-900 mb-8">Kirim Pesan</h2>

              <form className="space-y-5">
                <div>
                  <label htmlFor="nama" className="block text-sm font-medium text-slate-700 mb-2">
                    Nama Lengkap
                  </label>
                  <input
                    id="nama"
                    name="nama"
                    type="text"
                    placeholder="Masukkan nama lengkap"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="nama@perusahaan.com"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition"
                  />
                </div>

                <div>
                  <label htmlFor="whatsapp" className="block text-sm font-medium text-slate-700 mb-2">
                    Nomor WhatsApp
                  </label>
                  <input
                    id="whatsapp"
                    name="whatsapp"
                    type="tel"
                    placeholder="08xxxxxxxxxx"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition"
                  />
                </div>

                <div>
                  <label htmlFor="subjek" className="block text-sm font-medium text-slate-700 mb-2">
                    Subjek
                  </label>
                  <select
                    id="subjek"
                    name="subjek"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition"
                    defaultValue=""
                  >
                    <option value="" disabled>Pilih subjek pesan</option>
                    <option value="tanya-harga">Tanya Harga</option>
                    <option value="keluhan">Keluhan</option>
                    <option value="kerjasama-b2b">Kerjasama B2B</option>
                    <option value="lainnya">Lainnya</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="pesan" className="block text-sm font-medium text-slate-700 mb-2">
                    Pesan Anda
                  </label>
                  <textarea
                    id="pesan"
                    name="pesan"
                    rows={5}
                    placeholder="Tulis kebutuhan Anda di sini..."
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-6 py-3.5 rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-sm shadow-slate-900/20"
                >
                  <Send size={18} />
                  Kirim Pesan Sekarang
                </button>
              </form>
            </motion.div>

            {/* Right Column: Map & Hours */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-2xl border border-slate-100 p-3 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]">
                <iframe
                  title="Lokasi Rent and Go Yogyakarta"
                  src="https://www.google.com/maps?q=Yogyakarta&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-96 rounded-2xl border-0"
                />
              </div>

              <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Jam Operasional</h3>
                <div className="space-y-3 text-slate-600">
                  <div className="flex items-start gap-3">
                    <Clock size={18} className="text-slate-400 mt-0.5" />
                    <p>Layanan Booking: <span className="font-semibold text-slate-900">24/7 (Online)</span></p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock size={18} className="text-slate-400 mt-0.5" />
                    <p>Jam Operasional Garasi: <span className="font-semibold text-slate-900">Senin - Minggu, 07.00 - 22.00 WIB</span></p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Kontak;
