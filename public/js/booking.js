const state = {
  step: 1,
  totalSteps: 5,
  service: null,
  serviceName: '',
  servicePrice: 0,
  serviceDuration: '',
  petType: null,
  petSize: null,
  petAge: null,
  petName: '',
  date: null,
  time: null,
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
};

let calYear, calMonth;
const today = new Date();
calYear = today.getFullYear();
calMonth = today.getMonth();

const steps   = document.querySelectorAll('.bk-step');
const lines   = document.querySelectorAll('.bk-step-line');
const nextBtn = document.getElementById('bk-next');
const backBtn = document.getElementById('bk-back');

function getPanel(n) {
  if (n <= 5) return document.getElementById('bk-step-' + n);
  return document.getElementById('bk-success');
}

function goTo(n) {
  state.step = n;

  // Ẩn tất cả panels và wrappers
  document.querySelectorAll('.bk-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.bk-step-page').forEach(p => p.classList.remove('active'));

  // Hiện panel đúng + wrapper bên ngoài
  const panel = getPanel(n);
  if (panel) {
    panel.classList.add('active');
    const wrapper = panel.closest('.bk-step-page');
    if (wrapper) wrapper.classList.add('active');
  }

  // Progress bar
  steps.forEach((s, i) => {
    s.classList.remove('active', 'done');
    if (i + 1 < n) s.classList.add('done');
    if (i + 1 === n) s.classList.add('active');
  });

  lines.forEach((l, i) => l.classList.toggle('done', i + 1 < n));

  backBtn.style.visibility = n > 1 ? 'visible' : 'hidden';

  const stepInfo = document.getElementById('bk-step-info');
  if (stepInfo) stepInfo.innerText = n <= state.totalSteps ? `Step ${n} of ${state.totalSteps}` : '';

  if (n === 5) renderSummary();
  if (n > state.totalSteps) renderSuccess();

  validateStep();
}

function validateStep() {
  let valid = false;
  switch (state.step) {
    case 1: valid = !!state.service; break;
    case 2: valid = !!state.petType && !!state.petAge; break;
    case 3: valid = !!state.date && !!state.time; break;
    case 4: {
      const f = document.getElementById('bk-first');
      const l = document.getElementById('bk-last');
      const e = document.getElementById('bk-email');
      const p = document.getElementById('bk-phone');
      valid = !!(f?.value && l?.value && e?.value && p?.value);
      break;
    }
    case 5: valid = true; break;
  }
  nextBtn.disabled = !valid;
}

nextBtn.addEventListener('click', () => {
  if (state.step === state.totalSteps) { confirmBooking(); return; }
  goTo(state.step + 1);
});

backBtn.addEventListener('click', () => goTo(state.step - 1));

// Event delegation
document.addEventListener('click', function(e) {

  const card = e.target.closest('.bk-service-card');
  if (card) {
    document.querySelectorAll('.bk-service-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    state.service         = card.dataset.service;
    state.serviceName     = card.dataset.name;
    state.servicePrice    = card.dataset.price;
    state.serviceDuration = card.dataset.duration;
    validateStep();
    return;
  }

  const typeBtn = e.target.closest('.bk-type-btn');
  if (typeBtn) {
    document.querySelectorAll('.bk-type-btn').forEach(b => b.classList.remove('selected'));
    typeBtn.classList.add('selected');
    state.petType = typeBtn.dataset.type;
    validateStep();
    return;
  }

  const sizeBtn = e.target.closest('.bk-size-btn');
  if (sizeBtn) {
    document.querySelectorAll('.bk-size-btn').forEach(b => b.classList.remove('selected'));
    sizeBtn.classList.add('selected');
    state.petSize = sizeBtn.dataset.size;
    return;
  }

  const ageBtn = e.target.closest('.bk-age-btn');
  if (ageBtn) {
    document.querySelectorAll('.bk-age-btn').forEach(b => b.classList.remove('selected'));
    ageBtn.classList.add('selected');
    state.petAge = ageBtn.dataset.age;
    validateStep();
    return;
  }
});

['bk-first', 'bk-last', 'bk-email', 'bk-phone'].forEach(id => {
  document.getElementById(id)?.addEventListener('input', validateStep);
});

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function renderCalendar() {
  const grid = document.getElementById('bk-cal-grid');
  if (!grid) return;
  grid.innerHTML = '';

  const label = document.getElementById('bk-month-label');
  if (label) label.innerText = `${MONTHS[calMonth]} ${calYear}`;

  const firstDay = new Date(calYear, calMonth, 1);
  const lastDay  = new Date(calYear, calMonth + 1, 0);
  const offset   = (firstDay.getDay() + 6) % 7;

  for (let i = 0; i < offset; i++) {
    grid.appendChild(makeDay(new Date(calYear, calMonth, -offset + i + 1), true));
  }
  for (let d = 1; d <= lastDay.getDate(); d++) {
    grid.appendChild(makeDay(new Date(calYear, calMonth, d), false));
  }
}

function makeDay(date, otherMonth) {
  const btn = document.createElement('button');
  btn.className = 'bk-cal-day';
  btn.innerText = date.getDate();

  const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
  if (otherMonth || isPast || date.getDay() === 0) btn.disabled = true;
  if (date.toDateString() === today.toDateString()) btn.classList.add('today');
  if (state.date?.toDateString() === date.toDateString()) btn.classList.add('selected');

  btn.addEventListener('click', () => {
    state.date = date;
    state.time = null;
    renderCalendar();
    renderSlots(date);
    validateStep();
  });
  return btn;
}

function renderSlots(date) {
  document.getElementById('bk-slots-empty').style.display = 'none';
  document.getElementById('bk-slots').style.display = 'flex';
  document.getElementById('bk-slots-day').innerText = date.toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric',
  });

  const morning   = ['9:00 AM','9:30 AM','10:00 AM','10:30 AM','11:00 AM'];
  const afternoon = ['1:00 PM','1:30 PM','2:00 PM','2:30 PM','3:00 PM','4:00 PM'];

  const mornWrap = document.getElementById('bk-morning-slots');
  const aftWrap  = document.getElementById('bk-afternoon-slots');
  mornWrap.innerHTML = '';
  aftWrap.innerHTML  = '';
  morning.forEach(t   => mornWrap.appendChild(makeSlot(t)));
  afternoon.forEach(t => aftWrap.appendChild(makeSlot(t)));
}

