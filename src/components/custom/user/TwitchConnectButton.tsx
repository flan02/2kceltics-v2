import { Button } from "@/components/ui/button";
import { TokenBody } from "@/lib/types";
import { CheckTokens } from "@/services/api";
import { useTokenStore, useUserStore } from '@/store/store'
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";



export const TwitchConnectButton = () => {
  const [disabled, setDisabled] = useState(false)
  const { setToken } = useTokenStore()
  //const pathname = usePathname()

  let connectTwitch
  let userEmail = useUserStore.getState().userId!
  const clientId = process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID;
  const redirect = process.env.NEXT_PUBLIC_TWITCH_REDIRECT_URI!
  let redirectUri = encodeURIComponent(redirect);

  connectTwitch = () => {
    const scopes = encodeURIComponent("user:read:follows user:read:subscriptions");
    const authUrl = `https://id.twitch.tv/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scopes}`

    console.log(authUrl);
    window.location.href = authUrl
  }

  useEffect(() => {
    const checkTokens = async () => {
      const storedToken = localStorage.getItem("twitch_token");

      if (storedToken) {
        console.log("Token founded in localStorage:", storedToken);
        const tokenData: TokenBody = JSON.parse(storedToken);
        console.log('PARSED tokenData', tokenData);
        const { generatedAt, expires_in } = tokenData; // *🚀 Destructure the token data
        // ? Check if the token is still valid
        const tokenExpirationTime = generatedAt + expires_in * 1000;
        const currentTime = Date.now();

        if (currentTime > tokenExpirationTime) {
          console.log("Token has expired, refreshing token...");

          // !Llamar a la función para renovar el token
          // ! await refreshToken(tokenData[0].refresh_token);
          const data: any = await CheckTokens(userEmail);
          console.log('twitch token refresh completed...', data);
          return;
        } else {
          setToken("twitch", JSON.parse(storedToken));
          setDisabled(true);
          console.log("Token is still valid.");
          return; // *🚀 Avoid unnecessary db call
        }
      }

      console.log("There is not token in localStorage, checking in the db...");

      try {
        const data: any = await CheckTokens(userEmail); // ? userId is session.user.email from authjs
        console.log('twitch token data received from db', data);
        if (data.twitch) {
          localStorage.setItem("twitch_token", JSON.stringify(data.twitch));
          setToken("twitch", data.twitch);
          setDisabled(true);
        }
      } catch (error) {
        console.error("Error verifying tokens", error);
      }
    };

    checkTokens();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return <Button onClick={connectTwitch} disabled={disabled} className="bg-[#9146FF] hover:bg-[#9146FF]/90 text-white">Connect with Twitch</Button>
}


// Generate a random state to protect against CSRF attacks
//const state = Math.random().toString(36).substring(7);
//localStorage.setItem('twitch_auth_state', state)