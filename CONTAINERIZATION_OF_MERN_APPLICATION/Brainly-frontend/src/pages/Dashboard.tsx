import { useEffect, useState } from 'react'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { CreateContentModal } from '../components/CreateContentModal'
import { PlusIcon } from '../icons/PlusIcon'
import { ShareIcon } from '../icons/ShareIcon'
import { Sidebar } from '../components/Sidebar'
import { useContent } from '../hooks/useContent'
import axios from 'axios'
// import { BACKEND_URL } from '../config'
import { LogoutIcon } from '../icons/LogoutIcon'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';



function Dashboard() {
  const [modalOpen, setmodalOpen] = useState(false);
  const {content,refresh} = useContent();
  console.log("Baas");
  
  const BACKEND_URL2 = import.meta.env.VITE_BACKEND_URL;
  const FRONT_END_URL2 = import.meta.env.FRONT_END_URL || "https://brainly-qa7k.vercel.app";
  console.log("Backend URL:", BACKEND_URL2);
  console.log("FROTNEND URL:", FRONT_END_URL2);
  
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token')); // Track login state

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      // If no token, redirect to Sign-in page
      navigate('/signin');
    } else {
      refresh();
    }
  }, [modalOpen, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    setIsLoggedIn(false); 

    toast.warn("Logged out successfully");

    setTimeout(() => {
      navigate('/signin'); 
    }, 1000);
  };
  console.log("Contetns are",content);
  

  useEffect(()=>{
    refresh();
  },[modalOpen])

  const handleDelete = async (contentId: string,userId:string) => {
    try {
      await axios.delete(`${BACKEND_URL2}/api/v1/content`, {
        data: {
          contentId: contentId,
          userId: userId
        },
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      
      toast.info(`Content with ID ${contentId} deleted successfully.`,{ position: "top-center",closeOnClick: true,})
      refresh();
    } catch (error) {
      console.error("Error deleting content:", error);
      toast.error("Failed to delete content.");
    }
  };


  return (
    <div className="">
      
      <Sidebar/>

      <div className='ml-72 p-4 min-h-screen bg-slate-100'>

        <CreateContentModal open={modalOpen} onClose={() => {
          setmodalOpen(false);
        }} />
        <div className='flex justify-end gap-4'>
        <ToastContainer/>
          <Button onClick={async () => {
            const response = await axios.post(`${BACKEND_URL2}/api/v1/brain/share`,{
              share:true
            },{
              headers:{
                "Authorization":localStorage.getItem("token")
              }
            });
            console.log(response.data.hash);
            const shareUrl=`${FRONT_END_URL2}/share/${response.data.hash}`
            console.log("Share URL",shareUrl);
            
            await navigator.clipboard.writeText(shareUrl);
            toast.success("Share URL copied to clipboard!");
 
          }
          } size="md" variant='primary' startIcon={<ShareIcon size='md' />} text="Share Brain"/>



          <Button size="md" startIcon={<PlusIcon size='md' />} variant='secondary' text="Add Content" onClick={() => {
            setmodalOpen(true);
          }} />
          
          {isLoggedIn && (
            <Button
              size="md"
              startIcon={<LogoutIcon size="md" />}
              variant="secondary"
              text="Logout"
              onClick={handleLogout}
            />
          )}
          
        </div>
        <br />
        <div className='flex gap-4 flex-wrap z-0'>
          {content.map(({type, link, title,_id,userId}) =>
            <Card key={_id} type={type} title={title} link={link} contentId={_id} userId={userId}
              onDelete={handleDelete}/>
          )}
          {/* here */}
        </div>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default Dashboard;