function makeSlot(time) {
  const btn = document.createElement('button');
  btn.className = 'bk-slot';
  btn.innerText = time;
  btn.addEventListener('click', () => {
    document.querySelectorAll('.bk-slot').forEach(s => s.classList.remove('selected'));
    btn.classList.add('selected');
    state.time = time;
    validateStep();
  });
  return btn;
}

document.getElementById('bk-prev-month')?.addEventListener('click', () => {
  if (--calMonth < 0) { calMonth = 11; calYear--; }
  renderCalendar();
});

document.getElementById('bk-next-month')?.addEventListener('click', () => {
  if (++calMonth > 11) { calMonth = 0; calYear++; }
  renderCalendar();
});

function renderSummary() {
  state.firstName = document.getElementById('bk-first')?.value || '';
  state.lastName  = document.getElementById('bk-last')?.value  || '';
  state.email     = document.getElementById('bk-email')?.value || '';
  state.phone     = document.getElementById('bk-phone')?.value || '';

  const set = (id, val) => { const el = document.getElementById(id); if (el) el.innerText = val; };
  set('sum-service',  state.serviceName);
  set('sum-price',    '$' + state.servicePrice);
  set('sum-duration', state.serviceDuration);
  set('sum-pet',      [state.petType, state.petSize].filter(Boolean).join(' '));
  set('sum-datetime', state.date ? `${state.date.toDateString()} at ${state.time}` : '');
  set('sum-name',     `${state.firstName} ${state.lastName}`);
  set('sum-email',    state.email);
  set('sum-phone',    state.phone);
  set('sum-total',    'From  $' + state.servicePrice);
}

function confirmBooking() {
  nextBtn.disabled  = true;
  nextBtn.innerText = 'Confirming...';
  setTimeout(() => {
    goTo(6);
    nextBtn.style.display = 'none';
    backBtn.style.display = 'none';
  }, 1200);
}

function renderSuccess() {
  const emailEl   = document.getElementById('success-email');
  const detailsEl = document.getElementById('success-details');
  if (emailEl)   emailEl.innerText = state.email;
  if (detailsEl) detailsEl.innerHTML = `
    <strong>${state.serviceName}</strong><br>
    ${state.date?.toDateString()} at ${state.time}<br>
    ${state.firstName} ${state.lastName}<br>
    ${state.phone}
  `;
}

renderCalendar();
goTo(1);

document.querySelectorAll('.bk-input').forEach(input => {

    input.addEventListener('input', () => {

        const fieldGroup = input.closest('.bk-field-group');

        if (!fieldGroup) return;

        if (input.value.trim() !== '') {
            fieldGroup.classList.add('has-success');
        } else {
            fieldGroup.classList.remove('has-success');
        }

    });

});