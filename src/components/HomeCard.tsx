import Markdown from "react-markdown";
import { useNavigate } from "react-router-dom";
import { formatDistanceDateToNowAsString } from "@/lib/utils";

interface HomeCardProps {
  title: string;
  text: string;
  updatedAt: string;
  number: number;
}

const HomeCard = ({ title, text, updatedAt, number }: HomeCardProps) => {
  const navigate = useNavigate();
  const handleIssueClick = () => navigate(`post/${number}`);
  return (
    <div
      onClick={handleIssueClick}
      className="col-span-1 h-[260px] rounded-lg bg-[#112131] p-8 flex flex-col justify-between hover:cursor-pointer"
    >
      <div className="flex justify-between items-start gap-2">
        <div className="text-lg text-[#E7EDF4]">{title}</div>
        <span className="text-xs text-[#7B96B2] text-nowrap mt-2">
          {formatDistanceDateToNowAsString(updatedAt)}
        </span>
      </div>
      <span className="text-[#AFC2D4] line-clamp-5 self-end overflow-x-hidden max-w-full">
        <Markdown>{text}</Markdown>
      </span>
    </div>
  );
};

export default HomeCard;
