import * as Popover from '@radix-ui/react-popover';
import p from 'prop-types';

import CoinsIcon from '../../assets/images/Coins_Icon.png';

import { FaTwitch, FaInstagram } from 'react-icons/fa';

const CollectionCharacter = ({ ripoImage, ripoName, rarity, price }) => {
  return (
    <Popover.Root>
      <Popover.Trigger className="characterCollectionPopoverTrigger">
        <div
          className={`characterCollection ${
            rarity === 0 ? 'common' : rarity === 1 ? 'unusual' : rarity === 2 ? 'rare' : 'legendary'
          }`}
        >
          <img src={ripoImage} alt={ripoName} />
          <p>{ripoName}</p>
        </div>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content className="characterCollectionPopover">
          <Popover.Arrow className="characterCollectionPopoverArrow" />
          <h4>{ripoName}</h4>
          <div className="characterCollectionPopoverSubtitles">
            <div className="characterCollectionPopoverSubtitle">
              <p>{rarity === 0 ? 'Comum' : rarity === 1 ? 'Incomum' : rarity === 2 ? 'Raro' : 'Lendário'}</p>
            </div>
            <div className="characterCollectionPopoverSubtitle">
              <img src={CoinsIcon} alt="Coins Icon" className="icon" />
              <p>{price}</p>
            </div>
          </div>

          <div className="characterCollectionPopoverNetworks">
            <div className="characterCollectionPopoverNetwork">
              <FaTwitch className="icon" />
              <p>Assistir</p>
            </div>
            <div className="characterCollectionPopoverNetwork">
              <FaInstagram className="icon" />
              <p>Seguir</p>
            </div>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

CollectionCharacter.propTypes = {
  ripoImage: p.string.isRequired,
  ripoName: p.string.isRequired,
  rarity: p.string.isRequired,
  price: p.string.isRequired,
};

export default CollectionCharacter;
