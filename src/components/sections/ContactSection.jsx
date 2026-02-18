import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const easeOut = "easeOut";
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.5, ease: easeOut },
    }),
  };

  return (
    <section className="relative bg-gray-900 min-h-screen py-16 px-4 overflow-hidden">
      {/* Decorative curved lines */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-100 200 Q300 100 600 300 T1300 200"
            stroke="white"
            strokeWidth="1"
          />
          <path
            d="M-100 400 Q300 300 600 500 T1300 400"
            stroke="white"
            strokeWidth="1"
          />
          <path
            d="M-100 600 Q300 500 600 700 T1300 600"
            stroke="white"
            strokeWidth="1"
          />
        </svg>
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* White card container */}
        <motion.div
          className="bg-gray-600 rounded-2xl mt-10 p-8 md:p-12 shadow-xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <motion.div
            className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-10"
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-4xl md:text-5xl text-[hsl(var(--primary))] tracking-tight uppercase">
              Contact Us
            </h2>
            <p className="text-[hsl(var(--primary))] text-sm md:text-base max-w-md leading-relaxed">
              If you have any questions, please feel free to get in touch with
              us via phone, text, email, the form below, or even on social
              media!
            </p>
          </motion.div>

          {/* Main content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Left: Form */}
            <motion.div
              className="bg-contact-card border border-contact-border rounded-xl p-6"
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              <h3 className="text-sm font-bold text-[hsl(var(--primary))] tracking-wider uppercase mb-5">
                Get in Touch
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[hsl(var(--primary))] uppercase tracking-wider mb-1.5">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your name*"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full border border-contact-border rounded-md px-3 py-2.5 text-sm text-[hsl(var(--primary))] placeholder:text-contact-muted/60 focus:outline-none focus:ring-2 focus:ring-contact-red/30 focus:border-contact-red transition-colors bg-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[hsl(var(--primary))] uppercase tracking-wider mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Enter your phone number*"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full border border-contact-border rounded-md px-3 py-2.5 text-sm text-[hsl(var(--primary))] placeholder:text-contact-muted/60 focus:outline-none focus:ring-2 focus:ring-contact-red/30 focus:border-contact-red transition-colors bg-transparent"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[hsl(var(--primary))] uppercase tracking-wider mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email*"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-contact-border rounded-md px-3 py-2.5 text-sm text-[hsl(var(--primary))] placeholder:text-contact-muted/60 focus:outline-none focus:ring-2 focus:ring-contact-red/30 focus:border-contact-red transition-colors bg-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[hsl(var(--primary))] uppercase tracking-wider mb-1.5">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full border border-contact-border rounded-md px-3 py-2.5 text-sm text-[hsl(var(--primary))] placeholder:text-contact-muted/60 focus:outline-none focus:ring-2 focus:ring-contact-red/30 focus:border-contact-red transition-colors bg-transparent resize-none"
                  />
                </div>
                <motion.button
                  type="submit"
                  className="bg-[hsl(var(--accent))] text-white font-semibold text-sm px-8 py-3 rounded-full hover:bg-[hsl(var(--crent))] transition-colors uppercase tracking-wider"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>

            {/* Right: Contact Info + Hours */}
            <div className="flex flex-col gap-6">
              <motion.div
                className="bg-contact-card border border-contact-border rounded-xl p-6"
                custom={2}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
              >
                <h3 className="text-sm font-bold text-contact-heading tracking-wider uppercase mb-5">
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-contact-red/10 flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4 text-contact-red" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-contact-heading uppercase">
                        Phone
                      </p>
                      <p className="text-sm text-contact-muted">773-365-1240</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-contact-red/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4 text-contact-red" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-contact-heading uppercase">
                        Address
                      </p>
                      <p className="text-sm text-contact-muted">
                        1425 N McLean Blvd, Elgin, IL
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-contact-red/10 flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4 text-contact-red" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-contact-heading uppercase">
                        Email
                      </p>
                      <p className="text-sm text-contact-muted">
                        office@steponetrans.com
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="bg-contact-card border border-contact-border rounded-xl p-6"
                custom={3}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
              >
                <h3 className="text-sm font-bold text-contact-heading tracking-wider uppercase mb-4">
                  Business Hours
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs font-bold text-contact-heading uppercase">
                      Monday - Friday
                    </p>
                    <p className="text-sm text-contact-muted">
                      9:00 am - 8:00 pm
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-contact-heading uppercase">
                      Saturday
                    </p>
                    <p className="text-sm text-contact-muted">
                      9:00 am - 6:00 pm
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-contact-heading uppercase">
                      Sunday
                    </p>
                    <p className="text-sm text-contact-muted">
                      9:00 am - 5:00 pm
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Map */}
          <motion.div
            className="rounded-xl overflow-hidden border border-contact-border h-64 md:h-80"
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <iframe
              title="Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2958.5!2d-88.3!3d42.04!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDLCsDAyJzI0LjAiTiA4OMKwMTgnMDAuMCJX!5e0!3m2!1sen!2sus!4v1600000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
