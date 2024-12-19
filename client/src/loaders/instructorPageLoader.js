import axiosInstance from "../config/axios"

const InstructorPageLoader =async ({params}) => {
    const {instructorId}=params
    try {
        const response = await axiosInstance.get(`/admins/instructors/${instructorId}`)
        console.log(response.data.data)
        return {profile:response.data.data.profile,managedCourses:response.data.data.managedCourses}
    } catch (error) {
        return {error:error.response.data.message}
    }
}

export default InstructorPageLoader