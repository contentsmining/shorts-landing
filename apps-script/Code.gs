// ===== 설정값: 아래 3개를 채워 넣으세요 =====
const DISCORD_WEBHOOK_URL = 'PASTE_YOUR_DISCORD_WEBHOOK_URL_HERE';
const ADMIN_EMAIL = 'hello@contentsmining.com';
const SHEET_NAME = '시트1'; // 실제 시트(탭) 이름으로 변경

const BRAND_COLOR = '#FF6019';

function doPost(e) {
  const data = JSON.parse(e.postData.contents);

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const timestamp = new Date();

  sheet.appendRow([
    timestamp,
    data.projectTypes || '',
    data.company || '',
    data.name || '',
    data.email || '',
    data.phone || '',
    data.message || '',
  ]);

  notifyDiscord(data);
  notifyApplicant(data);
  notifyAdmin(data, timestamp);

  return ContentService.createTextOutput(
    JSON.stringify({ result: 'success' })
  ).setMimeType(ContentService.MimeType.JSON);
}

function notifyDiscord(data) {
  if (!DISCORD_WEBHOOK_URL || DISCORD_WEBHOOK_URL.indexOf('PASTE_YOUR') === 0) return;

  const embed = {
    title: '📩 새 프로젝트 문의가 도착했습니다',
    color: 16351257, // #FF6019
    fields: [
      { name: '회사명', value: data.company || '-', inline: true },
      { name: '성함', value: data.name || '-', inline: true },
      { name: '이메일', value: data.email || '-', inline: false },
      { name: '연락처', value: data.phone || '-', inline: true },
      { name: '문의 유형', value: data.projectTypes || '-', inline: false },
      { name: '문의 내용', value: data.message || '-', inline: false },
    ],
  };

  UrlFetchApp.fetch(DISCORD_WEBHOOK_URL, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify({ embeds: [embed] }),
    muteHttpExceptions: true,
  });
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function emailShell(innerHtml) {
  return `
  <div style="background:#f4f4f5;padding:40px 16px;font-family:'Apple SD Gothic Neo','Malgun Gothic',sans-serif;">
    <table role="presentation" width="100%" style="max-width:520px;margin:0 auto;background:#ffffff;border-radius:20px;overflow:hidden;border:1px solid #eee;">
      <tr>
        <td style="background:#000000;padding:28px 32px;">
          <span style="font-size:20px;font-weight:900;color:#ffffff;letter-spacing:-0.5px;">콘텐츠마이닝</span>
        </td>
      </tr>
      <tr>
        <td style="padding:36px 32px;">
          ${innerHtml}
        </td>
      </tr>
      <tr>
        <td style="padding:20px 32px;background:#fafafa;border-top:1px solid #f0f0f0;">
          <span style="font-size:12px;color:#9ca3af;">본 메일은 콘텐츠마이닝 문의 폼을 통해 자동 발송되었습니다.</span>
        </td>
      </tr>
    </table>
  </div>`;
}

function infoRow(label, value) {
  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;width:88px;font-size:13px;color:#9ca3af;vertical-align:top;">${label}</td>
      <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:14px;color:#18181b;font-weight:500;">${escapeHtml(value) || '-'}</td>
    </tr>`;
}

function notifyApplicant(data) {
  if (!data.email) return;

  const subject = '[콘텐츠마이닝] 프로젝트 문의가 정상적으로 접수되었습니다';

  const inner = `
    <p style="margin:0 0 4px;font-size:13px;color:${BRAND_COLOR};font-weight:700;">CONTACT RECEIVED</p>
    <h1 style="margin:0 0 20px;font-size:22px;font-weight:900;color:#18181b;letter-spacing:-0.5px;">
      ${escapeHtml(data.name) || '고객'}님, 문의가 접수되었습니다
    </h1>
    <p style="margin:0 0 28px;font-size:14px;line-height:1.7;color:#52525b;">
      콘텐츠마이닝에 문의해주셔서 감사합니다.<br />
      담당자가 내용을 확인 후 빠르게 연락드리겠습니다.
    </p>
    <table role="presentation" width="100%" style="border-collapse:collapse;">
      ${infoRow('문의 유형', data.projectTypes)}
      ${infoRow('회사명', data.company)}
      ${infoRow('문의 내용', data.message)}
    </table>
    <p style="margin:28px 0 0;font-size:13px;color:#a1a1aa;">감사합니다.<br/>콘텐츠마이닝 드림</p>
  `;

  GmailApp.sendEmail(data.email, subject, stripHtml(inner), {
    htmlBody: emailShell(inner),
  });
}

function notifyAdmin(data, timestamp) {
  const subject = `[문의 접수] ${data.name || '무명'} · ${data.company || '회사명 없음'}`;

  const inner = `
    <p style="margin:0 0 4px;font-size:13px;color:${BRAND_COLOR};font-weight:700;">NEW INQUIRY</p>
    <h1 style="margin:0 0 20px;font-size:22px;font-weight:900;color:#18181b;letter-spacing:-0.5px;">
      새 프로젝트 문의가 도착했어요
    </h1>
    <table role="presentation" width="100%" style="border-collapse:collapse;">
      ${infoRow('접수 시각', Utilities.formatDate(timestamp, 'Asia/Seoul', 'yyyy-MM-dd HH:mm'))}
      ${infoRow('회사명', data.company)}
      ${infoRow('성함', data.name)}
      ${infoRow('이메일', data.email)}
      ${infoRow('연락처', data.phone)}
      ${infoRow('문의 유형', data.projectTypes)}
      ${infoRow('문의 내용', data.message)}
    </table>
  `;

  GmailApp.sendEmail(ADMIN_EMAIL, subject, stripHtml(inner), {
    htmlBody: emailShell(inner),
  });
}

function stripHtml(html) {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}
