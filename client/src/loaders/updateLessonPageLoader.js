import axiosInstance from "../config/axios"

const updateLessonPageLoader = async({params}) => {
  const { lessonId } = params
    try {
        const lessonToUpdate=await axiosInstance.get(`/lessons/${lessonId}/manage`)
        return {lessonToUpdate:lessonToUpdate.data.data}
    } catch (error) {
        return{error:error.response.data.message}
    }
}

export default updateLessonPageLoader