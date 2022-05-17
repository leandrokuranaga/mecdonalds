import { BlipChat } from "blip-chat-widget";
import { useEffect, useContext } from "react";
import { UserContext } from "../state/UserStorage";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const blipClient = new BlipChat();

const Blip = () => {
  const context = useContext(UserContext);
  const navigate = useNavigate();

  var command = {
    id: "{{$guid}}",
    method: "set",
    uri: "/contacts",
    type: "application/vnd.lime.contact+json",
    resource: {
      identity: context.email + ".mcdonaldhmlallbots@0mn.io",
      email: context.email,
      city: context.sigla,
      phoneNumer: context.codRest,
      extras: {
        sigla: context.sigla,
        cod: context.codRest,
      },
    },
  };

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
      .withEventHandler(BlipChat.LOAD_EVENT, function () {
        blipClient.sendMessage({
          type: "text/plain",
          content: "oi",
        });

        // blipClient.sendCommand(command);
      })
      .withCustomMessageMetadata({
        siglametadata: context.sigla,
      })

      .withoutHistory();

    console.log(command);
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
