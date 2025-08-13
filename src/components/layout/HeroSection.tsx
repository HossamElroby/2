import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Search, TrendingUp, Shield, Clock, Star, Users, Award } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/Button';

const HeroContainer = styled.section`
  background: linear-gradient(135deg, 
    ${props => props.theme.colors.primary[600]} 0%, 
    ${props => props.theme.colors.secondary[600]} 50%,
    ${props => props.theme.colors.primary[700]} 100%);
  color: white;
  padding: ${props => props.theme.spacing['4xl']} ${props => props.theme.spacing.lg};
  text-align: center;
  position: relative;
  overflow: hidden;
  min-height: 70vh;
  display: flex;
  align-items: center;
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  width: 100%;
`;

const HeroTitle = styled(motion.h1)`
  font-size: ${props => props.theme.typography.fontSize['5xl']};
  font-weight: ${props => props.theme.typography.fontWeight.extrabold};
  margin-bottom: ${props => props.theme.spacing.xl};
  line-height: 1.1;
  background: linear-gradient(135deg, #ffffff 0%, #e0f2fe 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: ${props => props.theme.typography.fontSize['3xl']};
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: ${props => props.theme.typography.fontSize.xl};
  opacity: 0.95;
  margin-bottom: ${props => props.theme.spacing['2xl']};
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: ${props => props.theme.typography.fontSize.lg};
  }
`;

const HeroActions = styled(motion.div)`
  display: flex;
  gap: ${props => props.theme.spacing.lg};
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: ${props => props.theme.spacing['3xl']};
`;

const StatsContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${props => props.theme.spacing.xl};
  margin-top: ${props => props.theme.spacing['3xl']};
  padding-top: ${props => props.theme.spacing.xl};
  border-top: 1px solid rgba(255, 255, 255, 0.2);
`;

const StatItem = styled(motion.div)`
  text-align: center;
  padding: ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.xl};
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.15);
    box-shadow: ${props => props.theme.shadows['2xl']};
  }
`;

const StatIcon = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${props => props.theme.spacing.base};
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

const StatNumber = styled.div`
  font-size: ${props => props.theme.typography.fontSize['3xl']};
  font-weight: ${props => props.theme.typography.fontWeight.extrabold};
  margin-bottom: ${props => props.theme.spacing.sm};
  background: linear-gradient(135deg, #ffffff 0%, #e0f2fe 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const StatLabel = styled.div`
  font-size: ${props => props.theme.typography.fontSize.base};
  opacity: 0.9;
  font-weight: ${props => props.theme.typography.fontWeight.medium};
`;

const BackgroundPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.1;
  background-image: 
    radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.3) 2px, transparent 2px),
    radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.2) 1px, transparent 1px);
  background-size: 60px 60px;
  background-position: 0 0, 30px 30px;
`;

const FloatingElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  pointer-events: none;
`;

const FloatingShape = styled(motion.div)<{ size: number; top: string; left: string; delay: number }>`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
  top: ${props => props.top};
  left: ${props => props.left};
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const GlowButton = styled(Button)`
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }
  
  &:hover::before {
    left: 100%;
  }
`;

export const HeroSection: React.FC = () => {
  const { state } = useApp();

  const floatingShapes = [
    { size: 80, top: '10%', left: '10%', delay: 0 },
    { size: 60, top: '20%', left: '85%', delay: 1 },
    { size: 100, top: '70%', left: '5%', delay: 2 },
    { size: 40, top: '80%', left: '90%', delay: 3 },
    { size: 70, top: '40%', left: '95%', delay: 4 },
  ];

  return (
    <HeroContainer>
      <BackgroundPattern />
      <FloatingElements>
        {floatingShapes.map((shape, index) => (
          <FloatingShape
            key={index}
            size={shape.size}
            top={shape.top}
            left={shape.left}
            delay={shape.delay}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 8 + shape.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </FloatingElements>
      
      <HeroContent>
        <HeroTitle
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {state.language === 'ar' 
            ? 'اكتشف عالماً من الفرص في السوق المفتوح'
            : 'Discover a World of Opportunities in the Open Market'
          }
        </HeroTitle>
        
        <HeroSubtitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          {state.language === 'ar'
            ? 'منصة التجارة الإلكترونية الأكثر تطوراً في الشرق الأوسط - حيث تلتقي الجودة بالثقة والابتكار'
            : 'The most advanced e-commerce platform in the Middle East - where quality meets trust and innovation'
          }
        </HeroSubtitle>

        <HeroActions
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
        >
          <GlowButton 
            variant="secondary" 
            size="lg"
            leftIcon={<Search size={24} />}
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)',
              color: '#0369a1',
              border: 'none',
              boxShadow: '0 10px 30px rgba(255, 255, 255, 0.3)',
            }}
          >
            {state.language === 'ar' ? 'ابدأ التسوق الآن' : 'Start Shopping Now'}
          </GlowButton>
          <GlowButton 
            variant="outline" 
            size="lg"
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.1)', 
              border: '2px solid rgba(255, 255, 255, 0.3)',
              backdropFilter: 'blur(10px)',
              color: 'white'
            }}
          >
            {state.language === 'ar' ? 'أضف إعلانك المجاني' : 'Post Your Free Ad'}
          </GlowButton>
        </HeroActions>

        <StatsContainer
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
        >
          <StatItem
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <StatIcon>
              <TrendingUp size={28} />
            </StatIcon>
            <StatNumber>2.5M+</StatNumber>
            <StatLabel>
              {state.language === 'ar' ? 'إعلان نشط' : 'Active Listings'}
            </StatLabel>
          </StatItem>
          
          <StatItem
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <StatIcon>
              <Users size={28} />
            </StatIcon>
            <StatNumber>1.8M+</StatNumber>
            <StatLabel>
              {state.language === 'ar' ? 'مستخدم نشط' : 'Active Users'}
            </StatLabel>
          </StatItem>
          
          <StatItem
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <StatIcon>
              <Shield size={28} />
            </StatIcon>
            <StatNumber>99.9%</StatNumber>
            <StatLabel>
              {state.language === 'ar' ? 'معاملات آمنة' : 'Safe Transactions'}
            </StatLabel>
          </StatItem>
          
          <StatItem
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <StatIcon>
              <Award size={28} />
            </StatIcon>
            <StatNumber>4.9★</StatNumber>
            <StatLabel>
              {state.language === 'ar' ? 'تقييم المستخدمين' : 'User Rating'}
            </StatLabel>
          </StatItem>
        </StatsContainer>
      </HeroContent>
    </HeroContainer>
  );
};