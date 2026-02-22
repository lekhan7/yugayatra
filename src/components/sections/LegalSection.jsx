import React, { useState } from 'react'
import { X, Download, ExternalLink, Calendar, FileText } from 'lucide-react'

const LegalSection = () => {
  const [selectedDocument, setSelectedDocument] = useState(null)

  const legalDocuments = [
    {
      id: 'trademark',
      title: 'Trademark Registration',
      description: 'Official trademark registration for YUGAYATRA brand',
      image: '/YUGAYATRA Application Trade Mark.pdf',
      thumbnail: '/trade marks.webp',
      category: 'Intellectual Property',
      status: 'Registered',
      date: '2024',
      details: {
        registrationNumber: 'TM-2024-XXXXXX',
        applicationNumber: '202421012345',
        class: 'Class 42 - Software Services',
        validity: '10 Years from registration date',
        proprietorName: 'Yuga Yatra Retail Private Limited',
        address: 'Mumbai, Maharashtra, India',
        description: 'YUGAYATRA is a registered trademark protecting our brand identity and services in the software and technology sector.',
        benefits: ['Legal protection against infringement', 'Exclusive rights to use the mark', 'Ability to license or franchise'],
        filingDate: '2024-01-15'
      }
    },
    {
      id: 'msme',
      title: 'MSME Registration',
      description: 'Micro, Small and Medium Enterprises registration certificate',
      image: '/Yuga Yatra Retail  MSME.pdf',
      thumbnail: '/udayam reg.webp',
      category: 'Business Registration',
      status: 'Active',
      date: '2023',
      details: {
        registrationNumber: 'UDYAM-MH-XX-XXXXXXX',
        udyamAadhaar: 'XX-XXXX-XXXX-XXXX',
        type: 'Micro Enterprise',
        validity: 'Lifetime',
        dateOfCommencement: '2023-01-15',
        description: 'Official MSME registration recognizing Yuga Yatra Retail as a micro enterprise under Government of India scheme.',
        benefits: ['Priority sector lending', 'Credit guarantee scheme', 'Industrial promotion subsidy'],
        district: 'Mumbai',
        state: 'Maharashtra'
      }
    },
    {
      id: 'gst',
      title: 'GST Registration',
      description: 'Goods and Services Tax registration certificate',
      image: '/Yuga Yatra Retail GST Registration.pdf',
      thumbnail: '/gst info.webp',
      category: 'Tax Registration',
      status: 'Active',
      date: '2023',
      details: {
        gstin: '27AAFCYXXXXXB1ZV',
        stateCode: '27 - Maharashtra',
        constitution: 'Private Limited Company',
        dateOfRegistration: '2023-02-20',
        natureOfBusiness: 'Software Development and IT Services',
        description: 'GST registration enabling compliance with Indian tax regulations for our services.',
        compliance: ['Monthly GSTR-1 filing', 'Quarterly GSTR-3B filing', 'Annual return GSTR-9'],
        turnover: 'Below Rs. 1.5 Crore'
      }
    },
    {
      id: 'startup',
      title: 'Startup India Recognition',
      description: 'Department for Promotion of Industry and Internal Trade recognition',
      image: '/Yuga Yatra Retail Start Up India.pdf',
      thumbnail: '/dippstartup.webp',
      category: 'Government Recognition',
      status: 'Recognized',
      date: '2024',
      details: {
        dpiitNumber: 'DIPPXXXXXX',
        recognitionDate: '2024-03-15',
        recognitionType: 'Startup Recognition',
        validity: '10 Years from recognition date',
        sector: 'Information Technology',
        description: 'Official recognition under Startup India program, providing various benefits and support for innovation.',
        benefits: ['Tax exemption for 3 years', 'Self-certification compliance', 'Fast-track patent application'],
        fundingSupport: 'Eligible for government funding'
      }
    },
    {
      id: 'incorporation',
      title: 'Certificate of Incorporation',
      description: 'Legal incorporation certificate of the company',
      image: '/Yuga Yatra Retail INC-9_Signed.pdf',
      thumbnail: '/compnay incorperation.webp',
      category: 'Company Registration',
      status: 'Active',
      date: '2023',
      details: {
        cin: 'U72900MH2023PTCXXXXXX',
        companyType: 'Private Limited Company',
        registrationDate: '2023-01-10',
        state: 'Maharashtra',
        authorizedCapital: 'Rs. 10,00,000',
        paidUpCapital: 'Rs. 1,00,000',
        description: 'Certificate of Incorporation establishing Yuga Yatra Retail as a legal entity under the Companies Act, 2013.',
        directors: ['Director Name 1', 'Director Name 2'],
        roc: 'Registrar of Companies, Mumbai'
      }
    }
  ]

  const getCategoryColor = (category) => {
    const colors = {
      'Intellectual Property': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      'Business Registration': 'bg-olive-100 text-olive-800 dark:bg-olive-900 dark:text-olive-200',
      'Tax Registration': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'Government Recognition': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      'Company Registration': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    }
    return colors[category] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }

  const getStatusColor = (status) => {
    const colors = {
      'Active': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'Registered': 'bg-olive-100 text-olive-800 dark:bg-olive-900 dark:text-olive-200',
      'Recognized': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
    }
    return colors[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }

  const handleDocumentClick = (document) => {
    setSelectedDocument(document)
  }

  const handleCloseModal = () => {
    setSelectedDocument(null)
  }

  const handleDownloadDocument = (imagePath, title) => {
    const link = document.createElement('a')
    link.href = imagePath
    link.download = title
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const formatFieldName = (fieldName) => {
    return fieldName.replace(/([A-Z])/g, ' $1')
      .replace(/_/g, ' ')
      .replace(/^./, str => str.toUpperCase())
      .trim()
  }

  const formatValue = (val) => {
    if (Array.isArray(val)) {
      return (
        <ul className="list-disc list-inside space-y-1">
          {val.map((item, index) => (
            <li key={index} className="text-sm text-gray-700 dark:text-gray-300">{item}</li>
          ))}
        </ul>
      )
    }
    return <span className="text-gray-700 dark:text-gray-300 font-medium">{val}</span>
  }

  return (
    <section id="legal" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{color: '#252B0D'}}>
            Legal Information & Certificates
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Our complete legal documentation and compliance certificates, ensuring transparency and trust in all our business operations.
          </p>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {legalDocuments.map((doc, index) => (
            <div
              key={doc.id}
              onClick={() => handleDocumentClick(doc)}
              className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-105 border border-gray-200 dark:border-gray-700 overflow-hidden"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* Document Thumbnail */}
              <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 relative overflow-hidden">
                <img
                  src={doc.thumbnail}
                  alt={doc.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(doc.status)}`}>
                    {doc.status}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-olive-600 dark:group-hover:text-olive-400 transition-colors duration-300">
                  {doc.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {doc.description}
                </p>

                {/* Category and Date */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${getCategoryColor(doc.category)}`}>
                    {doc.category}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-500 flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {doc.date}
                  </span>
                </div>

                {/* Action Button */}
                <div className="flex items-center text-olive-600 dark:text-olive-400 font-medium group-hover:text-olive-700 dark:group-hover:text-olive-300 transition-colors duration-300">
                  <span>View Document Details</span>
                  <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedDocument && (
          <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" onClick={handleCloseModal}></div>

              <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl sm:w-full">
                <div className="bg-white dark:bg-gray-800">
                  {/* Header */}
                  <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-4">
                      <img
                        src={selectedDocument.thumbnail}
                        alt={selectedDocument.title}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedDocument.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400">{selectedDocument.description}</p>
                      </div>
                    </div>
                    <button
                      onClick={handleCloseModal}
                      className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors duration-200"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Badges */}
                  <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex flex-wrap gap-2">
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${getCategoryColor(selectedDocument.category)}`}>
                        {selectedDocument.category}
                      </span>
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(selectedDocument.status)}`}>
                        {selectedDocument.status}
                      </span>
                      <span className="px-3 py-1 text-sm font-medium rounded-full bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
                        {selectedDocument.date}
                      </span>
                    </div>
                  </div>

                  {/* Document Viewer */}
                  <div className="p-6">
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
                      <div className="h-96 md:h-[600px]">
                        <iframe
                          src={`${selectedDocument.image}#view=FitH&toolbar=1&navpanes=1&scrollbar=1`}
                          className="w-full h-full"
                          title={`${selectedDocument.title} Document`}
                          frameBorder="0"
                        />
                      </div>
                      <div className="p-4 bg-gray-100 dark:bg-gray-800 border-t border-gray-300 dark:border-gray-600">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {selectedDocument.title} - Full Document View
                          </span>
                          <div className="flex space-x-2">
                            <a
                              href={selectedDocument.image}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-2 px-3 py-2 bg-olive-600 text-white text-sm rounded-lg hover:bg-olive-700 transition-colors duration-300"
                            >
                              <ExternalLink className="w-4 h-4" />
                              <span>Open in New Tab</span>
                            </a>
                            <button
                              onClick={() => handleDownloadDocument(selectedDocument.image, selectedDocument.title)}
                              className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors duration-300"
                            >
                              <Download className="w-4 h-4" />
                              <span>Download</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Document Details */}
                  <div className="px-6 pb-6">
                    <div className="space-y-4">
                      <h4 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                        <FileText className="w-5 h-5 mr-2" />
                        Complete Document Information & Details
                      </h4>
                      
                      <div className="bg-olive-50 dark:bg-olive-900/20 rounded-lg p-4 border border-olive-200 dark:border-olive-800">
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {selectedDocument.details.description}
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {Object.entries(selectedDocument.details).map(([key, value]) => {
                          if (key === 'description') return null
                          
                          return (
                            <div key={key} className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
                                {formatFieldName(key)}
                              </p>
                              {formatValue(value)}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default LegalSection
