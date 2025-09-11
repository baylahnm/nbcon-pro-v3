import React from 'react';
import { useTranslation } from 'react-i18next';

interface DirectionalIconProps {
  className?: string;
  children: React.ReactNode;
}

export const DirectionalIcon: React.FC<DirectionalIconProps> = ({ 
  className = '', 
  children 
}) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  
  return (
    <span className={`${className} ${isRTL ? 'rtl-mirror' : ''}`}>
      {children}
    </span>
  );
};
