import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';

// my components
import GeoLocation from "./components/GeoLocation.tsx";

const queryClient = new QueryClient();

function App() {

  return (

    <QueryClientProvider client={ queryClient }>
      <GeoLocation></GeoLocation>
    </QueryClientProvider>

  )
}

export default App
