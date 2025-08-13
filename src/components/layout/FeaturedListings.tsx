import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Eye, Heart, MapPin, Star, Verified } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { mockListings } from '../../data/mockData';
import { Card } from '../ui/Card';

const SectionContainer = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing['3xl']} ${props => props.theme.spacing.lg};
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing['2xl']};
`;

const SectionTitle = styled.h2`
  font-size: ${props => props.theme.typography.fontSize['3xl']};
  font-weight: ${props => props.theme.typography.fontWeight.extrabold};
  background: linear-gradient(135deg, ${props => props.theme.colors.primary[600]} 0%, ${props => props.theme.colors.secondary[600]} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const ViewAllButton = styled.button`
  color: ${props => props.theme.colors.primary[600]};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  background: linear-gradient(135deg, ${props => props.theme.colors.primary[50]} 0%, ${props => props.theme.colors.secondary[50]} 100%);
  border: 2px solid ${props => props.theme.colors.primary[200]};
  padding: ${props => props.theme.spacing.base} ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.xl};
  cursor: pointer;
  font-size: ${props => props.theme.typography.fontSize.base};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent);
    transition: left 0.5s;
  }

  &:hover {
    color: ${props => props.theme.colors.primary[700]};
    border-color: ${props => props.theme.colors.primary[400]};
    background: linear-gradient(135deg, ${props => props.theme.colors.primary[100]} 0%, ${props => props.theme.colors.secondary[100]} 100%);
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.lg};

    &::before {
      left: 100%;
    }
  }
`;

const ListingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: ${props => props.theme.spacing.xl};

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: ${props => props.theme.spacing.lg};
  }
`;

const ListingCard = styled(Card)`
  overflow: hidden;
  position: relative;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background: linear-gradient(135deg, #ffffff 0%, #fafafa 100%);
  border: 1px solid ${props => props.theme.colors.neutral[200]};

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: ${props => props.theme.shadows['2xl']};
    border-color: ${props => props.theme.colors.primary[300]};
  }
`;

const ListingImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: ${props => props.theme.borderRadius.lg} ${props => props.theme.borderRadius.lg} 0 0;
`;

const ListingImage = styled.div<{ backgroundImage: string }>`
  width: 100%;
  height: 220px;
  background-image: url(${props => props.backgroundImage});
  background-size: cover;
  background-position: center;
  position: relative;
  transition: transform 0.4s ease;

  ${ListingCard}:hover & {
    transform: scale(1.1);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;

  ${ListingCard}:hover & {
    opacity: 1;
  }
`;

const BadgeContainer = styled.div`
  position: absolute;
  top: ${props => props.theme.spacing.base};
  left: ${props => props.theme.spacing.base};
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  z-index: 2;
`;

const FeaturedBadge = styled.div`
  background: linear-gradient(135deg, ${props => props.theme.colors.accent[500]} 0%, ${props => props.theme.colors.accent[600]} 100%);
  color: white;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.base};
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: ${props => props.theme.typography.fontSize.xs};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const VerifiedBadge = styled.div`
  background: linear-gradient(135deg, ${props => props.theme.colors.success[500]} 0%, ${props => props.theme.colors.success[600]} 100%);
  color: white;
  padding: ${props => props.theme.spacing.sm};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const ActionButtons = styled.div`
  position: absolute;
  top: ${props => props.theme.spacing.base};
  right: ${props => props.theme.spacing.base};
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
  z-index: 2;
`;

const ActionButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);

  &:hover {
    background: white;
    transform: scale(1.1);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const ListingContent = styled.div`
  padding: ${props => props.theme.spacing.xl};
`;

const ListingTitle = styled.h3`
  font-size: ${props => props.theme.typography.fontSize.lg};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.neutral[900]};
  margin-bottom: ${props => props.theme.spacing.base};
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.3s ease;

  ${ListingCard}:hover & {
    color: ${props => props.theme.colors.primary[700]};
  }
`;

const ListingPrice = styled.div`
  font-size: ${props => props.theme.typography.fontSize['2xl']};
  font-weight: ${props => props.theme.typography.fontWeight.extrabold};
  background: linear-gradient(135deg, ${props => props.theme.colors.primary[600]} 0%, ${props => props.theme.colors.secondary[600]} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: ${props => props.theme.spacing.base};
`;

const ListingDetails = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing.base};
`;

const LocationInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.neutral[600]};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
`;

