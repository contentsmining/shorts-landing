import logoUrl from './assets/logo.png';
import ShortCard from './ShortCard.jsx';
import ContactForm from './ContactForm.jsx';

const rawEntries = [
  { brand: '부케가르니', category: '생활용품', href: 'https://youtube.com/shorts/vAL-CT4P_eE?feature=share' },
  { brand: '부케가르니', category: '생활용품', href: 'https://youtube.com/shorts/ZZsADDq3Ek8?feature=share' },
  { brand: '부케가르니', category: '생활용품', href: 'https://youtube.com/shorts/q2IGyaFIUCI?feature=share' },
  { brand: '붐케어', category: '육아용품', href: 'https://youtube.com/shorts/FCJAGeJCwas?feature=share' },
  { brand: '붐케어', category: '육아용품', href: 'https://youtube.com/shorts/7JjBrrekqzo?feature=share' },
  { brand: '에어로케이', category: '여행', href: 'https://youtube.com/shorts/vTqzOK1eRSs?feature=share' },
  { brand: '에어로케이', category: '여행', href: 'https://youtube.com/shorts/5WJUBiN0GsA?feature=share' },
  { brand: '에어로케이', category: '여행', href: 'https://youtube.com/shorts/w6B3pJBwpz4?feature=share' },
  { brand: '플라이밀', category: '다이어트 쉐이크', href: 'https://youtube.com/shorts/lOprFkCDiDU?feature=share' },
  { brand: '플라이밀', category: '다이어트 쉐이크', href: 'https://youtube.com/shorts/bGIxfRGgf2I?feature=share' },
  { brand: '플라이밀', category: '다이어트 쉐이크', href: 'https://youtube.com/shorts/yyT-QQ39Gl4?feature=share' },
  { brand: '플라이밀', category: '다이어트 쉐이크', href: 'https://youtube.com/shorts/y1_1qJUVQP8?feature=share' },
  { brand: '플라이밀', category: '다이어트 쉐이크', href: 'https://youtube.com/shorts/etTBVaGK5Yk?feature=share' },
  { brand: '딘토', category: '색조', href: 'https://youtube.com/shorts/pGeRad-_ICo?feature=share' },
  { brand: '딘토', category: '색조', href: 'https://youtube.com/shorts/VyK5gyy0gSU?feature=share' },
  { brand: 'SNP', category: '기초제품', href: 'https://youtube.com/shorts/R7mWCVVfd-I?feature=share' },
];

function extractYoutubeId(url) {
  const match = url.match(/shorts\/([^?]+)/);
  return match ? match[1] : '';
}

const cards = rawEntries.map((entry, idx) => {
  const videoId = extractYoutubeId(entry.href);
  return {
    key: idx,
    title: entry.brand,
    subtitle: entry.category,
    image: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    href: entry.href,
    videoId,
  };
});

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-6xl px-4 pb-24 pt-32 sm:px-6 sm:pt-40 lg:px-8">
        <header className="mb-24 text-center">
          <img
            src={logoUrl}
            alt="콘텐츠마이닝 로고"
            className="mx-auto h-36 w-auto rounded-full bg-white/5 p-4 shadow-[0_40px_100px_rgba(255,79,139,0.18)]"
          />
          <h1 className="mt-8 text-3xl font-black tracking-tight text-white sm:text-4xl">
            콘텐츠마이닝 레퍼런스 모음
          </h1>
          <p className="mt-2 text-lg text-white/70 sm:text-xl">
            - 원고료 30-40만원 추천모델 편 -
          </p>
        </header>

        <main>
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
            {cards.map((card) => (
              <ShortCard key={card.key} card={card} />
            ))}
          </div>
        </main>

        <section className="mx-auto max-w-xl px-4 py-20 text-center">
          <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
            더 많은 마케팅 사례가 궁금하신가요?
          </h2>
          <p className="mt-6 text-base text-white/70 sm:text-lg">
            인플루언서 · 바이럴 · 퍼포먼스 · 콘텐츠 제작까지
            <br />
            우리 브랜드에 맞는 마케팅 전략을 무료로 제안드립니다.
          </p>
        </section>
      </div>

      <ContactForm />
    </div>
  );
}

export default App;
