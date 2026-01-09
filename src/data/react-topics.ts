import { InterviewTopic } from './types';

export const reactTopics: InterviewTopic[] = [
  {
    id: 'react-hooks',
    name: 'React Hooks',
    category: 'React',
    difficulty: 'medium',
    description: 'Hooks are functions that let you "hook into" React state and lifecycle features from function components. They were introduced in React 16.8 to enable state management without classes.',
    bulletPoints: [
      'useState for local component state',
      'useEffect for side effects and lifecycle',
      'useContext for consuming context without nesting',
      'useMemo and useCallback for performance optimization'
    ],
    codeExample: `function SearchableList({ items }) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);
  
  const filteredItems = useMemo(() => {
    return items.filter(item => 
      item.name.toLowerCase().includes(debouncedQuery.toLowerCase())
    );
  }, [items, debouncedQuery]);
  
  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <ul>{filteredItems.map(item => <li key={item.id}>{item.name}</li>)}</ul>
    </div>
  );
}`
  },
  {
    id: 'react-context',
    name: 'Context API',
    category: 'React',
    difficulty: 'medium',
    description: 'Context provides a way to pass data through the component tree without having to pass props manually at every level. It\'s useful for sharing "global" data like themes or user authentication.',
    bulletPoints: [
      'createContext creates a context object',
      'Provider component supplies the context value',
      'useContext hook consumes the context',
      'Avoid overusing - can cause unnecessary re-renders'
    ],
    codeExample: `// Create context
const ThemeContext = createContext({ theme: 'light', toggleTheme: () => {} });

// Provider component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Consumer component
function ThemedButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return <button onClick={toggleTheme}>Current: {theme}</button>;
}`
  },
  {
    id: 'react-performance',
    name: 'Performance Optimization',
    category: 'React',
    difficulty: 'hard',
    description: 'React provides several ways to optimize performance. Understanding when and how to use these techniques is crucial for building fast, responsive applications.',
    bulletPoints: [
      'React.memo prevents unnecessary re-renders',
      'useMemo memoizes expensive calculations',
      'useCallback memoizes function references',
      'Code splitting with React.lazy and Suspense'
    ],
    codeExample: `// Memoized component
const ExpensiveList = React.memo(function ExpensiveList({ items, onItemClick }) {
  console.log('ExpensiveList rendered');
  return (
    <ul>
      {items.map(item => (
        <li key={item.id} onClick={() => onItemClick(item.id)}>
          {item.name}
        </li>
      ))}
    </ul>
  );
});

// Parent component
function Parent() {
  const [count, setCount] = useState(0);
  const [items] = useState([...]);
  
  // Memoize callback to prevent child re-renders
  const handleItemClick = useCallback((id) => {
    console.log('Clicked:', id);
  }, []);
  
  return (
    <>
      <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>
      <ExpensiveList items={items} onItemClick={handleItemClick} />
    </>
  );
}`
  },
  {
    id: 'react-patterns',
    name: 'React Design Patterns',
    category: 'React',
    difficulty: 'hard',
    description: 'Design patterns in React help create reusable, maintainable components. Common patterns include Render Props, Higher-Order Components, and Compound Components.',
    bulletPoints: [
      'Custom hooks encapsulate reusable logic',
      'Compound components share state implicitly',
      'Render props offer flexible component composition',
      'HOCs wrap components with additional functionality'
    ],
    codeExample: `// Custom Hook Pattern
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });
  
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  
  return [value, setValue];
}

// Compound Component Pattern
function Tabs({ children, defaultIndex = 0 }) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  
  return (
    <TabsContext.Provider value={{ activeIndex, setActiveIndex }}>
      {children}
    </TabsContext.Provider>
  );
}

Tabs.List = TabList;
Tabs.Tab = Tab;
Tabs.Panels = TabPanels;
Tabs.Panel = TabPanel;`
  },
  {
    id: 'react-state-management',
    name: 'State Management',
    category: 'React',
    difficulty: 'medium',
    description: 'State management in React can range from simple useState to complex solutions like Redux or Zustand. Choosing the right approach depends on application complexity and team preferences.',
    bulletPoints: [
      'useState for simple local state',
      'useReducer for complex state logic',
      'Context + useReducer for medium apps',
      'Zustand/Jotai for lightweight global state'
    ],
    codeExample: `// useReducer for complex state
const initialState = { items: [], loading: false, error: null };

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, items: action.payload };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

function ItemList() {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  useEffect(() => {
    dispatch({ type: 'FETCH_START' });
    fetchItems()
      .then(items => dispatch({ type: 'FETCH_SUCCESS', payload: items }))
      .catch(err => dispatch({ type: 'FETCH_ERROR', payload: err.message }));
  }, []);
  
  if (state.loading) return <Spinner />;
  if (state.error) return <Error message={state.error} />;
  return <List items={state.items} />;
}`
  }
];