const ViewCount = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.neutral[600]};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.base};
  background: linear-gradient(135deg, ${props => props.theme.colors.warning[50]} 0%, ${props => props.theme.colors.warning[100]} 100%);
  border-radius: ${props => props.theme.borderRadius.full};
  border: 1px solid ${props => props.theme.colors.warning[200]};
`;

const RatingText = styled.span`
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.warning[700]};
`;

export const FeaturedListings: React.FC = () => {
  const { state } = useApp();

  const handleListingClick = (listingId: string) => {
    console.log(`Navigate to listing: ${listingId}`);
  };

  const handleFavoriteClick = (e: React.MouseEvent, listingId: string) => {
    e.stopPropagation();
    console.log(`Toggle favorite: ${listingId}`);
  };

  // Create more listings for demo
  const extendedListings = [
    ...mockListings,
    {
      ...mockListings[0],
      id: '3',
      title: 'iPhone 14 Pro Max - Like New',
      titleAr: 'آيفون 14 برو ماكس - حالة ممتازة',
      price: 4500,
      currency: 'AED',
      images: ['https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=800'],
      views: 2340,
      isFeatured: false
    },
    {
      ...mockListings[1],
      id: '4',
      title: 'Gaming Laptop - RTX 4080',
      titleAr: 'لابتوب ألعاب - RTX 4080',
      price: 8500,
      currency: 'AED',
      images: ['https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800'],
      views: 1890,
      isFeatured: true
    }
  ];

  return (
    <SectionContainer>
      <SectionHeader>
        <SectionTitle>
          {state.language === 'ar' ? 'الإعلانات المميزة' : 'Featured Listings'}
        </SectionTitle>
        <ViewAllButton>
          {state.language === 'ar' ? 'عرض الكل' : 'View All'}
        </ViewAllButton>
      </SectionHeader>

      <ListingsGrid>
        {extendedListings.map((listing, index) => (
          <motion.div
            key={listing.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
          >
            <ListingCard
              padding="none"
              onClick={() => handleListingClick(listing.id)}
            >
              <ListingImageContainer>
                <ListingImage backgroundImage={listing.images[0]} />
                <ImageOverlay />
                
                <BadgeContainer>
                  {listing.isFeatured && (
                    <FeaturedBadge>
                      {state.language === 'ar' ? 'مميز' : 'Featured'}
                    </FeaturedBadge>
                  )}
                  <VerifiedBadge>
                    <Verified size={14} />
                  </VerifiedBadge>
                </BadgeContainer>

                <ActionButtons>
                  <ActionButton 
                    onClick={(e) => handleFavoriteClick(e, listing.id)}
                  >
                    <Heart size={16} />
                  </ActionButton>
                </ActionButtons>
              </ListingImageContainer>

              <ListingContent>
                <ListingTitle>
                  {state.language === 'ar' ? listing.titleAr : listing.title}
                </ListingTitle>
                
                <ListingPrice>
                  {listing.price.toLocaleString()} {listing.currency}
                  {listing.isNegotiable && (
                    <span style={{ 
                      fontSize: '0.875rem', 
                      fontWeight: 'normal', 
                      color: '#6b7280',
                      marginLeft: '8px'
                    }}>
                      ({state.language === 'ar' ? 'قابل للتفاوض' : 'Negotiable'})
                    </span>
                  )}
                </ListingPrice>
                
                <ListingDetails>
                  <LocationInfo>
                    <MapPin size={16} />
                    {state.language === 'ar' ? listing.city.nameAr : listing.city.name}
                  </LocationInfo>
                  <ViewCount>
                    <Eye size={16} />
                    {listing.views.toLocaleString()}
                  </ViewCount>
                </ListingDetails>

                <RatingContainer>
                  <Star size={16} fill="currentColor" />
                  <RatingText>4.8</RatingText>
                  <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                    ({Math.floor(Math.random() * 50) + 10} {state.language === 'ar' ? 'تقييم' : 'reviews'})
                  </span>
                </RatingContainer>
              </ListingContent>
            </ListingCard>
          </motion.div>
        ))}
      </ListingsGrid>
    </SectionContainer>
  );
};