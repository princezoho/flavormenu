import React from 'react';
import { Document, Page, Text, View, Image, StyleSheet, PDFViewer, Svg, Path } from '@react-pdf/renderer';
import { MenuData } from '../types';

const PROPHY_PATH = "M0,50 L5,35 L0,20 L15,25 L25,10 L35,25 L50,15 L65,25 L75,10 L85,25 L100,20 L95,35 L100,50 L95,65 L100,80 L85,75 L75,90 L65,75 L50,85 L35,75 L25,90 L15,75 L0,80 L5,65 Z";
const VARNISH_PATH = "M0,50 L10,30 L0,10 L20,20 L35,0 L50,20 L65,0 L80,20 L100,10 L90,30 L100,50 L90,70 L100,90 L80,80 L65,100 L50,80 L35,100 L20,80 L0,90 L10,70 Z";

const createStyles = (data: MenuData) => StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: '0.5in',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: '1in',
    height: '1in',
    marginRight: 20,
  },
  officeName: {
    fontSize: data.fontSize.officeName,
    fontFamily: 'Helvetica-Bold',
  },
  title: {
    fontSize: data.fontSize.title,
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'Helvetica-Bold',
  },
  categoryBanner: {
    width: '70%',
    height: 60,
    position: 'relative',
    marginVertical: 20,
    alignSelf: 'center',
  },
  categoryTitle: {
    fontSize: data.fontSize.categoryTitle,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Helvetica-Bold',
    position: 'absolute',
    left: 0,
    right: 0,
    top: '50%',
    marginTop: -(data.fontSize.categoryTitle / 2),
    padding: '0 20px',
  },
  flavorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  flavorCard: {
    width: '23%',
    alignItems: 'center',
    marginBottom: 20,
  },
  flavorImage: {
    width: 80,
    height: 80,
    objectFit: 'contain',
    marginBottom: 10,
  },
  flavorEmoji: {
    fontSize: 40,
    marginBottom: 10,
  },
  flavorName: {
    fontSize: data.fontSize.flavorName,
    textAlign: 'center',
    fontFamily: 'Helvetica',
  },
});

interface PDFGeneratorProps {
  data: MenuData;
}

const PDFGenerator: React.FC<PDFGeneratorProps> = ({ data }) => {
  const styles = createStyles(data);

  return (
    <PDFViewer style={{ width: '100%', height: '800px' }}>
      <Document>
        <Page size="LETTER" style={styles.page}>
          <View style={styles.header}>
            <Image
              style={styles.logo}
              src={data.logo ? URL.createObjectURL(data.logo) : '/temp logo/wonderful_cone.png'}
            />
            {data.officeName && (
              <Text style={styles.officeName}>{data.officeName}</Text>
            )}
          </View>

          <Text style={styles.title}>PICK YOUR FLAVOR</Text>

          {data.categories.map((category, index) => (
            <View key={index}>
              <View style={styles.categoryBanner}>
                <Svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
                  <Path
                    d={index === 0 ? PROPHY_PATH : VARNISH_PATH}
                    fill={index === 0 ? data.colors.prophyBanner : data.colors.varnishBanner}
                  />
                </Svg>
                <Text style={styles.categoryTitle}>
                  {category.name || `Category ${index + 1}`}
                </Text>
              </View>

              <View style={styles.flavorGrid}>
                {category.flavors.map((flavor, flavorIndex) => (
                  <View key={flavorIndex} style={styles.flavorCard}>
                    {flavor.image ? (
                      <Image
                        style={styles.flavorImage}
                        src={`/images/${flavor.image}`}
                      />
                    ) : (
                      <Text style={styles.flavorEmoji}>{flavor.emoji}</Text>
                    )}
                    <Text style={styles.flavorName}>{flavor.name}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default PDFGenerator; 