import { useContext, useEffect } from "react"
import { useParams } from "react-router"
import { InterviewContext } from "../interview.context-instance"
import {
    generateInterviewReport,
    generateResumePdf,
    getAllInterviewReports,
    getInterviewReportById
} from "../services/interview.api"

export const useInterview = () => {
    const context = useContext(InterviewContext)
    const { interviewId } = useParams()

    if (!context) {
        throw new Error("useInterview must be used within an InterviewProvider")
    }

    const { loading, setLoading, report, setReport, reports, setReports } = context

    const generateReport = async (formData) => {
        setLoading(true)
        let response = null

        try {
            response = await generateInterviewReport(formData)
            setReport(response.interviewReport)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

        return response?.interviewReport ?? null
    }

    const getReportById = async (currentInterviewId) => {
        setLoading(true)
        let response = null

        try {
            response = await getInterviewReportById(currentInterviewId)
            setReport(response.interviewReport)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

        return response?.interviewReport ?? null
    }

    const getReports = async () => {
        setLoading(true)
        let response = null

        try {
            response = await getAllInterviewReports()
            setReports(response.interviewReports)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

        return response?.interviewReports ?? []
    }

    const getResumePdf = async (interviewReportId) => {
        setLoading(true)

        try {
            const response = await generateResumePdf({ interviewReportId })
            const url = window.URL.createObjectURL(new Blob([response], { type: "application/pdf" }))
            const link = document.createElement("a")

            link.href = url
            link.setAttribute("download", `resume_${interviewReportId}.pdf`)
            document.body.appendChild(link)
            link.click()
            link.remove()
            window.URL.revokeObjectURL(url)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const syncInterviewData = async () => {
            setLoading(true)

            try {
                if (interviewId) {
                    const response = await getInterviewReportById(interviewId)
                    setReport(response.interviewReport)
                } else {
                    const response = await getAllInterviewReports()
                    setReports(response.interviewReports)
                }
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

        syncInterviewData()
    }, [interviewId, setLoading, setReport, setReports])

    return { loading, report, reports, generateReport, getReportById, getReports, getResumePdf }
}
