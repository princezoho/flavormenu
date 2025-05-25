import React from 'react';
import styled from 'styled-components';
import { CategoryData, FlavorOption, WONDERFUL_FLAVORS, EMOJI_FLAVORS } from '../types';

const CategoryContainer = styled.div`
  margin: 12px 0;
  padding: 12px;
  border-radius: 8px;
  min-width: 0;
  overflow: hidden;

  :last-child {
    margin-bottom: 0;
  }

  h4 {
    font-family: 'Helvetica Now', sans-serif;
    font-weight: bold;
    margin: 15px 0 10px;
  }
`;

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  gap: 8px;
`;

const Input = styled.input`
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 8px;
  width: 200px;
`;

const WonderfulFlavorsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
  margin: 8px 0;
  width: 100%;
`;

const WonderfulFlavorCard = styled.div<{ selected?: boolean }>`
  aspect-ratio: 1;
  padding: 6px;
  border: 2px solid ${props => props.selected ? '#55B6E7' : '#ccc'};
  border-radius: 6px;
  text-align: center;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-width: 0;
  
  &:hover {
    border-color: #55B6E7;
  }
`;

const WonderfulFlavorImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 70%;
  object-fit: contain;
  margin-bottom: 5px;
`;

const FlavorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  margin: 8px 0;
  width: 100%;
`;

const FlavorCard = styled.div<{ selected?: boolean }>`
  padding: 6px;
  border: 2px solid ${props => props.selected ? '#55B6E7' : '#ccc'};
  border-radius: 6px;
  text-align: center;
  cursor: pointer;
  font-size: 0.9em;
  min-width: 0;
  
  &:hover {
    border-color: #55B6E7;
  }
`;

const FlavorImage = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
  margin-bottom: 5px;
`;

const EmojiContainer = styled.div`
  font-size: 1.8em;
  margin-bottom: 5px;
`;

const FlavorName = styled.div`
  font-size: 0.8em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  text-align: center;
  padding: 0 2px;
`;

const FlavorSelector = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;

const Select = styled.select`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  flex: 1;
`;

const Button = styled.button`
  cursor: pointer;
  position: relative;
  text-transform: uppercase;
  margin-left: 0;
  margin-right: 0;
  padding: 10px 1rem;
  font-size: 14px;
  background-color: #00cbff;
  color: #000;
  border: 3px solid black;
  border-radius: 100px;
  text-decoration: none;
  overflow: visible;
  font-family: 'LEMON MILK Medium', 'LEMON MILK', sans-serif;
  width: max-content;
  font-weight: 400;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover,
  &:focus-visible {
    background: #caf0ff;
    transform: scale(1.1);
  }
`;

interface CategoryEditorProps {
  category: CategoryData;
  onChange: (category: CategoryData) => void;
  index: number;
}

const CategoryEditor: React.FC<CategoryEditorProps> = ({ category, onChange, index }) => {
  const [selectedFlavorIndex, setSelectedFlavorIndex] = React.useState<number>(-1);
  const [selectedEmoji, setSelectedEmoji] = React.useState<string>('');

  const categoryType = index === 0 ? 'prophy' : 'varnish';
  const availableFlavors = WONDERFUL_FLAVORS.filter(f => f.category === categoryType);
  const additionalFlavors = EMOJI_FLAVORS.filter(f => f.category === categoryType);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...category,
      name: e.target.value
    });
  };

  const handleFlavorSelect = (flavor: FlavorOption) => {
    const newFlavors = [...category.flavors];
    if (selectedFlavorIndex === -1) {
      if (newFlavors.length < 8) {
        newFlavors.push(flavor);
      }
    } else {
      newFlavors[selectedFlavorIndex] = flavor;
      setSelectedFlavorIndex(-1);
    }
    onChange({
      ...category,
      flavors: newFlavors
    });
    setSelectedEmoji('');
  };

  const handleAddFlavor = () => {
    if (!selectedEmoji) return;
    const flavor = additionalFlavors.find(f => f.emoji === selectedEmoji);
    if (flavor) {
      handleFlavorSelect(flavor);
    }
  };

  const handleRemoveFlavor = (index: number) => {
    const newFlavors = [...category.flavors];
    newFlavors.splice(index, 1);
    onChange({
      ...category,
      flavors: newFlavors
    });
  };

  return (
    <CategoryContainer>
      <CategoryHeader>
        <span style={{ fontWeight: 600, marginRight: 8 }}>Category #{index + 1}</span>
        <Input
          type="text"
          value={category.name}
          onChange={handleNameChange}
          placeholder={`Category ${index + 1} Name`}
        />
      </CategoryHeader>

      <h4>Wonderful Dental Flavors:</h4>
      <WonderfulFlavorsGrid>
        {availableFlavors.map((flavor) => (
          <WonderfulFlavorCard
            key={flavor.name}
            onClick={() => handleFlavorSelect(flavor)}
          >
            <WonderfulFlavorImage 
              src={`/images/${flavor.image}`}
              alt={flavor.name}
            />
            <FlavorName>{flavor.name}</FlavorName>
          </WonderfulFlavorCard>
        ))}
      </WonderfulFlavorsGrid>

      <h4>Additional Flavors:</h4>
      <FlavorSelector>
        <Select 
          value={selectedEmoji}
          onChange={(e) => setSelectedEmoji(e.target.value)}
        >
          <option value="">Select additional flavor...</option>
          {additionalFlavors.map((flavor) => (
            <option key={flavor.name} value={flavor.emoji}>
              {flavor.emoji} {flavor.name}
            </option>
          ))}
        </Select>
        <Button onClick={handleAddFlavor}>Add Flavor</Button>
      </FlavorSelector>

      <h4>Selected Flavors ({category.flavors.length}/8):</h4>
      <FlavorGrid>
        {category.flavors.map((flavor, idx) => (
          <FlavorCard 
            key={idx}
            onClick={() => handleRemoveFlavor(idx)}
          >
            {flavor.image ? (
              <FlavorImage 
                src={`/images/${flavor.image}`}
                alt={flavor.name}
              />
            ) : (
              <EmojiContainer>{flavor.emoji}</EmojiContainer>
            )}
            <FlavorName>{flavor.name}</FlavorName>
          </FlavorCard>
        ))}
        {Array(8 - category.flavors.length).fill(null).map((_, idx) => (
          <FlavorCard key={`empty-${idx}`}>
            <div>Empty Slot</div>
          </FlavorCard>
        ))}
      </FlavorGrid>
    </CategoryContainer>
  );
};

export default CategoryEditor; 