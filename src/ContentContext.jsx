import { createContext, useContext, createSignal } from 'solid-js';

const ContentContext = createContext();

export function ContentProvider(props) {
  const [prompt, setPrompt] = createSignal('');
  const [contentType, setContentType] = createSignal('مقال'); // نوع المحتوى الافتراضي
  const [generatedContent, setGeneratedContent] = createSignal('');
  const [loading, setLoading] = createSignal(false);

  const value = {
    prompt,
    setPrompt,
    contentType,
    setContentType,
    generatedContent,
    setGeneratedContent,
    loading,
    setLoading,
  };

  return (
    <ContentContext.Provider value={value}>
      {props.children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  return useContext(ContentContext);
}