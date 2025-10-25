# Security Policy

## Supported Versions

We actively support the following versions of Custom Homepage:

| Version | Supported          | Status |
| ------- | ------------------ | ------ |
| 1.1.x   | ✅ Yes             | Current |
| 1.0.x   | ✅ Yes             | Legacy |
| < 1.0   | ❌ No              | Deprecated |

## Reporting a Vulnerability

### **For Security Issues**

If you discover a security vulnerability in Custom Homepage, please report it responsibly:

#### **🔒 Critical Security Issues**
- **Email**: [ponofinlayson@hotmail.com](mailto:ponofinlayson@hotmail.com)
- **Response Time**: Within 24 hours
- **Scope**: Remote code execution, data exfiltration, privilege escalation

#### **⚠️ General Security Issues**
- **GitHub Issues**: Use the "Security" label
- **Response Time**: Within 72 hours
- **Scope**: XSS, CSRF, data validation, authentication bypass

### **What to Include in Your Report**
1. **Description**: Clear explanation of the vulnerability
2. **Steps to Reproduce**: Detailed reproduction steps
3. **Impact Assessment**: Potential security impact
4. **Environment**: Browser, OS, and version information
5. **Proof of Concept**: If applicable (without malicious payloads)

## Security Considerations

### **Local Application Security**

Since Custom Homepage is a **local application** that runs entirely in the browser:

#### **✅ Low Risk Areas**
- **No Server Communication**: All data stays local
- **No External Dependencies**: Self-contained application
- **No User Authentication**: No login system required
- **No Data Transmission**: No data sent to external servers

#### **⚠️ Areas of Concern**
- **Local Storage**: Browser localStorage data persistence
- **URL Validation**: Input validation for user-provided URLs
- **XSS Prevention**: Sanitization of user input
- **File Access**: Local file system access (if applicable)

### **Browser Security**

#### **Supported Browsers**
- **Chrome 80+**: Full support with security updates
- **Edge 80+**: Full support with security updates
- **Firefox 75+**: Full support with security updates
- **Safari 13+**: Full support with security updates

#### **Security Features**
- **Content Security Policy**: Implemented to prevent XSS
- **Same-Origin Policy**: Enforced for all requests
- **HTTPS Only**: All external resources use HTTPS
- **No Inline Scripts**: All JavaScript is external

### **Data Privacy**

#### **What We Collect**
- **Nothing**: No data collection whatsoever
- **No Analytics**: No tracking or analytics
- **No Telemetry**: No usage statistics
- **No Personal Information**: No user data stored

#### **What We Store Locally**
- **User Links**: Only what you add to cards
- **Card Names**: Only what you name your groups
- **Settings**: Only your personal preferences
- **All Data**: Stays on your device only

## Security Best Practices

### **For Users**

#### **Safe Usage**
1. **Download from Official Sources**: Only from GitHub releases
2. **Verify Signatures**: Check GitHub's "Verified" badge
3. **Keep Updated**: Use the latest version
4. **Secure URLs**: Only add trusted websites to your cards
5. **Regular Backups**: Export your data periodically

#### **What to Avoid**
- ❌ **Untrusted Sources**: Don't download from unofficial sites
- ❌ **Unverified Packages**: Always check signatures
- ❌ **Suspicious Links**: Don't add suspicious URLs to cards
- ❌ **Outdated Versions**: Keep your browser and homepage updated

### **For Developers**

#### **Code Security**
1. **Input Validation**: All user input is validated
2. **Output Encoding**: All output is properly encoded
3. **No Eval**: No use of eval() or similar functions
4. **CSP Headers**: Content Security Policy implemented
5. **Regular Audits**: Code reviewed for security issues

#### **Dependencies**
- **Minimal Dependencies**: Only essential libraries
- **Regular Updates**: Dependencies kept up to date
- **Security Scanning**: Regular vulnerability scanning
- **No Unnecessary Permissions**: Minimal browser permissions

## Vulnerability Disclosure

### **Disclosure Timeline**

1. **Initial Report**: Acknowledged within 24 hours
2. **Investigation**: Assessment within 72 hours
3. **Fix Development**: Patch within 7 days (critical) / 30 days (general)
4. **Public Disclosure**: After fix is available and tested
5. **Release**: New version with security fix

### **Responsible Disclosure**

We follow responsible disclosure practices:

- **No Public Disclosure**: Until fix is available
- **Coordinated Release**: With security researchers
- **Credit Given**: To security researchers who report issues
- **No Legal Action**: Against good-faith security research

## Security Updates

### **How We Handle Security Issues**

1. **Immediate Assessment**: Evaluate severity and impact
2. **Quick Fixes**: Critical issues patched immediately
3. **Regular Updates**: Security improvements in each release
4. **User Notification**: Security advisories when needed
5. **Documentation**: Security guidance for users

### **Update Process**

1. **Security Fix**: Developed and tested
2. **Version Bump**: New version number assigned
3. **Release Notes**: Security fixes documented
4. **GitHub Release**: Signed and verified release
5. **User Notification**: Update notification (if critical)

## Contact Information

### **Security Team**
- **Primary**: Use GitHub's [Private Vulnerability Reporting](https://github.com/ponofinlayson/grouped-links/security/advisories/new)
- **GitHub**: [@ponofinlayson](https://github.com/ponofinlayson)
- **Response Time**: 24-72 hours depending on severity

### **Non-Security Issues**
- **GitHub Issues**: Use the issue tracker
- **Discussions**: Use GitHub Discussions

## Acknowledgments

We thank the security community for helping keep Custom Homepage secure. Security researchers who responsibly disclose vulnerabilities will be credited in our release notes.

---

**Last Updated**: January 2025  
**Next Review**: January 2026  
**Policy Version**: 1.0
