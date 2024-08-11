import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  StopwatchIcon,
} from '@radix-ui/react-icons';

export const statuses = [
  {
    value: 'PENDING',
    label: 'BEKLEMEDE',
    icon: StopwatchIcon,
  },
  {
    value: 'PAID',
    label: 'ÖDENDİ',
    icon: CheckCircledIcon,
  },
];

export const priorities = [
  {
    label: 'Low',
    value: 'low',
    icon: ArrowDownIcon,
  },
  {
    label: 'Medium',
    value: 'medium',
    icon: ArrowRightIcon,
  },
  {
    label: 'High',
    value: 'high',
    icon: ArrowUpIcon,
  },
];

export const labels = [
  {
    value: 'bug',
    label: 'Bug',
  },
  {
    value: 'feature',
    label: 'Feature',
  },
  {
    value: 'documentation',
    label: 'Documentation',
  },
];
