import categories from '../../data/uses';
import Base from '../../layouts/Base';

export const metadata = {
  title: 'Uses',
  description:
    "I've spent a little too much time and money on perfecting my setup. As of right now, I can't find anything else to spend my money on so this is it. Here you can find all the software, hardware, and gear that I use on a daily basis.",
  openGraph: {
    title: 'Uses // Zak Gilliam',
    url: 'https://zakgilliam.com/uses',
    images: ['/static/images/uses-bw.jpg']
  }
};
export default function Uses() {
  const renderAll = () => {
    return categories.map((category) => {
      return (
        <div key={category.name}>
          <h2>{category.name}</h2>
          <ul>
            {category.items.map((item, index) => {
              return (
                <li key={`${category.name}-${item.title}-${index}`}>
                  <a href={item.url} target="_blank">
                    {item.title}
                  </a>
                  <span> - </span>
                  <span
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      );
    });
  };

  return (
    <Base
      title="Uses // Zak Gilliam"
      tagline="Tools. Apps. Gear."
      primaryColor="yellow"
      secondaryColor="pink"
    >
      <p
        dangerouslySetInnerHTML={{
          __html:
            "I've spent a little too much time and money on perfecting my setup. As of right now, I can't find anything else to spend my money on so this is it. Here you can find all the software, hardware, and gear that I use on a daily basis."
        }}
      />

      {renderAll()}
    </Base>
  );
}
