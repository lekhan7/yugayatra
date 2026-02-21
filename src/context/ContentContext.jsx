import React, { createContext, useContext, useState, useEffect } from 'react'
import { initialContentData, contentHelpers } from '../data/contentData'

const ContentContext = createContext()

export const useContent = () => {
  const context = useContext(ContentContext)
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider')
  }
  return context
}

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState(initialContentData)
  const [loading, setLoading] = useState(false)

  // Load content from localStorage on mount (optional persistence)
  useEffect(() => {
    const savedContent = localStorage.getItem('yugyatra-content')
    if (savedContent) {
      try {
        const parsedContent = JSON.parse(savedContent)
        setContent(parsedContent)
      } catch (error) {
        console.error('Error loading saved content:', error)
      }
    }
  }, [])

  // Save content to localStorage whenever it changes (optional persistence)
  useEffect(() => {
    if (content !== initialContentData) {
      localStorage.setItem('yugyatra-content', JSON.stringify(content))
    }
  }, [content])

  // Service management functions
  const addService = (newService) => {
    setLoading(true)
    try {
      const updatedServices = contentHelpers.addService(content.services, newService)
      setContent(prev => ({ ...prev, services: updatedServices }))
    } catch (error) {
      console.error('Error adding service:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateService = (serviceId, updatedService) => {
    setLoading(true)
    try {
      const updatedServices = contentHelpers.updateService(content.services, serviceId, updatedService)
      setContent(prev => ({ ...prev, services: updatedServices }))
    } catch (error) {
      console.error('Error updating service:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteService = (serviceId) => {
    setLoading(true)
    try {
      const updatedServices = contentHelpers.deleteService(content.services, serviceId)
      setContent(prev => ({ ...prev, services: updatedServices }))
    } catch (error) {
      console.error('Error deleting service:', error)
    } finally {
      setLoading(false)
    }
  }

  // Achievement management functions
  const addCertificate = (newCertificate) => {
    setLoading(true)
    try {
      const updatedCertificates = contentHelpers.addCertificate(content.achievements.certificates, newCertificate)
      setContent(prev => ({
        ...prev,
        achievements: { ...prev.achievements, certificates: updatedCertificates }
      }))
    } catch (error) {
      console.error('Error adding certificate:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateCertificate = (certId, updatedCertificate) => {
    setLoading(true)
    try {
      const updatedCertificates = contentHelpers.updateCertificate(content.achievements.certificates, certId, updatedCertificate)
      setContent(prev => ({
        ...prev,
        achievements: { ...prev.achievements, certificates: updatedCertificates }
      }))
    } catch (error) {
      console.error('Error updating certificate:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteCertificate = (certId) => {
    setLoading(true)
    try {
      const updatedCertificates = contentHelpers.deleteCertificate(content.achievements.certificates, certId)
      setContent(prev => ({
        ...prev,
        achievements: { ...prev.achievements, certificates: updatedCertificates }
      }))
    } catch (error) {
      console.error('Error deleting certificate:', error)
    } finally {
      setLoading(false)
    }
  }

  const addMilestone = (newMilestone) => {
    setLoading(true)
    try {
      const updatedMilestones = contentHelpers.addMilestone(content.achievements.milestones, newMilestone)
      setContent(prev => ({
        ...prev,
        achievements: { ...prev.achievements, milestones: updatedMilestones }
      }))
    } catch (error) {
      console.error('Error adding milestone:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateMilestone = (index, updatedMilestone) => {
    setLoading(true)
    try {
      const updatedMilestones = contentHelpers.updateMilestone(content.achievements.milestones, index, updatedMilestone)
      setContent(prev => ({
        ...prev,
        achievements: { ...prev.achievements, milestones: updatedMilestones }
      }))
    } catch (error) {
      console.error('Error updating milestone:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteMilestone = (index) => {
    setLoading(true)
    try {
      const updatedMilestones = contentHelpers.deleteMilestone(content.achievements.milestones, index)
      setContent(prev => ({
        ...prev,
        achievements: { ...prev.achievements, milestones: updatedMilestones }
      }))
    } catch (error) {
      console.error('Error deleting milestone:', error)
    } finally {
      setLoading(false)
    }
  }

  // Alumni management functions
  const addAlumni = (newAlumni) => {
    setLoading(true)
    try {
      const updatedAlumni = contentHelpers.addAlumni(content.alumni, newAlumni)
      setContent(prev => ({ ...prev, alumni: updatedAlumni }))
    } catch (error) {
      console.error('Error adding alumni:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateAlumni = (alumniId, updatedAlumni) => {
    setLoading(true)
    try {
      const updatedAlumni = contentHelpers.updateAlumni(content.alumni, alumniId, updatedAlumni)
      setContent(prev => ({ ...prev, alumni: updatedAlumni }))
    } catch (error) {
      console.error('Error updating alumni:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteAlumni = (alumniId) => {
    setLoading(true)
    try {
      const updatedAlumni = contentHelpers.deleteAlumni(content.alumni, alumniId)
      setContent(prev => ({ ...prev, alumni: updatedAlumni }))
    } catch (error) {
      console.error('Error deleting alumni:', error)
    } finally {
      setLoading(false)
    }
  }

  // Career management functions
  const addCareer = (newCareer) => {
    setLoading(true)
    try {
      const updatedCareers = contentHelpers.addCareer(content.careers, newCareer)
      setContent(prev => ({ ...prev, careers: updatedCareers }))
    } catch (error) {
      console.error('Error adding career:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateCareer = (careerId, updatedCareer) => {
    setLoading(true)
    try {
      const updatedCareers = contentHelpers.updateCareer(content.careers, careerId, updatedCareer)
      setContent(prev => ({ ...prev, careers: updatedCareers }))
    } catch (error) {
      console.error('Error updating career:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteCareer = (careerId) => {
    setLoading(true)
    try {
      const updatedCareers = contentHelpers.deleteCareer(content.careers, careerId)
      setContent(prev => ({ ...prev, careers: updatedCareers }))
    } catch (error) {
      console.error('Error deleting career:', error)
    } finally {
      setLoading(false)
    }
  }

  // Project management functions
  const addProject = (newProject) => {
    setLoading(true)
    try {
      const updatedProjects = contentHelpers.addProject(content.projects, newProject)
      setContent(prev => ({ ...prev, projects: updatedProjects }))
    } catch (error) {
      console.error('Error adding project:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateProject = (projectId, updatedProject) => {
    setLoading(true)
    try {
      const updatedProjects = contentHelpers.updateProject(content.projects, projectId, updatedProject)
      setContent(prev => ({ ...prev, projects: updatedProjects }))
    } catch (error) {
      console.error('Error updating project:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteProject = (projectId) => {
    setLoading(true)
    try {
      const updatedProjects = contentHelpers.deleteProject(content.projects, projectId)
      setContent(prev => ({ ...prev, projects: updatedProjects }))
    } catch (error) {
      console.error('Error deleting project:', error)
    } finally {
      setLoading(false)
    }
  }

  // Reset content to initial state
  const resetContent = () => {
    setLoading(true)
    try {
      setContent(initialContentData)
      localStorage.removeItem('yugyatra-content')
    } catch (error) {
      console.error('Error resetting content:', error)
    } finally {
      setLoading(false)
    }
  }

  const value = {
    content,
    loading,
    // Services
    addService,
    updateService,
    deleteService,
    // Achievements
    addCertificate,
    updateCertificate,
    deleteCertificate,
    addMilestone,
    updateMilestone,
    deleteMilestone,
    // Alumni
    addAlumni,
    updateAlumni,
    deleteAlumni,
    // Careers
    addCareer,
    updateCareer,
    deleteCareer,
    // Projects
    addProject,
    updateProject,
    deleteProject,
    // Utility
    resetContent
  }

  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  )
}
