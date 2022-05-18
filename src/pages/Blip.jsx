import { BlipChat } from "blip-chat-widget";
import { useEffect, useContext } from "react";
import { UserContext } from "../state/UserStorage";
import { useNavigate, Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const blipClient = new BlipChat();
const id = uuidv4();
console.log(id + "id");

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
        userIdentity: id,
        userPassword: id,
      })
      .withEventHandler(BlipChat.LOAD_EVENT, function () {
        blipClient.sendMessage({
          type: "text/plain",
          content: "oi",
        });
      })
      .withCustomMessageMetadata({
        codrestaurante: context.codRest,
        siglarestaurante: context.sigla,
      })
      .withoutHistory();
    console.log(context.codRest + "codigo restaurasnte");
    console.log(context.sigla + "sigla do restaurante");
    blipClient.build();
    blipClient.toogleChat();
  };

  const destroyChat = () => {
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
