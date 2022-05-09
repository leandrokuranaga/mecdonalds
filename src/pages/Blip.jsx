import { BlipChat } from "blip-chat-widget";
import { useEffect } from "react";

const Blip = () => {
  useEffect(() => {
    (() => {
      window.onload = () => {
        var blipClient = new BlipChat()
          .withAppKey(
            "bWNkb25hbGRobWxhbGxib3RzOjZlNTQ4YWVhLWFmYjUtNDE2MC04ZDMyLTRiZGQwZjE5NmQ4NQ=="
          )
          .withAuth({
            authType: BlipChat.DEV_AUTH,
            userIdentity: "leandro.silvak@sonda.com",
            userPassword: "leandro.silvak@sonda.com",
          })
          .withEventHandler(BlipChat.LOAD_EVENT, function () {
            blipClient.sendMessage({
              type: "text/plain",
              content: "avt",
            });
          })
          .withoutHistory();

        blipClient.build();
        blipClient.toogleChat();
      };
    })();
  }, []);

  return <></>;
};

export default Blip;
