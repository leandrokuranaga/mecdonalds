import { BlipChat } from "blip-chat-widget";
import { useEffect, useContext } from "react";
import { UserContext } from "../state/UserStorage";
import { useNavigate, Link } from "react-router-dom";

const blipClient = new BlipChat();

const Blip = () => {
  const context = useContext(UserContext);
  const navigate = useNavigate();

  const initiateBlipBot = () => {
    blipClient
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

  const destroyChat = () => {
    blipClient.toogleChat();

    blipClient.destroy();
  };

  useEffect(() => {
    initiateBlipBot();

    return () => {
      destroyChat();
    };
  }, []);

  return (
    <div>
      <Link to="/">&#11013;</Link>
    </div>
  );
};

export default Blip;
