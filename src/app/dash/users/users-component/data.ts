import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from '@radix-ui/react-icons';

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

export const roles = [
  {
    value: 'USER',
    label: 'Misafir',
    icon: StopwatchIcon,
  },
  {
    value: 'MANAGER',
    label: 'Yönetici',
    icon: CheckCircledIcon,
  },
  {
    value: 'EMPLOYEE',
    label: 'Çalışan',
    icon: CheckCircledIcon,
  },
  {
    value: 'OFFICIAL',
    label: 'Memur',
    icon: CheckCircledIcon,
  },
  {
    value: 'ADMIN',
    label: 'KURUCU',
    icon: CheckCircledIcon,
  },
];
