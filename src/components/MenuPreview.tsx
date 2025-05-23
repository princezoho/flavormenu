import React, { useMemo } from 'react';
import styled from 'styled-components';
import { MenuData } from '../types';

// Constants for US Letter size at 300 DPI
const LETTER_WIDTH_INCHES = 8.5;
const LETTER_HEIGHT_INCHES = 11;
const DPI = 300;
const LETTER_WIDTH_PX = LETTER_WIDTH_INCHES * DPI;
const LETTER_HEIGHT_PX = LETTER_HEIGHT_INCHES * DPI;

const PreviewContainer = styled.div<{ font: string }>`
  width: ${LETTER_WIDTH_PX}px;
  height: ${LETTER_HEIGHT_PX}px;
  background: white;
  padding: 0.5in;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  font-family: ${props => props.font};
  font-weight: bold;
  position: relative;
  transform-origin: top left;
  transform: scale(0.25);
  overflow: hidden;
  margin-left: 0;
`;

const PreviewWrapper = styled.div`
  width: calc(100% + 350px);
  height: 0;
  padding-bottom: 129.4%;
  position: relative;
  overflow: hidden;
  margin-left: -175px;
`;

const ConfettiContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
`;

const Star = styled.div<{ size: number; color: string; top: number; left: number; rotation: number }>`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  top: ${props => props.top}%;
  left: ${props => props.left}%;
  color: ${props => props.color};
  transform: rotate(${props => props.rotation}deg);
  
  &:before {
    content: '*';
    font-size: ${props => props.size}px;
    position: absolute;
  }
`;

const Dot = styled.div<{ size: number; color: string; top: number; left: number }>`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background-color: ${props => props.color};
  border-radius: 50%;
  top: ${props => props.top}%;
  left: ${props => props.left}%;
`;

const Heart = styled.div<{ size: number; color: string; top: number; left: number; rotation: number }>`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  top: ${props => props.top}%;
  left: ${props => props.left}%;
  color: ${props => props.color};
  transform: rotate(${props => props.rotation}deg);
  
  &:before {
    content: '♥';
    font-size: ${props => props.size}px;
    position: absolute;
  }
`;

const ContentContainer = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const Logo = styled.img`
  height: 1.5in;
  max-width: 1.5in;
  width: auto;
  object-fit: contain;
  margin-right: 20px;
`;

const LogoPlaceholder = styled.div`
  width: 1.5in;
  height: 1.5in;
  margin-right: 20px;
  border: 2px dashed #aaa;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  font-weight: bold;
  color: #333;
  text-align: center;
  white-space: pre-line;
  box-sizing: border-box;
`;

const OfficeName = styled.h1<{ fontSize: number; font: string }>`
  font-size: ${props => props.fontSize}pt;
  font-family: ${props => props.font};
  margin: 0;
  color: black;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Title = styled.h2<{ fontSize: number; font: string }>`
  font-size: ${props => props.fontSize}pt;
  font-family: ${props => props.font};
  text-align: center;
  margin: 20px 0;
  color: black;
  font-weight: bold;
`;

const CategoryBanner = styled.div<{ color: string; styleType: string }>`
  margin: 20px 0;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;

  /* Classic */
  background: ${props => props.styleType === 'classic' ? props.color : 'transparent'};
  padding: ${props => props.styleType === 'underline' ? '0 10px 18px' : '15px 30px'};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${props => props.styleType === 'round' ? '40px' : '4px'};
  box-shadow: ${props => props.styleType === 'underline' ? 'none' : '0 2px 4px rgba(0,0,0,0.1)'};

  /* side rules only for classic */
  &:before,
  &:after {
    content: '';
    display: ${props => props.styleType === 'classic' ? 'block' : 'none'};
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 40px;
    height: 2px;
    background: ${props => props.color};
  }
  &:before { right: calc(100% + 15px); }
  &:after  { left: calc(100% + 15px); }

  /* Angled ribbon */
  ${props => props.styleType === 'angled' && `
    background: ${props.color};
    padding: 18px 40px;
    transform: translateX(-50%) skewX(-15deg);
    & > span { transform: skewX(15deg); }
    &:before, &:after {
      display: block;
      width: 0;
      height: 0;
      top: 0;
      transform: none;
      border-top: 100% solid transparent;
      border-bottom: 100% solid transparent;
    }
    &:before {
      right: 100%;
      border-right: 30px solid ${props.color};
    }
    &:after {
      left: 100%;
      border-left: 30px solid ${props.color};
    }
  `}

  /* Round pill already handled with border-radius and no side rules */

  /* Underline variant */
  ${props => props.styleType === 'underline' && `
    background: transparent;
    &:after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 8px;
      background: ${props.color};
    }
  `}
`;

