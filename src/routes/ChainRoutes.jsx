import { lazy } from 'react';

const Ethereum = lazy(() => import('../pages/chains/Ethereum'));
const Bsc = lazy(() => import('../pages/chains/Bsc'));
const Avax = lazy(() => import('../pages/chains/Avax'));
const Polygon = lazy(() => import('../pages/chains/Polygon'));
const Arbitrum = lazy(() => import('../pages/chains/Arbitrum'));
const Optimism = lazy(() => import('../pages/chains/Optimism'));
const Solana = lazy(() => import('../pages/chains/Solana'));
const Kava = lazy(() => import('../pages/chains/Kava'));
const Tron = lazy(() => import('../pages/chains/Tron'));
const Algorand = lazy(() => import('../pages/chains/Algorand'));
const Fantom = lazy(() => import('../pages/chains/Fantom'));

const chainRoutes = [
  { path: '/ethereum', component: Ethereum },
  { path: '/bsc', component: Bsc },
  { path: '/avalanche', component: Avax },
  { path: '/polygon', component: Polygon },
  { path: '/arbitrum', component: Arbitrum },
  { path: '/optimism', component: Optimism },
  { path: '/solana', component: Solana },
  { path: '/kava', component: Kava },
  { path: '/tron', component: Tron },
  { path: '/algorand', component: Algorand },
  { path: '/fantom', component: Fantom }
];

export default chainRoutes;
