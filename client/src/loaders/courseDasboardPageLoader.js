import axiosInstance from "../config/axios"

const courseDashboardPageLoader= async ({params}) =>{
    const { courseId }= params
    try {
        const courseContent=await axiosInstance(`/courses/${courseId}/learn`)
        console.log(courseContent.data.data)
        return {courseContent:courseContent.data.data}
    } catch (error) {
        return {error:error.response.data.message}
    }
}

export default courseDashboardPageLoader