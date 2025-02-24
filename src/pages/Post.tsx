import icon1 from "@/assets/icon1.png";
import icon4 from "@/assets/icon4.png";
import icon5 from "@/assets/icon5.png";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/axios";
import { formatDistanceDateToNowAsString } from "@/lib/utils";
import { ArrowUpRightFromSquare, ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { useNavigate, useParams } from "react-router-dom";

interface PostProps {
  title: string;
  text: string;
  updatedAt: string;
  numberOfComments: number;
  username: string;
}

const Post = () => {
  const navigate = useNavigate();
  const { number } = useParams();
  const [post, setPost] = useState<PostProps>({
    title: "",
    text: "",
    updatedAt: "2025-02-23T00:00:00Z",
    numberOfComments: 0,
    username: "",
  });

  const fetchData = async () => {
    const response = await api.get(
      `/repos/jhonglev/ignite_github_blog/issues/${number}`
    );

    const {
      data: {
        title,
        body: text,
        updated_at: updatedAt,
        comments: numberOfComments,
        user: { login: username },
      },
    } = response;

    const postData: PostProps = {
      title,
      text,
      updatedAt,
      numberOfComments,
      username,
    };

    setPost(postData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleBackClick = () => navigate("/");

  const handleVisitIssueClick = () =>
    window.open(
      `https://github.com/jhonglev/ignite_github_blog/issues/${number}`,
      "_blank"
    );

  return (
    <div className="mb-6">
      <div className="h-[168px] w-full bg-[#0B1B2B] rounded-lg p-8">
        <div className="flex justify-between w-full">
          <Button
            className="text-[#3294F8] px-0 hover:bg-transparent hover:text-[#3294F8] hover:opacity-70 hover:cursor-pointer"
            variant="ghost"
            onClick={handleBackClick}
          >
            <ChevronLeft />
            VOLTAR
          </Button>
          <Button
            className="text-[#3294F8] px-0 hover:bg-transparent hover:text-[#3294F8] hover:opacity-70 hover:cursor-pointer"
            variant="ghost"
            onClick={handleVisitIssueClick}
          >
            VER NO GITHUB
            <ArrowUpRightFromSquare size={16} />
          </Button>
        </div>
        <h2 className="text-lg font-medium mt-2 text-[#E7EDF4]">
          {post.title}
        </h2>
        <div className="flex gap-6 mt-2 text-[#7B96B2]">
          <span className="flex items-center gap-2">
            <img className="w-4 h-4" src={icon1} alt="" />
            <span>{post.username}</span>
          </span>
          <span className="flex items-center gap-2">
            <img className="w-4 h-4" src={icon4} alt="" />
            <span>{formatDistanceDateToNowAsString(post.updatedAt)}</span>
          </span>
          <span className="flex items-center gap-2">
            <img className="w-4 h-4" src={icon5} alt="" />
            <span>{post.numberOfComments} comentário(s)</span>
          </span>
        </div>
      </div>
      <div className="p-8 mt-2 text-[#AFC2D4]">
        <Markdown>{post.text}</Markdown>
      </div>
    </div>
  );
};

export default Post;
