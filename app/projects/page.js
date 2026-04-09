import FeaturedProject from '../../components/FeaturedProject';
import { FeaturedProjects } from '../../components/FeaturedProjects';
import items from '../../data/projects';
import Base from '../../layouts/Base';

export const metadata = {
  title: 'Projects',
  description:
    "I'm obsessed with side projects and building in public. Here you can navigate to different websites, apps, and libraries I built.",
  openGraph: {
    title: 'Projects // Zak Gilliam',
    url: 'https://zakgilliam.com/projects',
    images: ['/static/images/projects-bw.jpg']
  }
};

export default function Projects() {
  const renderFeatured = () => {
    const featured = ['CEREBRA', 'BOOST Accelerometer Pipeline', 'CA Pipeline', 'Reporting Pipeline'];

    return items
      .map((item) => {
        return item.projects.filter((project) =>
          featured.includes(project.title)
        );
      })
      .filter((item) => {
        return item.length > 0;
      })
      .flat()
      .map((item, index) => {
        const key = item.url || `${item.title}-${index}`;
        return <FeaturedProject key={key} project={item} />;
      });
  };

  const renderAll = () => {
    return items.map((item) => {
      return (
        <div key={item.year}>
          <h3>{item.year}</h3>
          <ul>
            {item.projects.map((project, index) => {
              return (
                <ProjectItem
                  key={`${item.year}-${project.title}-${index}`}
                  project={project}
                />
              );
            })}
          </ul>
        </div>
      );
    });
  };

  const getTotalProjects = () => {
    let total = 0;

    for (let i = 0; i < items.length; i++) {
      total = total + items[i].projects.length;
    }

    return total;
  };

  const description = `I have a passion for building tools for researchers and users more broadly. Here you can navigate to <strong>${getTotalProjects()} different websites, tools, and libraries</strong> I built.`;

  return (
    <Base
      title="Projects // Zak Gilliam"
      tagline="Work. Hobbies. Experiments."
      primaryColor="cyan"
      secondaryColor="green"
    >
      <p dangerouslySetInnerHTML={{ __html: description }} />

      <h2>Featured Projects</h2>
      <FeaturedProjects>{renderFeatured()}</FeaturedProjects>

      <h2>All Projects</h2>
      {renderAll()}
    </Base>
  );
}

function ProjectItem(props) {
  const { project } = props;

  return (
    <li>
      <a href={project.url} target="_blank">
        {project.title}
      </a>
    </li>
  );
}