import { useEffect, useState } from 'react'
// import { Button } from '../components/Button'
import { Card } from '../components/Card'
// import { CreateContentModal } from '../components/CreateContentModal'
// import { PlusIcon } from '../icons/PlusIcon'
// import { ShareIcon } from '../icons/ShareIcon'
import { Sidebar } from '../components/Sidebar'
// import { useContent } from '../hooks/useContent'
import axios from 'axios'
// import { BACKEND_URL } from '../config'
import { useParams } from 'react-router-dom'
const BACKEND_URL2 = import.meta.env.VITE_BACKEND_URL;

export const Share = () => {

  // const {content} = useContent();


  // console.log("Contetns are", content);
  const { shareid } = useParams();
  const hash = shareid;
  console.log("This is ",hash);
  
  const [content, setContent] = useState([]);


  function refresh() {
    axios.get(`${BACKEND_URL2}/api/v1/brain/share/${hash}`, {
    }).then((response) => {
      setContent(response.data.content);
    })
  }



  useEffect(() => {

    refresh();
    let interval = setInterval(() => {
      refresh()
    }, 10 * 1000)

    return () => {
      clearInterval(interval);
    }
  }, [])


  return (<div className="">

    <Sidebar />

    <div className='ml-72 p-4 min-h-screen bg-slate-100'>

      {/* <CreateContentModal open={modalOpen} onClose={() => {
          setmodalOpen(false);
        }} /> */}
      <div className='flex justify-end gap-4'>

        {/* <Button onClick={async () => {
            const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`,{
              share:true
            },{
              headers:{
                "Authorization":localStorage.getItem("token")
              }
            });
            console.log(response.data.hash);
            const shareUrl=`http://localhost:5173/share/${response.data.hash}`
            alert(shareUrl);
            // {navigator.clipboard.writeText(this.state.textToCopy)}
          }
          } size="md" variant='primary' startIcon={<ShareIcon size='md' />} text="Share Brain"/> */}



        {/* <Button size="md" startIcon={<PlusIcon size='md' />} variant='secondary' text="Add Content" onClick={() => {
            setmodalOpen(true);
          }} /> */}
      </div>

      <br />
      <div className='flex gap-4 flex-wrap'>
        {content.map(({ type, link, title, _id, userId }) =>
          <Card key={_id} type={type} title={title} link={link} contentId={_id} userId={userId}
            onDelete={() => alert("Cannot delete others content")} />
        )}
        {/* here */}
      </div>
    </div>
  </div>)
}