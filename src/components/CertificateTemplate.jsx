import React from "react";

const CertificateTemplate = ({
  intern_name,
  role,
  start_date,
  end_date,
  intern_id,
  qr_code
}) => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl bg-white border-[3px] border-[#1a365d] p-2">
        {/* Inner gold border */}
        <div className="border-2 border-[#d69e2e] p-6 relative">

          {/* Corner decorations - Top Left */}
          <div className="absolute top-4 left-4">
            <svg width="80" height="80" viewBox="0 0 80 80" className="text-[#1a365d]">
              <line x1="0" y1="10" x2="60" y2="10" stroke="currentColor" strokeWidth="2" />
              <line x1="10" y1="0" x2="10" y2="60" stroke="currentColor" strokeWidth="2" />
              <line x1="0" y1="20" x2="40" y2="20" stroke="currentColor" strokeWidth="2" />
              <line x1="20" y1="0" x2="20" y2="40" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>

          {/* Corner decorations - Top Right */}
          <div className="absolute top-4 right-4">
            <svg width="80" height="80" viewBox="0 0 80 80" className="text-[#1a365d]">
              <line x1="20" y1="10" x2="80" y2="10" stroke="currentColor" strokeWidth="2" />
              <line x1="70" y1="0" x2="70" y2="60" stroke="currentColor" strokeWidth="2" />
              <line x1="40" y1="20" x2="80" y2="20" stroke="currentColor" strokeWidth="2" />
              <line x1="60" y1="0" x2="60" y2="40" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>

          {/* Corner decorations - Bottom Left */}
          <div className="absolute bottom-4 left-4">
            <svg width="80" height="80" viewBox="0 0 80 80" className="text-[#1a365d]">
              <line x1="0" y1="70" x2="60" y2="70" stroke="currentColor" strokeWidth="2" />
              <line x1="10" y1="20" x2="10" y2="80" stroke="currentColor" strokeWidth="2" />
              <line x1="0" y1="60" x2="40" y2="60" stroke="currentColor" strokeWidth="2" />
              <line x1="20" y1="40" x2="20" y2="80" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>

          {/* Corner decorations - Bottom Right */}
          <div className="absolute bottom-4 right-4">
            <svg width="80" height="80" viewBox="0 0 80 80" className="text-[#1a365d]">
              <line x1="20" y1="70" x2="80" y2="70" stroke="currentColor" strokeWidth="2" />
              <line x1="70" y1="20" x2="70" y2="80" stroke="currentColor" strokeWidth="2" />
              <line x1="40" y1="60" x2="80" y2="60" stroke="currentColor" strokeWidth="2" />
              <line x1="60" y1="40" x2="60" y2="80" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>

          {/* Top decorative element */}
          <div className="flex justify-center mb-4">
            <div className="flex items-center gap-2">
              <div className="w-16 h-[2px] bg-[#d69e2e]"></div>
              <div className="flex gap-1">
                {[0, 1].map((i) => (
                  <svg key={i} width="24" height="24" viewBox="0 0 24 24" className="text-[#d69e2e]">
                    <path fill="none" stroke="currentColor" strokeWidth="2" d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" />
                    <path fill="none" stroke="currentColor" strokeWidth="2" d="M7 4v6M4 7h6M17 4v6M14 7h6M7 14v6M4 17h6M17 14v6M14 17h6" />
                  </svg>
                ))}
              </div>
              <div className="w-16 h-[2px] bg-[#d69e2e]"></div>
            </div>
          </div>

          {/* Main content */}
          <div className="text-center px-8 py-4">

            {/* Certificate Title */}
            <h1 className="text-4xl font-serif text-[#1a365d] tracking-wider mb-1">CERTIFICATE</h1>
            <p className="text-sm text-[#1a365d] tracking-[0.3em] mb-6">OF INTERNSHIP</p>

            {/* Company Name */}
            <h2 className="text-xl font-bold text-[#1a365d] mb-2">YUGA YATRA RETAIL (OPC) PRIVATE LIMITED</h2>
            <p className="text-xs text-[#1a365d] tracking-wider mb-8">THIS CERTIFICATE IS PROUDLY PRESENTED TO</p>

            {/* Recipient Name */}
            <div className="mb-6">
              <h3 className="text-2xl font-serif font-semibold text-black mb-2">{intern_name}</h3>
              <div className="w-full h-[1px] bg-gray-400"></div>
            </div>

            {/* Certificate Body */}
            <div className="text-sm text-gray-700 leading-relaxed mb-6">
              <p>We are happy to certify that Mr <strong>{intern_name}</strong></p>
              <p>has completed his Internship as a <strong>"{role}"</strong> from <strong>{start_date}</strong> to <strong>{end_date}</strong></p>
            </div>

            <p className="text-sm text-gray-700 mb-8">We appreciate his work and contributions. May every step forward be a step toward greatness.</p>

            {/* Bottom section */}
            <div className="flex justify-between items-end mt-8">

              {/* Signature */}
              <div className="text-left">
                <p className="text-xs text-gray-600 mb-1">Sincerely yours</p>
                <img src="/sign.png" alt="Signature" className="w-28 mb-1" />
                <p className="text-sm font-semibold text-[#1a365d]">Debashish Kumar</p>
                <p className="text-xs text-gray-600">Founder & CEO</p>
              </div>

              {/* Seal */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full border-4 border-[#1a365d] bg-[#f6ad55] flex items-center justify-center relative">
                  <div className="absolute inset-1 border-2 border-dashed border-[#1a365d] rounded-full"></div>
                  <svg width="40" height="40" viewBox="0 0 40 40" className="text-[#1a365d]">
                    <circle cx="20" cy="20" r="15" fill="none" stroke="currentColor" strokeWidth="1" />
                    {[...Array(12)].map((_, i) => (
                      <line key={i} x1="20" y1="8" x2="20" y2="12" stroke="currentColor" strokeWidth="1" transform={`rotate(${i * 30} 20 20)`} />
                    ))}
                  </svg>
                </div>
              </div>

              {/* Intern ID */}
              <div className="text-right">
                <p className="text-sm text-[#1a365d]">Intern ID {intern_id}</p>
                {/* QR Code */}
                {qr_code && <img src={qr_code} alt="QR Code" className="w-20 mt-2 ml-auto" />}
              </div>

            </div>
          </div>

          {/* Bottom decorative element */}
          <div className="flex justify-center mt-4">
            <div className="flex items-center gap-2">
              <div className="w-16 h-[2px] bg-[#d69e2e]"></div>
              <div className="flex gap-1">
                {[0, 1].map((i) => (
                  <svg key={i} width="24" height="24" viewBox="0 0 24 24" className="text-[#d69e2e]">
                    <path fill="none" stroke="currentColor" strokeWidth="2" d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" />
                    <path fill="none" stroke="currentColor" strokeWidth="2" d="M7 4v6M4 7h6M17 4v6M14 7h6M7 14v6M4 17h6M17 14v6M14 17h6" />
                  </svg>
                ))}
              </div>
              <div className="w-16 h-[2px] bg-[#d69e2e]"></div>
            </div>
          </div>

          {/* Logo - Top Right */}
          <div className="absolute top-6 right-8">
            <img src="/certificate yylogo.png" alt="Logo" className="w-12 h-12" />
          </div>

        </div>
      </div>
    </div>
  );
};

export default CertificateTemplate;