const CategoryTitle = styled.h3<{ fontSize: number; font: string }>`
  font-size: ${props => props.fontSize}pt;
  font-family: ${props => props.font};
  text-align: center;
  margin: 0;
  color: white;
  text-transform: uppercase;
  font-weight: bold;
  padding: 0 20px;
`;

const FlavorGrid = styled.div<{ spacing: number }>`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  margin: 8px auto;
`;

const FlavorCard = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2px;
  box-sizing: border-box;
`;

const FlavorImage = styled.img<{ size: number; crossOrigin: string }>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  object-fit: contain;
  margin-bottom: 3px;
`;

const FlavorEmoji = styled.div<{ size: number }>`
  font-size: ${props => props.size * 0.035}em;
  margin-bottom: 3px;
`;

const FlavorName = styled.div<{ fontSize: number; font: string }>`
  font-size: ${props => props.fontSize}pt;
  font-family: ${props => props.font};
  color: black;
  margin-top: 4px;
  line-height: 1.1;
  text-align: center;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  padding: 0 4px;
`;

interface MenuPreviewProps {
  data: MenuData;
}

const Confetti: React.FC<{ config: MenuData['confetti'] }> = ({ config }) => {
  const confettiElements = useMemo(() => {
    if (!config.enabled) return [];

    const confetti = [];
    const count = Math.floor(config.density * 20);

    for (let i = 0; i < count; i++) {
      const props = {
        key: `confetti-${i}`,
        size: Math.random() * config.size + (config.size / 2),
        color: config.colors[Math.floor(Math.random() * config.colors.length)],
        top: Math.random() * 100,
        left: Math.random() * 100,
        rotation: Math.random() * 360
      };

      switch (config.shape) {
        case 'stars':
          confetti.push(<Star {...props} />);
          break;
        case 'dots':
          confetti.push(<Dot {...props} />);
          break;
        case 'hearts':
          confetti.push(<Heart {...props} />);
          break;
      }
    }
    return confetti;
  }, [config.enabled, config.density, config.size, config.shape, config.colors]);

  if (!config.enabled) return null;
  return <ConfettiContainer>{confettiElements}</ConfettiContainer>;
};

const MenuPreview = React.forwardRef<HTMLDivElement, MenuPreviewProps>(({ data }, ref) => {
  return (
    <PreviewContainer ref={ref} font={data.font}>
      <Confetti config={data.confetti} />
      <ContentContainer>
        <Header>
          {data.logo ? (
            <Logo src={URL.createObjectURL(data.logo)} alt="Office Logo" />
          ) : (
            <LogoPlaceholder>{`Your\nLogo\nHere`}</LogoPlaceholder>
          )}
          {data.officeName && (
            <OfficeName fontSize={data.fontSize.officeName} font={data.font}>
              {data.officeName}
            </OfficeName>
          )}
        </Header>

        <Title fontSize={data.fontSize.title} font={data.font}>
          {data.menuTitle}
        </Title>

        {data.categories.map((category, index) => (
          <div key={index}>
            <CategoryBanner color={index === 0 ? data.colors.prophyBanner : data.colors.varnishBanner} styleType={data.bannerStyle || 'classic'}>
              <CategoryTitle fontSize={data.fontSize.categoryTitle} font={data.font}>
                {category.name || `Category ${index + 1}`}
              </CategoryTitle>
            </CategoryBanner>

            {(() => {
              const rows = [] as JSX.Element[];
              for (let i = 0; i < category.flavors.length; i += 4) {
                const rowFlavors = category.flavors.slice(i, i + 4);
                const rowCount = rowFlavors.length;
                rows.push(
                  <FlavorGrid key={i} spacing={data.flavorSpacing}>
                    {rowFlavors.map((flavor, col) => {
                      const half = data.flavorSpacing / 2;
                      return (
                        <FlavorCard key={col} style={{ margin: `0 ${half}px` }}>
                          {flavor.image ? (
                            <FlavorImage
                              src={`/images/${flavor.image}`}
                              alt={flavor.name}
                              size={data.flavorImageSize}
                              crossOrigin="anonymous"
                            />
                          ) : (
                            <FlavorEmoji size={data.flavorImageSize}>{flavor.emoji}</FlavorEmoji>
                          )}
                          <FlavorName fontSize={data.fontSize.flavorName} font={data.font}>
                            {flavor.name}
                          </FlavorName>
                        </FlavorCard>
                      );
                    })}
                  </FlavorGrid>
                );
              }
              return rows;
            })()}
          </div>
        ))}
      </ContentContainer>
    </PreviewContainer>
  );
});

export default MenuPreview; 