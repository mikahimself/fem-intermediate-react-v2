import { createContext } from 'react';

// The empty function here is a placeholder. If there is no provider above
// the context, if will use this (although there is almost always a provider).
// The stuff passed as an argument below is really a hook that has 
// a state and a setState updater, but in this case, the updater does nothing.
const ThemeContext = createContext(["green", () => {}]);

// Check usage from SearchParams and Details

export default ThemeContext;