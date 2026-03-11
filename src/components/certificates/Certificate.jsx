import { forwardRef } from 'react';

const Certificate = forwardRef(({ data, signatureImage, qrCodeImage }, ref) => {
  if (!data) return null;

  const {
    prefix = '',
    fullName = '',
    role = '',
    companyTitle = 'Certificate of Internship',
    companyDescription = '',
    fromDate = '',
    toDate = '',
    issueDate = '',
    internId = ''
  } = data;

  return (
    <div 
      ref={ref}
      style={{
        width: '1000px',
        height: '700px',
        position: 'relative',
        backgroundColor: '#FFFDF5',
        fontFamily: '"EB Garamond", serif',
        color: '#1a1f36',
        padding: '2rem',
        boxSizing: 'border-box',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
      }}
      className="certificate-container flex-shrink-0"
    >
      {/* Outer Border */}
      <div 
        style={{
          width: '100%',
          height: '100%',
          border: '4px double #d4af37',
          padding: '2px',
          boxSizing: 'border-box',
          position: 'relative'
        }}
      >
        <div 
          style={{
            width: '100%',
            height: '100%',
            border: '1px solid #d4af37',
            backgroundColor: '#ffffff',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '40px',
            boxSizing: 'border-box'
          }}
        >
          {/* Watermark */}
          <div 
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%) rotate(-30deg)',
              fontSize: '8rem',
              fontWeight: 'bold',
              color: 'rgba(212, 175, 55, 0.05)',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              zIndex: 0
            }}
          >
            YugYatra
          </div>

          <div style={{ zIndex: 1, position: 'relative', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Logo Area */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ width: '60px', height: '60px', backgroundColor: '#1a1f36', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d4af37', fontSize: '24px', fontWeight: 'bold' }}>
                YY
              </div>
            </div>

            {/* Title */}
            <h1 style={{ 
              fontFamily: '"Playfair Display", serif', 
              fontSize: '48px', 
              color: '#d4af37', 
              margin: '0 0 20px 0',
              textTransform: 'uppercase',
              letterSpacing: '2px'
            }}>
              {companyTitle || 'Certificate of Internship'}
            </h1>

            {/* Subtext */}
            <p style={{ 
              fontSize: '20px', 
              fontStyle: 'italic', 
              margin: '0 0 30px 0',
              color: '#4a5568'
            }}>
              This is to certify that
            </p>

            {/* Name */}
            <h2 style={{ 
              fontFamily: '"Playfair Display", serif',
              fontSize: '56px',
              color: '#1a1f36',
              margin: '0 0 30px 0',
              fontWeight: 'bold',
              borderBottom: '2px solid #d4af37',
              paddingBottom: '10px',
              minWidth: '60%',
              textAlign: 'center'
            }}>
              {prefix} {fullName || 'Student Name'}
            </h2>

            {/* Role line */}
            <p style={{ fontSize: '22px', margin: '0 0 20px 0' }}>
              has successfully completed the role of <span style={{ fontWeight: 'bold' }}>{role || 'Intern'}</span>
            </p>

            {/* Date line */}
            <p style={{ fontSize: '20px', margin: '0 0 40px 0' }}>
              from {fromDate || 'Start Date'} to {toDate || 'End Date'}
            </p>

            {/* Description */}
            {companyDescription && (
              <p style={{ 
                fontSize: '16px', 
                fontStyle: 'italic', 
                color: '#4a5568', 
                textAlign: 'center',
                maxWidth: '80%',
                margin: '0 0 auto 0'
              }}>
                {companyDescription}
              </p>
            )}

            {/* Bottom Section */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'flex-end',
              width: '100%',
              marginTop: 'auto',
              paddingTop: '40px'
            }}>
              {/* Issue Date & ID */}
              <div style={{ textAlign: 'left', flex: 1 }}>
                <p style={{ fontSize: '18px', margin: '0 0 5px 0' }}>
                  Issued on: {issueDate || 'Date'}
                </p>
                <p style={{ fontSize: '14px', margin: 0, color: '#718096' }}>
                  ID: {internId || 'INT-XXXX-XXXX'}
                </p>
              </div>

              {/* Seal */}
              <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                <div style={{ 
                  width: '100px', 
                  height: '100px', 
                  borderRadius: '50%', 
                  border: '2px dashed #d4af37',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#FFFDF5'
                }}>
                  <div style={{ fontSize: '12px', color: '#d4af37', textAlign: 'center', fontWeight: 'bold', textTransform: 'uppercase' }}>
                    Official<br/>Seal
                  </div>
                </div>
              </div>

              {/* Signature & QR */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '20px' }}>
                  <div style={{ textAlign: 'center' }}>
                    {signatureImage ? (
                      <img src={signatureImage} alt="Signature" style={{ maxHeight: '60px', maxWidth: '200px', marginBottom: '5px' }} />
                    ) : (
                      <div style={{ height: '60px', width: '200px', marginBottom: '5px' }}></div>
                    )}
                    <div style={{ borderTop: '1px solid #1a1f36', width: '200px', paddingTop: '5px', fontSize: '16px' }}>
                      Authorized Signatory
                    </div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    {qrCodeImage ? (
                      <img src={qrCodeImage} alt="QR Code" style={{ width: '80px', height: '80px', marginBottom: '5px' }} />
                    ) : (
                      <div style={{ width: '80px', height: '80px', backgroundColor: '#f3f4f6', marginBottom: '5px' }}></div>
                    )}
                    <div style={{ fontSize: '10px', color: '#718096' }}>Scan to Verify</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

Certificate.displayName = 'Certificate';

export default Certificate;
