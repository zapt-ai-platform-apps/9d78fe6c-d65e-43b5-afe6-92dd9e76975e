import { HiOutlineLightBulb } from 'solid-icons/hi';

function Header() {
  return (
    <header class="flex items-center justify-center py-6">
      <HiOutlineLightBulb class="text-primary text-4xl mr-2" />
      <h1 class="text-3xl md:text-5xl font-bold text-primary">منشئ محتوى ذكي</h1>
    </header>
  );
}

export default Header;