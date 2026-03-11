import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../services/supabase';
import Certificate from '../components/certificates/Certificate';
import html2canvas from 'html2canvas';
import Home from './Home';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CertificateVerificationPage = () => {
  const { intern_id } = useParams();
  const navigate = useNavigate();
  const [certificateData, setCertificateData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const certificateRef = useRef(null);

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        setLoading(true);
        const { data, error: fetchError } = await supabase
          .from('certificates')
          .select('*')
          .eq('intern_id', intern_id)
          .single();

        if (fetchError || !data) {
          setError('Certificate Not Found — This certificate ID does not exist or may have been removed.');
        } else {
          setCertificateData(data);
        }
      } catch (err) {
        console.error('Error fetching certificate:', err);
        setError('Certificate Not Found — This certificate ID does not exist or may have been removed.');
      } finally {
        setLoading(false);
      }
    };

    if (intern_id) {
      fetchCertificate();
    }
  }, [intern_id]);

  useEffect(() => {
    // Escape key closes modal
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        navigate('/');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  const downloadPDF = async () => {
    if (!certificateRef.current || !certificateData) return;
    
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
      pdf.save(`Certificate_${certificateData.intern_id}_${certificateData.full_name}.pdf`);
    } catch (err) {
      console.error('Error generating PDF:', err);
      alert('Failed to download PDF');
    }
  };

  const closePopup = () => {
    navigate('/');
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 dark:bg-gray-900 pointer-events-none filter blur-sm">
        <Home />
        <Footer />
      </div>

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
          onClick={closePopup}
          style={{ padding: '2rem 0' }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-6xl w-full mx-auto my-auto overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 z-10">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Certificate Verification
              </h2>
              <button
                onClick={closePopup}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-auto bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center p-4 sm:p-8 min-h-[400px]">
              {loading ? (
                <div className="flex flex-col items-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                  <p className="text-gray-600 dark:text-gray-400">Verifying certificate...</p>
                </div>
              ) : error ? (
                <div className="text-center max-w-md p-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
                  <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Not Found</h3>
                  <p className="text-gray-600 dark:text-gray-400">{error}</p>
                  <button
                    onClick={closePopup}
                    className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Return to Homepage
                  </button>
                </div>
              ) : certificateData ? (
                <div className="flex flex-col items-center max-w-full overflow-x-auto w-full">
                  <div className="transform scale-[0.6] sm:scale-[0.8] md:scale-90 lg:scale-100 origin-top flex-shrink-0">
                    <Certificate
                      ref={certificateRef}
                      data={{
                        prefix: certificateData.prefix,
                        fullName: certificateData.full_name,
                        role: certificateData.role,
                        companyTitle: certificateData.company_title,
                        companyDescription: certificateData.company_description,
                        fromDate: certificateData.from_date,
                        toDate: certificateData.to_date,
                        issueDate: certificateData.issue_date,
                        internId: certificateData.intern_id
                      }}
                      signatureImage={certificateData.signature_image}
                      qrCodeImage={certificateData.qr_code}
                    />
                  </div>
                </div>
              ) : null}
            </div>

            {/* Footer */}
            {certificateData && !loading && !error && (
              <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 flex justify-center z-10 shrink-0">
                <button
                  onClick={downloadPDF}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                  Download as PDF
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default CertificateVerificationPage;
