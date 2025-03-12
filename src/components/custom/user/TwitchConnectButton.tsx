import { Button } from "@/components/ui/button";

type ButtonProps = {
  disabled: boolean
}


export const TwitchConnectButton = ({ disabled }: ButtonProps) => {
  let clientId = process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID;
  const redirect = process.env.NEXT_PUBLIC_TWITCH_REDIRECT_URI!
  let redirectUri = encodeURIComponent(redirect);

  //console.log('redirectUri sending to Twitch API...', redirectUri)
  const connectTwitch = () => {
    const scopes = encodeURIComponent("user:read:follows user:read:subscriptions");

    // Generamos un estado aleatorio para evitar ataques CSRF
    const state = Math.random().toString(36).substring(7);
    localStorage.setItem('twitch_auth_state', state)

    const authUrl = `https://id.twitch.tv/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scopes}`;

    console.log(authUrl);
    window.location.href = authUrl
  }

  return <Button onClick={connectTwitch} disabled={disabled}>Conectar con Twitch</Button>
}