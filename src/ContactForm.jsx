import { useState } from 'react';

const projectTypes = ['챌린지', '브랜딩', '퍼포먼스 마케팅', '바이럴 마케팅', '제휴', '컨설팅', '기타'];

function formatPhoneNumber(value) {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length < 4) return digits;
  if (digits.length < 8) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  if (digits.length < 11) return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
}

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz52Z-mdWtPNlfbhCv2NmN01cR0SNj2V8iAWOr_EdQEgbkXzUUgf1k8JDrddnHLdAHWZw/exec';

function ContactForm() {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [company, setCompany] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState('idle');

  const toggleType = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((item) => item !== type) : [...prev, type]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !agreed || status === 'sending') return;

    setStatus('sending');
    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({
          projectTypes: selectedTypes.join(', '),
          company,
          name,
          email,
          phone,
          message,
        }),
      });
      setStatus('success');
      setSelectedTypes([]);
      setCompany('');
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setAgreed(false);
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="bg-white text-slate-900">
      <div className="mx-auto max-w-2xl px-6 py-24 sm:px-8">
        <h2 className="text-5xl font-black tracking-tight sm:text-6xl">
          Contact<span className="text-[#FF6019]">.</span>
        </h2>
        <p className="mt-4 text-sm text-slate-500 sm:text-base">
          프로젝트 문의를 남겨주세요.
          <br />
          콘텐츠마이닝이 함께 답을 찾아드립니다.
        </p>

        <form className="mt-14" onSubmit={handleSubmit}>
          <div>
            <h3 className="text-base font-bold sm:text-lg">
              Step 1. <span>어떤 프로젝트를 문의하고 싶으신가요?</span>{' '}
              <span className="text-sm font-normal text-slate-400">(중복 선택 가능)</span>
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {projectTypes.map((type) => {
                const active = selectedTypes.includes(type);
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => toggleType(type)}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                      active
                        ? 'border-[#FF6019] bg-[#FF6019] text-white'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-[#FF6019]/60'
                    }`}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-12">
            <h3 className="text-base font-bold sm:text-lg">
              Step 2. <span>문의하시는 담당자님의 정보를 알려주세요.</span>
            </h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-medium text-slate-500">회사명</label>
                <input
                  type="text"
                  placeholder="회사명"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-transparent bg-slate-100 px-4 py-3 text-sm outline-none focus:border-[#FF6019] focus:bg-white"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500">
                  성함 <span className="text-[#FF6019]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="성함"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-transparent bg-slate-100 px-4 py-3 text-sm outline-none focus:border-[#FF6019] focus:bg-white"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500">
                  이메일 주소 <span className="text-[#FF6019]">*</span>
                </label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-transparent bg-slate-100 px-4 py-3 text-sm outline-none focus:border-[#FF6019] focus:bg-white"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500">연락처</label>
                <input
                  type="tel"
                  inputMode="numeric"
                  placeholder="010-0000-0000"
                  value={phone}
                  onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
                  className="mt-1 w-full rounded-xl border border-transparent bg-slate-100 px-4 py-3 text-sm outline-none focus:border-[#FF6019] focus:bg-white"
                />
              </div>
            </div>
          </div>

          <div className="mt-12 pb-10">
            <h3 className="text-base font-bold sm:text-lg">
              Step 3. <span>문의하실 프로젝트에 대해 설명해주세요.</span>
            </h3>
            <textarea
              rows={5}
              placeholder="콘텐츠마이닝에 문의하실 내용을 작성해주세요."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-4 w-full resize-none rounded-xl border border-transparent bg-slate-100 px-4 py-3 text-sm outline-none [color-scheme:light] [scrollbar-color:theme(colors.pink.300)_transparent] focus:border-[#FF6019] focus:bg-white"
            />
          </div>

          <label className="mt-10 flex cursor-pointer items-center gap-2 text-xs text-slate-500">
            <span
              onClick={() => setAgreed((prev) => !prev)}
              className="relative flex h-4 w-4 shrink-0 items-center justify-center rounded border-2 border-pink-300 bg-white"
            >
              {agreed && (
                <svg
                  viewBox="0 0 12 10"
                  className="h-2.5 w-2.5 fill-none stroke-pink-400 stroke-[2]"
                >
                  <path d="M1 5l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </span>
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="sr-only"
            />
            개인정보 수집 및 이용에 동의합니다.
          </label>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="mx-auto mt-6 flex w-fit items-center justify-center gap-2 rounded-full bg-[#FF6019] px-10 py-4 text-base font-bold text-white transition-colors hover:bg-sky-100 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === 'sending' ? '전송 중...' : '프로젝트 문의보내기'}
            <span aria-hidden="true">→</span>
          </button>

          {status === 'success' && (
            <div className="mt-8 rounded-2xl border border-[#FF6019]/30 bg-[#FF6019]/10 px-6 py-8 text-center">
              <p className="text-3xl">🎉</p>
              <p className="mt-3 text-xl font-black text-[#FF6019] sm:text-2xl">
                문의가 정상적으로 접수되었습니다!
              </p>
              <p className="mt-2 text-sm text-slate-500 sm:text-base">
                입력하신 이메일로 접수 확인 메일을 보내드렸어요.
                <br />
                담당자가 확인 후 빠르게 연락드리겠습니다.
              </p>
            </div>
          )}
          {status === 'error' && (
            <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 px-6 py-6 text-center">
              <p className="text-lg font-bold text-red-500">전송 중 문제가 발생했습니다</p>
              <p className="mt-1 text-sm text-slate-500">잠시 후 다시 시도해주세요.</p>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

export default ContactForm;
