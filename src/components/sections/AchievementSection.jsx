import { motion } from 'framer-motion'
import { Award, FileText, Shield, CheckCircle, Calendar, Building, Star, X, Download, ExternalLink } from 'lucide-react'
import { useState } from 'react'

const AchievementSection = () => {
  const [selectedDocument, setSelectedDocument] = useState(null)

  const certificates = [
    {
      id: 1,
      title: 'Company Incorporation',
      description: 'Officially incorporated as YugaYatra Retail (OPC) Pvt Ltd under the Companies Act, 2013',
      date: '2024',
      type: 'Legal',
      icon: Building,
      details: 'CIN: U47912KA2024OPC188603',
      status: 'Active'
    },
    {
      id: 2,
      title: 'DIPP Recognition',
      description: 'Recognized by Department of Industrial Policy and Promotion as a startup',
      date: '2024',
      type: 'Government',
      icon: Shield,
      details: 'Startup India Recognition Certificate',
      status: 'Certified'
    },
    {
      id: 3,
      title: 'UDYAM Registration',
      description: 'Registered under UDYAM scheme for Micro, Small and Medium Enterprises',
      date: '2024',
      type: 'Government',
      icon: FileText,
      details: 'UDYAM: KR-03-0421327',
      status: 'Valid'
    },
    {
      id: 4,
      title: 'GST Registration',
      description: 'Goods and Services Tax registration for compliance with tax regulations',
      date: '2024',
      type: 'Tax',
      icon: FileText,
      details: 'GSTIN Registered',
      status: 'Active'
    },
    {
      id: 5,
      title: 'Trademark Application',
      description: 'Trademark filed for brand protection and intellectual property rights',
      date: '2024',
      type: 'Legal',
      icon: Shield,
      details: 'TM Application No: 6508313',
      status: 'Pending'
    },
    {
      id: 6,
      title: 'FSSAI License',
      description: 'Food Safety and Standards Authority of India license for food business operations',
      date: '2024',
      type: 'Food Safety',
      icon: CheckCircle,
      details: 'FSSAI: 21224007001166',
      status: 'Active'
    }
  ]

  const legalDocuments = [
    {
      id: 'company-incorporation',
      title: 'Company Incorporation Certificate',
      description: 'Official certificate of incorporation for YugaYatra Retail (OPC) Pvt Ltd',
      image: '/Yuga Yatra Retail Company Incorporation.pdf',
      thumbnail: '/compnay incorperation.webp',
      category: 'Legal Registration',
      status: 'Active',
      date: '2024',
      details: {
        cinNumber: 'U47912KA2024OPC188603',
        incorporationDate: '2024-01-15',
        companyType: 'One Person Company (OPC) Private Limited',
        registeredCapital: 'Rs. 1,00,000',
        description: 'Official Certificate of Incorporation issued by the Ministry of Corporate Affairs, Government of India. This certificate establishes YugaYatra Retail (OPC) Pvt Ltd as a legally recognized entity under the Companies Act, 2013. The incorporation marks the formal beginning of our business operations and provides us with legal identity in the corporate world.',
        benefits: [
          'Limited Liability Protection',
          'Separate Legal Entity Status',
          'Perpetual Succession',
          'Ability to Raise Funds',
          'Tax Benefits and Compliance',
          'Enhanced Business Credibility',
          'Access to Corporate Banking Services',
          'Eligibility for Government Tenders'
        ],
        directors: ['Director Name'],
        registeredOffice: 'Bengaluru, Karnataka',
        rocOffice: 'Registrar of Companies, Bangalore',
        complianceRequirements: ['Annual Returns', 'Financial Statements', 'GST Compliance', 'Income Tax Returns'],
        validUntil: 'Perpetual'
      }
    },
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
        address: 'Bengaluru, Karnataka, India',
        description: 'YUGAYATRA is a registered trademark protecting our brand identity and services in software and technology sector. This registration provides us with exclusive rights to use the trademark and legal protection against infringement.',
        benefits: ['Legal protection against infringement', 'Exclusive rights to use mark', 'Ability to license or franchise'],
        filingDate: '2024-01-15'
      }
    },
    {
      id: 'msme',
      title: 'UDYAM Registration',
      description: 'Official UDYAM registration certificate under MSME Development Act',
      image: '/Yuga Yatra Retail  MSME.pdf',
      thumbnail: '/udayam reg.webp',
      category: 'Business Registration',
      status: 'Active',
      date: '2023',
      details: {
        registrationNumber: 'UDYAM-KR-03-0421327',
        udyamAadhaar: 'KR-03-2023-0421327',
        type: 'Micro Enterprise',
        validity: 'Lifetime Valid',
        dateOfCommencement: '2023-01-15',
        dateOfIssue: '2023-01-20',
        description: 'UDYAM Registration is a government registration process under the MSME Development Act, 2006. This registration recognizes Yuga Yatra Retail as a legitimate micro enterprise, providing numerous benefits including priority sector lending, credit guarantees, and various government subsidies.',
        benefits: [
          'Priority Sector Lending from banks',
          'Credit Guarantee Scheme Coverage',
          'Industrial Promotion Subsidy',
          'Tax Benefits and Rebates',
          'Preference in Government Procurement',
          'Reduced Interest Rates on Loans'
        ],
        eligibility: [
          'Investment in Plant and Machinery: Not more than Rs. 1 crore',
          'Annual Turnover: Not more than Rs. 5 crore'
        ],
        district: 'Bengaluru',
        state: 'Karnataka'
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
      id: 'fssai',
      title: 'FSSAI License',
      description: 'Food Safety and Standards Authority of India license',
      image: '/Yuga Yatra Retail FSSAI License.pdf',
      thumbnail: '/fassai.webp',
      category: 'Food Safety',
      status: 'Active',
      date: '2024',
      details: {
        licenseNumber: '21224007001166',
        licenseType: 'Central License',
        validity: '1 Year (Renewable)',
        dateOfIssue: '2024-01-10',
        dateOfExpiry: '2025-01-09',
        description: 'FSSAI license ensuring compliance with food safety standards and regulations for our food business operations.',
        scope: ['Food Processing', 'Food Distribution', 'Food Storage'],
        complianceRequirements: ['Annual returns', 'Food safety audits', 'Lab testing reports'],
        benefits: ['Legal compliance', 'Consumer trust', 'Market access']
      }
    }
  ]

  const milestones = [
    {
      year: '2024',
      title: 'Company Founded',
      description: 'YugaYatra Retail (OPC) Pvt Ltd Retail (OPC) Pvt Ltd was established with a vision to bridge education and industry gap',
      icon: Star
    },
    {
      year: '2024',
      title: 'Legal Compliance',
      description: 'Achieved complete legal compliance with all necessary registrations and certifications',
      icon: CheckCircle
    },
    {
      year: '2024',
      title: 'Service Launch',
      description: 'Successfully launched comprehensive digital services and internship programs',
      icon: Award
    },
    {
      year: '2024',
      title: 'Partnership Network',
      description: 'Built strategic partnerships with 50+ industry leaders and organizations',
      icon: Building
    }
  ]

  const getCategoryColor = (category) => {
    const colors = {
      'Intellectual Property': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      'Business Registration': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'Tax Registration': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'Government Recognition': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      'Company Registration': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    }
    return colors[category] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }

  const getStatusColor = (status) => {
    const colors = {
      'Active': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'Registered': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
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

  const getTypeColor = (type) => {
    switch (type) {
      case 'Legal':
        return 'from-accent-main to-blue-600'
      case 'Government':
        return 'from-accent-main to-blue-600'
      case 'Tax':
        return 'from-accent-main to-blue-600'
      case 'Food Safety':
        return 'from-accent-main to-blue-600'
      default:
        return 'from-accent-main to-blue-600'
    }
  }

  const getCertificateStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800'
      case 'Certified':
        return 'bg-blue-100 text-blue-800'
      case 'Valid':
        return 'bg-purple-100 text-purple-800'
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-bg-main text-text-main'
    }
  }

  return (
    <section id="achievements" className="py-20 bg-bg-main">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-text-main mb-6">
            Our <span className="text-accent-main">Achievements</span>
          </h2>
          <p className="text-xl md:text-2xl text-text-light max-w-3xl mx-auto">
            Certifications, milestones, and recognition that validate our commitment to excellence
          </p>
        </motion.div>
      </div>


    

      {/* Stats Section */}
      <div className="py-20 bg-bg-main dark:bg-text-main">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl font-bold text-text-main dark:text-white mb-4">
              Our Impact
            </h3>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCertificateStatusColor('Active')}`}>
                    Active
                  </span>
            <p className="text-lg text-text-light dark:text-white/70">
              Numbers that speak for our success
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: 'Certifications', value: '6+', icon: Award },
              { label: 'Legal Compliance', value: '100%', icon: CheckCircle },
              { label: 'Government Recognition', value: '2', icon: Shield },
              { label: 'Active Licenses', value: '5', icon: FileText }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-r from-accent-main to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-3xl font-bold text-accent-main mb-2">{stat.value}</h4>
                <p className="text-text-light dark:text-white/70">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Legal Information Section */}
      <div className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Legal Information & Certificates
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Our complete legal documentation and compliance certificates, ensuring transparency and trust in all our business operations.
            </p>
          </motion.div>

          {/* Legal Documents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {legalDocuments.map((doc, index) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                onClick={() => handleDocumentClick(doc)}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                {/* Document Thumbnail */}
                <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 relative overflow-hidden">
                  <img
                    src={doc.thumbnail}
                    alt={doc.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(doc.status)}`}>
                      {doc.status}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
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
                  <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium">
                    <span>View Document Details</span>
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Legal Document Modal */}
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
                            className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors duration-300"
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

                  {/* Document Details */}
                  <div className="px-6 pb-6">
                    <div className="space-y-4">
                      <h4 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                        <FileText className="w-5 h-5 mr-2" />
                        Complete Document Information & Details
                      </h4>
                      
                      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
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
        </div>
      )}
    </section>
  )
}

export default AchievementSection
