import { Platform, TierNames } from '@/lib/types'
import { create } from 'zustand'
import { persist, PersistOptions } from 'zustand/middleware'
import Cookies from 'js-cookie'


export type UserState = {
  userId: string | null // ! Email will be used as userId
}

export type UserActions = {
  setUserId: (id: string | null) => void
}

type UserStorePersist = PersistOptions<UserState & UserActions>
export const useUserStore = create<UserState & UserActions>()(
  persist(
    (set) => ({
      userId: null,
      setUserId: (userId: string | null) => set({ userId }),
    }),
    {
      name: 'user-store', skipHydration: true
    } as UserStorePersist
  )
)



export type State = {
  points: number
  tier: TierNames
  percentaje: number
  limitPoints: number
}

export type Actions = {
  setPoints: (points: number) => void
  setTier: (tier: TierNames) => void
  setLimitPoints: (limitPoints: number) => void
  setPercentaje: (percentaje: number) => void
}


export const usePointsStore = create<State & Actions>()(
  persist(
    (set) => ({
      points: 0,
      percentaje: 0,
      limitPoints: 100,
      setPoints: (points: number) => set((state) => ({ points })),
      tier: "NOT_RANKED",
      setTier: (tier: TierNames) => set({ tier }),
      setPercentaje: (percentaje: number) => set((state) => ({ percentaje })),
      setLimitPoints: (limitPoints: number) => set({ limitPoints }),
    }),
    {
      name: 'points-store', skipHydration: true
    }
  )
)


type CookieState = {
  acceptedCookies: boolean
  setAcceptedCookies: (acceptedCookies: boolean) => void
}


export const useCookieStore = create<CookieState>()(
  persist(
    (set) => ({
      acceptedCookies: !!Cookies.get('acceptedCookies'),
      setAcceptedCookies: (value) => {
        Cookies.set('acceptedCookies', value.toString(), { expires: 365 })
        set({ acceptedCookies: value })
      }
    }), {
    name: 'cookie-store',
    skipHydration: true,
    partialize: (state) => ({ acceptedCookies: state.acceptedCookies })
  })
)


type OpenPanelState = {
  isOpenRankingTier: boolean
  isOpenUserPanel: boolean
  setIsOpenRankingTier: (isOpenRankingTier: boolean) => void
  setIsOpenUserPanel: (isOpenUserPanel: boolean) => void
}

export const useOpenPanelStore = create<Omit<OpenPanelState, "isOpenUserPanel" | "setIsOpenUserPanel">>()(
  persist(
    (set) => ({
      isOpenRankingTier: true,
      setIsOpenRankingTier: (isOpenRankingTier) => set({ isOpenRankingTier })
    }), {
    name: 'rankingTier-store', skipHydration: true
  })
)

export const useUserPanelStore = create<Omit<OpenPanelState, "isOpenRankingTier" | "setIsOpenRankingTier">>()(
  persist(
    (set) => ({
      isOpenUserPanel: false,
      setIsOpenUserPanel: (isOpenUserPanel) => set({ isOpenUserPanel })
    }), {
    name: 'userPanel-store', skipHydration: true
  })
)


export interface TokenStore {
  tokens: Record<Platform, { accessToken: string; expiresAt: number } | null>;
  setToken: (platform: Platform, accessToken: string, expiresAt: number) => void;
  checkTokens: () => void;
}

export const useTokenStore = create<TokenStore>((set) => ({
  tokens: {
    twitch: null,
    twitter: null,
    youtube: null,
  },

  // Función para guardar tokens en el store y en localStorage
  setToken: (platform, accessToken, expiresAt) => {
    set((state) => ({
      tokens: { ...state.tokens, [platform]: { accessToken, expiresAt } },
    }));

    // Guardamos en localStorage para persistencia
    localStorage.setItem(`${platform}_access_token`, accessToken);
    localStorage.setItem(`${platform}_expires_at`, String(expiresAt));
  },

  // Función para verificar si los tokens en localStorage son válidos
  checkTokens: () => {
    const platforms: Platform[] = ["twitch", "twitter", "youtube"];
    const newTokens: Record<Platform, { accessToken: string; expiresAt: number } | null> = {
      twitch: null,
      twitter: null,
      youtube: null,
    };

    platforms.forEach((platform) => {
      const accessToken = localStorage.getItem(`${platform}_access_token`);
      const expiresAt = localStorage.getItem(`${platform}_expires_at`);

      if (accessToken && expiresAt && new Date().getTime() < Number(expiresAt)) {
        newTokens[platform] = { accessToken, expiresAt: Number(expiresAt) };
      }
    });

    set({ tokens: newTokens });
  },
}))