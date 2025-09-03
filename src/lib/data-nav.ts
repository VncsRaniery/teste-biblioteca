// lib/data-nav.ts
import {
  IconChartBar,
  IconDashboard,
  IconFolder,
  IconListDetails,
  IconUsers,
} from "@tabler/icons-react";

export const navMain = [
  {
    title: "Dashboard",
    url: "/",
    icon: IconDashboard,
  },
  {
    title: "Livros",
    url: "/livros",
    icon: IconListDetails,
  },
  {
    title: "Membros",
    url: "/membros",
    icon: IconChartBar,
  },
  {
    title: "Empréstimos",
    url: "/emprestimos",
    icon: IconFolder,
  },
  {
    title: "Relatórios",
    url: "/relatorios",
    icon: IconUsers,
  },
];