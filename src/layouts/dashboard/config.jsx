import ChartPieIcon from "@heroicons/react/24/solid/ChartPieIcon"
import CalculatorIcon from "@heroicons/react/24/solid/CalculatorIcon"
import HomeIcon from "@heroicons/react/24/solid/HomeIcon"
import CogIcon from "@heroicons/react/24/solid/CogIcon"
import DocumentTextIcon from "@heroicons/react/24/solid/DocumentTextIcon"
import ExclamationTriangleIcon from "@heroicons/react/24/solid/ExclamationTriangleIcon"
import ShoppingCartIcon from "@heroicons/react/24/solid/ShoppingCartIcon"
import StarIcon from "@heroicons/react/24/solid/StarIcon"
import { SvgIcon } from '@mui/material';

export const items = [
  {
    href: '/',
    icon: (
      <SvgIcon>
        <HomeIcon />
      </SvgIcon>
    ),
    label: 'Inicio'
  },
  {
    href: '/calculator',
    icon: (
      <SvgIcon>
        <CalculatorIcon />
      </SvgIcon>
    ),
    label: 'Calculadora'
  },
  {
    href: '/support',
    icon: (
      <SvgIcon>
        <CogIcon />
      </SvgIcon>
    ),
    label: 'Soporte'
  },
  {
    href: '/blog',
    icon: (
      <SvgIcon>
        <DocumentTextIcon />
      </SvgIcon>
    ),
    label: 'Blog'
  },
  {
    href: '/premium',
    icon: (
      <SvgIcon>
        <StarIcon />
      </SvgIcon>
    ),
    label: 'Premium'
  }
];
