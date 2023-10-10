import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflow: 'scroll',
    height: '50%',
    width:'80%',
    padding:'0px'
  };
function getActualComment(ids) {
    let responseArr = [];
    for (let id in ids) {
        responseArr.push(fetch(`https://hacker-news.firebaseio.com/v0/item/${ids[id]}.json?print=pretty`))
    }
    return responseArr;
  }
function Comments(props) {
   const [comments, setComments] = useState([])
   useEffect(()=>{
    async function fetchComments(){
    let kids = props.payload.kids;
    let resp = await Promise.all(getActualComment(kids));
    let jsons = await Promise.all(resp.map(r => r.json()));
    setComments(jsons);
    }
    fetchComments();
   })
    return (
        <div>
        <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2" style={{position:'sticky', top:0, backgroundColor:'white', padding:'10px'}}>
          {props.payload.title}
        </Typography>
        {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Hi
          hello
        </Typography> */}
        {
            comments.map((comment, index)=>
                <div key={index} style={{paddingLeft:'5px'}}><strong>{comment.by} {new Date(comment.time*1000).toLocaleString()}</strong><span>
                <div key={index} style={{fontFamily:"'Monaco'", fontSize:'15px'}}dangerouslySetInnerHTML={{__html:comment.text}}></div>
                </span>
                {comment.kids && comment.kids.length>0 && <SubComment payload={comment}></SubComment>}
                <hr/></div>
            )
        }
      </Box> 
      </div>
    )
}

function SubComment(props) {
    const[comments, setComments] = useState([])
    useEffect(()=>{
        async function fetchComments(){
            let kids = props.payload.kids;
            let resp = await Promise.all(getActualComment(kids));
            let jsons = await Promise.all(resp.map(r => r.json()));
            setComments(jsons);
        }
        fetchComments()
    })
    return (
       <div>
        {comments.map((comment,index)=>
        <div key={index} style={{paddingLeft:'12px'}}><strong>{comment.by} {new Date(comment.time*1000).toLocaleString()}</strong><span>
        <div key={index} style={{fontFamily:"'Monaco'", fontSize:'12px'}}dangerouslySetInnerHTML={{__html:comment.text}}></div>
        </span>
        {comment.kids && comment.kids.length>0 && <SubComment payload={comment}></SubComment>}
        </div>
        )}
        </div>
    )
}

export default Comments;