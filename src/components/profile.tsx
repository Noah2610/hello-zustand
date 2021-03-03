import { useState } from "react";
import { useStore, api } from "../store";

export default function Profile() {
  const [inputName, setInputName] = useState("");
  const { isLoading, isLoggedIn, name } = useStore((state) => ({
    isLoading: state.user.isLoading,
    isLoggedIn: state.user.isLoggedIn,
    name: state.user.name
  }));

  const login = (name: string) =>
    useStore.dispatch && api.login(useStore.dispatch)(name);

  const logout = () => useStore.dispatch && api.logout(useStore.dispatch)();

  if (isLoading) {
    return <div>Loading profile...</div>;
  }

  if (!isLoggedIn) {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login(inputName);
        }}
      >
        <input
          type="text"
          placeholder="Username..."
          value={inputName}
          onChange={(e) => setInputName(e.currentTarget.value)}
        />
        <button type="submit">Login!</button>
      </form>
    );
  }

  return (
    <div>
      <div>Username: {name}</div>
      <div>
        <button onClick={logout}>Logout!</button>
      </div>
    </div>
  );
}
