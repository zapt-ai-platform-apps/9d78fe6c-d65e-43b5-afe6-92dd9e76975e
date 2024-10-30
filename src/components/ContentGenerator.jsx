import { useNavigate } from '@solidjs/router';
import { useContent } from '../ContentContext';
import { For } from 'solid-js';

function ContentGenerator() {
  const navigate = useNavigate();
  const { prompt, setPrompt, contentType, setContentType, loading } = useContent();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (prompt()) {
      navigate('/content');
    }
  };

  const contentTypes = [
    'مقال',
    'قصة قصيرة',
    'قصيدة',
    'نص إعلاني',
    'وصف منتج',
    'منشور على وسائل التواصل الاجتماعي',
  ];

  return (
    <form onSubmit={handleSubmit} class="w-full flex flex-col space-y-4">
      <select
        value={contentType()}
        onChange={(e) => setContentType(e.target.value)}
        class="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer"
      >
        <For each={contentTypes}>
          {(type) => (
            <option value={type}>{type}</option>
          )}
        </For>
      </select>
      <textarea
        placeholder="اكتب وصفًا أو موضوعًا للحصول على محتوى"
        value={prompt()}
        onInput={(e) => setPrompt(e.target.value)}
        class="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent box-border text-right"
        rows="5"
      />
      <button
        type="submit"
        disabled={loading()}
        class={`w-full py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${
          loading() ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {loading() ? 'يتم الآن إنشاء المحتوى...' : 'إنشاء المحتوى'}
      </button>
    </form>
  );
}

export default ContentGenerator;