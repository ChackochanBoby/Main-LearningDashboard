import axiosInstance from "../config/axios"

const LearnerPageLoader =async ({params}) => {
    const {learnerId}=params
    try {
        const response = await axiosInstance.get(`/admins/learners/${learnerId}`)
        console.log(response.data.data)
        return {profile:response.data.data.profile,enrolledCourses:response.data.data.enrolledCourses}
    } catch (error) {
        return {error:error.response.data.message}
    }
}

export default LearnerPageLoader