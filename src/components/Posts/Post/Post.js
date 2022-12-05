import moment from 'moment';
import { useDispatch} from 'react-redux';
import {  useNavigate} from "react-router-dom";


import {Card,Button,OverlayTrigger,Tooltip} from 'react-bootstrap';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import { AiFillDelete,AiOutlineEllipsis} from "react-icons/ai";

import {DeletePost,LikePost} from './../../../redux/actions/A_Posts.js';
import { useState } from 'react';


const Post=({post,setCurrentId,user })=>{
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const [likes, setLikes] = useState(post?.likes);
  const userId = user?.result.googleId || user?.result?._id;
  const hasLikedPost =post?.likes?.find((like) => like === userId);
  
  const handleLike = async () => {
    setCurrentId(0);
    dispatch(LikePost(post._id));
    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  };
  

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId)
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  };

  const openPost=()=>{navigate(`/c/posts/${post._id}`)}
    return(
        <>
        <Card style={{ width: '20rem' ,height:'23rem' }}
            className="bg-dark text-white shadow-lg p-3 mb-5 rounded">

            <Card.Img className="overflow-hidden shadow-lg rounded" onClick={openPost} variant="top" src={post.selectedFile} style={{ width: '18rem' ,height:'10rem'}} 
            />
            <Card.Body>
                <Card.Title >Title: {post.title}</Card.Title>
                
                <Card.Text>
                <OverlayTrigger  placement="right" overlay={<Tooltip id="tooltip-disabled"   >{post.message.split(' ').splice(0, 20).join(' ')}...</Tooltip>}>
                <span className="d-inline-block"><Button size="md" variant="outline" className="shadow-lg rounded btn btn-light" style={{ pointerEvents: 'none' }}>Message</Button></span>
                </OverlayTrigger>{' '}
                
               
                <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-disabled">{post.tags.map((tag) => `#${tag} `)}</Tooltip>}>
                <span className="d-inline-block"><Button size="md" variant="outline" className="shadow-lg rounded btn btn-light" style={{ pointerEvents: 'none' }}> Tags</Button></span>
                </OverlayTrigger>  
                
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator)&& (
                <Button className="ms-4 shadow-lg rounded btn btn-light" size="sm" variant="outline"  onClick={() => dispatch(DeletePost(post._id))}><AiFillDelete fontSize="small" /> </Button> 
                )}

                </Card.Text>
                
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator)&& (
                    <Button className="position-absolute top-0 end-0 shadow-lg rounded btn btn-light" size="sm" variant="outline"
                    onClick={(e) =>{
                      e.stopPropagation();
                      setCurrentId(post._id);
                    }}><AiOutlineEllipsis fontSize="small" /> </Button> 
                )}
                

                <Button size="sm" variant="outline" className='shadow-lg rounded btn btn-light' disabled={!user?.result}  onClick={() =>{handleLike()}}> <Likes />  </Button> {' '}
                
                <Card.Footer>    

                <small className="text-muted  position-absolute bottom-0 start-0">--{post.name}</small>
                <small className="text-muted  position-absolute bottom-0 end-0">{moment(post.createdAt).fromNow()}</small>
     
                </Card.Footer>
                
            </Card.Body>
        </Card>
  
        </>
    );
}
export default Post;