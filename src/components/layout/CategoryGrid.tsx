import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { Card } from '../ui/Card';

const GridContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing['3xl']} ${props => props.theme.spacing.lg};
  background: linear-gradient(135deg, #fafafa 0%, #ffffff 100%);
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing['3xl']};
`;

const SectionTitle = styled.h2`
  font-size: ${props => props.theme.typography.fontSize['4xl']};
  font-weight: ${props => props.theme.typography.fontWeight.extrabold};
  color: ${props => props.theme.colors.neutral[900]};
  margin-bottom: ${props => props.theme.spacing.base};
  background: linear-gradient(135deg, ${props => props.theme.colors.primary[600]} 0%, ${props => props.theme.colors.secondary[600]} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const SectionSubtitle = styled.p`
  font-size: ${props => props.theme.typography.fontSize.lg};
  color: ${props => props.theme.colors.neutral[600]};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${props => props.theme.spacing.xl};

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${props => props.theme.spacing.lg};
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const CategoryCard = styled(Card)`
  text-align: center;
  padding: ${props => props.theme.spacing['2xl']};
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border: 1px solid ${props => props.theme.colors.neutral[200]};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, ${props => props.theme.colors.primary[50]} 0%, ${props => props.theme.colors.secondary[50]} 100%);
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: ${props => props.theme.shadows['2xl']};
    border-color: ${props => props.theme.colors.primary[300]};

    &::before {
      opacity: 1;
    }
  }
`;

const CategoryIconContainer = styled.div`
  position: relative;
  z-index: 2;
  width: 80px;
  height: 80px;
  margin: 0 auto ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.xl};
  background: linear-gradient(135deg, ${props => props.theme.colors.primary[100]} 0%, ${props => props.theme.colors.secondary[100]} 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s ease;
  border: 2px solid ${props => props.theme.colors.primary[200]};

  ${CategoryCard}:hover & {
    background: linear-gradient(135deg, ${props => props.theme.colors.primary[200]} 0%, ${props => props.theme.colors.secondary[200]} 100%);
    border-color: ${props => props.theme.colors.primary[400]};
    transform: scale(1.1) rotate(5deg);
  }
`;

const CategoryIcon = styled.div`
  font-size: 2.5rem;
  filter: grayscale(0.2);
  transition: filter 0.4s ease;

  ${CategoryCard}:hover & {
    filter: grayscale(0);
  }
`;

const CategoryContent = styled.div`
  position: relative;
  z-index: 2;
`;

const CategoryName = styled.h3`
  font-size: ${props => props.theme.typography.fontSize.xl};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.neutral[900]};
  margin-bottom: ${props => props.theme.spacing.sm};
  transition: color 0.3s ease;

  ${CategoryCard}:hover & {
    color: ${props => props.theme.colors.primary[700]};
  }
`;

const CategoryCount = styled.p`
  font-size: ${props => props.theme.typography.fontSize.base};
  color: ${props => props.theme.colors.neutral[600]};
  margin: 0;
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  transition: color 0.3s ease;

  ${CategoryCard}:hover & {
    color: ${props => props.theme.colors.primary[600]};
  }
`;

const CategoryBadge = styled.div`
  position: absolute;
  top: ${props => props.theme.spacing.base};
  right: ${props => props.theme.spacing.base};
  background: linear-gradient(135deg, ${props => props.theme.colors.accent[500]} 0%, ${props => props.theme.colors.accent[600]} 100%);
  color: white;
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: ${props => props.theme.typography.fontSize.xs};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  z-index: 3;
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.3s ease;

  ${CategoryCard}:hover & {
    opacity: 1;
    transform: scale(1);
  }
`;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

export const CategoryGrid: React.FC = () => {
  const { state } = useApp();

  const handleCategoryClick = (categoryId: string) => {
    console.log(`Navigate to category: ${categoryId}`);
  };

  const getFeaturedCategories = () => {
    return state.categories.slice(0, 16);
  };

  return (
    <GridContainer>
      <SectionHeader>
        <SectionTitle>
          {state.language === 'ar' ? 'استكشف الفئات المميزة' : 'Explore Featured Categories'}
        </SectionTitle>
        <SectionSubtitle>
          {state.language === 'ar'
            ? 'اكتشف مجموعة واسعة من المنتجات والخدمات المصنفة بعناية لتسهيل عملية البحث'
            : 'Discover a wide range of products and services carefully categorized to make your search easier'
          }
        </SectionSubtitle>
      </SectionHeader>
      
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
      >
        <Grid>
          {getFeaturedCategories().map((category, index) => (
            <motion.div key={category.id} variants={item}>
              <CategoryCard 
                padding="none"
                shadow="base"
                onClick={() => handleCategoryClick(category.id)}
              >
                <CategoryBadge>HOT</CategoryBadge>
                <CategoryIconContainer>
                  <CategoryIcon>{category.icon}</CategoryIcon>
                </CategoryIconContainer>
                <CategoryContent>
                  <CategoryName>
                    {state.language === 'ar' ? category.nameAr : category.name}
                  </CategoryName>
                  <CategoryCount>
                    {category.count.toLocaleString()} {state.language === 'ar' ? 'إعلان' : 'items'}
                  </CategoryCount>
                </CategoryContent>
              </CategoryCard>
            </motion.div>
          ))}
        </Grid>
      </motion.div>
    </GridContainer>
  );
};