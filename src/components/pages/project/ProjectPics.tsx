import Button from "@/components/ui/button";

interface ProjectPicsProps {
  githubLink: string;
  projectImgs: string[];
}

export default function ProjectPics({ githubLink, projectImgs }: ProjectPicsProps) {
  return (
    <div className="flex flex-col gap-3 items-start">
      <Button
        onClick={() => window.open(githubLink, "_blank")}
        className="md:text-xl border px-5 py-7 bg-black"
      >
        Open with GitHub
      </Button>

      <div className="grid grid-cols-4 gap-8 xl:gap-36">
        {Array.isArray(projectImgs) && projectImgs.length > 0 ? (
          projectImgs.map((pic, index) => (
            <img
              key={index}
              src={pic}
              alt="pic"
              loading="lazy"
              className="xl:h-[350px] md:h-[250px] h-[150px] sm:h-[200px] lg:h-[300px] object-cover"
            />
          ))
        ) : (
          <p>No images available</p>
        )}
      </div>
    </div>
  );
}
