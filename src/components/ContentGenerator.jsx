import { useNavigate } from '@solidjs/router';
import { useContent } from '../ContentContext';

function ContentGenerator() {
  const navigate = useNavigate();
  const { prompt, setPrompt, loading } = useContent();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (prompt()) {
      navigate('/content');
    }
  };

  return (
    <form onSubmit={handleSubmit} class="w-full flex flex-col space-y-4">
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