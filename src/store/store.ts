import { SOCIAL_MEDIA, TierNames } from '@/lib/types'
import { create } from 'zustand'
import { createJSONStorage, persist, PersistOptions } from 'zustand/middleware'
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
      points: 1,
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
    storage: createJSONStorage(() => localStorage), // * This is the default storage, it doesn't save the state n version in localstorage
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


export interface TokenData {
  accessToken: string;
  refreshToken: string;
  expires_in: number
}


export interface TokenStore {
  tokens: Record<SOCIAL_MEDIA, TokenData | null>;
  setToken: (platform: SOCIAL_MEDIA, tokenData: TokenData) => void;
  checkTokens: () => void
}

const initTokenStore = {
  twitch: null,
  twitter: null,
  youtube: null
}

export const useTokenStore = create<TokenStore>((set) => ({
  tokens: initTokenStore,
  setToken: (platform, tokenData) => {
    // ? Fc to save tokens in the store
    set((state) => ({
      tokens: { ...state.tokens, [platform]: tokenData },
    }))
    // ? Guardamos en localStorage para persistencia
    localStorage.setItem(`${platform}_token`, JSON.stringify(tokenData));
  },
  checkTokens: () => {
    // ? Fc to check if tokens are still valid
    const platforms: SOCIAL_MEDIA[] = ["twitch", "twitter", "youtube"];
    const newTokens: Record<SOCIAL_MEDIA, TokenData | null> = initTokenStore
    platforms.forEach((platform) => {
      const storedToken = localStorage.getItem(`${platform}_token`);
      if (storedToken) {
        try {
          const parsedToken: TokenData = JSON.parse(storedToken);
          if (parsedToken.expires_in > Date.now()) {
            newTokens[platform] = parsedToken
          }
        } catch (error) {
          console.error(`Error parsing token for ${platform}`, error);

        }
      }
    })
    set({ tokens: newTokens })
  }
}))