import p from 'prop-types';

const SectionTitle = ({ title, secondPart }) => {
  return (
    <h3>
      {title} <span>{secondPart}</span>
    </h3>
  );
};

SectionTitle.propTypes = {
  title: p.string.isRequired,
  secondPart: p.string,
};

export default SectionTitle;
