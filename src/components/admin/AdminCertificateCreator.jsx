import React, { useState } from 'react';
import CertificateTemplate from '../CertificateTemplate';
import { createClient } from '@supabase/supabase-js';
import html2canvas from 'html2canvas';
import QRCode from 'qrcode';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const AdminCertificateCreator = () => {
  const [formData, setFormData] = useState({
    intern_name: '',
    intern_id: '',
    role: '',
    start_date: '',
    end_date: ''
  });
  const [loading, setLoading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [qrCode, setQrCode] = useState(null);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [downloadedCertificateUrl, setDownloadedCertificateUrl] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateQRCode = async () => {
    try {
      // Get the current domain for the full URL
      const baseUrl = window.location.origin;
      const qrData = `${baseUrl}/certificate/${formData.intern_id}`;
      const qrCodeDataUrl = await QRCode.toDataURL(qrData, {
        width: 200,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
      setQrCode(qrCodeDataUrl);
      return qrCodeDataUrl;
    } catch (error) {
      console.error('Error generating QR code:', error);
      return null;
    }
  };

  const handlePreview = async () => {
    if (!formData.intern_name || !formData.intern_id || !formData.role || !formData.start_date || !formData.end_date) {
      alert('Please fill in all fields before previewing');
      return;
    }

    setLoading(true);
    const qrCodeDataUrl = await generateQRCode();
    if (qrCodeDataUrl) {
      setPreviewMode(true);
    }
    setLoading(false);
  };

  const generateCertificate = async () => {
    if (!formData.intern_name || !formData.intern_id || !formData.role || !formData.start_date || !formData.end_date) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      // Generate QR code
      const qrCodeDataUrl = await generateQRCode();
      if (!qrCodeDataUrl) {
        throw new Error('Failed to generate QR code');
      }

      // Create temporary certificate element for capture
      const tempDiv = document.createElement('div');
      tempDiv.style.position = 'fixed';
      tempDiv.style.left = '0';
      tempDiv.style.top = '0';
      tempDiv.style.width = '100%';
      tempDiv.style.height = '100%';
      tempDiv.style.background = '#173a63';
      tempDiv.style.zIndex = '9999';
      tempDiv.style.overflow = 'auto';
      document.body.appendChild(tempDiv);

      // Create certificate HTML string
      const certificateHTML = `
        <div style="min-height: 100vh; background: #f3f4f6; display: flex; align-items: center; justify-content: center; padding: 16px;">
          <div style="position: relative; width: 100%; max-width: 1024px; background: white; border: 3px solid #1a365d; padding: 8px;">
            <div style="border: 2px solid #d69e2e; padding: 24px; position: relative;">

              <div style="position: absolute; top: 16px; left: 16px;">
                <svg width="80" height="80" viewBox="0 0 80 80">
                  <line x1="0" y1="10" x2="60" y2="10" stroke="#1a365d" stroke-width="2" />
                  <line x1="10" y1="0" x2="10" y2="60" stroke="#1a365d" stroke-width="2" />
                  <line x1="0" y1="20" x2="40" y2="20" stroke="#1a365d" stroke-width="2" />
                  <line x1="20" y1="0" x2="20" y2="40" stroke="#1a365d" stroke-width="2" />
                </svg>
              </div>

              <div style="position: absolute; top: 16px; right: 16px;">
                <svg width="80" height="80" viewBox="0 0 80 80">
                  <line x1="20" y1="10" x2="80" y2="10" stroke="#1a365d" stroke-width="2" />
                  <line x1="70" y1="0" x2="70" y2="60" stroke="#1a365d" stroke-width="2" />
                  <line x1="40" y1="20" x2="80" y2="20" stroke="#1a365d" stroke-width="2" />
                  <line x1="60" y1="0" x2="60" y2="40" stroke="#1a365d" stroke-width="2" />
                </svg>
              </div>

              <div style="position: absolute; bottom: 16px; left: 16px;">
                <svg width="80" height="80" viewBox="0 0 80 80">
                  <line x1="0" y1="70" x2="60" y2="70" stroke="#1a365d" stroke-width="2" />
                  <line x1="10" y1="20" x2="10" y2="80" stroke="#1a365d" stroke-width="2" />
                  <line x1="0" y1="60" x2="40" y2="60" stroke="#1a365d" stroke-width="2" />
                  <line x1="20" y1="40" x2="20" y2="80" stroke="#1a365d" stroke-width="2" />
                </svg>
              </div>

              <div style="position: absolute; bottom: 16px; right: 16px;">
                <svg width="80" height="80" viewBox="0 0 80 80">
                  <line x1="20" y1="70" x2="80" y2="70" stroke="#1a365d" stroke-width="2" />
                  <line x1="70" y1="20" x2="70" y2="80" stroke="#1a365d" stroke-width="2" />
                  <line x1="40" y1="60" x2="80" y2="60" stroke="#1a365d" stroke-width="2" />
                  <line x1="60" y1="40" x2="60" y2="80" stroke="#1a365d" stroke-width="2" />
                </svg>
              </div>

              <div style="display: flex; justify-content: center; margin-bottom: 16px;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <div style="width: 64px; height: 2px; background: #d69e2e;"></div>
                  <div style="display: flex; gap: 4px;">
                    <svg width="24" height="24" viewBox="0 0 24 24">
                      <path fill="none" stroke="#d69e2e" stroke-width="2" d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" />
                      <path fill="none" stroke="#d69e2e" stroke-width="2" d="M7 4v6M4 7h6M17 4v6M14 7h6M7 14v6M4 17h6M17 14v6M14 17h6" />
                    </svg>
                    <svg width="24" height="24" viewBox="0 0 24 24">
                      <path fill="none" stroke="#d69e2e" stroke-width="2" d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" />
                      <path fill="none" stroke="#d69e2e" stroke-width="2" d="M7 4v6M4 7h6M17 4v6M14 7h6M7 14v6M4 17h6M17 14v6M14 17h6" />
                    </svg>
                  </div>
                  <div style="width: 64px; height: 2px; background: #d69e2e;"></div>
                </div>
              </div>

              <div style="text-align: center; padding: 32px;">
                <h1 style="font-size: 36px; font-family: serif; color: #1a365d; letter-spacing: 2px; margin-bottom: 4px;">CERTIFICATE</h1>
                <p style="font-size: 14px; color: #1a365d; letter-spacing: 0.3em; margin-bottom: 24px;">OF INTERNSHIP</p>
                <h2 style="font-size: 20px; font-weight: bold; color: #1a365d; margin-bottom: 8px;">YUGA YATRA RETAIL (OPC) PRIVATE LIMITED</h2>
                <p style="font-size: 12px; color: #1a365d; letter-spacing: 0.1em; margin-bottom: 32px;">THIS CERTIFICATE IS PROUDLY PRESENTED TO</p>
                <div style="margin-bottom: 24px;">
                  <h3 style="font-size: 24px; font-family: serif; font-weight: 600; color: black; margin-bottom: 8px;">${formData.intern_name}</h3>
                  <div style="width: 100%; height: 1px; background: #9ca3af;"></div>
                </div>
                <div style="font-size: 14px; color: #374151; line-height: 1.6; margin-bottom: 24px;">
                  <p>We are happy to certify that Mr <strong>${formData.intern_name}</strong></p>
                  <p>has completed his Internship as a <strong>"${formData.role}"</strong> from <strong>${formData.start_date}</strong> to <strong>${formData.end_date}</strong></p>
                </div>
                <p style="font-size: 14px; color: #374151; margin-bottom: 32px;">We appreciate his work and contributions. May every step forward be a step toward greatness.</p>
                <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 32px;">
                  <div style="text-align: left;">
                    <p style="font-size: 12px; color: #4b5563; margin-bottom: 4px;">Sincerely yours</p>
                    <img src="/sign.png" alt="Signature" style="width: 112px; margin-bottom: 4px;" />
                    <p style="font-size: 14px; font-weight: 600; color: #1a365d;">Debashish Kumar</p>
                    <p style="font-size: 12px; color: #4b5563;">Founder & CEO</p>
                  </div>
                  <div style="display: flex; flex-direction: column; align-items: center;">
                    <div style="width: 80px; height: 80px; border-radius: 50%; border: 4px solid #1a365d; background: #f6ad55; display: flex; align-items: center; justify-content: center; position: relative;">
                      <div style="position: absolute; inset: 4px; border: 2px dashed #1a365d; border-radius: 50%;"></div>
                      <svg width="40" height="40" viewBox="0 0 40 40">
                        <circle cx="20" cy="20" r="15" fill="none" stroke="#1a365d" stroke-width="1" />
                        <line x1="20" y1="8" x2="20" y2="12" stroke="#1a365d" stroke-width="1" transform="rotate(0 20 20)" />
                        <line x1="20" y1="8" x2="20" y2="12" stroke="#1a365d" stroke-width="1" transform="rotate(30 20 20)" />
                        <line x1="20" y1="8" x2="20" y2="12" stroke="#1a365d" stroke-width="1" transform="rotate(60 20 20)" />
                        <line x1="20" y1="8" x2="20" y2="12" stroke="#1a365d" stroke-width="1" transform="rotate(90 20 20)" />
                        <line x1="20" y1="8" x2="20" y2="12" stroke="#1a365d" stroke-width="1" transform="rotate(120 20 20)" />
                        <line x1="20" y1="8" x2="20" y2="12" stroke="#1a365d" stroke-width="1" transform="rotate(150 20 20)" />
                        <line x1="20" y1="8" x2="20" y2="12" stroke="#1a365d" stroke-width="1" transform="rotate(180 20 20)" />
                        <line x1="20" y1="8" x2="20" y2="12" stroke="#1a365d" stroke-width="1" transform="rotate(210 20 20)" />
                        <line x1="20" y1="8" x2="20" y2="12" stroke="#1a365d" stroke-width="1" transform="rotate(240 20 20)" />
                        <line x1="20" y1="8" x2="20" y2="12" stroke="#1a365d" stroke-width="1" transform="rotate(270 20 20)" />
                        <line x1="20" y1="8" x2="20" y2="12" stroke="#1a365d" stroke-width="1" transform="rotate(300 20 20)" />
                        <line x1="20" y1="8" x2="20" y2="12" stroke="#1a365d" stroke-width="1" transform="rotate(330 20 20)" />
                      </svg>
                    </div>
                  </div>
                  <div style="text-align: right;">
                    <p style="font-size: 14px; color: #1a365d;">Intern ID ${formData.intern_id}</p>
                    <img src="${qrCodeDataUrl}" alt="QR Code" style="width: 80px; margin-top: 8px; margin-left: auto;" />
                  </div>
                </div>
              </div>
              <div style="display: flex; justify-content: center; margin-top: 16px;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <div style="width: 64px; height: 2px; background: #d69e2e;"></div>
                  <div style="display: flex; gap: 4px;">
                    <svg width="24" height="24" viewBox="0 0 24 24">
                      <path fill="none" stroke="#d69e2e" stroke-width="2" d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" />
                      <path fill="none" stroke="#d69e2e" stroke-width="2" d="M7 4v6M4 7h6M17 4v6M14 7h6M7 14v6M4 17h6M17 14v6M14 17h6" />
                    </svg>
                    <svg width="24" height="24" viewBox="0 0 24 24">
                      <path fill="none" stroke="#d69e2e" stroke-width="2" d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" />
                      <path fill="none" stroke="#d69e2e" stroke-width="2" d="M7 4v6M4 7h6M17 4v6M14 7h6M7 14v6M4 17h6M17 14v6M14 17h6" />
                    </svg>
                  </div>
                  <div style="width: 64px; height: 2px; background: #d69e2e;"></div>
                </div>
              </div>
              <div style="position: absolute; top: 24px; right: 32px;">
                <img src="/certificate yylogo.png" alt="Logo" style="width: 48px; height: 48px;" />
              </div>
            </div>
          </div>
        </div>
      `;

      tempDiv.innerHTML = certificateHTML;

      // Wait for images to load
      await new Promise(resolve => {
        const images = tempDiv.querySelectorAll('img');
        let loadedCount = 0;
        const totalImages = images.length;
        
        if (totalImages === 0) {
          resolve();
          return;
        }
        
        images.forEach(img => {
          if (img.complete) {
            loadedCount++;
            if (loadedCount === totalImages) resolve();
          } else {
            img.onload = () => {
              loadedCount++;
              if (loadedCount === totalImages) resolve();
            };
            img.onerror = () => {
              loadedCount++;
              if (loadedCount === totalImages) resolve();
            };
          }
        });
        
        // Fallback timeout
        setTimeout(resolve, 3000);
      });

      // Capture as canvas
      const canvas = await html2canvas(tempDiv.querySelector('div > div'), {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#173a63',
        width: 1100,
        height: 750,
        scrollX: 0,
        scrollY: 0,
        windowWidth: 1100,
        windowHeight: 750
      });

      // Convert to blob and download
      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
      
      // Generate unique filename
      const fileName = `certificate_${formData.intern_id}_${Date.now()}.png`;

      // Create download link and trigger download
      const downloadUrl = URL.createObjectURL(blob);
      
      // Create and trigger download
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Store for WhatsApp (don't revoke immediately)
      setDownloadedCertificateUrl(downloadUrl);

      // Upload to Supabase Storage (optional - for record keeping)
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('certificates')
        .upload(`generated/${fileName}`, blob, {
          contentType: 'image/png',
          cacheControl: '3600'
        });

      if (uploadError) {
        console.warn('Storage upload failed:', uploadError);
      }

      // Upload QR code to storage
      const qrFileName = `qr_${formData.intern_id}_${Date.now()}.png`;
      const qrBlob = await (await fetch(qrCodeDataUrl)).blob();
      
      const { data: qrUploadData, error: qrUploadError } = await supabase.storage
        .from('certificates')
        .upload(`generated/${qrFileName}`, qrBlob, {
          contentType: 'image/png',
          cacheControl: '3600'
        });

      if (qrUploadError) {
        console.warn('QR upload failed:', qrUploadError);
      }

      // Get public URLs if uploads succeeded
      let certificatePublicUrl = null;
      let qrPublicUrl = null;

      if (!uploadError) {
        const { data: { publicUrl } } = supabase.storage
          .from('certificates')
          .getPublicUrl(`generated/${fileName}`);
        certificatePublicUrl = publicUrl;
      }

      if (!qrUploadError) {
        const { data: { publicUrl: qrUrl } } = supabase.storage
          .from('certificates')
          .getPublicUrl(`generated/${qrFileName}`);
        qrPublicUrl = qrUrl;
      }

      // Insert certificate record into database (update if exists)
      const { data: certificateData, error: dbError } = await supabase
        .from('certificates')
        .upsert({
          intern_name: formData.intern_name,
          intern_id: formData.intern_id,
          role: formData.role,
          start_date: formData.start_date,
          end_date: formData.end_date,
          certificate_url: certificatePublicUrl,
          qr_code_url: qrPublicUrl
        }, {
          onConflict: 'intern_id'
        })
        .select()
        .single();

      if (dbError) {
        console.warn('Database insert failed:', dbError);
      }

      // Clean up
      document.body.removeChild(tempDiv);

      // Show success alert
      alert(`Certificate generated successfully for ${formData.intern_name}!`);

      // Show WhatsApp modal
      setShowWhatsAppModal(true);

    } catch (error) {
      console.error('Error generating certificate:', error);
      alert(`Error generating certificate: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setPreviewMode(false);
  };

  const handleWhatsAppSend = () => {
    if (downloadedCertificateUrl) {
      // Create WhatsApp message
      const message = `Hello ${formData.intern_name},\n\nCongratulations on completing your internship as ${formData.role}!\n\nPlease find your certificate attached.\n\nYou can verify your certificate at: ${window.location.origin}/certificate/${formData.intern_id}\n\nBest regards,\nYuga Yatra Retail Team`;
      
      // Open WhatsApp with the message
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
    
    // Clean up URL if exists
    if (downloadedCertificateUrl) {
      URL.revokeObjectURL(downloadedCertificateUrl);
    }
    
    // Close modal and reset form
    setShowWhatsAppModal(false);
    setFormData({
      intern_name: '',
      intern_id: '',
      role: '',
      start_date: '',
      end_date: ''
    });
    setPreviewMode(false);
    setQrCode(null);
    setDownloadedCertificateUrl(null);
  };

  const handleWhatsAppCancel = () => {
    // Clean up URL if exists
    if (downloadedCertificateUrl) {
      URL.revokeObjectURL(downloadedCertificateUrl);
    }
    
    // Close modal and reset form
    setShowWhatsAppModal(false);
    setFormData({
      intern_name: '',
      intern_id: '',
      role: '',
      start_date: '',
      end_date: ''
    });
    setPreviewMode(false);
    setQrCode(null);
    setDownloadedCertificateUrl(null);
  };

  if (previewMode) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Certificate Preview</h3>
          <div className="space-x-3">
            <button
              onClick={handleBack}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Back to Edit
            </button>
            <button
              onClick={generateCertificate}
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? 'Generating...' : 'Generate Certificate'}
            </button>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg overflow-auto">
          <div className="transform scale-50 origin-top">
            <CertificateTemplate
              intern_name={formData.intern_name}
              role={formData.role}
              start_date={formData.start_date}
              end_date={formData.end_date}
              intern_id={formData.intern_id}
              qr_code={qrCode}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Create New Certificate</h3>
        <p className="mt-1 text-sm text-gray-600">
          Fill in the intern details to generate a certificate.
        </p>
      </div>

      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="intern_name" className="block text-sm font-medium text-gray-700">
                Intern Name
              </label>
              <input
                type="text"
                name="intern_name"
                id="intern_name"
                value={formData.intern_name}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter intern's full name"
              />
            </div>

            <div>
              <label htmlFor="intern_id" className="block text-sm font-medium text-gray-700">
                Intern ID
              </label>
              <input
                type="text"
                name="intern_id"
                id="intern_id"
                value={formData.intern_id}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter intern ID (e.g., 280400503)"
              />
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                Role/Position
              </label>
              <input
                type="text"
                name="role"
                id="role"
                value={formData.role}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="e.g., Web Development Intern"
              />
            </div>

            <div>
              <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">
                Start Date
              </label>
              <input
                type="date"
                name="start_date"
                id="start_date"
                value={formData.start_date}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">
                End Date
              </label>
              <input
                type="date"
                name="end_date"
                id="end_date"
                value={formData.end_date}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setFormData({
                intern_name: '',
                intern_id: '',
                role: '',
                start_date: '',
                end_date: ''
              })}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={handlePreview}
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Preview Certificate'}
            </button>
          </div>
        </div>
      </div>

      {/* WhatsApp Modal */}
      {showWhatsAppModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto bg-green-100 rounded-full">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-lg leading-6 font-medium text-gray-900 mt-4">Certificate Generated!</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Certificate has been downloaded successfully! Would you like to send it to {formData.intern_name} via WhatsApp?
                </p>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  onClick={handleWhatsAppSend}
                  className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                >
                  Send via WhatsApp
                </button>
                <button
                  onClick={handleWhatsAppCancel}
                  className="mt-3 px-4 py-2 bg-gray-300 text-gray-800 text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCertificateCreator;
