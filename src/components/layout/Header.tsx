import React, { useState } from 'react';
import styled from 'styled-components';
import { Search, Menu, User, Globe, MapPin, Plus, Bell, Heart } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { mockCities } from '../../data/mockData';
import { Button } from '../ui/Button';
import { Dropdown } from '../ui/Dropdown';
import { Modal } from '../ui/Modal';

const HeaderContainer = styled.header`
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border-bottom: 1px solid ${props => props.theme.colors.neutral[200]};
  box-shadow: ${props => props.theme.shadows.lg};
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(20px);
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.lg} ${props => props.theme.spacing.lg};
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${props => props.theme.spacing.xl};
  margin-bottom: ${props => props.theme.spacing.base};

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: ${props => props.theme.spacing.base};
  }
`;

const Logo = styled.div`
  font-size: ${props => props.theme.typography.fontSize['2xl']};
  font-weight: ${props => props.theme.typography.fontWeight.extrabold};
  background: linear-gradient(135deg, ${props => props.theme.colors.primary[600]} 0%, ${props => props.theme.colors.secondary[600]} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  cursor: pointer;
  flex-shrink: 0;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const SearchContainer = styled.div`
  flex: 1;
  max-width: 600px;
  position: relative;

  @media (max-width: 768px) {
    order: 3;
    width: 100%;
    max-width: none;
  }
`;

const SearchInputWrapper = styled.div`
  position: relative;
  background: white;
  border-radius: ${props => props.theme.borderRadius.xl};
  box-shadow: ${props => props.theme.shadows.lg};
  border: 2px solid transparent;
  transition: all 0.3s ease;

  &:focus-within {
    border-color: ${props => props.theme.colors.primary[400]};
    box-shadow: ${props => props.theme.shadows.glow};
    transform: translateY(-1px);
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${props => props.theme.spacing.lg} ${props => props.theme.spacing.lg};
  padding-left: 56px;
  padding-right: 120px;
  border: none;
  border-radius: ${props => props.theme.borderRadius.xl};
  font-size: ${props => props.theme.typography.fontSize.base};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  background: transparent;
  color: ${props => props.theme.colors.neutral[900]};

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${props => props.theme.colors.neutral[500]};
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: ${props => props.theme.spacing.lg};
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.theme.colors.primary[500]};
`;

const SearchButton = styled(Button)`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  border-radius: ${props => props.theme.borderRadius.lg};
  background: linear-gradient(135deg, ${props => props.theme.colors.primary[500]} 0%, ${props => props.theme.colors.primary[600]} 100%);
  
  &:hover {
    background: linear-gradient(135deg, ${props => props.theme.colors.primary[600]} 0%, ${props => props.theme.colors.primary[700]} 100%);
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.base};
  flex-shrink: 0;
`;

const CitySelector = styled.div`
  min-width: 160px;

  @media (max-width: 768px) {
    min-width: 140px;
  }
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.base};
  background: white;
  border: 2px solid ${props => props.theme.colors.neutral[200]};
  border-radius: ${props => props.theme.borderRadius.lg};
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.theme.colors.neutral[700]};
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
    border-color: ${props => props.theme.colors.primary[400]};
    background: ${props => props.theme.colors.primary[50]};
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.lg};

    &::before {
      left: 100%;
    }
  }
`;

const NotificationBadge = styled.div`
  position: absolute;
  top: -4px;
  right: -4px;
  width: 18px;
  height: 18px;
  background: linear-gradient(135deg, ${props => props.theme.colors.error[500]} 0%, ${props => props.theme.colors.error[600]} 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: bold;
  color: white;
  border: 2px solid white;
`;

const MobileMenuButton = styled.button`
  display: none;
  padding: ${props => props.theme.spacing.base};
  background: white;
  border: 2px solid ${props => props.theme.colors.neutral[200]};
  border-radius: ${props => props.theme.borderRadius.lg};
  cursor: pointer;
  color: ${props => props.theme.colors.neutral[700]};
  transition: all 0.3s ease;

  &:hover {
    border-color: ${props => props.theme.colors.primary[400]};
    background: ${props => props.theme.colors.primary[50]};
  }

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
  }
