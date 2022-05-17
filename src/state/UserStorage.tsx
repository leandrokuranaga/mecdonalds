import { Children, createContext, useState } from "react";

interface User {
  email: string;
  setEmail: (param: string) => void;
  sigla: string;
  setSigla: (param: string) => void;
  codRest: number;
  setCodRest: (param: number) => void;
}

export const UserContext = createContext<User | undefined>(undefined);

const UserStorage = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [email, setEmail] = useState<string>("");
  const [sigla, setSigla] = useState<string>("");
  const [codRest, setCodRest] = useState<number>(0);

  return (
    <UserContext.Provider
      value={{ email, setEmail, sigla, setSigla, codRest, setCodRest }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserStorage;
