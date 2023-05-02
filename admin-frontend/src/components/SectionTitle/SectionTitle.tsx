import p from 'prop-types';

interface ISectionTitle {
  title: string;
  secondPart?: string;
}

const SectionTitle = ({ title, secondPart }: ISectionTitle) => {
  return (
    <h3 className="sectionTitle">
      {title} <span>{secondPart}</span>
    </h3>
  );
};

export default SectionTitle;
