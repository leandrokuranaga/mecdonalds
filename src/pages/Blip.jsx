import { BlipChat } from "blip-chat-widget";
import { useEffect, useContext } from "react";
import { UserContext } from "../state/UserStorage";

const Blip = () => {
  const context = useContext(UserContext);

  useEffect(() => {
    const initiateBlipBot = () => {
      var blipClient = new BlipChat()
        .withAppKey(
          "bWNkb25hbGRobWxhbGxib3RzOjZlNTQ4YWVhLWFmYjUtNDE2MC04ZDMyLTRiZGQwZjE5NmQ4NQ=="
        )
        .withAuth({
          authType: BlipChat.DEV_AUTH,
          userIdentity: context.email,
          userPassword: context.email,
        })
        .withAccount({
          email: context.email,
        })
        .withEventHandler(BlipChat.LOAD_EVENT, function () {
          blipClient.sendMessage({
            type: "text/plain",
            content: context.sigla,
          });
        })
        .withoutHistory();

      blipClient.build();
      blipClient.toogleChat();
    };
    window.addEventListener("load", initiateBlipBot);

    return () => window.removeEventListener("load", initiateBlipBot);
  }, []);

  return <></>;
};

export default Blip;
