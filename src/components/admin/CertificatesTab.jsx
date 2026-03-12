import React, { useState, useEffect } from 'react';
import AdminCertificateCreator from './AdminCertificateCreator';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const CertificatesTab = () => {
  const [activeTab, setActiveTab] = useState('create');
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (activeTab === 'manage') {
      fetchCertificates();
    }
  }, [activeTab]);

  const fetchCertificates = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCertificates(data || []);
    } catch (error) {
      console.error('Error fetching certificates:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCertificates = certificates.filter(cert =>
    cert.intern_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.intern_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteCertificate = async (certificateId) => {
    if (!confirm('Are you sure you want to delete this certificate?')) return;

    try {
      // Get certificate Data to delete files
      const { data: certificate } = await supabase
        .from('certificates')
        .select('*')
        .eq('id', certificateId)
        .single();

      if (certificate) {
        // Delete certificate image from storage
        if (certificate.certificate_url) {
          const certPath = certificate.certificate_url.split('/').pop();
          await supabase.storage
            .from('certificates')
            .remove([`generated/${certPath}`]);
        }

        // Delete QR code from storage
        if (certificate.qr_code_url) {
          const qrPath = certificate.qr_code_url.split('/').pop();
          await supabase.storage
            .from('certificates')
            .remove([`generated/${qrPath}`]);
        }
      }

      // Delete certificate record
      const { error } = await supabase
        .from('certificates')
        .delete()
        .eq('id', certificateId);

      if (error) throw error;

      // Refresh list
      fetchCertificates();
      alert('Certificate deleted successfully');
    } catch (error) {
      console.error('Error deleting certificate:', error);
      alert('Error deleting certificate');
    }
  };

  const handleSendWhatsApp = async (certificate) => {
    try {
      // Get certificate Data
      const { data: certData } = await supabase
        .from('certificates')
        .select('*')
        .eq('id', certificate.id)
        .single();

      if (certData) {
        // Create WhatsApp message
        const message = `Hello ${certData.intern_name},\n\nCongratulations on completing your internship as ${certData.role}!\n\nPlease find your certificate at: ${window.location.origin}/certificate/${certData.intern_id}\n\nBest regards,\nYuga Yatra Retail Team`;
        
        // Open WhatsApp with phone number if available, otherwise default
        const phoneNumber = certData.phone_number ? certData.phone_number.replace(/[^\d+]/g, '') : '';
        const whatsappUrl = phoneNumber 
          ? `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
          : `https://wa.me/?text=${encodeURIComponent(message)}`;
        
        window.open(whatsappUrl, '_blank');
      }
    } catch (error) {
      console.error('Error sending WhatsApp:', error);
      alert('Error sending WhatsApp message');
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('create')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'create'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Create Certificate
          </button>
          <button
            onClick={() => setActiveTab('manage')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'manage'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Manage Certificates
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'create' && <AdminCertificateCreator />}

      {activeTab === 'manage' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Manage Certificates</h3>
            <p className="mt-1 text-sm text-gray-600">
              View and manage all generated certificates.
            </p>
          </div>

          {/* Search Bar */}
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="max-w-lg">
                <label htmlFor="search" className="block text-sm font-medium text-gray-700">
                  Search Certificates
                </label>
                <input
                  type="text"
                  name="search"
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Search by name, ID, or role..."
                />
              </div>
            </div>
          </div>

          {/* Certificates List */}
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            {loading ? (
              <div className="px-4 py-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading certificates...</p>
              </div>
            ) : filteredCertificates.length === 0 ? (
              <div className="px-4 py-8 text-center text-gray-600">
                {searchTerm ? 'No certificates found matching your search.' : 'No certificates generated yet.'}
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {filteredCertificates.map((certificate) => (
                  <li key={certificate.id}>
                    <div className="px-4 py-4 flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {certificate.intern_name}
                        </p>
                        <p className="text-sm text-gray-500">
                          ID: {certificate.intern_id} • {certificate.role}
                        </p>
                        <p className="text-sm text-gray-500">
                          {certificate.start_date} to {certificate.end_date}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          Created: {new Date(certificate.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex-shrink-0 flex space-x-2">
                        <a
                          href={certificate.certificate_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                        >
                          View
                        </a>
                        <button
                          onClick={() => handleSendWhatsApp(certificate)}
                          className="inline-flex items-center px-3 py-1 border border-green-300 shadow-sm text-xs font-medium rounded text-green-700 bg-white hover:bg-green-50"
                        >
                          Send
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificatesTab;
