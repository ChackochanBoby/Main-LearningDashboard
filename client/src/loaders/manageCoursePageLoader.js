import axiosInstance from "../config/axios"

const manageCoursePageLoader = async ({params}) => {
    const {courseId}=params
    console.log(courseId)
    try {
        const courseResponse= await axiosInstance.get(`admins/courses/${courseId}`)
        return {courseDetails:courseResponse.data.data}
    } catch (error) {
        console.log(error)
        return {
            error:error.response.data.message
        }
    }
}

export default manageCoursePageLoader