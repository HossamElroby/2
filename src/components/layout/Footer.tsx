import React from 'react';
import styled from 'styled-components';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const FooterContainer = styled.footer`
  background-color: ${props => props.theme.colors.neutral[900]};
  color: white;
  padding: ${props => props.theme.spacing['2xl']} ${props => props.theme.spacing.lg};
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${props => props.theme.spacing.xl};
  margin-bottom: ${props => props.theme.spacing.xl};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.lg};
  }
`;

const FooterSection = styled.div``;

const FooterTitle = styled.h3`
  font-size: ${props => props.theme.typography.fontSize.lg};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  margin-bottom: ${props => props.theme.spacing.base};
`;

const FooterLink = styled.a`
  display: block;
  color: ${props => props.theme.colors.neutral[400]};
  text-decoration: none;
  margin-bottom: ${props => props.theme.spacing.sm};
  transition: color 0.2s ease-in-out;

  &:hover {
    color: white;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.neutral[400]};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.base};
  margin-top: ${props => props.theme.spacing.base};
`;

const SocialLink = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.neutral[800]};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.neutral[400]};
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${props => props.theme.colors.primary[600]};
    color: white;
    transform: translateY(-2px);
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid ${props => props.theme.colors.neutral[700]};
  padding-top: ${props => props.theme.spacing.base};
  display: flex;
  justify-content: between;
  align-items: center;
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.neutral[500]};

  @media (max-width: 768px) {
    flex-direction: column;
    gap: ${props => props.theme.spacing.base};
    text-align: center;
  }
`;

export const Footer: React.FC = () => {
  const { state } = useApp();

  return (
    <FooterContainer>
      <FooterContent>
        <FooterGrid>
          <FooterSection>
            <FooterTitle>
              {state.language === 'ar' ? 'السوق المفتوح' : 'OpenSooq'}
            </FooterTitle>
            <p style={{ color: '#9ca3af', lineHeight: 1.6, marginBottom: '1rem' }}>
              {state.language === 'ar'
                ? 'منصة التجارة الإلكترونية الرائدة في الشرق الأوسط للبيع والشراء الآمن والموثوق.'
                : 'The leading e-commerce platform in the Middle East for safe and trusted buying and selling.'
              }
            </p>
            <SocialLinks>
              <SocialLink href="#" aria-label="Facebook">
                <Facebook size={20} />
              </SocialLink>
              <SocialLink href="#" aria-label="Twitter">
                <Twitter size={20} />
              </SocialLink>
              <SocialLink href="#" aria-label="Instagram">
                <Instagram size={20} />
              </SocialLink>
              <SocialLink href="#" aria-label="LinkedIn">
                <Linkedin size={20} />
              </SocialLink>
            </SocialLinks>
          </FooterSection>

          <FooterSection>
            <FooterTitle>
              {state.language === 'ar' ? 'روابط سريعة' : 'Quick Links'}
            </FooterTitle>
            <FooterLink href="#">
              {state.language === 'ar' ? 'عن الشركة' : 'About Us'}
            </FooterLink>
            <FooterLink href="#">
              {state.language === 'ar' ? 'كيف يعمل الموقع' : 'How It Works'}
            </FooterLink>
            <FooterLink href="#">
              {state.language === 'ar' ? 'الأسئلة الشائعة' : 'FAQ'}
            </FooterLink>
            <FooterLink href="#">
              {state.language === 'ar' ? 'الدعم الفني' : 'Support'}
            </FooterLink>
          </FooterSection>

          <FooterSection>
            <FooterTitle>
              {state.language === 'ar' ? 'الشروط والأحكام' : 'Terms & Privacy'}
            </FooterTitle>
            <FooterLink href="#">
              {state.language === 'ar' ? 'شروط الاستخدام' : 'Terms of Service'}
            </FooterLink>
            <FooterLink href="#">
              {state.language === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
            </FooterLink>
            <FooterLink href="#">
              {state.language === 'ar' ? 'سياسة الكوكيز' : 'Cookie Policy'}
            </FooterLink>
            <FooterLink href="#">
              {state.language === 'ar' ? 'التبليغ عن مشكلة' : 'Report Issue'}
            </FooterLink>
          </FooterSection>

          <FooterSection>
            <FooterTitle>
              {state.language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
            </FooterTitle>
            <ContactItem>
              <Mail size={16} />
              info@opensooq.com
            </ContactItem>
            <ContactItem>
              <Phone size={16} />
              +971 4 123 4567
            </ContactItem>
            <ContactItem>
              <MapPin size={16} />
              {state.language === 'ar' ? 'دبي، الإمارات العربية المتحدة' : 'Dubai, UAE'}
            </ContactItem>
          </FooterSection>
        </FooterGrid>

        <FooterBottom>
          <div>
            © 2024 {state.language === 'ar' ? 'السوق المفتوح' : 'OpenSooq'}. 
            {' '}{state.language === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
          </div>
          <div>
            {state.language === 'ar' ? 'صنع بـ ❤️ في الشرق الأوسط' : 'Made with ❤️ in the Middle East'}
          </div>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};