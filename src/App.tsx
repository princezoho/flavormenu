import React, { useState } from 'react';
import styled from 'styled-components';
import LogoUploader from './components/LogoUploader';
import CategoryEditor from './components/CategoryEditor';
import MenuPreview from './components/MenuPreview';
import { MenuData, CategoryData } from './types';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const AppContainer = styled.div`
  margin: 0;
  padding: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.div`
  display: flex;
  height: calc(100vh - 80px); // Account for header
  overflow: hidden; // Prevent body scroll
`;

const EditorSide = styled.div`
  flex: 0 0 40%;
  padding: 20px;
  overflow-y: auto;
  height: 100%;
  background: #f5f5f5;
`;

const PreviewSide = styled.div`
  flex: 0 0 60%;
  padding: 20px;
  height: 100%;
  overflow-y: auto;
  background: #ddd;
  border-left: 1px solid #eee;
`;

const Header = styled.h1`
  padding: 20px;
  margin: 0;
  background: white;
  border-bottom: 1px solid #eee;
  height: 40px;
`;

const EditorContainer = styled.div`
  display: grid;
  grid-template-columns: minmax(500px, 0.8fr) 1.4fr;
  gap: 40px;
  margin-bottom: 20px;
  overflow: visible;
  align-items: start;
  position: relative;
`;

const EditorPanel = styled.div`
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  overflow-x: hidden;
`;

const PreviewPanel = styled(EditorPanel)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  height: calc(100vh - 100px);
  overflow: hidden;
  width: calc(100% + 200px);
  margin-right: -200px;
  position: sticky;
  top: 20px;
  align-self: start;
`;

const PreviewWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  padding-bottom: 20px;
`;

const PreviewScaler = styled.div`
  position: relative;
  width: 100%;
  height: fit-content;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`;

const PreviewContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const ControlsRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin: 20px 0;
`;

const ControlBox = styled.div`
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 8px;
  margin-bottom: 15px;
`;

const SettingsGroup = styled.div`
  margin-bottom: 20px;
`;

const SettingsTitle = styled.h3`
  margin-bottom: 15px;
  color: #333;
`;

const Settings = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-bottom: 15px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ColorControl = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 10px 0;

  label {
    min-width: 120px;
  }

  input[type="color"] {
    padding: 0;
    width: 50px;
    height: 30px;
  }
`;

const Button = styled.button`
  background-color: #55B6E7;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  display: block;
  width: fit-content;
  margin: 0 auto;
  transform: scale(1);
  transition: background-color 0.2s ease;
  position: relative;
  top: -80px;

  &:hover {
    background-color: #4499cc;
  }
`;

const FontSizeControls = styled.div`
  margin: 20px 0;
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 8px;
`;

const FontSizeControl = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
  gap: 10px;

  label {
    min-width: 120px;
  }

  input {
    width: 60px;
  }
`;

const ConfettiControls = styled.div`
  margin: 20px 0;
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 8px;
`;

const SliderControl = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 6px 0;

  label {
    min-width: 90px;
    font-size: 13px;
  }

  input[type="range"] {
    flex: 1;
    margin: 0;
  }

  input[type="checkbox"] {
    margin: 0;
  }

  span {
    min-width: 40px;
    text-align: right;
    font-size: 13px;
  }
`;

const ColorPalettes = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin: 10px 0;
`;

const ColorPalette = styled.button<{ colors: string[]; isSelected: boolean }>`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  height: 30px;
  border: 2px solid ${props => props.isSelected ? '#55B6E7' : '#ccc'};
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  padding: 0;
  background: none;

  ${props => props.colors.map((color, i) => `
    &:after:nth-child(${i + 1}) {
      content: '';
      background-color: ${color};
      width: 100%;
      height: 100%;
    }
  `).join('')}

  &:hover {
    border-color: #55B6E7;
  }
`;

const ColorStrip = styled.div<{ color: string }>`
  background-color: ${props => props.color};
  width: 100%;
  height: 100%;
`;

const ShapeSelector = styled.div`
  display: flex;
  gap: 10px;
  margin: 10px 0;
`;

