import { useState, useEffect, useRef } from 'react';
import { supabase } from '../../services/supabase';
import Certificate from '../certificates/Certificate';
import html2canvas from 'html2canvas';
import { QRCodeCanvas as QRCode } from 'qrcode.react';

const CertificatesTab = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    prefix: 'Mr.',
    fullName: '',
    internId: `INT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    role: '',
    companyName: 'YugYatra',
    companyTitle: 'Certificate of Internship',
    companyDescription: '',
    fromDate: '',
    toDate: '',
    issueDate: new Date().toISOString().split('T')[0]
  });

  // Signature State
  const [signatureType, setSignatureType] = useState('type'); // 'draw' or 'type'
  const [typedSignature, setTypedSignature] = useState('');
  const [signatureImage, setSignatureImage] = useState(null);
  
  // Ref for the draw canvas or type canvas
  const drawCanvasRef = useRef(null);
  const typeCanvasRef = useRef(null);
  const certificateRef = useRef(null);
  const qrRef = useRef(null);

  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCertificates(data || []);
    } catch (error) {
      console.error('Error fetching certificates:', error);
      showToast('Failed to load certificates', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Drawing logic for signature
  const [isDrawing, setIsDrawing] = useState(false);

  const startDrawing = (e) => {
    const canvas = drawCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left || e.touches?.[0].clientX - rect.left;
    const y = e.clientY - rect.top || e.touches?.[0].clientY - rect.top;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = drawCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left || e.touches?.[0].clientX - rect.left;
    const y = e.clientY - rect.top || e.touches?.[0].clientY - rect.top;
    
    ctx.lineTo(x, y);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    saveDrawSignature();
  };

  const clearCanvas = () => {
    const canvas = drawCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setSignatureImage(null);
  };

  const saveDrawSignature = () => {
    const canvas = drawCanvasRef.current;
    if (canvas) {
      setSignatureImage(canvas.toDataURL('image/png'));
    }
  };

  const handleTypedSignatureChange = (e) => {
    const value = e.target.value;
    setTypedSignature(value);
    
    // Render to hidden canvas to get base64
    const canvas = typeCanvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = '30px "Dancing Script", cursive';
      ctx.fillStyle = '#000';
      ctx.fillText(value, 10, 40);
      setSignatureImage(canvas.toDataURL('image/png'));
    }
  };

  useEffect(() => {
    // Load font for signature if typing
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    // Load fonts for certificate
    const linkCert = document.createElement('link');
    linkCert.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=EB+Garamond:ital,wght@0,400;0,700;1,400&display=swap';
    linkCert.rel = 'stylesheet';
    document.head.appendChild(linkCert);
  }, []);

  const generateQRCode = async () => {
    const canvas = qrRef.current?.querySelector('canvas');
    if (canvas) {
      return canvas.toDataURL('image/png');
    }
    return null;
  };

  const handleIssueCertificate = async () => {
    // Validation
    if (!formData.fullName || !formData.internId || !formData.role || !formData.companyName || !formData.companyTitle || !formData.fromDate || !formData.toDate || !formData.issueDate) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    if (new Date(formData.toDate) <= new Date(formData.fromDate)) {
      showToast('To Date must be after From Date', 'error');
      return;
    }

    if (!signatureImage && (signatureType === 'draw' || typedSignature)) {
      if (signatureType === 'draw') saveDrawSignature();
      if (signatureType === 'type') {
         // Should already be saved by handleTypedSignatureChange
      }
    }

    if (!signatureImage) {
      showToast('Please provide a signature', 'error');
      return;
    }

    try {
      // Check ID uniqueness
      const { data: existing } = await supabase
        .from('certificates')
        .select('id')
        .eq('intern_id', formData.internId)
        .single();
        
      if (existing) {
        showToast('Intern ID already exists. Please use a unique ID.', 'error');
        return;
      }

      // Generate QR Code Base64
      const qrBase64 = await generateQRCode();

      const certificateData = {
        intern_id: formData.internId,
        prefix: formData.prefix,
        full_name: formData.fullName,
        role: formData.role,
        company_name: formData.companyName,
        company_title: formData.companyTitle,
        company_description: formData.companyDescription,
        from_date: formData.fromDate,
        to_date: formData.toDate,
        issue_date: formData.issueDate,
        signature_image: signatureImage,
        qr_code: qrBase64
      };

      const { error } = await supabase
        .from('certificates')
        .insert([certificateData]);

      if (error) throw error;

      showToast('Certificate issued successfully!', 'success');
      fetchCertificates();
      
      // Reset Form
      setFormData({
        ...formData,
        fullName: '',
        role: '',
        internId: `INT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`
      });
      setIsPreviewModalOpen(false);
      clearCanvas();
      setTypedSignature('');
      
    } catch (error) {
      console.error('Error saving certificate:', error);
      showToast('Failed to issue certificate', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this certificate?')) return;
    
    try {
      const { error } = await supabase
        .from('certificates')
        .delete()
        .eq('id', id);

      if (error) throw error;
      showToast('Certificate deleted', 'success');
      fetchCertificates();
    } catch (error) {
      console.error('Error deleting:', error);
      showToast('Failed to delete', 'error');
    }
  };

  const downloadPDF = async () => {
    if (!certificateRef.current) return;
    
    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#FFFDF5'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const { jsPDF } = await import('jspdf');
      
      // A4 landscape dimensions: 297x210 mm
      const pdf = new jsPDF('l', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Certificate_${formData.internId}_${formData.fullName}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      showToast('Failed to download PDF', 'error');
    }
  };

  // Filtering
  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = cert.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          cert.intern_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          cert.role?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDate = dateFilter ? cert.issue_date === dateFilter : true;
    
    return matchesSearch && matchesDate;
  });

  const getPublicUrl = () => {
    return `${window.location.origin}/certificate/${formData.internId}`;
  };

  return (
    <div className="space-y-6">
      {/* Hidden QR Code for generation */}
      <div style={{ display: 'none' }} ref={qrRef}>
        <QRCode value={getPublicUrl()} size={256} />
      </div>

      {/* Hidden canvas for typed signature */}
      <canvas ref={typeCanvasRef} width={300} height={100} style={{ display: 'none' }} />

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Certificates</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Issue and manage internship certificates</p>
        </div>
        <button
          onClick={() => setIsPreviewModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Generate Preview
        </button>
      </div>

      {/* Form Section */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Create New Certificate</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex space-x-2">
            <div className="w-1/3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Prefix *</label>
              <select 
                name="prefix"
                value={formData.prefix}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="Mr.">Mr.</option>
                <option value="Mrs.">Mrs.</option>
                <option value="Ms.">Ms.</option>
              </select>
            </div>
            <div className="w-2/3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name *</label>
              <input 
                type="text" 
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="John Doe"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Intern ID *</label>
            <input 
              type="text" 
              name="internId"
              value={formData.internId}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role / Position *</label>
            <input 
              type="text" 
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="e.g. Frontend Developer Intern"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company Name *</label>
            <input 
              type="text" 
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company Title *</label>
            <input 
              type="text" 
              name="companyTitle"
              value={formData.companyTitle}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Issue Date *</label>
            <input 
              type="date" 
              name="issueDate"
              value={formData.issueDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company Description (Optional)</label>
            <textarea 
              name="companyDescription"
              value={formData.companyDescription}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              rows={2}
              placeholder="A short description about the company or program"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">From Date *</label>
            <input 
              type="date" 
              name="fromDate"
              value={formData.fromDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">To Date *</label>
            <input 
              type="date" 
              name="toDate"
              value={formData.toDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        </div>

        {/* Signature Section */}
        <div className="mt-8 border-t pt-6 border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Admin Signature *</h3>
          
          <div className="flex space-x-4 mb-4">
            <button
              onClick={() => setSignatureType('draw')}
              className={`px-4 py-2 rounded-lg ${signatureType === 'draw' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-blue-500' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'} border`}
            >
              Draw Signature
            </button>
            <button
              onClick={() => setSignatureType('type')}
              className={`px-4 py-2 rounded-lg ${signatureType === 'type' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-blue-500' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'} border`}
            >
              Type Signature
            </button>
          </div>

          {signatureType === 'draw' ? (
            <div className="space-y-2">
              <div className="border border-gray-300 rounded-lg bg-white overflow-hidden" style={{ width: 300, height: 100 }}>
                <canvas
                  ref={drawCanvasRef}
                  width={300}
                  height={100}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseOut={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  className="cursor-crosshair w-full h-full"
                />
              </div>
              <button 
                onClick={clearCanvas}
                className="text-sm text-red-600 hover:text-red-700"
              >
                Clear Canvas
              </button>
            </div>
          ) : (
            <div>
              <input
                type="text"
                value={typedSignature}
                onChange={handleTypedSignatureChange}
                placeholder="Type your name..."
                className="w-full max-w-sm px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white font-['Dancing_Script'] text-2xl"
                style={{ fontFamily: '"Dancing Script", cursive' }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by name, ID or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
            {dateFilter && (
              <button 
                onClick={() => setDateFilter('')}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Certificates List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden border border-gray-200 dark:border-gray-700">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading certificates...</div>
        ) : filteredCertificates.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No certificates found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full whitespace-nowrap">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  <th className="px-6 py-4">Intern ID</th>
                  <th className="px-6 py-4">Intern</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Issue Date</th>
                  <th className="px-6 py-4">QR Code</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredCertificates.map(cert => (
                  <tr key={cert.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      {cert.intern_id}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 dark:text-white font-medium">{cert.prefix} {cert.full_name}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {cert.role}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {cert.issue_date}
                    </td>
                    <td className="px-6 py-4">
                      {cert.qr_code ? (
                        <img src={cert.qr_code} alt="QR" className="w-10 h-10 object-contain" />
                      ) : (
                        <span className="text-xs text-gray-400">N/A</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right space-x-3">
                      <a 
                        href={`/certificate/${cert.intern_id}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
                      >
                        View
                      </a>
                      <button 
                        onClick={() => handleDelete(cert.id)}
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Live Preview Modal */}
      {isPreviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] flex flex-col overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Certificate Preview</h2>
              <button 
                onClick={() => setIsPreviewModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            
            <div className="p-6 overflow-auto flex justify-center bg-gray-100 dark:bg-gray-800">
              <Certificate 
                ref={certificateRef}
                data={formData}
                signatureImage={signatureImage}
                qrCodeImage={qrRef.current?.querySelector('canvas')?.toDataURL('image/png') || null}
              />
            </div>
            
            <div className="p-4 border-t border-gray-200 dark:border-gray-800 flex justify-end space-x-4 bg-gray-50 dark:bg-gray-900">
              <button
                onClick={downloadPDF}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Download PDF
              </button>
              <button
                onClick={handleIssueCertificate}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-md"
              >
                Issue Certificate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast.show && (
        <div className={`fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 z-50 ${
          toast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
        }`}>
          <span className="font-medium">{toast.message}</span>
        </div>
      )}
    </div>
  );
};

export default CertificatesTab;
