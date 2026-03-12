import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CertificateTemplate from '../components/CertificateTemplate';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const CertificateVerificationPage = () => {
  const { intern_id } = useParams();
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const { data, error } = await supabase
          .from('certificates')
          .select('*')
          .eq('intern_id', intern_id)
          .single();

        if (error) {
          setError('INVALID CERTIFICATE');
        } else {
          setCertificate(data);
        }
      } catch (err) {
        setError('INVALID CERTIFICATE');
      } finally {
        setLoading(false);
      }
    };

    fetchCertificate();
  }, [intern_id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifying certificate...</p>
        </div>
      </div>
    );
  }

  if (error || !certificate) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <div className="text-red-600 text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-red-600 mb-2">INVALID CERTIFICATE</h1>
          <p className="text-gray-600">This certificate could not be verified or does not exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-2xl font-bold text-center mb-4">Certificate Verification</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-semibold">Intern Name:</span> {certificate.intern_name}
            </div>
            <div>
              <span className="font-semibold">Intern ID:</span> {certificate.intern_id}
            </div>
            <div>
              <span className="font-semibold">Role:</span> {certificate.role}
            </div>
            <div>
              <span className="font-semibold">Duration:</span> {certificate.start_date} to {certificate.end_date}
            </div>
            <div>
              <span className="font-semibold">Issued Date:</span> {new Date(certificate.created_at).toLocaleDateString()}
            </div>
            <div>
              <span className="font-semibold">Status:</span> 
              <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">VERIFIED</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-center mb-4">Certificate Document</h2>
          <div className="flex justify-center">
            <div className="transform scale-50 origin-top">
              <CertificateTemplate
                intern_name={certificate.intern_name}
                role={certificate.role}
                start_date={certificate.start_date}
                end_date={certificate.end_date}
                intern_id={certificate.intern_id}
                qr_code={certificate.qr_code_url}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateVerificationPage;
