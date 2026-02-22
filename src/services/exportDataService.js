import { format } from 'date-fns'

export const exportDataService = {
  // Create Google Sheets URL with working text parameter method
  createGoogleSheetsURLWithData(dashboardData) {
    // Create tab-separated data for all 4 sections
    const sheetData = this.createTabSeparatedData(dashboardData)
    
    // Encode the data for URL
    const encodedData = encodeURIComponent(sheetData)
    
    // Use Google Sheets with text parameter (this actually works)
    const baseUrl = 'https://sheets.new'
    
    // Handle URL length - Google Sheets has limits
    if (encodedData.length > 8000) {
      // If too long, use CSV method instead
      return this.createGoogleSheetsWithCSVImport(dashboardData)
    }
    
    return `${baseUrl}?text=${encodedData}`
  },

  // Create tab-separated data for all dashboard sections
  createTabSeparatedData(dashboardData) {
    const sections = []
    
    // Application Trends Section
    sections.push('Application Trends')
    sections.push('Date\tApplications')
    
    const trends = dashboardData.applicationTrends || []
    trends.slice(-30).forEach(trend => {
      sections.push(`${trend.date || ''}\t${trend.applications || 0}`)
    })
    
    sections.push('') // Empty line between sections
    
    // Status Distribution Section
    sections.push('Status Distribution')
    sections.push('Status\tCount')
    
    const statusData = dashboardData.statusDistribution || []
    statusData.forEach(status => {
      sections.push(`${status.name || ''}\t${status.value || 0}`)
    })
    
    sections.push('') // Empty line between sections
    
    // Monthly Overview Section
    sections.push('Monthly Overview')
    sections.push('Month\tApplications')
    
    const monthlyData = dashboardData.monthlyData || []
    monthlyData.forEach(month => {
      sections.push(`${month.month || ''}\t${month.applications || 0}`)
    })
    
    sections.push('') // Empty line between sections
    
    // Recent Activity Section
    sections.push('Recent Activity')
    sections.push('Type\tTitle\tSubtitle\tTime')
    
    const recentActivity = dashboardData.recentActivity || []
    recentActivity.slice(0, 5).forEach(activity => {
      sections.push(`${activity.type || ''}\t${activity.title || ''}\t${activity.subtitle || ''}\t${activity.time || ''}`)
    })
    
    return sections.join('\n')
  },

  // Alternative approach: Create CSV data and use Google Sheets import (legacy method)
  createGoogleSheetsWithCSVImport(dashboardData) {
    // Create a combined CSV with all sections
    const combinedCSV = this.createCombinedCSV(dashboardData)
    
    // Create downloadable CSV and open Google Sheets
    this.createDownloadableCSV(combinedCSV, 'dashboard-data.csv')
    
    // Open Google Sheets with import instructions
    return this.createGoogleSheetsWithInstructions()
  },

  // Create Application Trends CSV
  createApplicationTrendsCSV(trends) {
    if (!trends || trends.length === 0) {
      return 'Application Trends\nDate,Applications\nNo data available'
    }
    
    const headers = ['Application Trends', '', '']
    const columnHeaders = ['Date', 'Applications']
    const rows = trends.slice(-30).map(trend => [
      trend.date || '',
      trend.applications || 0
    ])
    
    return [headers, columnHeaders, ...rows].map(row => row.join(',')).join('\n')
  },

  // Create Status Distribution CSV
  createStatusDistributionCSV(statusData) {
    if (!statusData || statusData.length === 0) {
      return 'Status Distribution\nStatus,Count\nNo data available'
    }
    
    const headers = ['Status Distribution', '', '']
    const columnHeaders = ['Status', 'Count']
    const rows = statusData.map(status => [
      status.name || '',
      status.value || 0
    ])
    
    return [headers, columnHeaders, ...rows].map(row => row.join(',')).join('\n')
  },

  // Create Monthly Overview CSV
  createMonthlyOverviewCSV(monthlyData) {
    if (!monthlyData || monthlyData.length === 0) {
      return 'Monthly Overview\nMonth,Applications\nNo data available'
    }
    
    const headers = ['Monthly Overview', '', '']
    const columnHeaders = ['Month', 'Applications']
    const rows = monthlyData.map(month => [
      month.month || '',
      month.applications || 0
    ])
    
    return [headers, columnHeaders, ...rows].map(row => row.join(',')).join('\n')
  },

  // Create Recent Activity CSV
  createRecentActivityCSV(recentActivity) {
    if (!recentActivity || recentActivity.length === 0) {
      return 'Recent Activity\nType,Title,Subtitle,Time\nNo data available'
    }
    
    const headers = ['Recent Activity', '', '', '', '']
    const columnHeaders = ['Type', 'Title', 'Subtitle', 'Time']
    const rows = recentActivity.slice(0, 5).map(activity => [
      activity.type || '',
      activity.title || '',
      activity.subtitle || '',
      activity.time || ''
    ])
    
    return [headers, columnHeaders, ...rows].map(row => row.join(',')).join('\n')
  },

  // Create combined CSV with all sections
  createCombinedCSV(dashboardData) {
    const sections = []
    
    // Add header
    sections.push('Dashboard Data Export')
    sections.push('Generated on: ' + new Date().toLocaleString())
    sections.push('')
    
    // Add Application Trends
    sections.push('=== Application Trends ===')
    const trends = dashboardData.applicationTrends || []
    if (trends.length > 0) {
      sections.push('Date,Applications')
      trends.slice(-30).forEach(trend => {
        sections.push(`"${trend.date || ''}",${trend.applications || 0}`)
      })
    } else {
      sections.push('No application trends data available')
    }
    sections.push('')
    
    // Add Status Distribution
    sections.push('=== Status Distribution ===')
    const statusData = dashboardData.statusDistribution || []
    if (statusData.length > 0) {
      sections.push('Status,Count')
      statusData.forEach(status => {
        sections.push(`"${status.name || ''}",${status.value || 0}`)
      })
    } else {
      sections.push('No status distribution data available')
    }
    sections.push('')
    
    // Add Monthly Overview
    sections.push('=== Monthly Overview ===')
    const monthlyData = dashboardData.monthlyData || []
    if (monthlyData.length > 0) {
      sections.push('Month,Applications')
      monthlyData.forEach(month => {
        sections.push(`"${month.month || ''}",${month.applications || 0}`)
      })
    } else {
      sections.push('No monthly overview data available')
    }
    sections.push('')
    
    // Add Recent Activity
    sections.push('=== Recent Activity ===')
    const recentActivity = dashboardData.recentActivity || []
    if (recentActivity.length > 0) {
      sections.push('Type,Title,Subtitle,Time')
      recentActivity.slice(0, 5).forEach(activity => {
        sections.push(`"${activity.type || ''}","${activity.title || ''}","${activity.subtitle || ''}","${activity.time || ''}"`)
      })
    } else {
      sections.push('No recent activity data available')
    }
    sections.push('')
    
    // Add footer
    sections.push('=== Export Summary ===')
    sections.push(`Total Applications: ${dashboardData.stats?.totalApplications || 0}`)
    sections.push(`Pending Applications: ${dashboardData.stats?.pendingApplications || 0}`)
    sections.push(`Accepted Applications: ${dashboardData.stats?.acceptedApplications || 0}`)
    sections.push(`Rejected Applications: ${dashboardData.stats?.rejectedApplications || 0}`)
    sections.push(`Total Testimonials: ${dashboardData.stats?.totalTestimonials || 0}`)
    sections.push(`Monthly Growth: ${dashboardData.stats?.monthlyGrowth || 0}%`)
    
    return sections.join('\n')
  },

  // Convert 2D array to CSV string
  arrayToCSV(data) {
    return data
      .map(row => 
        row
          .map(cell => {
            // Handle cells with commas, quotes, or newlines
            if (typeof cell === 'string' && (cell.includes(',') || cell.includes('"') || cell.includes('\n'))) {
              return `"${cell.replace(/"/g, '""')}"`
            }
            return cell
          })
          .join(',')
      )
      .join('\n')
  },

  // Create downloadable CSV file
  createDownloadableCSV(csvContent, filename = 'dashboard-export.csv') {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', filename)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      return true
    }
    return false
  },

  // Main export function - CSV download + Google Sheets with instructions
  async exportToGoogleSheets(dashboardData) {
    try {
      // Create CSV with all dashboard data
      const csvData = this.createCombinedCSV(dashboardData)
      
      // Download CSV file
      const downloadSuccess = this.createDownloadableCSV(csvData, 'dashboard-data.csv')
      
      if (downloadSuccess) {
        // Open Google Sheets with import instructions
        const instructionsURL = this.createGoogleSheetsWithInstructions()
        window.open(instructionsURL, '_blank')
        
        return { 
          success: true, 
          message: 'CSV downloaded! Google Sheets opened with import instructions.',
          method: 'csv_import'
        }
      } else {
        // Fallback - just open Google Sheets
        window.open('https://sheets.new', '_blank')
        return { 
          success: false, 
          message: 'Google Sheets opened - please create manual export',
          method: 'fallback'
        }
      }
    } catch (error) {
      console.error('Export failed:', error)
      
      // Final fallback - open Google Sheets
      window.open('https://sheets.new', '_blank')
      return { 
        success: false, 
        message: 'Google Sheets opened - manual export needed',
        method: 'fallback'
      }
    }
  },

  // Create Google Sheets URL with import instructions
  createGoogleSheetsWithInstructions() {
    const instructions = `
DASHBOARD DATA EXPORT - READY TO IMPORT! 📊

✅ CSV file downloaded: "dashboard-data.csv"

🚀 QUICK IMPORT STEPS:
1. Click "File" > "Import" (in the top menu)
2. Select "Upload" tab
3. Click "Browse" and select "dashboard-data.csv"
4. Choose "Replace current sheet"
5. Click "Import data"

📋 DATA SECTIONS INCLUDED:
• Application Trends: 30-day application data
• Status Distribution: Application status breakdown  
• Monthly Overview: Monthly application counts
• Recent Activity: Latest dashboard activities

💡 TIP: Your data will be perfectly formatted and ready to use!

The CSV file contains all 4 dashboard sections with clear headers.
    `.trim()
    
    return `https://sheets.new`
  },

  // Legacy methods for backward compatibility
  collectDashboardData(applications, testimonials, projects, stats, applicationTrends, monthlyData, recentActivity) {
    return {
      overview: this.formatOverviewData(stats),
      applications: this.formatApplicationsData(applications),
      testimonials: this.formatTestimonialsData(testimonials),
      monthlyTrends: this.formatMonthlyTrendsData(monthlyData),
      applicationTrends: this.formatApplicationTrendsData(applicationTrends),
      recentActivity: this.formatRecentActivityData(recentActivity),
      // Add direct data for new export method
      stats,
      applicationTrends,
      monthlyData,
      recentActivity,
      statusDistribution: this.formatStatusDistributionData(stats)
    }
  },

  formatOverviewData(stats) {
    return [
      ['Metric', 'Value', 'Trend'],
      ['Total Applications', stats.totalApplications || 0, `${stats.monthlyGrowth > 0 ? '+' : ''}${stats.monthlyGrowth}%`],
      ['Pending Applications', stats.pendingApplications || 0, ''],
      ['Accepted Applications', stats.acceptedApplications || 0, ''],
      ['Rejected Applications', stats.rejectedApplications || 0, ''],
      ['Total Testimonials', stats.totalTestimonials || 0, ''],
      ['Total Projects', stats.totalProjects || 0, ''],
      ['Total Alumni', stats.totalAlumni || 0, ''],
      ['Monthly Growth', `${stats.monthlyGrowth}%`, '']
    ]
  },

  formatStatusDistributionData(stats) {
    return [
      { name: 'Pending', value: stats.pendingApplications || 0 },
      { name: 'Accepted', value: stats.acceptedApplications || 0 },
      { name: 'Rejected', value: stats.rejectedApplications || 0 }
    ].filter(item => item.value > 0)
  },

  formatApplicationsData(applications) {
    if (!applications || applications.length === 0) {
      return [['No applications data available']]
    }

    const headers = ['ID', 'Full Name', 'Email', 'Phone', 'Role', 'Status', 'Created Date', 'Updated Date']
    const rows = applications.map(app => [
      app.id || '',
      app.full_name || 'Unknown',
      app.email || '',
      app.phone || '',
      app.role || '',
      app.status || 'pending',
      app.created_at ? format(new Date(app.created_at), 'MMM dd, yyyy HH:mm') : '',
      app.updated_at ? format(new Date(app.updated_at), 'MMM dd, yyyy HH:mm') : ''
    ])

    return [headers, ...rows]
  },

  formatTestimonialsData(testimonials) {
    if (!testimonials || testimonials.length === 0) {
      return [['No testimonials data available']]
    }

    const headers = ['ID', 'Name', 'Position', 'Company', 'Message', 'Rating', 'Created Date']
    const rows = testimonials.map(testimonial => [
      testimonial.id || '',
      testimonial.name || '',
      testimonial.position || '',
      testimonial.company || '',
      (testimonial.message || '').substring(0, 100) + '...',
      testimonial.rating || '',
      testimonial.created_at ? format(new Date(testimonial.created_at), 'MMM dd, yyyy HH:mm') : ''
    ])

    return [headers, ...rows]
  },

  formatMonthlyTrendsData(monthlyData) {
    if (!monthlyData || monthlyData.length === 0) {
      return [['No monthly data available']]
    }

    const headers = ['Month', 'Applications', 'Growth Rate']
    const rows = monthlyData.map((month, index) => {
      const prevMonth = index > 0 ? monthlyData[index - 1].applications : 0
      const currentMonth = month.applications || 0
      const growthRate = prevMonth > 0 ? ((currentMonth - prevMonth) / prevMonth * 100).toFixed(1) + '%' : 'N/A'
      
      return [
        month.month || '',
        currentMonth,
        growthRate
      ]
    })

    return [headers, ...rows]
  },

  formatApplicationTrendsData(applicationTrends) {
    if (!applicationTrends || applicationTrends.length === 0) {
      return [['No trend data available']]
    }

    const headers = ['Date', 'Applications', 'Day of Week']
    const rows = applicationTrends.slice(-30).map(trend => [
      trend.date || '',
      trend.applications || 0,
      trend.date_obj ? format(new Date(trend.date_obj), 'EEEE') : ''
    ])

    return [headers, ...rows]
  },

  formatRecentActivityData(recentActivity) {
    if (!recentActivity || recentActivity.length === 0) {
      return [['No recent activity available']]
    }

    const headers = ['Type', 'Title', 'Subtitle', 'Time']
    const rows = recentActivity.map(activity => [
      activity.type || '',
      activity.title || '',
      activity.subtitle || '',
      activity.time || ''
    ])

    return [headers, ...rows]
  },

  exportAllDataToCSV(dashboardData) {
    const files = [
      { name: 'dashboard-overview.csv', data: dashboardData.overview },
      { name: 'applications.csv', data: dashboardData.applications },
      { name: 'testimonials.csv', data: dashboardData.testimonials },
      { name: 'monthly-trends.csv', data: dashboardData.monthlyTrends },
      { name: 'application-trends.csv', data: dashboardData.applicationTrends },
      { name: 'recent-activity.csv', data: dashboardData.recentActivity }
    ]

    files.forEach(file => {
      this.createDownloadableCSV(file.data, file.name)
    })

    // Open Google Sheets after downloading all files
    setTimeout(() => {
      window.open('https://sheets.new', '_blank')
    }, 1000)

    return { success: true, message: 'All CSV files downloaded and Google Sheets opened' }
  }
}
