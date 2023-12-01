import IconMinus from '../components/Icon/IconMinus';
import IconUser from '../components/Icon/IconUser';

export const listSideBar = [
  {
    name: 'Người dùng',
    icon: <IconMinus className="w-4 h-5 flex-none hidden" />,
    children: [
      {
        name: 'Quản lí người dùng',
        path: '/manage-user',
        icon: <IconUser className="group-hover:!text-primary shrink-0" />,
      },
      {
        name: 'Lịch sử đặt bàn',
        path: '/manage-order-user',
        icon: <IconUser className="group-hover:!text-primary shrink-0" />,
      },
    ],
  },
  {
    name: 'Chi nhánh',
    icon: <IconMinus className="w-4 h-5 flex-none hidden" />,
    children: [
      {
        name: 'Quản lí chi nhánh',
        path: '/manage-branch',
        icon: <IconUser className="group-hover:!text-primary shrink-0" />,
      },
      {
        name: 'Quản lí món ăn chi nhánh',
        path: '/manage-food-branch',
        icon: <IconUser className="group-hover:!text-primary shrink-0" />,
      },
    ],
  },
  {
    name: 'Món ăn',
    icon: <IconMinus className="w-4 h-5 flex-none hidden" />,
    children: [
      {
        name: 'Quản lí món ăn',
        path: '/manage-food',
        icon: <IconUser className="group-hover:!text-primary shrink-0" />,
      },
    ],
  },
  {
    name: 'Lịch đặt bàn',
    icon: <IconMinus className="w-4 h-5 flex-none hidden" />,
    children: [
      {
        name: 'Quản lí đặt bàn',
        path: '/manage-order',
        icon: <IconUser className="group-hover:!text-primary shrink-0" />,
      },
    ],
  },
];
