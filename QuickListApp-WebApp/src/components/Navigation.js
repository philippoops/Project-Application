import SignInButton from './NavigationButton/SignInButton';

export default function Navigation() {
  return (
    <nav className="navigation-container">
      <img className="logo" src="./Logo.svg" alt="Logo" />
      <SignInButton />
    </nav>
  );
}
