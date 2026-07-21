import logoUrl from './assets/logo.png';
import ShortCard from './ShortCard.jsx';
import ContactForm from './ContactForm.jsx';

const rawEntries = [
  { brand: '아토팜', category: '유아 스킨케어', href: 'https://youtube.com/shorts/02e4PhNLCE8?feature=share' },
  { brand: '아토팜', category: '유아 스킨케어', href: 'https://youtube.com/shorts/MjtvqCeCV-E?feature=share' },
  { brand: '아토팜', category: '유아 스킨케어', href: 'https://youtube.com/shorts/ru0_N3j2Bdc?feature=share' },
  { brand: '아토팜', category: '유아 스킨케어', href: 'https://youtube.com/shorts/kZtbyFyuCvc?feature=share' },
  { brand: '아토팜', category: '유아 스킨케어', href: 'https://youtube.com/shorts/dFL_Xza1aNs?feature=share' },
  { brand: '아토팜', category: '유아 스킨케어', href: 'https://youtube.com/shorts/XmL96SdUzug?feature=share' },
  { brand: '아토팜', category: '유아 스킨케어', href: 'https://youtube.com/shorts/WQcN_-Npcuw?feature=share' },
  { brand: '붐케어', category: '육아용품', href: 'https://youtube.com/shorts/u3-iRrEFb3o?feature=share' },
  { brand: '붐케어', category: '육아용품', href: 'https://youtube.com/shorts/sm93GgyXrNw?feature=share' },
  { brand: '단양문화원', category: '관광', href: 'https://youtube.com/shorts/ZWmm2023CMs?feature=share' },
  { brand: '단양문화원', category: '관광', href: 'https://youtube.com/shorts/gjugWBcFy8g?feature=share' },
  { brand: '단양문화원', category: '관광', href: 'https://youtube.com/shorts/3VXpEL7jK6o?feature=share' },
  { brand: '에어로케이', category: '여행', href: 'https://youtube.com/shorts/eljB644ZGHQ?feature=share' },
  { brand: '에어로케이', category: '여행', href: 'https://youtube.com/shorts/rE_Fb2FehTI?feature=share' },
  { brand: '에어로케이', category: '여행', href: 'https://youtube.com/shorts/UAPlyfK0Er4?feature=share' },
  { brand: '밤켈', category: '캐리어', href: 'https://youtube.com/shorts/GctO8EeIBbE?feature=share' },
  { brand: '밤켈', category: '캐리어', href: 'https://youtube.com/shorts/93nDMfrmnF4?feature=share' },
  { brand: '밤켈', category: '캐리어', href: 'https://youtube.com/shorts/2YWPrIIYtvU?feature=share' },
  { brand: '노에트', category: '뷰티', href: 'https://youtube.com/shorts/iTAMgpOGga0?feature=share' },
  { brand: '노에트', category: '뷰티', href: 'https://youtube.com/shorts/iQ9tpEHZjtU?feature=share' },
  { brand: '듀이트리', category: '뷰티', href: 'https://youtube.com/shorts/j_JSyvtDP-g?feature=share' },
  { brand: '듀이트리', category: '뷰티', href: 'https://youtube.com/shorts/Ri8m9Dcbj6k?feature=share' },
  { brand: 'SNP', category: '뷰티', href: 'https://youtube.com/shorts/pkWyGEBQGSM?feature=share' },
  { brand: 'SNP', category: '뷰티', href: 'https://youtube.com/shorts/j5oQnre7LgI?feature=share' },
  { brand: 'SNP', category: '뷰티', href: 'https://youtube.com/shorts/QGVjUADTsgU?feature=share' },
  { brand: '딘토', category: '뷰티', href: 'https://youtube.com/shorts/A6CvhTP925I?feature=share' },
  { brand: '딘토', category: '뷰티', href: 'https://youtube.com/shorts/XhAyCTnPXPE?feature=share' },
  { brand: '메이크프렘', category: '뷰티', href: 'https://youtube.com/shorts/dB8Hm8NW8PM?feature=share' },
  { brand: '메이크프렘', category: '뷰티', href: 'https://youtube.com/shorts/d4fsyB3Uwts?feature=share' },
  { brand: '메이크프렘', category: '뷰티', href: 'https://youtube.com/shorts/E8PzxZW85_4?feature=share' },
  { brand: '오브제', category: '뷰티', href: 'https://youtube.com/shorts/zccdyHLoNgg?feature=share' },
  { brand: '오브제', category: '뷰티', href: 'https://youtube.com/shorts/2VH1OMpmni4?feature=share' },
  { brand: '오브제', category: '뷰티', href: 'https://youtube.com/shorts/xin2-TeTb4M?feature=share' },
  { brand: '풀리', category: '뷰티', href: 'https://youtube.com/shorts/GqqYpZa48oQ?feature=share' },
  { brand: '센트온', category: '홈프래그런스', href: 'https://youtube.com/shorts/v744ivejfsY?feature=share' },
  { brand: '센트온', category: '홈프래그런스', href: 'https://youtube.com/shorts/kwLb-8K8kUI?feature=share' },
  { brand: '센트온', category: '홈프래그런스', href: 'https://youtube.com/shorts/qYe5_mk5sW0?feature=share' },
  { brand: '동구밭', category: '퍼스널케어', href: 'https://youtube.com/shorts/NXEEbk_4q8s?feature=share' },
  { brand: '동구밭', category: '퍼스널케어', href: 'https://youtube.com/shorts/i8W6pxKO-2c?feature=share' },
  { brand: '동구밭', category: '퍼스널케어', href: 'https://youtube.com/shorts/XDcbu5Yrcfk?feature=share' },
  { brand: '마마포레스트', category: '생활용품', href: 'https://youtube.com/shorts/phLo2giYg2Q?feature=share' },
  { brand: '부케가르니', category: '뷰티', href: 'https://youtube.com/shorts/W0U0SchriP0?feature=share' },
  { brand: '부케가르니', category: '뷰티', href: 'https://youtube.com/shorts/sbBjZiMe3P8?feature=share' },
  { brand: '부케가르니', category: '뷰티', href: 'https://youtube.com/shorts/24v94gSwItM?feature=share' },
  { brand: '미닉스', category: '가전제품', href: 'https://youtube.com/shorts/SJJhl_31iMo?feature=share' },
  { brand: '미닉스', category: '가전제품', href: 'https://youtube.com/shorts/Vt1A9TY3GEI?feature=share' },
  { brand: '미닉스', category: '가전제품', href: 'https://youtube.com/shorts/vHvr3S_TBC4?feature=share' },
  { brand: '젝시믹스', category: '패션', href: 'https://youtube.com/shorts/Tpo1UJF6I8w?feature=share' },
  { brand: '젝시믹스', category: '패션', href: 'https://youtube.com/shorts/iseqSz-Q4i0?feature=share' },
  { brand: '젝시믹스', category: '패션', href: 'https://youtube.com/shorts/JyDd_8UEIQI?feature=share' },
  { brand: '오니스트', category: '이너뷰티', href: 'https://youtube.com/shorts/rItwevrBTBI?feature=share' },
  { brand: '플라이밀', category: '다이어트제품', href: 'https://youtube.com/shorts/PP0Y5yH0pbw?feature=share' },
  { brand: '플라이밀', category: '다이어트제품', href: 'https://youtube.com/shorts/Q7PXiDS_Bug?feature=share' },
  { brand: '플라이밀', category: '다이어트제품', href: 'https://youtube.com/shorts/Jtv-v4TM7Xw?feature=share' },
  { brand: '플라이밀', category: '다이어트제품', href: 'https://youtube.com/shorts/O73TIRxTgls?feature=share' },
  { brand: '플라이밀', category: '다이어트제품', href: 'https://youtube.com/shorts/06okD9qG6Fs?feature=share' },
  { brand: '젤로젤로', category: '네일아트', href: 'https://youtube.com/shorts/K14OLGDYxes?feature=share' },
  { brand: '젤로젤로', category: '네일아트', href: 'https://youtube.com/shorts/Kf6uDlp76Mw?feature=share' },
  { brand: '토코보', category: '뷰티', href: 'https://youtube.com/shorts/HUF20gydKK8?feature=share' },
  { brand: '토코보', category: '뷰티', href: 'https://youtube.com/shorts/vr_eKzpCfCE?feature=share' },
  { brand: '라피타', category: '홈케어', href: 'https://youtube.com/shorts/7KEQuR_bKvE?feature=share' },
  { brand: '라피타', category: '홈케어', href: 'https://youtube.com/shorts/pcibnBuuCOY?feature=share' },
  { brand: '렌트리', category: '가전렌탈', href: 'https://youtube.com/shorts/pc7-Mx60OiI?feature=share' },
  { brand: '렌트리', category: '가전렌탈', href: 'https://youtube.com/shorts/PnGL-dZMKO0?feature=share' },
  { brand: '테디스베이글', category: '베이커리', href: 'https://youtube.com/shorts/IEe0q_4bW1E?feature=share' },
  { brand: '테디스베이글', category: '베이커리', href: 'https://youtube.com/shorts/ATu4XTdnuhI?feature=share' },
  { brand: '테디스베이글', category: '베이커리', href: 'https://youtube.com/shorts/MG0TfUU4Z58?feature=share' },
];

function shuffle(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function extractYoutubeId(url) {
  const match = url.match(/shorts\/([^?]+)/);
  return match ? match[1] : '';
}

const cards = shuffle(rawEntries).map((entry, idx) => {
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
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <header className="mb-24 text-center">
          <img
            src={logoUrl}
            alt="콘텐츠마이닝 로고"
            className="mx-auto h-36 w-auto rounded-full bg-white/5 p-4 shadow-[0_40px_100px_rgba(255,79,139,0.18)]"
          />
          <h1 className="mt-8 text-3xl font-black tracking-tight text-white sm:text-4xl">
            레퍼런스 모음
          </h1>
          <p className="mt-2 text-lg text-white/70 sm:text-xl">
            - 원고료 30-40만원 기준 -
          </p>
        </header>

        <main>
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
            {cards.map((card) => (
              <ShortCard key={card.key} card={card} />
            ))}
          </div>
        </main>

        <section className="mx-auto mt-20 max-w-xl px-4 text-center">
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
