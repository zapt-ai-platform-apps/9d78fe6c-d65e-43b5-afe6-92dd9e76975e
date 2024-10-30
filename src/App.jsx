import { ContentProvider } from './ContentContext';
import { Router, Routes, Route } from '@solidjs/router';
import Header from './components/Header';
import ContentGenerator from './components/ContentGenerator';
import GeneratedContent from './components/GeneratedContent';

function App() {
  return (
    <ContentProvider>
      <Router>
        <div class="h-full bg-gradient-to-br from-purple-100 to-blue-100 p-4 text-gray-800">
          <div class="max-w-3xl mx-auto h-full flex flex-col">
            <Header />
            <Routes>
              <Route path="/" component={ContentGenerator} />
              <Route path="/content" component={GeneratedContent} />
            </Routes>
          </div>
        </div>
      </Router>
    </ContentProvider>
  );
}

export default App;