import axiosInstance from '../config/axios';

const userManagementLoader = async ({request}) => {
    const url = new URL(request.url);
  const currentTab = url.searchParams.get("tab")||"learner"
  try {
    let users
    if(currentTab==="learner"){
        let response = await axiosInstance.get("/admins/users")
        users=response.data.data
        console.log(users)

    }
    else{
        let response = await axiosInstance.get("/admins/instructors")
        users=response.data.data
    }
    return {
        users,currentTab:currentTab
    }
  } catch (error) {
    return {
        error:error.response.data.message,currentTab:currentTab
    }
  }
}

export default userManagementLoader