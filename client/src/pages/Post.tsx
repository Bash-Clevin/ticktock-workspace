import { useMutation, useQuery } from '@apollo/client';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  CreateCommentDocument,
  DeleteCommentDocument,
  GetCommentByPostIdDocument,
  GetCommentByPostIdQuery,
  GetPostByIdDocument,
  LikePostDocument,
  UnLikePostDocument,
} from '../gql/generated';
import { usePostStore } from '../store/postStore';
import { useUserStore } from '../store/userStore';
import { ImCross, ImSpinner, ImSpinner2 } from 'react-icons/im';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { AiFillHeart, AiFillPlayCircle } from 'react-icons/ai';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { BsFillChatDotsFill, BsMusicNoteBeamed } from 'react-icons/bs';

const Post = () => {
  const { id } = useParams<{ id: string }>();
  const [comment, setComment] = useState<string>('');
  const navigate = useNavigate();

  const [createComment, { data: commentData }] = useMutation(
    CreateCommentDocument,
    {
      refetchQueries: [
        {
          query: GetCommentByPostIdDocument,
          variables: {
            postId: Number(id),
          },
        },
      ],
    },
  );

  const { data, loading: loadingComments } = useQuery<GetCommentByPostIdQuery>(
    GetCommentByPostIdDocument,
    {
      variables: {
        postId: Number(id),
      },
    },
  );

  const [deleteComment] = useMutation(DeleteCommentDocument, {
    update(cache, { data: { deleteCommentId } }) {
      const existingComments = cache.readQuery<GetCommentByPostIdQuery>({
        query: GetCommentByPostIdDocument,
        variables: { postId: Number(id) },
      });

      // filter out deleted comments
      const newComments = existingComments?.getCommentByPostId.filter(
        (comment) => comment.id !== deleteCommentId.id,
      );

      cache.writeQuery({
        query: GetCommentByPostIdDocument,
        data: { getCommentByPostId: newComments },
        variables: { postId: Number(id) },
      });
    },
  });

  const handleDeleteComment = async (commentId: number) => {
    await deleteComment({
      variables: {
        deleteCommentId: commentId,
      },
    });
  };

  const [currentPostIdIndex, setCurrentPostIdIndex] = useState<number>(0);

  const [isLoaded, setIsLoaded] = useState(false);
  const { data: dataPost, loading: loadingPost } = useQuery(
    GetPostByIdDocument,
    {
      variables: {
        getPostByIdId: Number(id),
      },
      onCompleted: () => {
        setIsLoaded(true);
      },
    },
  );

  const loopThroughPostsUp = () => {
    if (currentPostIdIndex === dataPost.getPostById.otherPostIds.length - 1)
      return;
    setCurrentPostIdIndex(currentPostIdIndex + 1);
    const nextPostId = dataPost.getPostById.otherPostIds[currentPostIdIndex];
    navigate(`/post/${nextPostId}`);
  };

  const loopThroughPostsDown = () => {
    if (currentPostIdIndex === 0) return;
    setCurrentPostIdIndex(currentPostIdIndex - 1);
    const nextPostId = dataPost.getPostById.otherPostIds[currentPostIdIndex];
    navigate(`/post/${nextPostId}`);
  };

  const addComment = async () => {
    await createComment({
      variables: {
        postId: Number(id),
        text: comment,
      },
    });
    setComment('');
  };

  const video = useRef<HTMLVideoElement>(null);
  const [inputFocused, setInputFocused] = useState(false);

  useEffect(() => {
    const handleLoadedData = () => {
      video.current?.play();
      setTimeout(() => {
        setIsLoaded(true);
      }, 300);
    };

    const videRef = video.current;
    videRef?.addEventListener('loadeddata', handleLoadedData);

    return () => {
      if (!videRef) return;
      videRef.removeEventListener('loadeddata', handleLoadedData);
      videRef.pause();
      videRef.currentTime = 0;
      videRef.load();
    };
  }, [isLoaded, setIsLoaded]);

  const [isPlaying, setIsPlaying] = useState(false);

  const toggleVideoPlay = () => {
    if (video.current) {
      video.current.pause();
    } else {
      video.current!.play();
    }
    setIsPlaying(!isPlaying);
  };

  const likedPosts = usePostStore((state) => state.likedPosts);
  const likePost = usePostStore((state) => state.likedPost);
  const unlikePost = usePostStore((state) => state.unlikePost);
  const loggedInUser = useUserStore((state) => state.id);

  const [likePostMutation] = useMutation(LikePostDocument, {
    variables: {
      postId: Number(id),
    },
    onCompleted: (data) => {
      console.log(data);
    },
    refetchQueries: [
      {
        query: GetPostByIdDocument,
        variables: {
          id: Number(id),
        },
      },
    ],
  });

  const [unLikePostMutation] = useMutation(UnLikePostDocument, {
    variables: {
      postId: Number(id),
    },
    refetchQueries: [
      {
        query: GetPostByIdDocument,
        variables: {
          id: Number(id),
        },
      },
    ],
  });

  const handleUnLikePost = async () => {
    if (loggedInUser == dataPost?.getPostById.User.id) return;
    await unLikePostMutation();
    unlikePost(Number(id));
  };

  const handleLikePost = async () => {
    if (loggedInUser == dataPost?.getPostById.User.id) return;
    await likePostMutation();
    likePost({
      id: Number(id),
      userId: Number(loggedInUser),
      postId: Number(id),
    });
  };

  const isLiked = likedPosts.some((likedPost) => {
    if (!likedPost) return false;
    return likedPost.userId === Number(loggedInUser);
  });

  return (
    <div
      id="PostPage"
      className="fixed lg:flex justify-between z-50
  top-0 left-0 w-full h-full bg-black lg:overflow-hidden overflow-auto
  "
    >
      <div className="lg:w-[calc(100%-540px)] h-full relative">
        <Link
          to="/"
          className="absolute z-20 m-5 rounded-full 
          hover:bg-gray-800 bg-gray-700 p-1.5"
        >
          <ImCross color="#FFFFFF" size="27" />
        </Link>
        <button
          onClick={loopThroughPostsUp}
          className="absolute z-20 right-4 top-4
        items-center justify-center rounded-full bg-gray-700 
        p-1.5 hover:bg-gray-800 "
        >
          <BiChevronUp color="#FFFFFF" size="30" />
        </button>
        <button
          onClick={loopThroughPostsDown}
          className="absolute z-20 right-4 top-20
        items-center justify-center rounded-full bg-gray-700 
        p-1.5 hover:bg-gray-800"
        >
          <BiChevronDown color="#FFFFFF" size="30" />
        </button>
        <img
          className="absolute top-[18px] left-[70px] max-w-[80px]
         rounded-full lg:mx-0 mx-auto "
          src="/src/assets/images/tiktok-logo-small.png"
        />

        {loadingPost ? (
          <div
            className="flex items-center justify-center bg-black 
      bg-opacity-70 h-screen lg:min-w-[400px]"
          >
            <ImSpinner2
              className="animate-spin ml-1"
              size="100"
              color="#FFFFF"
            />
          </div>
        ) : (
          <div
            className="bg-black bg-opacity-90 lg:min-w-[400px]"
            onClick={toggleVideoPlay}
          >
            <video
              ref={video}
              src={'http://localhost:3000/' + dataPost?.getPostById.video}
              loop
              muted
              className="h-screen mx-auto"
            />
            <AiFillPlayCircle
              size="100"
              className="rounded-full z-100 absolute top-1/2 left-1/2 transform 
          -translate-x-1/2 -translate-y-1/2 text-black cursor-pointer
          "
            />
          </div>
        )}
      </div>
      <div
        className="lg:max-w-[550px] relative w-full h-full bg-white"
        id="InfoSection"
      >
        <div className="py-7" />
        <div className="flex items-center justify-between px-8">
          <div className="flex items-center">
            <Link to="/">
              <img
                className="rounded-full lg:mx-0 mx-auto"
                width="40"
                src={
                  dataPost?.getPostById.User.image
                    ? dataPost.getPostById.User.image
                    : 'https://picsum.photos/id/8/300/320'
                }
              />
            </Link>
            <div className="ml-3 pt-0.5">
              <div className="text-[17px] font-semibold">User name</div>
              <div className="text-[13px] -mt-5 font-light">
                {dataPost?.getPostById.User.name}
                <span className="relative top-[6px] text-[30px] pr-0.5">.</span>
                <span className="font-medium">
                  {new Date(dataPost?.getPostById.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
          <MdOutlineDeleteForever size="25" className="cursor-pointer" />
        </div>
        <div className="px-8 mt-4 text-sm">{dataPost?.getPostById.text}</div>
        <div className="px-8 mt-4 text-sm font-bold">
          <BsMusicNoteBeamed size="17" />
          Original sound - {dataPost?.getPostById.User.name}
        </div>
        <div className="flex items-center px-8 mt-8">
          <div className="pb-4 text-center flex items-center">
            <button
              disabled={dataPost?.getPostById.User.id === loggedInUser}
              className="rounded-full bg-gray-200 p-2 cursor-pointer"
              onClick={() => (isLiked ? handleUnLikePost() : handleLikePost())}
            >
              <AiFillHeart size="25" color={isLiked ? 'red' : 'black'} />
            </button>
            <span className="text-xs pl-2 pr-4 text-gray-800 font-semibold">
              {dataPost?.getPostById.Likes?.length}
            </span>
          </div>
          <div className="pb-4 text-center flex items-center">
            <div className="rounded-full bg-gray-200 p-2 cursor-pointer">
              <BsFillChatDotsFill size="25" color="black" />
            </div>
            <span className="text-xs pl-2 pr-4 text-gray-800 font-semibold">
              {data?.getCommentByPostId.length}
            </span>
          </div>
        </div>
        <div
          id="Comments"
          className="bg-[#F8F8F8] z-0 w-full h-[calc(100%-237px)] 
          border-t-2 overflow-auto"
        >
          <div className="pt-2" />
          {data?.getCommentByPostId.length === 0 && (
            <div className="text-center mt-6 text-xl text-gray-500">
              No comments...
            </div>
          )}
          <div className="flex flex-col items-center justify-between px-8 mt-4">
            {data?.getCommentByPostId.map((comment) => (
              <div
                className="flex items-center relative w-full"
                key={comment.id}
              >
                <Link to="/">
                  <img
                    className="absolute top-0 rounded-full lg:mx-0 mx-auto"
                    width="40"
                    src={
                      comment.User.image
                        ? comment.User.image
                        : 'https://picsum.photos/id/237/200/300'
                    }
                  />
                </Link>
                <div className="ml-14 pt-0.5 w-full">
                  <div className="text-[18px] font-semibold flex items-center justify-between">
                    User name
                    {comment.User.id === Number(loggedInUser) && (
                      <MdOutlineDeleteForever
                        onClick={() => handleDeleteComment(comment.id)}
                        size="25"
                        className="cursor-pointer"
                      />
                    )}
                  </div>
                  <div className="text-[15px] font-light">{comment.text}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mb-28" />
        </div>
        <div
          id="CreateComment"
          className="absolute flex items-center justify-between bottom-0
        bg-white h-[85px] lg:max-w-[550px] w-full py-5 px-8 border-t-2
        "
        >
          <div
            className={[
              inputFocused
                ? 'border-2 border-gray-400'
                : 'border-2 border-[#F1F1F2]',
              'flex items-center rounded-lg w-full lg:max-w-[420px] bg-[#F1F1F2]',
            ].join(' ')}
          >
            <input
              onChange={(e) => setComment(e.target.value)}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              className="bg-[#F1F1F2] text-[14px] focus:outline-none
              w-full lg:max-w-[420px] p-2 rounded-lg
              "
              type="text"
              placeholder="Add Comment..."
            />
          </div>
          <button
            disabled={!comment}
            onClick={addComment}
            className={[
              comment ? 'text-[#F02C56] cursor-pointer' : 'text-gray-400',
              'font-semibold text-sm ml-5 pr-1',
            ].join(' ')}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
