import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/i18n/LanguageContext';
import deFlag from '@/assets/flags/de.svg';
import gbFlag from '@/assets/flags/gb.svg';

const flags = {
  de: deFlag,
  en: gbFlag,
};

export const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-9 px-4">
          <img src={flags[language]} alt={`${language} flag`} className="w-5 h-auto mr-2" />
          {language.toUpperCase()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem onClick={() => setLanguage('de')}>
          <img src={flags.de} alt="German flag" className="w-5 h-auto mr-2" />
          DE
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('en')}>
          <img src={flags.en} alt="English flag" className="w-5 h-auto mr-2" />
          EN
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};