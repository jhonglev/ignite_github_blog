import icon1 from "@/assets/icon1.png";
import icon2 from "@/assets/icon2.png";
import icon3 from "@/assets/icon3.png";
import HomeCard from "@/components/HomeCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/axios";
import { ArrowUpRightFromSquare } from "lucide-react";
import { useEffect, useState } from "react";

interface ProfileProps {
  name: string;
  bio: string;
  gitHubUsername: string;
  company: string;
  numberOfFollowers: number;
  avatarUrl: string;
}

interface IssueProps {
  id: number;
  number: number;
  title: string;
  text: string;
  updatedAt: string;
}

const Home = () => {
  const [profileData, setProfileData] = useState<ProfileProps>({
    name: "",
    bio: "",
    gitHubUsername: "",
    company: "",
    numberOfFollowers: 0,
    avatarUrl: "",
  });

  const [issues, setIssues] = useState<Array<IssueProps>>([]);

  const fetchData = async () => {
    let response = await api.get(`users/jhonglev`);
    const {
      data: {
        name,
        bio,
        login: gitHubUsername,
        company,
        followers: numberOfFollowers,
        avatar_url: avatarUrl,
      },
    } = response;

    const profile: ProfileProps = {
      name,
      bio,
      gitHubUsername,
      company,
      numberOfFollowers,
      avatarUrl,
    };

    setProfileData(profile);

    response = await api.get(`/repos/jhonglev/ignite_github_blog/issues`);
    const { data } = response;

    const issuesList: Array<IssueProps> = data.map(
      (issue: {
        title: string;
        body: string;
        updated_at: string;
        id: number;
        number: number;
      }) => ({
        id: issue.id,
        title: issue.title,
        text: issue.body,
        updatedAt: issue.updated_at,
        number: issue.number,
      })
    );

    setIssues(issuesList);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleGithubButtonClick = () =>
    window.open("https://github.com/jhonglev", "_blank");

  const handleChangeInputValue = (text: string) => {
    if (!text) return;
    api
      .get(`/search/issues?q=${text}+repo:jhonglev/ignite_github_blog`)
      .then((response) => {
        const {
          data: { items },
        } = response;

        const filteredIssues = items.map(
          (item: {
            id: number;
            title: string;
            body: string;
            updated_at: string;
            number: number;
          }) => ({
            id: item.id,
            title: item.title,
            text: item.body,
            updatedAt: item.updated_at,
            number: item.number,
          })
        );

        setIssues(filteredIssues);
      });
  };

  return (
    <div className="mb-6">
      <div className="h-[212px] w-full bg-[#0B1B2B] rounded-lg p-8">
        <div className="flex items-center gap-6 h-full">
          <div className="w-[148px] h-[148px] min-w-[148px]">
            <img
              src={profileData.avatarUrl}
              alt=""
              className="w-full h-full rounded-lg"
            />
          </div>
          <div className="text-[#AFC2D4] flex flex-col justify-between h-full w-full">
            <div>
              <div className="flex justify-between">
                <h2 className="text-white text-xl">{profileData.name}</h2>
                <Button
                  onClick={handleGithubButtonClick}
                  className="text-[#3294F8]"
                  variant="ghost"
                >
                  GITHUB
                  <ArrowUpRightFromSquare size={16} />
                </Button>
              </div>
              <p className="line-clamp-2 mt-2">{profileData.bio}</p>
            </div>
            <div className="flex gap-6">
              <span className="flex items-center gap-2">
                <img src={icon1} alt="" className="w-4 h-4" />
                <span>{profileData.gitHubUsername}</span>
              </span>
              <span className="flex items-center gap-2">
                <img src={icon2} alt="" className="w-4 h-4" />
                <span>{profileData.company}</span>
              </span>
              <span className="flex items-center gap-2">
                <img src={icon3} alt="" className="w-4 h-4" />
                <span>
                  {String(profileData.numberOfFollowers)} seguidor(es)
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="text-[#C4D4E3] mt-14">
        <div className="flex justify-between">
          <h3>Publicações</h3>
          <span className="text-xs text-[#7B96B2]">
            {issues.length} publicação(ões)
          </span>
        </div>
      </div>
      <Input
        onChange={({ target: { value } }) => handleChangeInputValue(value)}
        className="border border-[#1C2F41] h-10 text-[#3A536B] placeholder:text-[#3A536B] mt-2"
        placeholder="Buscar conteúdo"
      />
      <div className="grid grid-cols-2 mt-6 gap-6">
        {issues.map((issue) => (
          <HomeCard
            key={issue.id}
            text={issue.text}
            title={issue.title}
            updatedAt={issue.updatedAt}
            number={issue.number}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
