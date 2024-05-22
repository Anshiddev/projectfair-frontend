import React,{ useState,useEffect } from 'react'
import server_url from '../services/server_url'
import { toast } from 'react-toastify'
import { updateProfile } from '../services/allApis'

function Profile() {
  const [open,setOpen] = useState(false)
  const [user,setUser] = useState({
    id: "",email: "",username: "",password: "",github: "",linkdin: "",profile: ""
  })
  const [preview,setPreview] = useState("")
  const [existingProfile,setExistingProfile] = useState("")

  useEffect(()=>{
    if (sessionStorage.getItem('token')) {
      const userDetails = JSON.parse(sessionStorage.getItem('userDetails'))
      setUser({
        id: userDetails._id, email: userDetails.email, username: userDetails.username, password: userDetails.password, github: userDetails.github, linkdin: userDetails.linkdin
      })
      setExistingProfile(userDetails.profile)
    }
  },[open])

  useEffect(()=>{
    if (user.profile){
      setPreview(URL.createObjectURL(user.profile))
    }
    else {
      setPreview("")
    }
  }, [user.profile])
  console.log(existingProfile);

  const handleProfileUpdate =async()=>{
    const {username,email,password,github,linkdin} =user
    if (!username || !email || !password || !github || !linkdin){
      toast.warning("Invalid Inputs !!!")
    }
    else {
      const formData = new FormData()
      formData.append("username",username)
      formData.append("password",password)
      formData.append("email",email)
      formData.append("github",github)
      formData.append("linkdin",linkdin)
      formData.append("profile",preview?user.profile:existingProfile)

    const header = {
      "Authorization":`Bearer ${sessionStorage.getItem('token')}`,
      "Content-Type":preview?"multipart/form-data":"application/json"
    }

    const result = await updateProfile(header,formData)
    if (result.status == 200){
      toast.success("Profile Updated Successfully")
      setOpen(!open)
      sessionStorage.setItem('userDetails',JSON.stringify(result.data))
    }
    else {
      console.log(result);
      toast.error(result.response.data)
    }

    }
    console.log(user);
  }

  return (
    <>
    <div className='m-1 p-3 border shadow'>
      <div className='d-flex justify-content-between'>
      <h3>Profile</h3>
      <button className='btn' onClick={()=>setOpen(!open)}>
         <i class="fa-solid fa-circle-minus" />
      </button>
      </div>

      {
        open &&
        <div className='p-5'>
            <label>
                <input type="file" onChange={(e)=>setUser({...user,profile:e.target.files[0]})} name='' style={{display: 'none'}} id='pp' />
                {
                  existingProfile ?
                  <img src={preview?preview:`${server_url}/uploads/${existingProfile}`} alt="profile" width={'180px'} className='img-fluid' />
                  :
                  <img src={preview?preview:"https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} alt="profile" width={'180px'} className='img-fluid' />
                }
            </label>
            <input type="text" name='' id='' onChange={(e)=>setUser({...user,username:e.target.value})} value={user?.username} placeholder='username' className='form-control mt-3' />
            <input type="text" name='' id='' onChange={(e)=>setUser({...user,linkdin:e.target.value})} value={user?.linkdin} placeholder='LinkdIn ID' className='form-control mt-3' />
            <input type="text" name='' id='' onChange={(e)=>setUser({...user,github:e.target.value})} value={user?.github} placeholder='Github ID' className='form-control mt-3' />
            <div className='d-grid mt-4'>
              <button className='btn btn-warning btn-block' onClick={handleProfileUpdate}>Update</button>
            </div>
        </div>
      }
    </div>
    </>
  )
}

export default Profile