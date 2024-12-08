import axiosInstance from "../config/axios";

const profilePageLoaderAdminAndInstructor = async () => {
    try {
        const response=await axiosInstance.get("/admins/profile")
        const profile = response.data.data
        return {profile:profile}
    } catch (error) {
        console.error(error)
        return {error:error.response.data.message}
    }
}

export default profilePageLoaderAdminAndInstructor