const ShapeButton = styled.button<{ isSelected: boolean }>`
  padding: 8px 16px;
  border: 2px solid ${props => props.isSelected ? '#55B6E7' : '#ccc'};
  border-radius: 4px;
  background: white;
  cursor: pointer;
  flex: 1;

  &:hover {
    border-color: #55B6E7;
  }
`;

const FontSelect = styled.select`
  width: 100%;
  padding: 8px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
`;

const BannerControls = styled.div`
  margin-bottom: 20px;
`;

const PreviewHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;

  h2 {
    margin: 0;
  }
`;

const ActionButton = styled.button`
  background-color: #55B6E7;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  font-size: 17px;
  font-weight: 500;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #4499cc;
  }
`;

const App: React.FC = () => {
  const fontOptions = [
    { label: 'Cooper Black', value: 'Cooper Black' },
    { label: 'Futura Bold', value: 'Futura-Bold' },
    { label: 'Helvetica Black', value: 'Helvetica-Black' },
    { label: 'Paytone One', value: 'Paytone One' },
    { label: 'Fredoka One', value: 'Fredoka One' },
    { label: 'Chalkboard SE Bold', value: 'Chalkboard SE Bold' },
    { label: 'Lilita One', value: 'Lilita One' },
    { label: 'Luckiest Guy', value: 'Luckiest Guy' },
    { label: 'Bubblegum Sans', value: 'Bubblegum Sans' }
  ];

  const [menuData, setMenuData] = useState<MenuData>({
    officeName: 'Your Office Name',
    menuTitle: 'CHOOSE YOUR FLAVOR',
    categories: [
      { name: 'Prophy Paste', flavors: [] },
      { name: 'Fluoride Varnish', flavors: [] }
    ],
    fontSize: {
      officeName: 81,
      title: 71,
      categoryTitle: 88,
      flavorName: 38
    },
    colors: {
      prophyBanner: '#55B6E7',
      varnishBanner: '#7ECAE6'
    },
    confetti: {
      enabled: true,
      density: 2.3,
      size: 92,
      shape: 'stars',
      colors: ['#FFD54F', '#FF8A80', '#82B1FF']
    },
    font: 'Cooper Black',
    flavorImageSize: 400,
    flavorSpacing: -50
  });

  const colorPalettes = [
    ['#FFD54F', '#FF8A80', '#82B1FF'],
    ['#FF9AA2', '#FFB7B2', '#FFDAC1'],
    ['#E2F0CB', '#B5EAD7', '#C7CEEA'],
    ['#FF6B6B', '#4ECDC4', '#45B7D1'],
    ['#96CEB4', '#FFEEAD', '#FF6F69'],
    ['#588C7E', '#F2E394', '#F2AE72']
  ];

  const handleLogoChange = (file: File | undefined) => {
    setMenuData(prev => ({
      ...prev,
      logo: file
    }));
  };

  const handleOfficeNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMenuData(prev => ({
      ...prev,
      officeName: e.target.value
    }));
  };

  const handleMenuTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMenuData(prev => ({
      ...prev,
      menuTitle: e.target.value
    }));
  };

  const handleCategoryChange = (index: number, category: CategoryData) => {
    setMenuData(prev => ({
      ...prev,
      categories: prev.categories.map((c, i) => i === index ? category : c)
    }));
  };

  const handleFontSizeChange = (key: keyof MenuData['fontSize'], value: string) => {
    const size = parseInt(value);
    if (!isNaN(size) && size > 0) {
      setMenuData(prev => ({
        ...prev,
        fontSize: {
          ...prev.fontSize,
          [key]: size
        }
      }));
    }
  };

  const handleColorChange = (key: keyof MenuData['colors'], value: string) => {
    setMenuData(prev => ({
      ...prev,
      colors: {
        ...prev.colors,
        [key]: value
      }
    }));
  };

  const handleConfettiChange = (key: keyof MenuData['confetti'], value: any) => {
    setMenuData(prev => ({
      ...prev,
      confetti: {
        ...prev.confetti,
        [key]: value
      }
    }));
  };

  const handleFontChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMenuData(prev => ({
      ...prev,
      font: e.target.value
    }));
  };

  const handleFlavorImageSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const size = parseInt(e.target.value);
    if (!isNaN(size) && size > 0) {
      setMenuData(prev => ({
        ...prev,
        flavorImageSize: size
      }));
    }
  };

  const handleFlavorSpacingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const spacing = parseInt(e.target.value);
    setMenuData(prev => ({
      ...prev,
      flavorSpacing: spacing
    }));
  };

  const renderColorPalette = (colors: string[], isSelected: boolean) => (
    <ColorPalette
      type="button"
      colors={colors}
      isSelected={isSelected}
      onClick={() => handleConfettiChange('colors', colors)}
    >
      {colors.map((color, i) => (
        <ColorStrip key={i} color={color} />
      ))}
    </ColorPalette>
  );

  const previewRef = React.useRef<HTMLDivElement>(null);

  const generatePDF = async () => {
    if (!previewRef.current) return;
    const LETTER_WIDTH_INCHES = 8.5;
    const LETTER_HEIGHT_INCHES = 11;
    const DPI = 300;
    const LETTER_WIDTH_PX = LETTER_WIDTH_INCHES * DPI;
    const LETTER_HEIGHT_PX = LETTER_HEIGHT_INCHES * DPI;
    const element = previewRef.current;
    const originalTransform = element.style.transform;
    element.style.transform = 'none';
    const canvas = await html2canvas(element, {
      scale: 1,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: LETTER_WIDTH_PX,
      height: LETTER_HEIGHT_PX,
    });
    element.style.transform = originalTransform;
    const image = canvas.toDataURL('image/png');
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'in', format: 'letter' });
    pdf.addImage(image, 'PNG', 0, 0, LETTER_WIDTH_INCHES, LETTER_HEIGHT_INCHES);
    pdf.save('menu.pdf');
  };

  return (
    <AppContainer>
      <Header>Wonderful Dental Menu Maker</Header>
      <MainContent>
        <EditorSide>
          <h2>Menu Editor</h2>
          <ControlBox>
            <SettingsTitle>Basic Settings</SettingsTitle>
            <LogoUploader
              onLogoChange={handleLogoChange}
              currentLogo={menuData.logo ? URL.createObjectURL(menuData.logo) : undefined}
            />
            <Input
              type="text"
              value={menuData.officeName}
              onChange={handleOfficeNameChange}
              placeholder="Your Office Name"
            />
            <Input
              type="text"
              value={menuData.menuTitle}
              onChange={handleMenuTitleChange}
              placeholder="Menu Title"
            />
            <FontSelect 
              value={menuData.font} 
              onChange={handleFontChange}
              style={{ fontFamily: menuData.font }}
            >
              {fontOptions.map(font => (
                <option 
                  key={font.value} 
                  value={font.value}
                  style={{ fontFamily: font.value }}
                >
                  {font.label}
                </option>
              ))}
            </FontSelect>
          </ControlBox>

          <ControlBox>
            <SettingsTitle>Sizes & Colors</SettingsTitle>
            <Settings>
              <FontSizeControl>
                <label>Office Name:</label>
                <input
                  type="number"
                  value={menuData.fontSize.officeName}
                  onChange={(e) => handleFontSizeChange('officeName', e.target.value)}
                  min="1"
                />
                <span>pt</span>
              </FontSizeControl>
              
              <FontSizeControl>
                <label>Title:</label>
                <input
                  type="number"
                  value={menuData.fontSize.title}
                  onChange={(e) => handleFontSizeChange('title', e.target.value)}
                  min="1"
                />
                <span>pt</span>
              </FontSizeControl>

              <FontSizeControl>
                <label>Banner Text:</label>
                <input
                  type="number"
                  value={menuData.fontSize.categoryTitle}
                  onChange={(e) => handleFontSizeChange('categoryTitle', e.target.value)}
                  min="1"
                />
                <span>pt</span>
              </FontSizeControl>

              <FontSizeControl>
                <label>Flavor Names:</label>
                <input
                  type="number"
                  value={menuData.fontSize.flavorName}
                  onChange={(e) => handleFontSizeChange('flavorName', e.target.value)}
                  min="1"
                />
                <span>pt</span>
              </FontSizeControl>

              <FontSizeControl>
                <label>Flavor Images:</label>
                <input
                  type="number"
                  value={menuData.flavorImageSize}
                  onChange={handleFlavorImageSizeChange}
                  min="100"
                  max="400"
                />
                <span>px</span>
              </FontSizeControl>

              <FontSizeControl>
                <label>Flavor Spacing:</label>
                <input
                  type="range"
                  min="-200"
                  max="200"
                  value={menuData.flavorSpacing}
                  onChange={handleFlavorSpacingChange}
                />
                <span>{menuData.flavorSpacing}px</span>
              </FontSizeControl>

              <BannerControls>
                <ColorControl>
                  <label>Banner 1:</label>
                  <input
                    type="color"
                    value={menuData.colors.prophyBanner}
                    onChange={(e) => handleColorChange('prophyBanner', e.target.value)}
                  />
                </ColorControl>

                <ColorControl>
                  <label>Banner 2:</label>
                  <input
                    type="color"
                    value={menuData.colors.varnishBanner}
                    onChange={(e) => handleColorChange('varnishBanner', e.target.value)}
                  />
                </ColorControl>
              </BannerControls>
            </Settings>
          </ControlBox>

          <ControlBox>
            <SettingsTitle>Background Decoration</SettingsTitle>
            <SliderControl>
              <label>Enable:</label>
              <input
                type="checkbox"
                checked={menuData.confetti.enabled}
                onChange={(e) => handleConfettiChange('enabled', e.target.checked)}
              />
            </SliderControl>
            
            {menuData.confetti.enabled && (
              <>
                <Settings>
                  <SliderControl>
                    <label>Density:</label>
                    <input
                      type="range"
                      min="0.5"
                      max="3"
                      step="0.1"
                      value={menuData.confetti.density}
                      onChange={(e) => handleConfettiChange('density', parseFloat(e.target.value))}
                    />
                    <span>{menuData.confetti.density.toFixed(1)}x</span>
                  </SliderControl>

                  <SliderControl>
                    <label>Size:</label>
                    <input
                      type="range"
                      min="10"
                      max="200"
                      value={menuData.confetti.size}
                      onChange={(e) => handleConfettiChange('size', parseInt(e.target.value))}
                    />
                    <span>{menuData.confetti.size}px</span>
                  </SliderControl>
                </Settings>

                <div>
                  <label>Shape:</label>
                  <ShapeSelector>
                    <ShapeButton
                      isSelected={menuData.confetti.shape === 'stars'}
                      onClick={() => handleConfettiChange('shape', 'stars')}
                    >
                      Stars
                    </ShapeButton>
                    <ShapeButton
                      isSelected={menuData.confetti.shape === 'dots'}
                      onClick={() => handleConfettiChange('shape', 'dots')}
                    >
                      Dots
                    </ShapeButton>
                    <ShapeButton
                      isSelected={menuData.confetti.shape === 'hearts'}
                      onClick={() => handleConfettiChange('shape', 'hearts')}
                    >
                      Hearts
                    </ShapeButton>
                  </ShapeSelector>
                </div>

                <div>
                  <label>Color Palette:</label>
                  <ColorPalettes>
                    {colorPalettes.map((palette, index) => 
                      renderColorPalette(
                        palette,
                        JSON.stringify(palette) === JSON.stringify(menuData.confetti.colors)
                      )
                    )}
                  </ColorPalettes>
                </div>
              </>
            )}
          </ControlBox>

          <h3>Categories</h3>
          {menuData.categories.map((category, index) => (
            <CategoryEditor
              key={index}
              category={category}
              onChange={(category) => handleCategoryChange(index, category)}
              index={index}
            />
          ))}
        </EditorSide>

        <PreviewSide>
          <PreviewHeader>
            <h2>Live Preview</h2>
            <ActionButton onClick={generatePDF}>
              Generate PDF
            </ActionButton>
          </PreviewHeader>
          <PreviewWrapper>
            <PreviewScaler>
              <PreviewContainer>
                <MenuPreview data={menuData} ref={previewRef} />
              </PreviewContainer>
            </PreviewScaler>
          </PreviewWrapper>
        </PreviewSide>
      </MainContent>
    </AppContainer>
  );
};

export default App; 
