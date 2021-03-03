import Profile from "./components/profile";
import { useStore } from "./store";

import "./styles.css";

export default function App() {
    const errors = useStore((state) => ({
        user: state.user.error,
    }));

    return (
        <div className="App">
            {Object.keys(errors)
                .map((errorKey) => [
                    errorKey,
                    errors[errorKey as keyof typeof errors],
                ])
                .filter(([_, error]) => error)
                .map(([errorKey, error]) => (
                    <div key={errorKey} className="error">
                        {error}
                    </div>
                ))}
            <Profile />
        </div>
    );
}
