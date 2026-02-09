import { ValentinePage } from './components/valentine/ValentinePage';
import { ValentineThemeProvider } from './components/valentine/ValentineThemeProvider';
import { Toaster } from '@/components/ui/sonner';

function App() {
  return (
    <ValentineThemeProvider>
      <ValentinePage />
      <Toaster />
    </ValentineThemeProvider>
  );
}

export default App;
