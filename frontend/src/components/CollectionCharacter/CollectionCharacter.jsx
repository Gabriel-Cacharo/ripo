import { useEffect, useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import p from 'prop-types';

import CoinsIcon from '../../assets/images/Coins_Icon.png';

import { FaTwitch, FaInstagram } from 'react-icons/fa';

import { api } from '../../services/api';

const CollectionCharacter = ({ ripoId, ripoImage, ripoName, rarity, price, ripoPublic }) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [ripoOwnerInformations, setRipoOwnerInformations] = useState();

  const ripoOwnerInformationsFunction = async () => {
    const userInformations = await api(`/ripos/owner?ripoId=${ripoId}`);

    setRipoOwnerInformations(userInformations.data);
  };

  useEffect(() => {
    ripoOwnerInformationsFunction();
  }, [popoverOpen === true]);

  return (
    <Popover.Root onOpenChange={() => setPopoverOpen(!popoverOpen)}>
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

      {ripoPublic && (
        <Popover.Portal>
          <Popover.Content className="characterCollectionPopover">
            <Popover.Arrow className="characterCollectionPopoverArrow" />
            <div className="characterCollectionPopoverOwnerInformations">
              <h4>{ripoName}/</h4>
              <p>{ripoOwnerInformations && ripoOwnerInformations.username}</p>
            </div>
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
              <a
                href={ripoOwnerInformations && ripoOwnerInformations.twitch}
                className="characterCollectionPopoverNetwork"
              >
                <FaTwitch className="icon" />
                <p>Assistir</p>
              </a>
              <a
                href={ripoOwnerInformations && ripoOwnerInformations.instagram}
                className="characterCollectionPopoverNetwork"
              >
                <FaInstagram className="icon" />
                <p>Seguir</p>
              </a>
            </div>
          </Popover.Content>
        </Popover.Portal>
      )}
    </Popover.Root>
  );
};

CollectionCharacter.propTypes = {
  ripoId: p.number.isRequired,
  ripoImage: p.string.isRequired,
  ripoName: p.string.isRequired,
  rarity: p.number.isRequired,
  price: p.string.isRequired,
  ripoPublic: p.bool,
};

export default CollectionCharacter;
