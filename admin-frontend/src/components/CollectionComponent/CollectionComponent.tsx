import { useEffect, useState } from 'react';
import * as Popover from '@radix-ui/react-popover';

import CoinsIcon from '../../assets/images/Coins_Icon.png';

import { AiOutlineDelete } from 'react-icons/ai';

import { api } from '../../services/api';

import { ICollectionComponent } from './types';

const CollectionComponent = ({
  id,
  image,
  name,
  rarity,
  price,
  functionRemove,
  type,
  crateType,
}: ICollectionComponent) => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  return (
    <Popover.Root onOpenChange={() => setPopoverOpen(!popoverOpen)}>
      <Popover.Trigger className="characterCollectionPopoverTrigger">
        <div
          className={`characterCollection  ${
            rarity === 0 ? 'common' : rarity === 1 ? 'unusual' : rarity === 2 ? 'rare' : 'legendary'
          } ${type === 'crate' && 'crateCollection'}`}
        >
          <img src={image} alt={name} />
          <p>{name}</p>
        </div>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content className="characterCollectionPopover">
          <Popover.Arrow className="characterCollectionPopoverArrow" />
          <div className="characterCollectionPopoverInformations">
            {type === 'crate' ? <h4>{crateType}</h4> : <h4>{name}</h4>}
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

          <div className="characterCollectionPopoverActions">
            <button className="characterCollectionPopoverAction" onClick={functionRemove}>
              <AiOutlineDelete className="icon" />
              <p>Remover</p>
            </button>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default CollectionComponent;