`;

const AuthButtons = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};

  @media (max-width: 768px) {
    display: none;
  }
`;

const PostAdButton = styled(Button)`
  background: linear-gradient(135deg, ${props => props.theme.colors.accent[500]} 0%, ${props => props.theme.colors.accent[600]} 100%);
  border: none;
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

  &:hover {
    background: linear-gradient(135deg, ${props => props.theme.colors.accent[600]} 0%, ${props => props.theme.colors.accent[700]} 100%);
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.xl};

    &::before {
      left: 100%;
    }
  }
`;

export const Header: React.FC = () => {
  const { state, dispatch } = useApp();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleCityChange = (cityId: string) => {
    const city = mockCities.find(c => c.id === cityId);
    if (city) {
      dispatch({ type: 'SET_CITY', payload: city });
    }
  };

  const handleLanguageToggle = () => {
    dispatch({ 
      type: 'SET_LANGUAGE', 
      payload: state.language === 'en' ? 'ar' : 'en' 
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ 
      type: 'SET_SEARCH_FILTERS', 
      payload: { keyword: searchQuery } 
    });
  };

  const cityOptions = mockCities.map(city => ({
    value: city.id,
    label: state.language === 'ar' ? city.nameAr : city.name,
    icon: <MapPin size={16} />
  }));

  return (
    <HeaderContainer>
      <HeaderContent>
        <TopBar>
          <Logo onClick={() => window.location.href = '/'}>
            {state.language === 'ar' ? 'السوق المفتوح' : 'OpenSooq'}
          </Logo>

          <SearchContainer>
            <form onSubmit={handleSearch}>
              <SearchInputWrapper>
                <SearchIcon>
                  <Search size={20} />
                </SearchIcon>
                <SearchInput
                  type="text"
                  placeholder={state.language === 'ar' ? 'ابحث عن أي شيء...' : 'Search for anything...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <SearchButton type="submit" size="sm">
                  {state.language === 'ar' ? 'بحث' : 'Search'}
                </SearchButton>
              </SearchInputWrapper>
            </form>
          </SearchContainer>

          <HeaderActions>
            <CitySelector>
              <Dropdown
                options={cityOptions}
                value={state.selectedCity.id}
                onChange={handleCityChange}
                placeholder={state.language === 'ar' ? 'اختر المدينة' : 'Select City'}
                searchable
              />
            </CitySelector>

            <ActionButton onClick={handleLanguageToggle}>
              <Globe size={18} />
              {state.language.toUpperCase()}
            </ActionButton>

            <ActionButton style={{ position: 'relative' }}>
              <Bell size={18} />
              <NotificationBadge>3</NotificationBadge>
            </ActionButton>

            <ActionButton>
              <Heart size={18} />
            </ActionButton>

            <AuthButtons>
              {state.user ? (
                <ActionButton>
                  <User size={18} />
                  {state.user.name}
                </ActionButton>
              ) : (
                <>
                  <Button 
                    variant="ghost" 
                    onClick={() => setIsLoginModalOpen(true)}
                  >
                    {state.language === 'ar' ? 'تسجيل الدخول' : 'Login'}
                  </Button>
                  <Button variant="primary">
                    {state.language === 'ar' ? 'إنشاء حساب' : 'Sign Up'}
                  </Button>
                </>
              )}
            </AuthButtons>

            <PostAdButton 
              leftIcon={<Plus size={18} />}
              size="base"
            >
              {state.language === 'ar' ? 'أضف إعلان' : 'Post Ad'}
            </PostAdButton>

            <MobileMenuButton>
              <Menu size={24} />
            </MobileMenuButton>
          </HeaderActions>
        </TopBar>
      </HeaderContent>

      <Modal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        title={state.language === 'ar' ? 'تسجيل الدخول' : 'Login'}
        size="sm"
      >
        <div style={{ textAlign: 'center', padding: '2rem 0' }}>
          <p>{state.language === 'ar' ? 'نموذج تسجيل الدخول سيكون هنا' : 'Login form will be here'}</p>
        </div>
      </Modal>
    </HeaderContainer>
  );
};