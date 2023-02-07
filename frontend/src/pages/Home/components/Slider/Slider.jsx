import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

import { image1, image2, image3, slideProperties } from './SliderImages';

function Slider() {
  return (
    <Slide {...slideProperties}>
      <div className="imageSlide">
        <div>
          <img src={image1} alt="character1" />
        </div>
      </div>

      <div className="imageSlide">
        <div>
          <img src={image2} alt="character2" />
        </div>
      </div>

      <div className="imageSlide">
        <div>
          <img src={image3} alt="character3" />
        </div>
      </div>
    </Slide>
  );
}

export default Slider;
